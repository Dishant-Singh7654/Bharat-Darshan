import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { addReview, getUserReview } from "@/firebase/reviewsService";
import { Loader2 } from "lucide-react";

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  placeId: string;
  placeName: string;
}

const ReviewDialog = ({ isOpen, onClose, placeId, placeName }: ReviewDialogProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [existingReview, setExistingReview] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user already has a review for this place
    const checkExistingReview = async () => {
      const userReview = await getUserReview(placeId);
      if (userReview) {
        setRating(userReview.rating);
        setReview(userReview.comment);
        setExistingReview(true);
      } else {
        setRating(0);
        setReview("");
        setExistingReview(false);
      }
    };

    if (isOpen && placeId) {
      checkExistingReview();
    }
  }, [isOpen, placeId]);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await addReview(placeId, rating, review);
      toast({
        title: existingReview ? "Review updated" : "Review submitted",
        description: existingReview
          ? `Your review for ${placeName} has been updated.`
          : `Thank you for reviewing ${placeName}!`,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-8 h-8 cursor-pointer transition-all ${
            i < (hoveredRating || rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
          onMouseEnter={() => setHoveredRating(i + 1)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => setRating(i + 1)}
        />
      ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {existingReview ? "Update your review" : "Rate your experience"}
          </DialogTitle>
          <DialogDescription>
            {existingReview
              ? `Update your review for ${placeName}`
              : `Share your experience at ${placeName} with other travelers`}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex justify-center space-x-1 mb-6">{renderStars()}</div>

          <Textarea
            placeholder="Write your review here..."
            className="min-h-[120px]"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <DialogFooter className="flex flex-row justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {existingReview ? "Updating..." : "Submitting..."}
              </>
            ) : existingReview ? (
              "Update Review"
            ) : (
              "Submit Review"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;