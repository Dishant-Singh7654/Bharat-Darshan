import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, MapPin, Book, Landmark, Palette, User, LogOut, CheckCircle, Heart, LogIn, Flag, BookOpen, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const routes = [
  { name: "Home", path: "/", icon: null },
  { name: "States", path: "/states", icon: <Flag className="h-4 w-4 mr-2" /> },
  { name: "Festivals", path: "/festivals", icon: <Book className="h-4 w-4 mr-2" /> },
  { name: "Arts", path: "/arts", icon: <Palette className="h-4 w-4 mr-2" /> },
  { name: "Heritage", path: "/heritage", icon: <Landmark className="h-4 w-4 mr-2" /> },
  { name: "News", path: "/news", icon: <BookOpen className="h-4 w-4 mr-2" /> },
  { name: "About", path: "/about", icon: null }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const isHomePage = location.pathname === '/';

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      // On home page, show navbar only when scrolled down to the featured destinations section (approx. 80vh)
      if (isHomePage) {
        const scrollThreshold = window.innerHeight * 0.7; // 70% of viewport height
        setIsScrolled(window.scrollY > scrollThreshold);
      } else {
        // On other pages, always show the navbar
        setIsScrolled(true);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getUserInitials = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName.charAt(0).toUpperCase();
    }
    if (currentUser?.email) {
      return currentUser.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // If we're on the home page and not scrolled, don't render the navbar at all
  if (isHomePage && !isScrolled) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 mr-8">
            <img
              src="/web-logo.jpeg"
              alt="Bharat Darshan Logo"
              className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md"
            />
            <span className="font-bold text-lg hidden md:block bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent font-['Poppins']">
              Bharat Darshan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {routes.map((route) => (
                  <NavigationMenuItem key={route.path}>
                    <Link 
                      to={route.path}
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        location.pathname === route.path ? "bg-primary/10 text-primary" : "text-foreground"
                      )}
                    >
                      {route.icon}
                      {route.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 z-50 bg-background/95 backdrop-blur-lg border-b">
            <nav className="container py-4">
              <ul className="flex flex-col space-y-4">
                {routes.map((route) => (
                  <li key={route.path}>
                    <Link
                      to={route.path}
                      className={cn(
                        "flex items-center text-lg px-4 py-2 rounded-md hover:bg-primary/10 hover:text-primary",
                        location.pathname === route.path ? "bg-primary/10 text-primary" : "text-foreground"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {route.icon}
                      {route.name}
                    </Link>
                  </li>
                ))}
                
                <li className="border-t pt-4 mt-4">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center px-4 py-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4 mr-2" />
                        {currentUser?.displayName ? (
                          <span>Signed in as {currentUser.displayName}</span>
                        ) : (
                          <span>Signed in as {currentUser?.email}</span>
                        )}
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center text-lg px-4 py-2 rounded-md hover:bg-primary/10 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center text-lg px-4 py-2 rounded-md hover:bg-primary/10 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Travel Dashboard
                      </Link>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start px-4 py-2 text-lg"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center text-lg px-4 py-2 rounded-md hover:bg-primary/10 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log In
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center text-lg px-4 py-2 rounded-md bg-primary text-white mt-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Right section with auth buttons */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  {currentUser?.displayName && (
                    <p className="text-sm font-medium">{currentUser.displayName}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Travel Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="hidden sm:flex bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;