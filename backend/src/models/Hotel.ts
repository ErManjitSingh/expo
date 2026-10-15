import mongoose, { Document, Schema } from 'mongoose';

export interface IHotel extends Document {
  name: string;
  slug: string;
  destination: mongoose.Types.ObjectId;
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
  rooms: {
    name: string;
    description?: string;
    maxGuests: number;
    price: number;
    amenities: string[];
  }[];
  policies: string[];
  featured: boolean;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

const hotelSchema = new Schema<IHotel>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    images: [String],
    starRating: { type: Number, default: 3 },
    rating: { type: Number, default: 4.2 },
    reviewCount: { type: Number, default: 0 },
    amenities: [String],
    propertyType: { type: String, default: 'Hotel' },
    mealPlan: String,
    pricePerNight: { type: Number, required: true },
    taxes: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    rooms: [
      {
        name: String,
        description: String,
        maxGuests: Number,
        price: Number,
        amenities: [String],
      },
    ],
    policies: [String],
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true },
);

export const Hotel = mongoose.model<IHotel>('Hotel', hotelSchema);
