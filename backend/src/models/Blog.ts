import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  published: boolean;
  publishedAt?: Date;
  seoTitle?: string;
  seoDescription?: string;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, default: 'ExploreMyBharat Team' },
    published: { type: Boolean, default: true },
    publishedAt: Date,
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true },
);

export const Blog = mongoose.model<IBlog>('Blog', blogSchema);
