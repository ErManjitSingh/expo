import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  user?: mongoose.Types.ObjectId;
  type: 'package' | 'hotel' | 'cab' | 'activity';
  referenceId?: mongoose.Types.ObjectId;
  title: string;
  travelers: number;
  travelDate: Date;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes?: string;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: ['package', 'hotel', 'cab', 'activity'],
      required: true,
    },
    referenceId: Schema.Types.ObjectId,
    title: { type: String, required: true },
    travelers: { type: Number, default: 1 },
    travelDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    contactName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    notes: String,
  },
  { timestamps: true },
);

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
