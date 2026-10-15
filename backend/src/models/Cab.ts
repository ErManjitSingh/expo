import mongoose, { Document, Schema } from 'mongoose';

export interface ICab extends Document {
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
  published: boolean;
}

const cabSchema = new Schema<ICab>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    vehicleType: { type: String, required: true },
    image: { type: String, required: true },
    seats: { type: Number, required: true },
    luggage: { type: Number, default: 2 },
    ac: { type: Boolean, default: true },
    startingPrice: { type: Number, required: true },
    description: { type: String, required: true },
    features: [String],
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Cab = mongoose.model<ICab>('Cab', cabSchema);
