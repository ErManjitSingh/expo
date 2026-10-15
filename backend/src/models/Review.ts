import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  user?: mongoose.Types.ObjectId;
  name: string;
  city?: string;
  avatar?: string;
  rating: number;
  comment: string;
  tripName?: string;
  package?: mongoose.Types.ObjectId;
  hotel?: mongoose.Types.ObjectId;
  activity?: mongoose.Types.ObjectId;
  published: boolean;
  featured: boolean;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    city: String,
    avatar: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    tripName: String,
    package: { type: Schema.Types.ObjectId, ref: 'Package' },
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel' },
    activity: { type: Schema.Types.ObjectId, ref: 'Activity' },
    published: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Review = mongoose.model<IReview>('Review', reviewSchema);
