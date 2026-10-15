import mongoose, { Document, Schema } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  phone: string;
  email: string;
  travelDate?: Date;
  travelers?: number;
  destination?: string;
  budget?: number;
  message?: string;
  package?: mongoose.Types.ObjectId;
  type: 'package' | 'hotel' | 'cab' | 'activity' | 'general' | 'plan-trip';
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  user?: mongoose.Types.ObjectId;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    travelDate: Date,
    travelers: Number,
    destination: String,
    budget: Number,
    message: String,
    package: { type: Schema.Types.ObjectId, ref: 'Package' },
    type: {
      type: String,
      enum: ['package', 'hotel', 'cab', 'activity', 'general', 'plan-trip'],
      default: 'general',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'closed'],
      default: 'new',
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export const Enquiry = mongoose.model<IEnquiry>('Enquiry', enquirySchema);
