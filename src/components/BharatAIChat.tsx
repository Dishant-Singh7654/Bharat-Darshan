import { useEffect, useMemo, useRef, useState } from "react";
import { getModel, generateChatResponse } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sparkles, Send, Bot, Link as LinkIcon, Loader2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { STATES_DATA } from "@/pages/States";
import { ARTS_DATA } from "@/pages/Arts";
import { type StateInfo } from "@/types/states";

// Build lightweight context strings for tuning
function buildSiteContext() {
  const states = STATES_DATA.map(s => s.name).join(", ");
  const arts = ARTS_DATA.map(a => a.name).join(", ");
  const pages = ["/states", "/arts", "/festivals", "/heritage", "/news", "/about"].join(", ");
  return `States: ${states}\nArts: ${arts}\nMain Pages: ${pages}`;
}

// Fuzzy match utility
function normalize(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

function fuzzyIncludes(hay: string, needle: string) {
  const h = normalize(hay);
  const n = normalize(needle);
  return h.includes(n) || n.split(" ").every(w => h.includes(w));
}

type ChatMessage = { role: "user" | "model"; text: string };

// Basic Markdown to HTML formatter with sanitization (bold, italic, lists, headings, line breaks, links)
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatMarkdownBasic(md: string): string {
  const safe = escapeHtml(md);
  const lines = safe.split(/\r?\n/);
  const blocks: string[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length) {
      blocks.push(`<ul>${listBuffer.join("")}</ul>`);
      listBuffer = [];
    }
  };

  for (let raw of lines) {
    const line = raw.trim();
    // Headings #, ##, ###
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const content = headingMatch[2];
      blocks.push(`<h${level}>${content}</h${level}>`);
      continue;
    }
    // Bulleted lists "- " or "* "
    if (/^[-*]\s+/.test(line)) {
      const item = line.replace(/^[-*]\s+/, "");
      // Inline bold/italic inside list items
      const formatted = item
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
      listBuffer.push(`<li>${formatted}</li>`);
      continue;
    }
    // Empty line - paragraph break
    if (!line) {
      flushList();
      continue;
    }
    // Paragraph with inline formatting
    flushList();
    let text = line
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    blocks.push(`<p>${text}</p>`);
  }
  flushList();
  return blocks.join("");
}

function FormattedMessage({ text }: { text: string }) {
  const html = useMemo(() => formatMarkdownBasic(text), [text]);
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      {/* Only whitelisted tags are generated, content was escaped first */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default function BharatAIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestLink, setSuggestLink] = useState<{ label: string; to: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const siteContext = useMemo(buildSiteContext, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  function findSiteMatch(query: string): { label: string; to: string } | null {
    // Check states and tourist places
    for (const state of STATES_DATA) {
      if (fuzzyIncludes(state.name, query)) {
        return { label: `Open ${state.name} in States`, to: "/states" };
      }
      for (const place of state.touristPlaces || []) {
        if (fuzzyIncludes(place.name, query)) {
          return { label: `View ${place.name} details`, to: "/states" };
        }
      }
    }
    // Check arts
    for (const art of ARTS_DATA) {
      if (fuzzyIncludes(art.name, query)) {
        return { label: `Explore ${art.name} in Arts`, to: "/arts" };
      }
    }
    // Check festivals page generic
    const festivalKeywords = ["diwali", "holi", "dussehra", "ganesh", "janmashtami", "navaratri", "durga", "raksha", "eid", "christmas", "onam", "pongal", "baisakhi", "lohri", "makar", "ugadi", "vishu", "chhath", "guru nanak", "ram navami", "karva", "basant", "shivratri", "new year", "easter", "buddha", "gudi", "rath yatra", "bihu"];
    if (festivalKeywords.some(k => fuzzyIncludes(query, k))) {
      return { label: "See Festivals", to: "/festivals" };
    }
    return null;
  }

  async function handleSend() {
    const q = input.trim();
    if (!q) return;
    setMessages(prev => [...prev, { role: "user", text: q }]);
    setInput("");
    setLoading(true);
    try {
      const link = findSiteMatch(q);
      setSuggestLink(link);
      const answer = await generateChatResponse(q, siteContext, messages);
      setMessages(prev => [...prev, { role: "model", text: answer }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "model", text: "Sorry, I couldn't fetch a response right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <SheetTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-xl bg-gradient-to-br from-primary to-orange-400 text-white ring-2 ring-primary/30 hover:scale-105 transition-transform animate-float"
                aria-label="Open Bharat AI"
              >
                <Bot className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
          </SheetTrigger>
          <TooltipContent>Bharat AI</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent side="right" className="w-[440px] sm:w-[440px] bg-card/80 backdrop-blur border-primary/20">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" /> Bharat AI
          </SheetTitle>
          <p className="text-xs text-muted-foreground">Your friendly Indian travel & culture assistant</p>
        </SheetHeader>
        <div className="mt-4 flex flex-col h-[80vh]">
          <Card className="flex-1 p-2 bg-transparent border-none">
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4 pr-3" ref={scrollRef}>
                {messages.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    Ask me about places to visit, best time to go, arts & crafts and festivals across India.
                  </div>
                )}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] p-3 rounded-2xl shadow-sm animate-fadeIn border ${
                      m.role === "user"
                        ? "ml-auto bg-primary/15 border-primary/30"
                        : "mr-auto bg-secondary/10 border-secondary/20"
                    }`}
                  >
                    {m.role === "model" ? (
                      <FormattedMessage text={m.text} />
                    ) : (
                      <div className="whitespace-pre-line">{m.text}</div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="max-w-[70%] mr-auto p-3 rounded-2xl shadow-sm bg-secondary/10 border border-secondary/20 flex items-center gap-2 text-secondary-foreground/90">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking…</span>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>

          {suggestLink && (
            <div className="flex items-center gap-2 mb-2">
              <Button variant="outline" className="gap-2" onClick={() => navigate(suggestLink.to)}>
                <LinkIcon className="h-4 w-4" /> {suggestLink.label}
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Input
              placeholder="Ask Bharat AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button onClick={handleSend} disabled={loading} className="gap-2 bg-primary">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}