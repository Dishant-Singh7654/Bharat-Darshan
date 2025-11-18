import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getArtImageUrl } from "@/data/artsImages";

interface ArtForm {
  name: string;
  state: string;
  history: string;
  description: string;
  materials: string[];
  significance: string;
}

export const ARTS_DATA: ArtForm[] = [
  {
    name: "Madhubani Painting",
    state: "Bihar",
    history: "Dating back to the time of Ramayana, these paintings were traditionally created by women on freshly plastered mud walls of homes.",
    description: "Characterized by geometric patterns, natural elements like fish, birds, and flowers, and mythological scenes using vibrant natural colors.",
    materials: ["Natural dyes", "Twigs", "Fingers", "Matchsticks", "Handmade paper"],
    significance: "Originally done to mark special occasions and ceremonies, now represents Bihar's cultural identity."
  },
  {
    name: "Tanjore Painting",
    state: "Tamil Nadu",
    history: "Originated in the 16th century under the patronage of the Nayak rulers in Thanjavur.",
    description: "Known for its rich, flat colors, decorative jewelry with precious stones, and use of gold foil overlay.",
    materials: ["Gold foil", "Glass beads", "Precious stones", "Wood panel", "Canvas"],
    significance: "Traditional art form depicting Hindu gods, goddesses, and saints, showcasing the rich cultural heritage of South India."
  },
  {
    name: "Pashmina Shawls",
    state: "Kashmir",
    history: "The art of making Pashmina dates back to the 3rd century BC, gained prominence during the Mughal era.",
    description: "Ultra-fine cashmere wool shawls known for their warmth, lightness, and intricate embroidery.",
    materials: ["Pashmina wool", "Natural dyes", "Silk threads"],
    significance: "Symbol of Kashmiri craftsmanship and luxury, integral to the region's economy and cultural identity."
  },
  {
    name: "Bidri Work",
    state: "Karnataka",
    history: "Developed in the 14th century during the reign of the Bahmani Sultans in Bidar.",
    description: "Metal handicraft featuring intricate designs inlaid with silver wire on blackened alloy of zinc and copper.",
    materials: ["Zinc", "Copper", "Silver wire", "Soil from Bidar fort"],
    significance: "Unique metalwork that represents the fusion of Persian and Indian craftsmanship."
  },
  {
    name: "Phulkari",
    state: "Punjab",
    history: "Traditional embroidery craft that gained prominence in the 15th century, originally made by women for their daughters' weddings.",
    description: "Vibrant embroidery work using bright colored threads on hand-spun cotton fabric, creating geometric patterns.",
    materials: ["Cotton fabric", "Silk threads", "Mirror work"],
    significance: "Essential part of Punjabi culture, traditionally given as part of a bride's trousseau."
  },
  {
    name: "Blue Pottery",
    state: "Rajasthan",
    history: "Originated in Persia, brought to Jaipur by Raja Ram Singh in the 17th century.",
    description: "Distinctive blue-turquoise glazed pottery with Persian and Chinese influences.",
    materials: ["Quartz stone powder", "Glass", "Natural colors", "Fuller's earth"],
    significance: "One of the few ceramics in the world made without clay, represents Jaipur's artistic heritage."
  },
  {
    name: "Pattachitra",
    state: "Odisha",
    history: "Ancient cloth-based scroll painting dating back to 5th century BC, traditionally created for the Jagannath Temple.",
    description: "Intricate paintings depicting mythological narratives and folktales using natural colors on treated cloth.",
    materials: ["Cotton cloth", "Natural colors", "Stone colors", "Tamarind seed glue"],
    significance: "Integral part of Odishan culture and Jagannath tradition."
  },
  {
    name: "Warli Painting",
    state: "Maharashtra",
    history: "Tribal art form dating back to 10th century AD, traditionally painted on walls of tribal homes.",
    description: "Simple white geometric shapes depicting daily life scenes and natural elements on earthy background.",
    materials: ["Rice paste", "Bamboo sticks", "Red ochre", "Cow dung base"],
    significance: "Represents the rich tribal heritage and their harmony with nature."
  }
];

const Arts = () => {
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Alternative approach for older browsers
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, []);
  
  const handleImageLoad = (artName: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [artName]: true
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Indian Arts & Crafts</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Explore the rich artistic heritage of India, where each state contributes unique art forms that have been passed down through generations, telling stories of our culture and traditions.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ARTS_DATA.map((art) => (
            <Card key={art.name} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur india-card india-card-hover">
              {/* Image Section */}
              <div className="relative aspect-[16/9] overflow-hidden">
                {/* Gradient overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                
                {/* Image loading placeholder */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 ${imagesLoaded[art.name] ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                />
                
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-12 h-12 paisley-pattern opacity-80"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 paisley-pattern opacity-60 rotate-180"></div>
                
                <img 
                  src={getArtImageUrl(art.name)} 
                  alt={`${art.name} art form`} 
                  onLoad={() => handleImageLoad(art.name)}
                  className={`object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 ${imagesLoaded[art.name] ? "opacity-100" : "opacity-0"}`}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{art.name}</CardTitle>
                <CardDescription>Origin: {art.state}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[250px] pr-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">History</h4>
                      <p className="text-sm text-muted-foreground">{art.history}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{art.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Materials Used</h4>
                      <ul className="text-sm text-muted-foreground list-disc pl-4">
                        {art.materials.map((material) => (
                          <li key={material}>{material}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Cultural Significance</h4>
                      <p className="text-sm text-muted-foreground">{art.significance}</p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Arts;
