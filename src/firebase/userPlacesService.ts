import { db, auth } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  DocumentData,
  Timestamp
} from 'firebase/firestore';
import { UserPlace, UserPlacesCollection } from '@/types/states';

// Create a reference to the users collection
const usersCollection = collection(db, 'users');

// Local storage keys
const LS_VISITED_KEY = 'india_heritage_visited_places';
const LS_WISHLIST_KEY = 'india_heritage_wishlist_places';

// Helper for working with localStorage
const localStorageUtils = {
  getVisitedPlaces: (): UserPlace[] => {
    try {
      const stored = localStorage.getItem(LS_VISITED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading visited places from localStorage:', error);
      return [];
    }
  },
  
  getWishlistPlaces: (): UserPlace[] => {
    try {
      const stored = localStorage.getItem(LS_WISHLIST_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading wishlist places from localStorage:', error);
      return [];
    }
  },
  
  saveVisitedPlaces: (places: UserPlace[]) => {
    try {
      localStorage.setItem(LS_VISITED_KEY, JSON.stringify(places));
    } catch (error) {
      console.error('Error saving visited places to localStorage:', error);
    }
  },
  
  saveWishlistPlaces: (places: UserPlace[]) => {
    try {
      localStorage.setItem(LS_WISHLIST_KEY, JSON.stringify(places));
    } catch (error) {
      console.error('Error saving wishlist places to localStorage:', error);
    }
  }
};

// Helper to check if user is authenticated
const requireAuth = () => {
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('You must be logged in to manage places');
  }
  
  return user.uid;
};

// Initialize user places document in Firestore
export const initUserPlaces = async (): Promise<void> => {
  try {
    const userId = requireAuth();
    console.log("Initializing user places for user:", userId);
    
    const userDocRef = doc(usersCollection, userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      console.log("User document doesn't exist, creating it...");
      await setDoc(userDocRef, {
        places: {
          visited: [],
          wishlist: []
        }
      });
      console.log("User document created successfully");
    } else if (!userDoc.data().places) {
      console.log("User document exists but has no places field, adding it...");
      await updateDoc(userDocRef, {
        places: {
          visited: [],
          wishlist: []
        }
      });
      console.log("Places field added successfully");
    } else {
      console.log("User document already initialized");
    }
  } catch (error) {
    console.error('Error initializing user places:', error);
    // Don't throw here, we'll fall back to localStorage
  }
};

// Get user places from Firestore with fallback to localStorage
export const getUserPlaces = async (): Promise<UserPlacesCollection> => {
  try {
    if (!auth.currentUser) {
      console.log("No user logged in, returning empty collections");
      return { visited: [], wishlist: [] };
    }
    
    const userId = auth.currentUser.uid;
    console.log("Getting places for user:", userId);
    
    // Try to initialize user document
    try {
      await initUserPlaces();
    } catch (error) {
      console.warn("Could not initialize user document, will try to read anyway:", error);
    }
    
    try {
      const userDocRef = doc(usersCollection, userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        console.log("User document doesn't exist, falling back to localStorage");
        return {
          visited: localStorageUtils.getVisitedPlaces(),
          wishlist: localStorageUtils.getWishlistPlaces()
        };
      }
      
      const userData = userDoc.data();
      console.log("Retrieved user data:", userData);
      
      // Add safety check for places
      if (!userData || !userData.places) {
        console.log("Places field is missing in user document, falling back to localStorage");
        return {
          visited: localStorageUtils.getVisitedPlaces(),
          wishlist: localStorageUtils.getWishlistPlaces()
        };
      }
      
      const places = userData.places;
      
      console.log("Raw places data:", places);
      console.log("Visited array type:", Array.isArray(places.visited) ? "Array" : typeof places.visited);
      console.log("Wishlist array type:", Array.isArray(places.wishlist) ? "Array" : typeof places.wishlist);
      
      // Convert Firestore timestamps to Date objects - with additional error handling
      const visited = Array.isArray(places.visited) 
        ? places.visited.map((place: any) => {
            console.log("Processing visited place:", place);
            try {
              return {
                ...place,
                addedOn: place.addedOn?.toDate ? place.addedOn.toDate() : new Date(),
                visitedDate: place.visitedDate?.toDate ? place.visitedDate.toDate() : undefined
              };
            } catch (error) {
              console.error("Error processing visited place:", error, place);
              // Return a safe fallback
              return {
                ...place,
                addedOn: new Date(),
                visitedDate: undefined
              };
            }
          })
        : [];
      
      const wishlist = Array.isArray(places.wishlist)
        ? places.wishlist.map((place: any) => {
            console.log("Processing wishlist place:", place);
            try {
              return {
                ...place,
                addedOn: place.addedOn?.toDate ? place.addedOn.toDate() : new Date()
              };
            } catch (error) {
              console.error("Error processing wishlist place:", error, place);
              // Return a safe fallback
              return {
                ...place,
                addedOn: new Date()
              };
            }
          })
        : [];
      
      // Also save to localStorage as backup
      localStorageUtils.saveVisitedPlaces(visited);
      localStorageUtils.saveWishlistPlaces(wishlist);
      
      console.log("Processed places:", { visited, wishlist });
      return { visited, wishlist };
      
    } catch (firestoreError) {
      console.error('Error reading from Firestore, falling back to localStorage:', firestoreError);
      // If Firestore fails for any reason, fall back to localStorage
      return {
        visited: localStorageUtils.getVisitedPlaces(),
        wishlist: localStorageUtils.getWishlistPlaces()
      };
    }
  } catch (error) {
    console.error('Error getting user places:', error);
    // Fallback to localStorage even for general errors
    return {
      visited: localStorageUtils.getVisitedPlaces(),
      wishlist: localStorageUtils.getWishlistPlaces()
    };
  }
};

// Add place to visited list
export const addToVisited = async (place: Omit<UserPlace, "addedOn" | "visitedDate">, visitedDate = new Date()): Promise<void> => {
  try {
    // Try to update Firestore first
    try {
      const userId = requireAuth();
      console.log("Adding place to visited for user:", userId, place);
      
      // Make sure user document exists first
      await initUserPlaces();
      
      const userDocRef = doc(usersCollection, userId);
      
      // First check if the document exists
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document doesn't exist, creating it first");
        await setDoc(userDocRef, {
          places: {
            visited: [],
            wishlist: []
          }
        });
      }
      
      // Remove from wishlist if it exists there
      await removeFromWishlist(place.placeId);
      
      // Check if already in visited list
      const userPlaces = await getUserPlaces();
      const alreadyVisited = userPlaces.visited.some(p => p.placeId === place.placeId);
      
      if (alreadyVisited) {
        console.log("Place already in visited list, skipping");
        return;
      }
      
      // Add to visited - Convert dates to Firestore Timestamps
      const newPlace = {
        ...place,
        visitedDate: Timestamp.fromDate(visitedDate),
        addedOn: Timestamp.fromDate(new Date())
      };
      
      console.log("Adding place to visited with data:", newPlace);
      
      // Use setDoc with merge to ensure the document exists
      const placesData = {
        places: {
          visited: [...(userPlaces.visited || []), newPlace]
        }
      };
      
      await setDoc(userDocRef, placesData, { merge: true });
      console.log("Successfully added place to visited");
      
      // Also update localStorage
      localStorageUtils.saveVisitedPlaces([...userPlaces.visited, {
        ...place,
        visitedDate,
        addedOn: new Date()
      }]);
    } catch (firestoreError) {
      console.error('Error adding to Firestore, using localStorage fallback:', firestoreError);
      
      // Fallback to localStorage
      const visited = localStorageUtils.getVisitedPlaces();
      const alreadyVisited = visited.some(p => p.placeId === place.placeId);
      
      if (!alreadyVisited) {
        const newPlace: UserPlace = {
          ...place,
          visitedDate,
          addedOn: new Date()
        };
        
        visited.push(newPlace);
        localStorageUtils.saveVisitedPlaces(visited);
        
        // Also remove from wishlist in localStorage
        const wishlist = localStorageUtils.getWishlistPlaces();
        const filteredWishlist = wishlist.filter(p => p.placeId !== place.placeId);
        localStorageUtils.saveWishlistPlaces(filteredWishlist);
      }
    }
  } catch (error) {
    console.error('Error adding to visited:', error);
  }
};

