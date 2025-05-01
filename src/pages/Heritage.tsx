import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

interface HistoricalEvent {
  title: string;
  period: string;
  description: string;
  significance: string;
  category: "Epic" | "War" | "Dynasty";
}

const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    title: "Ramayana",
    period: "Treta Yuga (Ancient Period)",
    description: "The Ramayana is an ancient Sanskrit epic that follows Prince Rama's quest to rescue his wife Sita from the demon king Ravana. Written by sage Valmiki, it contains 24,000 verses across seven books (kandas).",
    significance: "Beyond being a tale of good versus evil, the Ramayana serves as a guide to Hindu dharma, teaching values like duty, loyalty, righteousness, and ideal relationships. Its influence extends across Southeast Asia.",
    category: "Epic"
  },
  {
    title: "Mahabharata",
    period: "Dwapara Yuga (Ancient Period)",
    description: "The world's longest epic poem, containing 100,000 verses, tells the story of the Kurukshetra War between the Pandavas and Kauravas. It includes the sacred Bhagavad Gita, where Lord Krishna imparts wisdom to Arjuna.",
    significance: "Contains philosophical and moral teachings that remain relevant today. The Bhagavad Gita especially is considered one of the most important philosophical texts in Hinduism.",
    category: "Epic"
  },
  {
    title: "Third Battle of Panipat",
    period: "1761 CE",
    description: "A pivotal battle between the Maratha Empire and the coalition forces of the Afghan ruler Ahmad Shah Durrani, the Rohilla Afghans, and the troops of Nawab of Awadh. One of the largest battles of the 18th century.",
    significance: "Changed the course of Indian history by halting Maratha expansion and weakening the Mughal Empire, indirectly paving the way for British colonization.",
    category: "War"
  },
  {
    title: "Mauryan Empire",
    period: "322-185 BCE",
    description: "One of ancient India's largest and most powerful dynasties, established by Chandragupta Maurya and reaching its peak under Emperor Ashoka. Known for its advanced administration, art, and architecture.",
    significance: "Ashoka's pillars and rock edicts spread Buddhist teachings across Asia. The period saw significant developments in art, architecture, and governance systems.",
    category: "Dynasty"
  },
  {
    title: "Gupta Empire",
    period: "320-550 CE",
    description: "Known as the 'Golden Age' of India, the Gupta period saw remarkable progress in science, mathematics, astronomy, religion, and philosophy. Achievements include the concept of zero, decimal system, and heliocentric theory.",
    significance: "Produced great scholars like Aryabhata, Kalidasa, and Varahamihira. The period saw the creation of magnificent temples and artistic masterpieces.",
    category: "Dynasty"
  }
];

const Heritage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Alternative approach for older browsers
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12">
      <div className="container mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Cultural Heritage
          </span>
          <h1 className="text-4xl md:text-5xl font-bold">
            India's Rich Heritage
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Discover the timeless traditions, ancient wisdom, and cultural treasures that make India a living museum of human civilization.
          </p>
        </div>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Historical Legacy</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {HISTORICAL_EVENTS.map((event) => (
              <Card key={event.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-sm font-medium text-white shadow-sm">
                      {event.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.period}</p>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Historical Significance</h4>
                        <p className="text-sm text-muted-foreground">{event.significance}</p>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Ancient Architecture</h2>
              <p className="text-muted-foreground">
                From the intricate temples of Khajuraho to the rock-cut caves of Ajanta and Ellora, India's architectural heritage spans millennia. These monuments showcase advanced engineering, artistic excellence, and deep spiritual significance.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Classical Arts</h2>
              <p className="text-muted-foreground">
                India's classical traditions include dance forms like Bharatanatyam and Kathak, musical traditions like Carnatic and Hindustani, and various theatrical arts that have been preserved and passed down through generations.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Traditional Knowledge</h2>
              <p className="text-muted-foreground">
                Ancient texts like the Vedas, Upanishads, and Arthashastra contain profound knowledge about philosophy, science, mathematics, and governance. Traditional practices like Ayurveda and Yoga continue to benefit millions worldwide.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Living Traditions</h2>
              <p className="text-muted-foreground">
                India's heritage lives on through its festivals, rituals, customs, and social practices. These traditions adapt while maintaining their core values, creating a unique blend of ancient and modern.
              </p>
            </Card>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">UNESCO World Heritage Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Taj Mahal</h3>
              <p className="text-muted-foreground">
                An ivory-white marble mausoleum on the right bank of the river Yamuna, commissioned in 1632 by Mughal emperor Shah Jahan.
              </p>
            </Card>
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Hampi</h3>
              <p className="text-muted-foreground">
                The ruins of Hampi represent the last capital of the last great Hindu Kingdom of Vijayanagar, featuring stunning temple complexes and royal structures.
              </p>
            </Card>
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Khajuraho Temples</h3>
              <p className="text-muted-foreground">
                Known for their nagara-style architectural symbolism and erotic sculptures, these temples are a testament to ancient Indian architectural genius.
              </p>
            </Card>
          </div>
        </section>

        <section className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Cultural Legacy</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            These historical events and epics continue to influence Indian culture, art, literature, and philosophy. Their teachings and values remain relevant in modern times, serving as a bridge between ancient wisdom and contemporary life. Through these stories and events, India's cultural heritage has transcended boundaries and continues to inspire people worldwide.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Heritage;