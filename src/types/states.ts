export interface Hotel {
  name: string;
  rating: number;
  bookingUrl: string;
}

export interface TouristPlace {
  id: string;
  name: string;
  description: string;
  location: string;
  googleMapsUrl: string;
  bestTimeToVisit: string;
  imageUrl: string;
  hotels: Hotel[];
}

export interface StateInfo {
  name: string;
  capital: string;
  touristPlaces: TouristPlace[];
}

// User interaction types
export interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface PlaceReviews {
  placeId: string;
  reviews: Review[];
  averageRating?: number;
}

export interface UserPlace {
  placeId: string;
  placeName: string;
  stateId: string;
  stateName: string;
  imageUrl: string;
  location: string;
  visitedDate?: Date;
  addedOn: Date;
  userRating?: number;
  userReview?: string;
  reviewDate?: Date;
}

export interface UserPlacesCollection {
  visited: UserPlace[];
  wishlist: UserPlace[];
}