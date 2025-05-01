import { useState, useEffect } from "react";
import { getPlaceReviews, getUserReview } from "@/firebase/reviewsService";
import { PlaceReviews as PlaceReviewsType, Review } from "@/types/states";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Loader2, Edit } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ReviewDialog from "./ReviewDialog";
import { useUserPlaces } from "@/contexts/UserPlacesContext";

interface PlaceReviewsProps {
  placeId: string;
}

const PlaceReviews = ({ placeId }: PlaceReviewsProps) => {
  const [reviews, setReviews] = useState<PlaceReviewsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const { currentUser } = useAuth();
  const { userPlaces } = useUserPlaces();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const placeReviews = await getPlaceReviews(placeId);
        setReviews(placeReviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId, isReviewDialogOpen]);
  
  // Find the visited place to get the visited date
  const getVisitedDate = (userId: string) => {
    const visitedPlace = userPlaces.visited.find(place => place.placeId === placeId);
    return visitedPlace?.visitedDate;
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading reviews...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!reviews || reviews.reviews.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        <p>No reviews yet. Be the first to review this place!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold">Reviews</h3>
        <div className="ml-2 flex items-center">
          <div className="flex mr-1">
            {renderStars(reviews.averageRating || 0)}
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviews.averageRating?.toFixed(1) || "0"}) · {reviews.reviews.length} {reviews.reviews.length === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>

      {reviews.reviews.map((review, index) => {
        // Check if this review belongs to the current user
        const isCurrentUserReview = currentUser && review.userId === currentUser.uid;
        // Get the visited date for this user if available
        const visitedDate = isCurrentUserReview ? getVisitedDate(review.userId) : undefined;
        
        return (
          <Card key={index} className="mb-4 overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {review.userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{review.userName}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex mr-2">{renderStars(review.rating)}</div>
                        <span className="text-xs text-muted-foreground">
                          {visitedDate 
                            ? `Visited on ${format(new Date(visitedDate), "MMM d, yyyy")}` 
                            : `Reviewed on ${format(review.createdAt, "MMM d, yyyy")}`}
                        </span>
                      </div>
                    </div>
                    {isCurrentUserReview && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2" 
                        onClick={() => setIsReviewDialogOpen(true)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                  <p className="mt-2 text-sm">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {/* Review Dialog for editing */}
      <ReviewDialog
        isOpen={isReviewDialogOpen}
        onClose={() => setIsReviewDialogOpen(false)}
        placeId={placeId}
        placeName={reviews?.reviews[0]?.placeName || "this place"}
      />
    </div>
  );
}

export default PlaceReviews;