// Add place to wishlist with localStorage fallback
export const addToWishlist = async (place: Omit<UserPlace, "addedOn">): Promise<void> => {
  try {
    // Try Firestore first
    try {
      const userId = requireAuth();
      console.log("Adding place to wishlist for user:", userId, place);
      
      // Make sure user document exists first
      await initUserPlaces();
      
      const userDocRef = doc(usersCollection, userId);
      
      // First check if the document exists
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document doesn't exist, creating it first");
        await setDoc(userDocRef, {
          places: {
            visited: [],
            wishlist: []
          }
        });
      }
      
      // Check if already in wishlist or visited
      const userPlaces = await getUserPlaces();
      const alreadyWishlisted = userPlaces.wishlist.some(p => p.placeId === place.placeId);
      const isVisited = userPlaces.visited.some(p => p.placeId === place.placeId);
      
      if (alreadyWishlisted || isVisited) {
        console.log("Place already in wishlist or visited, skipping");
        return;
      }
      
      // Add to wishlist - Convert date to Firestore Timestamp
      const newPlace = {
        ...place,
        addedOn: Timestamp.fromDate(new Date())
      };
      
      console.log("Adding place to wishlist with data:", newPlace);
      
      // Use setDoc with merge to ensure the document exists and preserve existing data
      const placesData = {
        places: {
          visited: userPlaces.visited,
          wishlist: [...userPlaces.wishlist, newPlace]
        }
      };
      
      await setDoc(userDocRef, placesData, { merge: true });
      console.log("Successfully added place to wishlist");
      
      // Also update localStorage
      localStorageUtils.saveWishlistPlaces([...userPlaces.wishlist, {
        ...place,
        addedOn: new Date()
      }]);
    } catch (firestoreError) {
      console.error('Error adding to Firestore wishlist, using localStorage fallback:', firestoreError);
      
      // Fallback to localStorage
      const wishlist = localStorageUtils.getWishlistPlaces();
      const visited = localStorageUtils.getVisitedPlaces();
      
      const alreadyWishlisted = wishlist.some(p => p.placeId === place.placeId);
      const isVisited = visited.some(p => p.placeId === place.placeId);
      
      if (!alreadyWishlisted && !isVisited) {
        const newPlace: UserPlace = {
          ...place,
          addedOn: new Date()
        };
        
        wishlist.push(newPlace);
        localStorageUtils.saveWishlistPlaces(wishlist);
      }
    }
  } catch (error) {
    console.error('Error adding to wishlist:', error);
  }
};

