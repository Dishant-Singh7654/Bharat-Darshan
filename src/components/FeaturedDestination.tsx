
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface FeaturedDestinationProps {
  title: string;
  location: string;
  imageUrl: string;
  description: string;
}

const FeaturedDestination = ({
  title,
  location,
  imageUrl,
  description,
}: FeaturedDestinationProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur india-card india-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Gradient overlay that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        
        {/* Image loading placeholder */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 ${imageLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        />
        
        <img
          src={imageUrl}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          className={`object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />
        
        {/* Decorative corner elements */}
        <div className="absolute top-0 right-0 w-12 h-12 paisley-pattern opacity-90"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 paisley-pattern opacity-70 rotate-180"></div>
      </div>
      
      <div className="p-6 space-y-3 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 india-gradient-bg rounded-b-lg"></div>
        
        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300 font-['Poppins'] relative">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground flex items-center gap-1 relative">
          <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          {location}
        </p>
        
        <p className="text-muted-foreground relative group-hover:text-foreground transition-colors duration-300">{description}</p>
      </div>
    </Card>
  );
};

export default FeaturedDestination;
