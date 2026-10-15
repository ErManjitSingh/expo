import mongoose, { Document, Schema } from 'mongoose';

/** Room kept as standalone for future hotel inventory expansion. */
export interface IRoom extends Document {
  hotel: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  maxGuests: number;
  price: number;
  amenities: string[];
  images: string[];
  available: boolean;
}

const roomSchema = new Schema<IRoom>(
  {
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    name: { type: String, required: true },
    description: String,
    maxGuests: { type: Number, default: 2 },
    price: { type: Number, required: true },
    amenities: [String],
    images: [String],
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Room = mongoose.model<IRoom>('Room', roomSchema);