// Remove place from visited list
export const removeFromVisited = async (placeId: string): Promise<void> => {
  try {
    // Try Firestore first
    try {
      const userId = requireAuth();
      console.log("Removing place from visited for user:", userId, placeId);
      
      const userDocRef = doc(usersCollection, userId);
      
      // Get current places
      const userPlaces = await getUserPlaces();
      const placeToRemove = userPlaces.visited.find(p => p.placeId === placeId);
      
      if (!placeToRemove) {
        console.log("Place not found in visited list, nothing to remove");
        return;
      }
      
      // Filter out the place to remove
      const updatedVisited = userPlaces.visited.filter(p => p.placeId !== placeId);
      console.log("Removing place from visited, updated list:", updatedVisited);
      
      // Update with setDoc merge to ensure the document exists
      const placesData = {
        places: {
          visited: updatedVisited,
          // Preserve wishlist
          wishlist: userPlaces.wishlist
        }
      };
      
      await setDoc(userDocRef, placesData, { merge: true });
      console.log("Successfully removed place from visited");
      
      // Also update localStorage
      localStorageUtils.saveVisitedPlaces(updatedVisited);
    } catch (firestoreError) {
      console.error('Error removing from Firestore, using localStorage fallback:', firestoreError);
      
      // Fallback to localStorage
      const visited = localStorageUtils.getVisitedPlaces();
      const updatedVisited = visited.filter(p => p.placeId !== placeId);
      localStorageUtils.saveVisitedPlaces(updatedVisited);
    }
  } catch (error) {
    console.error('Error removing from visited:', error);
  }
};

