import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  slug: string;
  destination: mongoose.Types.ObjectId;
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
  published: boolean;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

const activitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    images: [String],
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    description: { type: String, required: true },
    highlights: [String],
    inclusions: [String],
    exclusions: [String],
    published: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true },
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
