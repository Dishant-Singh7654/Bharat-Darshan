import { useState, useEffect } from "react";
import { useUserPlaces } from "@/contexts/UserPlacesContext";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  CheckCircle, 
  MapPin, 
  Calendar,
  Search,
  Trash2,
  Info,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { UserPlace } from "@/types/states";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { STATES_DATA } from "../pages/States";

const Dashboard = () => {
  const { userPlaces, removeFromVisited, removeFromWishlist, loading, refreshUserPlaces } = useUserPlaces();
  const [activeTab, setActiveTab] = useState("visited");
  const [searchQuery, setSearchQuery] = useState("");
  const [placeToDelete, setPlaceToDelete] = useState<UserPlace | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  // Function to calculate total number of tourist places across all states
  const getTotalPlaces = () => {
    return STATES_DATA.reduce((total, state) => total + state.touristPlaces.length, 0);
  };

  // Function to calculate progress percentage
  const calculateProgressPercentage = () => {
    const totalPlaces = getTotalPlaces();
    if (totalPlaces === 0) return 0;
    
    const visitedCount = userPlaces.visited.length;
    const percentage = (visitedCount / totalPlaces) * 100;
    return Math.round(percentage);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Alternative approach for older browsers
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
    // Refresh user places data
    refreshUserPlaces();
  }, []);

  const filteredVisited = userPlaces.visited.filter(
    (place) =>
      place.placeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredWishlist = userPlaces.wishlist.filter(
    (place) =>
      place.placeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemovePlace = async () => {
    if (!placeToDelete) return;

    setIsDeleting(true);
    try {
      if (activeTab === "visited") {
        await removeFromVisited(placeToDelete.placeId);
        toast({
          title: "Place removed",
          description: `${placeToDelete.placeName} has been removed from your visited places.`,
        });
      } else {
        await removeFromWishlist(placeToDelete.placeId);
        toast({
          title: "Place removed",
          description: `${placeToDelete.placeName} has been removed from your wishlist.`,
        });
      }

      setIsDeleteDialogOpen(false);
      setPlaceToDelete(null);
    } catch (error) {
      console.error("Failed to remove place:", error);
      toast({
        title: "An error occurred",
        description: "Could not remove the place. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteDialog = (place: UserPlace) => {
    setPlaceToDelete(place);
    setIsDeleteDialogOpen(true);
  };

  const EmptyState = ({ type }: { type: "visited" | "wishlist" }) => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      {type === "visited" ? (
        <>
          <CheckCircle className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-medium mb-2">No visited places yet</h3>
        </>
      ) : (
        <>
          <Heart className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
        </>
      )}
      <p className="text-muted-foreground max-w-md">
        {type === "visited"
          ? "Places you mark as visited will appear here. Explore the states to start tracking your travels."
          : "Start building your travel wishlist by exploring places you'd like to visit."}
      </p>
      <Button className="mt-6">
        <Link to="/states">Explore States</Link>
      </Button>
    </div>
  );

  const LoadingState = () => (
    <div className="space-y-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-video relative">
            <Skeleton className="h-full w-full" />
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Travel Dashboard</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Keep track of places you've visited and places you want to visit in the future.
            </p>
          </div>

          {/* Progress Bar for Visited Places */}
          {!loading && (
            <Card className="mb-8 p-6">
              <h3 className="text-xl font-semibold mb-3">Your Travel Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Places Visited</span>
                  <span className="font-medium">{userPlaces.visited.length} / {getTotalPlaces()}</span>
                </div>
                <Progress 
                  value={calculateProgressPercentage()} 
                  className="h-3" 
                />
                <p className="text-sm text-muted-foreground mt-2">
                  You've visited {calculateProgressPercentage()}% of India's cultural heritage destinations.
                </p>
              </div>
            </Card>
          )}

          <div className="relative mb-8">
            <Input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-lg py-6 pl-12"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>

          <Tabs defaultValue="visited" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8">
              <TabsTrigger value="visited" className="text-base">
                <CheckCircle className="w-4 h-4 mr-2" />
                Visited Places
                <Badge variant="outline" className="ml-2">
                  {loading ? "..." : userPlaces.visited.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="text-base">
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
                <Badge variant="outline" className="ml-2">
                  {loading ? "..." : userPlaces.wishlist.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="visited">
              {loading ? (
                <LoadingState />
              ) : filteredVisited.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVisited.map((place) => (
                    <Card key={place.placeId} className="overflow-hidden group hover:shadow-md">
                      <div className="aspect-video relative">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${place.imageUrl}')` }}
                        >
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                        </div>
                        <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                          <div className="flex justify-between">
                            <Badge variant="outline" className="bg-white/20 text-white border-transparent">
                              {place.stateName}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                                  <Info className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white">
                                <DropdownMenuItem 
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => openDeleteDialog(place)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <h3 className="text-xl font-bold mt-auto">{place.placeName}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{place.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Visited on {place.visitedDate ? format(new Date(place.visitedDate), 'PPP') : 'Unknown date'}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground/30 mb-4 mx-auto" />
                  <h3 className="text-xl font-medium mb-2">No matching places found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search query to find what you're looking for.
                  </p>
                </div>
              ) : (
                <EmptyState type="visited" />
              )}
            </TabsContent>

            <TabsContent value="wishlist">
              {loading ? (
                <LoadingState />
              ) : filteredWishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWishlist.map((place) => (
                    <Card key={place.placeId} className="overflow-hidden group hover:shadow-md">
                      <div className="aspect-video relative">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${place.imageUrl}')` }}
                        >
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                        </div>
                        <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                          <div className="flex justify-between">
                            <Badge variant="outline" className="bg-white/20 text-white border-transparent">
                              {place.stateName}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                                  <Info className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white">
                                <DropdownMenuItem 
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => openDeleteDialog(place)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <h3 className="text-xl font-bold mt-auto">{place.placeName}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{place.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Added on {format(new Date(place.addedOn), 'PPP')}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground/30 mb-4 mx-auto" />
                  <h3 className="text-xl font-medium mb-2">No matching places found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search query to find what you're looking for.
                  </p>
                </div>
              ) : (
                <EmptyState type="wishlist" />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Remove Place</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {placeToDelete?.placeName} from your {activeTab === "visited" ? "visited places" : "wishlist"}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isDeleting}>Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleRemovePlace} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                'Remove'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;