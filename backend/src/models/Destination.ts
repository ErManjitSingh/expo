import mongoose, { Document, Schema } from 'mongoose';

export interface IDestination extends Document {
  name: string;
  slug: string;
  state?: string;
  region?: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  bestTimeToVisit?: string;
  topAttractions: string[];
  travelTips: string[];
  packageCount: number;
  startingPrice: number;
  featured: boolean;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  faqs: { question: string; answer: string }[];
}

const destinationSchema = new Schema<IDestination>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    state: String,
    region: String,
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    gallery: [String],
    bestTimeToVisit: String,
    topAttractions: [String],
    travelTips: [String],
    packageCount: { type: Number, default: 0 },
    startingPrice: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    seoTitle: String,
    seoDescription: String,
    faqs: [{ question: String, answer: String }],
  },
  { timestamps: true },
);

export const Destination = mongoose.model<IDestination>('Destination', destinationSchema);
