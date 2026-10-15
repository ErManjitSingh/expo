import mongoose, { Document, Schema } from 'mongoose';

export interface IPackage extends Document {
  title: string;
  slug: string;
  destination: mongoose.Types.ObjectId;
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
  featured: boolean;
  published: boolean;
  badge?: string;
  category?: string;
  hotelCategory?: string;
  mealPlan?: string;
  travelType?: string;
  seoTitle?: string;
  seoDescription?: string;
}

const packageSchema = new Schema<IPackage>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
    country: { type: String, default: 'India' },
    duration: { type: Number, required: true },
    nights: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    images: [String],
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    highlights: [String],
    itinerary: [{ day: Number, title: String, description: String }],
    inclusions: [String],
    exclusions: [String],
    hotels: [String],
    meals: { type: String, default: 'Breakfast' },
    transfers: { type: String, default: 'Airport / Station transfers' },
    activities: [String],
    faqs: [{ question: String, answer: String }],
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    badge: String,
    category: String,
    hotelCategory: String,
    mealPlan: String,
    travelType: String,
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true },
);

packageSchema.index({ price: 1, rating: -1, featured: -1 });

export const Package = mongoose.model<IPackage>('Package', packageSchema);
