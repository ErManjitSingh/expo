export type UserRole = 'customer' | 'admin' | 'manager' | 'agent';

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  wishlist?: string[];
}

export interface Destination {
  _id: string;
  name: string;
  slug: string;
  state?: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery?: string[];
  bestTimeToVisit?: string;
  topAttractions?: string[];
  travelTips?: string[];
  packageCount: number;
  startingPrice: number;
  featured?: boolean;
  faqs?: { question: string; answer: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface TravelPackage {
  _id: string;
  title: string;
  slug: string;
  destination: Destination | string;
  country: string;
  duration: number;
  nights: number;
  price: number;
  discount: number;
  images: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  hotels: string[];
  meals: string;
  transfers: string;
  activities: string[];
  faqs: { question: string; answer: string }[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  badge?: string;
  category?: string;
  hotelCategory?: string;
  mealPlan?: string;
  travelType?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Hotel {
  _id: string;
  name: string;
  slug: string;
  destination: Destination | string;
  location: string;
  description: string;
  images: string[];
  starRating: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  propertyType: string;
  mealPlan?: string;
  pricePerNight: number;
  taxes: number;
  discount: number;
  rooms: { name: string; maxGuests: number; price: number; amenities: string[] }[];
  policies: string[];
  featured?: boolean;
}

export interface Cab {
  _id: string;
  name: string;
  slug: string;
  vehicleType: string;
  image: string;
  seats: number;
  luggage: number;
  ac: boolean;
  startingPrice: number;
  description: string;
  features: string[];
}

export interface Activity {
  _id: string;
  title: string;
  slug: string;
  destination: Destination | string;
  location: string;
  category: string;
  image: string;
  images: string[];
  duration: string;
  price: number;
  discount: number;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
}

export interface Offer {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  image: string;
  destination?: string;
  discountLabel?: string;
  startingPrice?: number;
  ctaLabel: string;
  ctaLink: string;
  featured?: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt?: string;
  createdAt?: string;
}

export interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Review {
  _id: string;
  name: string;
  city?: string;
  avatar?: string;
  rating: number;
  comment: string;
  tripName?: string;
}

export interface Paginated<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
