import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  description: string;
  discountType: 'percent' | 'flat';
  discountValue: number;
  minAmount?: number;
  maxUses?: number;
  usedCount: number;
  expiresAt?: Date;
  active: boolean;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String, required: true },
    discountType: { type: String, enum: ['percent', 'flat'], required: true },
    discountValue: { type: Number, required: true },
    minAmount: Number,
    maxUses: Number,
    usedCount: { type: Number, default: 0 },
    expiresAt: Date,
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Coupon = mongoose.model<ICoupon>('Coupon', couponSchema);
