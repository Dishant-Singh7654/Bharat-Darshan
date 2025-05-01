import React, { createContext, useContext, useState, useEffect } from "react";
import { UserPlace, UserPlacesCollection } from "@/types/states";
import { useAuth } from "@/contexts/AuthContext";
import * as userPlacesService from "@/firebase/userPlacesService";
import { useToast } from "@/components/ui/use-toast";

interface UserPlacesContextType {
  userPlaces: UserPlacesCollection;
  loading: boolean;
  addToVisited: (place: Omit<UserPlace, "addedOn" | "visitedDate">, visitedDate?: Date) => Promise<void>;
  addToWishlist: (place: Omit<UserPlace, "addedOn">) => Promise<void>;
  removeFromVisited: (placeId: string) => Promise<void>;
  removeFromWishlist: (placeId: string) => Promise<void>;
  isVisited: (placeId: string) => boolean;
  isWishlisted: (placeId: string) => boolean;
  moveFromWishlistToVisited: (placeId: string, visitedDate?: Date) => Promise<void>;
  refreshUserPlaces: () => Promise<void>;
}

const UserPlacesContext = createContext<UserPlacesContextType | undefined>(undefined);

export const UserPlacesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userPlaces, setUserPlaces] = useState<UserPlacesCollection>({
    visited: [],
    wishlist: []
  });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, currentUser } = useAuth();
  const { toast } = useToast();

  // Initialize user document when user logs in
  useEffect(() => {
    async function initializeUserDocument() {
      if (isAuthenticated && currentUser) {
        console.log("User authenticated, initializing document");
        try {
          await userPlacesService.initUserPlaces();
          console.log("User document initialized successfully");
        } catch (error) {
          console.error("Failed to initialize user document:", error);
        }
      }
    }
    
    initializeUserDocument();
  }, [isAuthenticated, currentUser]);

  const refreshUserPlaces = async () => {
    console.log("Refreshing user places, authenticated:", isAuthenticated);
    
    if (!isAuthenticated) {
      setUserPlaces({ visited: [], wishlist: [] });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("Before calling getUserPlaces");
      const places = await userPlacesService.getUserPlaces();
      console.log("After calling getUserPlaces, received places:", places);
      
      // Validate the shape of the data we got back
      if (!places || typeof places !== 'object') {
        console.error("Invalid places data received:", places);
        toast({
          title: "Error loading your places",
          description: "Invalid data format received from the server.",
          variant: "destructive"
        });
        setUserPlaces({ visited: [], wishlist: [] });
        return;
      }
      
      // Make sure the arrays exist, even if empty
      const safeVisited = Array.isArray(places.visited) ? places.visited : [];
      const safeWishlist = Array.isArray(places.wishlist) ? places.wishlist : [];
      
      setUserPlaces({ 
        visited: safeVisited, 
        wishlist: safeWishlist 
      });
      console.log("UserPlaces state updated successfully");
    } catch (error) {
      console.error("Failed to fetch user places:", error);
      // Get more details about the error
      let errorMessage = "There was a problem loading your visited and wishlist places.";
      if (error instanceof Error) {
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        
        if (error.message.includes("permission") || error.message.includes("unauthorized")) {
          errorMessage = "You don't have permission to access these places.";
        } else if (error.message.includes("logged in")) {
          errorMessage = "You need to be logged in to view your places.";
        }
      }
      
      toast({
        title: "Error loading your places",
        description: errorMessage,
        variant: "destructive"
      });
      // Fallback to empty state
      setUserPlaces({ visited: [], wishlist: [] });
    } finally {
      setLoading(false);
    }
  };

  // Load data from Firebase when auth state changes
  useEffect(() => {
    console.log("Auth state changed, authenticated:", isAuthenticated);
    refreshUserPlaces();
  }, [isAuthenticated, currentUser?.uid]);

  const addToVisited = async (
    place: Omit<UserPlace, "addedOn" | "visitedDate">, 
    visitedDate: Date = new Date()
  ) => {
    try {
      await userPlacesService.addToVisited(place, visitedDate);
      
      // Show success toast
      toast({
        title: "Place added to visited",
        description: `${place.placeName} has been added to your visited places.`,
        variant: "default"
      });
      
      await refreshUserPlaces();
    } catch (error) {
      console.error("Failed to add place to visited:", error);
      toast({
        title: "Failed to add place",
        description: "Could not add the place to your visited list. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addToWishlist = async (place: Omit<UserPlace, "addedOn">) => {
    try {
      await userPlacesService.addToWishlist(place);
      
      // Show success toast
      toast({
        title: "Place added to wishlist",
        description: `${place.placeName} has been added to your wishlist.`,
        variant: "default"
      });
      
      await refreshUserPlaces();
    } catch (error) {
      console.error("Failed to add place to wishlist:", error);
      toast({
        title: "Failed to add place",
        description: "Could not add the place to your wishlist. Please try again.",
        variant: "destructive"
      });
    }
  };

  const removeFromVisited = async (placeId: string) => {
    try {
      await userPlacesService.removeFromVisited(placeId);
      
      // Show success toast
      const placeName = userPlaces.visited.find(p => p.placeId === placeId)?.placeName || "Place";
      toast({
        title: "Place removed",
        description: `${placeName} has been removed from your visited places.`,
        variant: "default"
      });
      
      await refreshUserPlaces();
    } catch (error) {
      console.error("Failed to remove place from visited:", error);
      toast({
        title: "Failed to remove place",
        description: "Could not remove the place from your visited list. Please try again.",
        variant: "destructive"
      });
    }
  };

  const removeFromWishlist = async (placeId: string) => {
    try {
      await userPlacesService.removeFromWishlist(placeId);
      
      // Show success toast
      const placeName = userPlaces.wishlist.find(p => p.placeId === placeId)?.placeName || "Place";
      toast({
        title: "Place removed",
        description: `${placeName} has been removed from your wishlist.`,
        variant: "default"
      });
      
      await refreshUserPlaces();
    } catch (error) {
      console.error("Failed to remove place from wishlist:", error);
      toast({
        title: "Failed to remove place",
        description: "Could not remove the place from your wishlist. Please try again.",
        variant: "destructive"
      });
    }
  };

  const isVisited = (placeId: string) => {
    return userPlaces.visited.some(place => place.placeId === placeId);
  };

  const isWishlisted = (placeId: string) => {
    return userPlaces.wishlist.some(place => place.placeId === placeId);
  };

  const moveFromWishlistToVisited = async (placeId: string, visitedDate: Date = new Date()) => {
    try {
      await userPlacesService.moveFromWishlistToVisited(placeId, visitedDate);
      
      // Show success toast
      const placeName = userPlaces.wishlist.find(p => p.placeId === placeId)?.placeName || "Place";
      toast({
        title: "Place moved to visited",
        description: `${placeName} has been moved to your visited places.`,
        variant: "default"
      });
      
      await refreshUserPlaces();
    } catch (error) {
      console.error("Failed to move place from wishlist to visited:", error);
      toast({
        title: "Failed to move place",
        description: "Could not move the place to your visited list. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <UserPlacesContext.Provider
      value={{
        userPlaces,
        loading,
        addToVisited,
        addToWishlist,
        removeFromVisited,
        removeFromWishlist,
        isVisited,
        isWishlisted,
        moveFromWishlistToVisited,
        refreshUserPlaces
      }}
    >
      {children}
    </UserPlacesContext.Provider>
  );
};

export const useUserPlaces = () => {
  const context = useContext(UserPlacesContext);
  if (!context) {
    throw new Error("useUserPlaces must be used within a UserPlacesProvider");
  }
  return context;
}; 