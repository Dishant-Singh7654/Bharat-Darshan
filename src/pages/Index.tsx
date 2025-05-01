import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FeaturedDestination from "@/components/FeaturedDestination";
import Hero from "@/components/Hero";
import { useIsMobile } from "@/hooks/use-mobile";
import { Calendar, Palette, Sparkles, MapPin, Plane, Globe, Camera } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const featuredSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      <main className="container mx-auto px-4 py-16 space-y-24">
        {/* Featured Destinations Section */}
        <section ref={featuredSectionRef} id="featured-destinations" className="space-y-12 relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 opacity-10 hidden lg:block">
            <Plane className="w-32 h-32 text-primary rotate-45" />
          </div>
          
          <div className="text-center space-y-4">
            <span className="px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium inline-block">
              Discover India
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary">
              Featured Destinations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore the most iconic destinations that showcase India's rich cultural heritage and timeless traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="travel-card travel-card-hover">
              <FeaturedDestination
                title="Taj Mahal"
                location="Agra, Uttar Pradesh"
                imageUrl="https://images.unsplash.com/photo-1548013146-72479768bada"
                description="Symbol of eternal love, this magnificent marble monument is one of the Seven Wonders of the World."
              />
            </div>
            <div className="travel-card travel-card-hover">
              <FeaturedDestination
                title="Golden Temple"
                location="Amritsar, Punjab"
                imageUrl="https://media.istockphoto.com/id/543179390/photo/golden-temple-the-main-sanctuary-of-sikhs-amritsar-india.jpg?s=612x612&w=0&k=20&c=s4bOWzg0e0ecBBPmuzIEShhrmMWFE16cnYlAZ7Nfdeg="
                description="A spiritual haven that represents the heart of Sikhism, radiating peace and tranquility."
              />
            </div>
            <div className="travel-card travel-card-hover">
              <FeaturedDestination
                title="Red Fort"
                location="Old Delhi, Delhi"
                imageUrl="https://bsmedia.business-standard.com/_media/bs/img/article/2022-08/14/full/1660470936-7444.jpg?im=FeatureCrop,size=(826,465)"
                description="Historic fortress that served as the main residence of Mughal Emperors and a UNESCO World Heritage site."
              />
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="space-y-12 relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 opacity-10 hidden lg:block">
            <Globe className="w-24 h-24 text-primary" />
          </div>
          
          <div className="text-center space-y-4">
            <span className="px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium inline-block">
              Stay Updated
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary">
              Latest Cultural News
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Stay informed about the latest updates in Indian culture, heritage, and tourism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="travel-card travel-card-hover">
              <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card/60 backdrop-blur border-primary/20">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img 
                    src="https://cache.careers360.mobi/media/article_images/2023/3/20/indian-culture-speech.jpg"
                    alt="Cultural Event"
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Cultural Updates</h3>
                  <p className="text-muted-foreground">Stay updated with the latest news about cultural events, festivals, and celebrations across India.</p>
                </div>
              </Card>
            </div>

            <div className="travel-card travel-card-hover">
              <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card/60 backdrop-blur border-primary/20">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img 
                    src="https://static.businessworld.in/Untitled%20design%20-%202024-05-28T112901.389_20240528112939_original_image_27.webp"
                    alt="Heritage Site"
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Heritage News</h3>
                  <p className="text-muted-foreground">Get the latest updates about heritage site preservation, discoveries, and restoration projects.</p>
                </div>
              </Card>
            </div>

            <div className="travel-card travel-card-hover">
              <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card/60 backdrop-blur border-primary/20">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img 
                    src="https://i.postimg.cc/bvryc4B2/5-34.webp"
                    alt="Tourism Update"
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Tourism Updates</h3>
                  <p className="text-muted-foreground">Latest information about travel guidelines, tourist attractions, and cultural tourism initiatives.</p>
                </div>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="text-lg h-14 px-10 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              onClick={() => navigate("/news")}
            >
              View All News
            </Button>
          </div>
        </section>

        {/* Cultural Experiences Section */}
        <section className="space-y-12 relative">
          {/* Decorative elements */}
          <div className="absolute top-1/2 -right-10 opacity-10 hidden lg:block">
            <Globe className="w-24 h-24 text-secondary" />
          </div>
          
          <div className="text-center space-y-4">
            <span className="px-4 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
              Cultural Experiences
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Immerse in Traditions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Experience the vibrant festivals, ancient rituals, and time-honored customs that make India unique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card/60 backdrop-blur border-primary/20 travel-card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-8 space-y-6 relative">
                  <Calendar className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold">Festivals & Celebrations</h3>
                  <p className="text-muted-foreground text-lg">
                    From the colorful Holi to the luminous Diwali, discover the joy and meaning behind India's major festivals.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full text-lg h-12 border-primary/20 hover:bg-primary/10"
                    onClick={() => navigate("/festivals")}
                  >
                    Explore Festivals
                  </Button>
                </div>
              </Card>
            </div>

            <div>
              <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card/60 backdrop-blur border-secondary/20 travel-card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-8 space-y-6 relative">
                  <Palette className="w-8 h-8 text-secondary mb-4" />
                  <h3 className="text-2xl font-semibold">Arts & Crafts</h3>
                  <p className="text-muted-foreground text-lg">
                    Explore the intricate world of Indian handicrafts, from textile weaving to pottery making.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full text-lg h-12 border-secondary/20 hover:bg-secondary/10"
                    onClick={() => navigate("/arts")}
                  >
                    Discover Crafts
                  </Button>
                </div>
              </Card>
            </div>

            <div>
              <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card/60 backdrop-blur border-accent/20 travel-card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-8 space-y-6 relative">
                  <Sparkles className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-2xl font-semibold">Cultural Heritage</h3>
                  <p className="text-muted-foreground text-lg">
                    Discover the rich cultural heritage of India, from ancient monuments to traditional practices and wisdom.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full text-lg h-12 border-accent/20 hover:bg-accent/10"
                    onClick={() => navigate("/heritage")}
                  >
                    Explore Heritage
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center space-y-8 py-12 relative">
          <div className="absolute -left-4 bottom-8 opacity-10 hidden lg:block">
            <Camera className="w-20 h-20 text-accent" />
          </div>
          
          <div className="absolute inset-0 -z-10 travel-gradient-bg opacity-10 rounded-xl"></div>
          
          <span className="px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium inline-block">
            Start Your Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Ready to Explore India?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Begin your adventure through India's diverse states and discover the unique heritage each one holds.
          </p>
          <div>
            <Button
              size="lg"
              className="text-lg h-14 px-10 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              onClick={() => navigate("/states")}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Explore States
            </Button>
          </div>
        </section>
      </main>
      
      {/* Decorative footer border */}
      <div className="h-2 safari-border mb-8"></div>
    </div>
  );
};

export default Index;
