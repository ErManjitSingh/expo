import mongoose, { Document, Schema } from 'mongoose';

export interface IOffer extends Document {
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
  featured: boolean;
  published: boolean;
  order: number;
}

const offerSchema = new Schema<IOffer>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: String,
    description: { type: String, required: true },
    image: { type: String, required: true },
    destination: String,
    discountLabel: String,
    startingPrice: Number,
    ctaLabel: { type: String, default: 'View Packages' },
    ctaLink: { type: String, default: '/packages' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Offer = mongoose.model<IOffer>('Offer', offerSchema);
