import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-primary/20 py-12 relative">
      {/* Decorative pattern at top of footer */}
      <div className="absolute top-0 left-0 right-0 h-2 rangoli-border"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary font-['Poppins']">Incredible India</h3>
            <p className="text-sm text-muted-foreground">
              Discover the rich cultural heritage of India - a land of diverse traditions,
              magnificent architecture, and timeless arts.
            </p>
            {/* Decorative Indian motif */}
            <div className="w-16 h-16 paisley-pattern opacity-30 ml-4"></div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary font-['Poppins']">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span className="text-primary text-xs">✦</span> Home
                </Link>
              </li>
              <li>
                <Link to="/states" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span className="text-primary text-xs">✦</span> States
                </Link>
              </li>
              <li>
                <Link to="/heritage" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span className="text-primary text-xs">✦</span> Heritage
                </Link>
              </li>
              <li>
                <Link to="/arts" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span className="text-primary text-xs">✦</span> Arts & Crafts
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span className="text-primary text-xs">✦</span> News
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary font-['Poppins']">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/festivals" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span className="text-primary text-xs">✦</span> Festivals
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span className="text-primary text-xs">✦</span> About
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span className="text-primary text-xs">✦</span> Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <span className="text-primary text-xs">✦</span> Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary font-['Poppins']">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors bg-white/50 p-2 rounded-full hover:shadow-md">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors bg-white/50 p-2 rounded-full hover:shadow-md">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors bg-white/50 p-2 rounded-full hover:shadow-md">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/dishant-singh504/" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors bg-white/50 p-2 rounded-full hover:shadow-md">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors bg-white/50 p-2 rounded-full hover:shadow-md">
                <Github size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              contact@incredibleindia.com
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary/10 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Incredible India Cultural Heritage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;