import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const ENV_MODEL = (import.meta.env.VITE_GEMINI_MODEL as string) || "";

// Prefer stable, widely available PRO variants only to avoid 404s on unsupported FLASH models
const STATIC_MODEL_CANDIDATES = [
  ENV_MODEL || "",
  "gemini-1.5-pro-002",
  "gemini-1.5-pro-001",
  "gemini-1.5-pro",
  "gemini-1.0-pro",
].filter(Boolean);

let genAI: GoogleGenerativeAI | null = null;
let chosenModel: string | null = null; // cache successful model name

function getClient() {
  if (!genAI) {
    if (!API_KEY) {
      console.warn("Gemini API key is not set. Please define VITE_GEMINI_API_KEY in your environment.");
    }
    genAI = new GoogleGenerativeAI(API_KEY || "");
  }
  return genAI;
}

export function getModel(modelName: string) {
  const client = getClient();
  return client.getGenerativeModel({ model: modelName });
}

async function getRuntimeModelCandidates(): Promise<string[]> {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`listModels failed: ${res.status}`);
    const data = await res.json();
    const names: string[] = (data.models || [])
      .filter((m: any) => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes("generateContent"))
      .map((m: any) => String(m.name).replace(/^models\//, ""));

    // Keep only PRO variants to minimize 404s in v1beta generateContent
    const proOnly = names.filter((n) => /pro/i.test(n));

    // Prioritize -002/-001 suffixes first, then others
    proOnly.sort((a, b) => {
      const score = (s: string) => (/\b-002\b/.test(s) ? 3 : /\b-001\b/.test(s) ? 2 : /pro/i.test(s) ? 1 : 0);
      const da = score(a);
      const db = score(b);
      if (da !== db) return db - da;
      return a.localeCompare(b);
    });
    console.log("[BharatAI] listModels available (pro-only):", proOnly);
    return proOnly;
  } catch (e) {
    console.warn("[BharatAI] listModels failed; falling back to static candidates.", e);
    return [];
  }
}

async function tryGenerateOnce(modelName: string, userMessage: string, siteContext: string, history: { role: "user" | "model"; text: string }[]) {
  const model = getModel(modelName);
  const chatHistory = [
    {
      role: "user" as const,
      text:
        `You are Bharat AI, a friendly Indian tourism assistant for a website focused on India's cultural heritage, states, arts & crafts, and festivals.\n\n` +
        `Website Context:\n${siteContext}\n\n` +
        `Guidelines:\n` +
        `- Prioritize information most relevant to the website (states, tourist places, arts, festivals).\n` +
        `- If the requested content is available on the website, mention it and suggest opening the relevant page.\n` +
        `- If it's not on the website, still answer helpfully using your own knowledge.\n` +
        `- Keep answers concise, clear, and helpful for tourists (best time to visit, highlights, location).\n` +
        `- Use an inviting tone and avoid overlong paragraphs.\n` +
        `- Do not reveal or assume any API keys or secrets.\n` +
        `- When suggesting navigation, prefer these pages: /states, /arts, /festivals, /heritage, /news, /about.\n` +
        `- If a specific state/place/art/festival matches, make that suggestion.\n`
    },
    ...history,
  ];
  const chat = model.startChat({ history: chatHistory.map(h => ({ role: h.role, parts: [{ text: h.text }] })) });
  const result = await chat.sendMessage(userMessage);
  const response = await result.response;
  const text = response.text();
  return text;
}

export async function generateChatResponse(userMessage: string, siteContext: string, history: { role: "user" | "model"; text: string }[] = []) {
  if (chosenModel) {
    try {
      return await tryGenerateOnce(chosenModel, userMessage, siteContext, history);
    } catch (err: any) {
      console.warn(`[BharatAI] Cached model failed: ${chosenModel} -> ${String(err?.message || err)}`);
      chosenModel = null;
    }
  }
  const dynamic = await getRuntimeModelCandidates();
  const candidates = [...STATIC_MODEL_CANDIDATES, ...dynamic];
  let lastErr: unknown = null;
  for (const modelName of candidates) {
    try {
      const text = await tryGenerateOnce(modelName, userMessage, siteContext, history);
      chosenModel = modelName;
      console.log("[BharatAI] Using model:", modelName);
      return text;
    } catch (err: any) {
      lastErr = err;
      const msg = String(err?.message || "");
      console.warn(`[BharatAI] Model failed: ${modelName} -> ${msg}`);
      // On 404/not found, continue to next candidate
      if (/404|not found|is not supported/i.test(msg)) {
        continue;
      }
      // For other errors, still continue trying other candidates
      continue;
    }
  }
  throw lastErr ?? new Error("No Gemini models available");
}