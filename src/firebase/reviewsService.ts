import { db, auth } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  Timestamp,
  DocumentData,
  serverTimestamp
} from 'firebase/firestore';
import { PlaceReviews, Review } from '@/types/states';

// Create a reference to the reviews collection
const reviewsCollection = collection(db, 'reviews');
const usersCollection = collection(db, 'users');

// Helper to check if user is authenticated
const requireAuth = () => {
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('You must be logged in to manage reviews');
  }
  
  return user.uid;
};

// Add or update a review for a place
export const addReview = async (placeId: string, rating: number, comment: string): Promise<void> => {
  try {
    const userId = requireAuth();
    const userName = auth.currentUser?.displayName || 'Anonymous User';
    
    console.log(`Adding review for place ${placeId} by user ${userId}`);
    
    // Create the review object
    const review: Omit<Review, 'createdAt'> & { createdAt: Timestamp } = {
      userId,
      userName,
      rating,
      comment,
      createdAt: Timestamp.fromDate(new Date())
    };
    
    // Get the document reference for this place's reviews
    const placeReviewsRef = doc(reviewsCollection, placeId);
    
    // Check if the document exists
    const placeReviewsDoc = await getDoc(placeReviewsRef);
    
    if (!placeReviewsDoc.exists()) {
      // Create a new document for this place
      await setDoc(placeReviewsRef, {
        placeId,
        reviews: [review],
        averageRating: rating
      });
    } else {
      // Get existing reviews
      const data = placeReviewsDoc.data() as DocumentData;
      const reviews = data.reviews || [];
      
      // Check if user already has a review
      const existingReviewIndex = reviews.findIndex((r: any) => r.userId === userId);
      
      if (existingReviewIndex >= 0) {
        // Update existing review
        reviews[existingReviewIndex] = review;
      } else {
        // Add new review
        reviews.push(review);
      }
      
      // Calculate new average rating
      const totalRating = reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
      const averageRating = totalRating / reviews.length;
      
      // Update the document
      await updateDoc(placeReviewsRef, {
        reviews,
        averageRating
      });
    }
    
    // Also update the user's visited place to include their rating and review
    const userDocRef = doc(usersCollection, userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const places = userData.places || { visited: [], wishlist: [] };
      const visited = places.visited || [];
      
      // Find the place in the user's visited list
      const placeIndex = visited.findIndex((p: any) => p.placeId === placeId);
      
      if (placeIndex >= 0) {
        // Update the place with the rating and review
        visited[placeIndex] = {
          ...visited[placeIndex],
          userRating: rating,
          userReview: comment,
          reviewDate: Timestamp.fromDate(new Date())
        };
        
        // Update the user document
        await updateDoc(userDocRef, {
          'places.visited': visited
        });
      }
    }
    
    console.log('Review added successfully');
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Get all reviews for a place
export const getPlaceReviews = async (placeId: string): Promise<PlaceReviews | null> => {
  try {
    console.log(`Getting reviews for place ${placeId}`);
    
    const placeReviewsRef = doc(reviewsCollection, placeId);
    const placeReviewsDoc = await getDoc(placeReviewsRef);
    
    if (!placeReviewsDoc.exists()) {
      console.log('No reviews found for this place');
      return null;
    }
    
    const data = placeReviewsDoc.data() as DocumentData;
    
    // Convert Firestore timestamps to Date objects
    const reviews = data.reviews.map((review: any) => ({
      ...review,
      createdAt: review.createdAt?.toDate ? review.createdAt.toDate() : new Date()
    }));
    
    return {
      placeId,
      reviews,
      averageRating: data.averageRating
    };
  } catch (error) {
    console.error('Error getting place reviews:', error);
    return null;
  }
};

// Get user's review for a specific place
export const getUserReview = async (placeId: string): Promise<Review | null> => {
  try {
    if (!auth.currentUser) {
      return null;
    }
    
    const userId = auth.currentUser.uid;
    console.log(`Getting user ${userId} review for place ${placeId}`);
    
    const placeReviewsRef = doc(reviewsCollection, placeId);
    const placeReviewsDoc = await getDoc(placeReviewsRef);
    
    if (!placeReviewsDoc.exists()) {
      return null;
    }
    
    const data = placeReviewsDoc.data() as DocumentData;
    const reviews = data.reviews || [];
    
    const userReview = reviews.find((r: any) => r.userId === userId);
    
    if (!userReview) {
      return null;
    }
    
    return {
      ...userReview,
      createdAt: userReview.createdAt?.toDate ? userReview.createdAt.toDate() : new Date()
    };
  } catch (error) {
    console.error('Error getting user review:', error);
    return null;
  }
};