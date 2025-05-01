import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Compass, Sun } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-kenburns"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            filter: "brightness(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        
        {/* Color overlay for vibrancy with Indian flag colors */}
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
      </div>

      {/* Decorative Elements - Indian cultural symbols */}
      <div className="absolute top-10 left-10 hidden md:block">
        <svg className="w-20 h-20 text-primary/70" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,1L3,5v6c0,5.55,3.84,10.74,9,12c5.16-1.26,9-6.45,9-12V5L12,1z M19,11c0,4.52-2.98,8.69-7,9.93 c-4.02-1.24-7-5.41-7-9.93V6.3l7-3.11l7,3.11V11z M7.82,14.77c1.95,1.97,5.14,1.9,7-0.17c0.32-0.36,0.85-0.39,1.21-0.07 c0.36,0.32,0.39,0.85,0.07,1.21c-2.45,2.71-6.52,2.82-9.08,0.25c-0.33-0.33-0.33-0.86,0-1.19C7.33,14.47,7.49,14.44,7.82,14.77z M7,10.5c0-0.83,0.67-1.5,1.5-1.5S10,9.67,10,10.5S9.33,12,8.5,12S7,11.33,7,10.5z M15.5,12c-0.83,0-1.5-0.67-1.5-1.5 s0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5S16.33,12,15.5,12z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-20 right-10 hidden md:block">
        <svg className="w-24 h-24 text-secondary/60 rotate-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2C6.49,2,2,6.49,2,12s4.49,10,10,10s10-4.49,10-10S17.51,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M15,12c0,1.66-1.34,3-3,3s-3-1.34-3-3s1.34-3,3-3S15,10.34,15,12z"/>
        </svg>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="space-y-8">
          {/* Decorative Indian motif */}
          <div className="flex justify-center mb-4">
            <svg className="w-24 h-24 text-primary/90" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2l-5.5,9.5l5.5,9.5l5.5-9.5L12,2z M12,17.5l-3.5-6l3.5-6l3.5,6L12,17.5z"/>
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold max-w-4xl mx-auto leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-primary/90 drop-shadow-lg font-['Poppins']">
            Discover the Rich Cultural Heritage of India
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white leading-relaxed drop-shadow">
            Embark on a journey through time-honored traditions, magnificent monuments, and vibrant celebrations across the land of diversity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              className="india-button text-lg h-14 px-10 font-semibold tracking-wide"
              onClick={() => navigate("/states")}
            >
              <span className="mr-2">✦</span> Explore States
            </Button>
            <Button
              size="lg"
              className="india-button-outline text-lg h-14 px-10 font-semibold tracking-wide"
              onClick={() => navigate("/about")}
            >
              <span className="mr-2">✦</span> Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient with Indian cultural colors */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      
      {/* Decorative bottom border with Indian pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-3 rangoli-border" />
    </div>
  );
};

export default Hero;
