import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  X, 
  Star, 
  ExternalLink, 
  Hotel,
  CheckCircle,
  Heart,
  CalendarIcon,
  Loader2
} from "lucide-react";
import { TouristPlace, UserPlace } from "@/types/states";
import { useUserPlaces } from "@/contexts/UserPlacesContext";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import PlaceReviews from "./PlaceReviews";
import ReviewDialog from "./ReviewDialog";

interface StateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stateName: string;
  places: TouristPlace[];
}

const StateDialog = ({ isOpen, onClose, stateName, places }: StateDialogProps) => {
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [visitDate, setVisitDate] = useState<Date | undefined>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isVisitedLoading, setIsVisitedLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const currentPlace = places[currentPlaceIndex];
  
  const { 
    addToVisited, 
    addToWishlist, 
    isVisited, 
    isWishlisted,
    removeFromVisited,
    removeFromWishlist 
  } = useUserPlaces();

  // Helper function to generate consistent place IDs
  const getPlaceId = (place: TouristPlace, state: string) => {
    return place.id || `${state.toLowerCase().replace(/\s+/g, '-')}-${place.name.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const goToNextPlace = () => {
    setCurrentPlaceIndex((prev) => (prev + 1) % places.length);
  };

  const goToPreviousPlace = () => {
    setCurrentPlaceIndex((prev) => (prev - 1 + places.length) % places.length);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating) 
              ? "text-yellow-400 fill-yellow-400" 
              : i < rating 
                ? "text-yellow-400 fill-yellow-400 opacity-50" 
                : "text-gray-300"
          }`}
        />
      ));
  };
  
  const handleVisitedClick = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to save places as visited.",
        variant: "destructive"
      });
      return;
    }

    const placeId = getPlaceId(currentPlace, stateName);

    if (isVisited(placeId)) {
      setIsVisitedLoading(true);
      try {
        await removeFromVisited(placeId);
        toast({
          title: "Removed from visited places",
          description: `${currentPlace.name} has been removed from your visited places.`,
        });
      } catch (error) {
        console.error("Error removing from visited:", error);
        toast({
          title: "An error occurred",
          description: "Could not remove place from visited list. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsVisitedLoading(false);
      }
    } else {
      setCalendarOpen(true);
    }
  };
  
  const confirmVisited = async (date?: Date) => {
    setCalendarOpen(false);
    
    if (!currentPlace) return;
    
    const placeId = getPlaceId(currentPlace, stateName);
    
    setIsVisitedLoading(true);
    try {
      const placeData: Omit<UserPlace, "addedOn" | "visitedDate"> = {
        placeId: placeId,
        placeName: currentPlace.name,
        stateId: stateName.toLowerCase().replace(/\s+/g, '-'),
        stateName: stateName,
        imageUrl: currentPlace.imageUrl,
        location: currentPlace.location
      };
      
      await addToVisited(placeData, date);
      
      toast({
        title: "Added to visited places",
        description: `${currentPlace.name} has been added to your visited places.`,
      });
      
      // Open the review dialog after successfully marking as visited
      setIsReviewDialogOpen(true);
    } catch (error) {
      console.error("Error adding to visited:", error);
      toast({
        title: "An error occurred",
        description: "Could not add place to visited list. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVisitedLoading(false);
    }
  };
  
  const handleWishlistClick = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to save places to your wishlist.",
        variant: "destructive"
      });
      return;
    }

    const placeId = getPlaceId(currentPlace, stateName);

    setIsWishlistLoading(true);
    try {
      if (isWishlisted(placeId)) {
        await removeFromWishlist(placeId);
        toast({
          title: "Removed from wishlist",
          description: `${currentPlace.name} has been removed from your wishlist.`,
        });
      } else {
        const placeData: Omit<UserPlace, "addedOn"> = {
          placeId: placeId,
          placeName: currentPlace.name,
          stateId: stateName.toLowerCase().replace(/\s+/g, '-'),
          stateName: stateName,
          imageUrl: currentPlace.imageUrl,
          location: currentPlace.location
        };
        
        await addToWishlist(placeData);
        
        toast({
          title: "Added to wishlist",
          description: `${currentPlace.name} has been added to your wishlist.`,
        });
      }
    } catch (error) {
      console.error("Error managing wishlist:", error);
      toast({
        title: "An error occurred",
        description: "Could not update your wishlist. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-white">
        <div className="relative h-[35vh] bg-cover bg-center transition-all duration-500" 
          style={{ backgroundImage: `url('${currentPlace.imageUrl}')` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40" />
          <DialogHeader className="relative z-10 h-full p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <Badge className="mb-4 bg-primary hover:bg-primary">
                  {stateName}
                </Badge>
                <DialogTitle className="text-3xl md:text-4xl font-bold text-white mt-2 drop-shadow-md">
                  {currentPlace.name}
                </DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{currentPlace.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Best time: {currentPlace.bestTimeToVisit}</span>
              </div>
            </div>
          </DialogHeader>
          
          {/* User interaction buttons with loading states */}
          <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant={isVisited(getPlaceId(currentPlace, stateName)) ? "default" : "outline"} 
                  size="sm"
                  onClick={handleVisitedClick}
                  disabled={isVisitedLoading}
                  className={`gap-2 ${isVisited(getPlaceId(currentPlace, stateName)) ? 'bg-green-600 hover:bg-green-700' : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/20'}`}
                >
                  {isVisitedLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className={`w-4 h-4 ${isVisited(getPlaceId(currentPlace, stateName)) ? 'fill-white' : ''}`} />
                  )}
                  {isVisited(getPlaceId(currentPlace, stateName)) ? 'Visited' : 'Mark as Visited'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white shadow-lg" align="end">
                <div className="p-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">When did you visit?</h4>
                    <p className="text-sm text-muted-foreground">
                      Select the date you visited {currentPlace.name}
                    </p>
                  </div>
                  <CalendarComponent
                    mode="single"
                    selected={visitDate}
                    onSelect={setVisitDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                  <div className="flex justify-end gap-2 p-3 pt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCalendarOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => confirmVisited(visitDate)}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button 
              variant={isWishlisted(getPlaceId(currentPlace, stateName)) ? "default" : "outline"} 
              size="sm"
              onClick={handleWishlistClick}
              disabled={isWishlistLoading}
              className={`gap-2 ${isWishlisted(getPlaceId(currentPlace, stateName)) ? 'bg-pink-600 hover:bg-pink-700' : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/20'}`}
            >
              {isWishlistLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Heart className={`w-4 h-4 ${isWishlisted(getPlaceId(currentPlace, stateName)) ? 'fill-white' : ''}`} />
              )}
              {isWishlisted(getPlaceId(currentPlace, stateName)) ? 'In Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>
        </div>

        <Tabs 
          defaultValue="details" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="border-b px-6 pt-4">
            <TabsList className="w-full max-w-md grid grid-cols-3">
              <TabsTrigger value="details" className="text-base">Place Details</TabsTrigger>
              <TabsTrigger value="hotels" className="text-base">
                Nearby Hotels
                {currentPlace.hotels?.length > 0 && (
                  <Badge variant="outline" className="ml-2">
                    {currentPlace.hotels.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-base">
                Reviews
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto">
            <TabsContent value="details" className="p-6 h-full">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {currentPlace.description}
                </p>
              </div>

              <div className="mt-8">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(currentPlace.googleMapsUrl, "_blank")}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Google Maps
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="p-6 h-full">
              <PlaceReviews placeId={getPlaceId(currentPlace, stateName)} />
            </TabsContent>

            <TabsContent value="hotels" className="p-6 h-full">
              {currentPlace.hotels && currentPlace.hotels.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-primary">Top Hotels Near {currentPlace.name}</h3>
                    <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                      Best {currentPlace.hotels.length} options
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    {currentPlace.hotels.map((hotel, index) => (
                      <Card 
                        key={index} 
                        className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20 bg-card/50 backdrop-blur-sm"
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                  {hotel.name}
                                </h4>
                                <div className="flex items-center mt-2 space-x-2">
                                  <div className="flex">
                                    {renderStars(hotel.rating)}
                                  </div>
                                  <span className="text-sm font-medium text-muted-foreground">
                                    {hotel.rating.toFixed(1)}
                                  </span>
                                </div>
                              </div>
                              <Hotel className="w-6 h-6 text-primary/60 group-hover:text-primary transition-colors" />
                            </div>
                            <Button 
                              className="w-full bg-primary/90 hover:bg-primary transition-colors"
                              size="lg"
                              onClick={() => window.open(hotel.bookingUrl, "_blank")}
                            >
                              Book Now
                              <ExternalLink className="ml-2 w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Hotel className="w-20 h-20 mx-auto text-primary/20" />
                    <h3 className="mt-6 text-xl font-semibold text-primary">No hotels information available</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      We don't have hotel information for this location yet.
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>

        <div className="border-t p-4 flex justify-between items-center bg-muted/40">
          <Button
            variant="outline"
            size="lg"
            onClick={goToPreviousPlace}
            disabled={places.length <= 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <span className="text-sm font-medium">
            {currentPlaceIndex + 1} of {places.length}
          </span>
          <Button
            variant="outline"
            size="lg"
            onClick={goToNextPlace}
            disabled={places.length <= 1}
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
      
      {/* Review Dialog */}
      <ReviewDialog
        isOpen={isReviewDialogOpen}
        onClose={() => setIsReviewDialogOpen(false)}
        placeId={currentPlace ? getPlaceId(currentPlace, stateName) : ""}
        placeName={currentPlace ? currentPlace.name : ""}
      />
    </Dialog>
  );
};

export default StateDialog;