// Remove place from wishlist
export const removeFromWishlist = async (placeId: string): Promise<void> => {
  try {
    // Try Firestore first
    try {
      const userId = requireAuth();
      console.log("Removing place from wishlist for user:", userId, placeId);
      
      const userDocRef = doc(usersCollection, userId);
      
      // Get current places
      const userPlaces = await getUserPlaces();
      const placeToRemove = userPlaces.wishlist.find(p => p.placeId === placeId);
      
      if (!placeToRemove) {
        console.log("Place not found in wishlist, nothing to remove");
        return;
      }
      
      // Filter out the place to remove
      const updatedWishlist = userPlaces.wishlist.filter(p => p.placeId !== placeId);
      console.log("Removing place from wishlist, updated list:", updatedWishlist);
      
      // Update with setDoc merge to ensure the document exists
      const placesData = {
        places: {
          // Preserve visited
          visited: userPlaces.visited,
          wishlist: updatedWishlist
        }
      };
      
      await setDoc(userDocRef, placesData, { merge: true });
      console.log("Successfully removed place from wishlist");
      
      // Also update localStorage
      localStorageUtils.saveWishlistPlaces(updatedWishlist);
    } catch (firestoreError) {
      console.error('Error removing from Firestore, using localStorage fallback:', firestoreError);
      
      // Fallback to localStorage
      const wishlist = localStorageUtils.getWishlistPlaces();
      const updatedWishlist = wishlist.filter(p => p.placeId !== placeId);
      localStorageUtils.saveWishlistPlaces(updatedWishlist);
    }
  } catch (error) {
    console.error('Error removing from wishlist:', error);
  }
};

// Move place from wishlist to visited
export const moveFromWishlistToVisited = async (placeId: string, visitedDate = new Date()): Promise<void> => {
  try {
    // Try Firestore first
    try {
      const userId = requireAuth();
      console.log("Moving place from wishlist to visited for user:", userId, placeId);
      
      // Make sure user document exists first
      await initUserPlaces();
      
      const userDocRef = doc(usersCollection, userId);
      
      // Get current places
      const userPlaces = await getUserPlaces();
      const placeToMove = userPlaces.wishlist.find(p => p.placeId === placeId);
      
      if (!placeToMove) {
        console.log("Place not found in wishlist, nothing to move");
        return;
      }
      
      // Remove from wishlist
      const updatedWishlist = userPlaces.wishlist.filter(p => p.placeId !== placeId);
      
      // Add to visited with updated dates
      const visitedPlace = {
        ...placeToMove,
        visitedDate: Timestamp.fromDate(visitedDate),
        addedOn: Timestamp.fromDate(new Date())
      };
      
      const updatedVisited = [...userPlaces.visited, visitedPlace];
      console.log("Moving place to visited, updated data:", {
        wishlist: updatedWishlist,
        visited: updatedVisited
      });
      
      // Update with setDoc merge to ensure the document exists
      const placesData = {
        places: {
          visited: updatedVisited,
          wishlist: updatedWishlist
        }
      };
      
      await setDoc(userDocRef, placesData, { merge: true });
      console.log("Successfully moved place from wishlist to visited");
      
      // Also update localStorage
      localStorageUtils.saveVisitedPlaces([...userPlaces.visited, {
        ...placeToMove,
        visitedDate,
        addedOn: new Date()
      }]);
      localStorageUtils.saveWishlistPlaces(updatedWishlist);
    } catch (firestoreError) {
      console.error('Error moving in Firestore, using localStorage fallback:', firestoreError);
      
      // Fallback to localStorage
      const wishlist = localStorageUtils.getWishlistPlaces();
      const visited = localStorageUtils.getVisitedPlaces();
      
      const placeToMove = wishlist.find(p => p.placeId === placeId);
      if (placeToMove) {
        // Remove from wishlist
        const updatedWishlist = wishlist.filter(p => p.placeId !== placeId);
        localStorageUtils.saveWishlistPlaces(updatedWishlist);
        
        // Add to visited
        const visitedPlace: UserPlace = {
          ...placeToMove,
          visitedDate,
          addedOn: new Date()
        };
        
        visited.push(visitedPlace);
        localStorageUtils.saveVisitedPlaces(visited);
      }
    }
  } catch (error) {
    console.error('Error moving from wishlist to visited:', error);
  }
}; 