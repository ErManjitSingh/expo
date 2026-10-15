import { Cab } from '../models/Cab';
import { Activity } from '../models/Activity';
import { Destination } from '../models/Destination';
import { Offer } from '../models/Offer';
import { Blog } from '../models/Blog';
import { FAQ } from '../models/FAQ';
import { Category } from '../models/Category';
import { Review } from '../models/Review';
import { Newsletter } from '../models/Newsletter';
import { Coupon } from '../models/Coupon';
import { Booking } from '../models/Booking';
import { User } from '../models/User';
import { Package } from '../models/Package';
import { Enquiry } from '../models/Enquiry';
import { Hotel } from '../models/Hotel';
import { asyncHandler } from '../utils/asyncHandler';
import { sendPaginated, sendSuccess } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { slugify } from '../utils/slugify';
import { AuthRequest } from '../middleware/auth';
import { searchFlights } from '../services/flightService';
import { searchTrains } from '../services/trainService';
import { searchBuses } from '../services/busService';
import { z } from 'zod';

export const listCabs = asyncHandler(async (_req, res) => {
  const items = await Cab.find({ published: true }).sort({ startingPrice: 1 });
  sendSuccess(res, items);
});

export const getCabBySlug = asyncHandler(async (req, res) => {
  const item = await Cab.findOne({ slug: req.params.slug });
  if (!item) throw new ApiError(404, 'Cab not found');
  sendSuccess(res, item);
});

export const createCab = asyncHandler(async (req, res) => {
  const data = { ...req.body, slug: req.body.slug || slugify(req.body.name) };
  sendSuccess(res, await Cab.create(data), 'Created', 201);
});

export const listActivities = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 12);
  const filter: Record<string, unknown> = { published: true };
  if (req.query.category) filter.category = String(req.query.category);
  if (req.query.destination) {
    const dest = await Destination.findOne({ slug: String(req.query.destination) });
    if (dest) filter.destination = dest._id;
  }
  const [items, total] = await Promise.all([
    Activity.find(filter)
      .populate('destination', 'name slug')
      .sort({ featured: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Activity.countDocuments(filter),
  ]);
  sendPaginated(res, items, { page, limit, total });
});

export const getActivityBySlug = asyncHandler(async (req, res) => {
  const item = await Activity.findOne({ slug: req.params.slug, published: true }).populate(
    'destination',
    'name slug',
  );
  if (!item) throw new ApiError(404, 'Activity not found');
  sendSuccess(res, item);
});

export const createActivity = asyncHandler(async (req, res) => {
  const data = { ...req.body, slug: req.body.slug || slugify(req.body.title) };
  sendSuccess(res, await Activity.create(data), 'Created', 201);
});

export const listOffers = asyncHandler(async (_req, res) => {
  const items = await Offer.find({ published: true }).sort({ order: 1, createdAt: -1 });
  sendSuccess(res, items);
});

export const createOffer = asyncHandler(async (req, res) => {
  const data = { ...req.body, slug: req.body.slug || slugify(req.body.title) };
  sendSuccess(res, await Offer.create(data), 'Created', 201);
});

export const updateOffer = asyncHandler(async (req, res) => {
  const updated = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) throw new ApiError(404, 'Offer not found');
  sendSuccess(res, updated);
});

export const deleteOffer = asyncHandler(async (req, res) => {
  await Offer.findByIdAndDelete(req.params.id);
  sendSuccess(res, null, 'Deleted');
});

export const listBlogs = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 9);
  const filter = { published: true };
  const [items, total] = await Promise.all([
    Blog.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Blog.countDocuments(filter),
  ]);
  sendPaginated(res, items, { page, limit, total });
});

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const item = await Blog.findOne({ slug: req.params.slug, published: true });
  if (!item) throw new ApiError(404, 'Blog not found');
  sendSuccess(res, item);
});

export const createBlog = asyncHandler(async (req, res) => {
  const data = {
    ...req.body,
    slug: req.body.slug || slugify(req.body.title),
    publishedAt: new Date(),
  };
  sendSuccess(res, await Blog.create(data), 'Created', 201);
});

export const updateBlog = asyncHandler(async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) throw new ApiError(404, 'Blog not found');
  sendSuccess(res, updated);
});

export const deleteBlog = asyncHandler(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  sendSuccess(res, null, 'Deleted');
});

export const listFaqs = asyncHandler(async (_req, res) => {
  sendSuccess(res, await FAQ.find({ published: true }).sort({ order: 1 }));
});

export const listCategories = asyncHandler(async (_req, res) => {
  sendSuccess(res, await Category.find({ published: true }).sort({ order: 1 }));
});

export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug, published: true });
  if (!category) throw new ApiError(404, 'Category not found');
  const packages = await Package.find({
    published: true,
    $or: [{ category: category.slug }, { travelType: category.slug }],
  })
    .populate('destination', 'name slug')
    .limit(24);
  sendSuccess(res, { category, packages });
});

export const listReviews = asyncHandler(async (req, res) => {
  const filter: Record<string, unknown> = { published: true };
  if (req.query.featured === 'true') filter.featured = true;
  sendSuccess(res, await Review.find(filter).sort({ createdAt: -1 }).limit(20));
});

export const subscribeNewsletter = asyncHandler(async (req, res) => {
  const email = z.string().email().parse(req.body.email);
  await Newsletter.findOneAndUpdate(
    { email },
    { email, active: true },
    { upsert: true, new: true },
  );
  sendSuccess(res, null, 'Subscribed successfully');
});

export const listCoupons = asyncHandler(async (_req, res) => {
  sendSuccess(res, await Coupon.find({ active: true }));
});

export const createBooking = asyncHandler(async (req: AuthRequest, res) => {
  const booking = await Booking.create({ ...req.body, user: req.user?._id, status: 'pending' });
  sendSuccess(
    res,
    booking,
    'Booking request received. Our team will confirm shortly.',
    201,
  );
});

export const myBookings = asyncHandler(async (req: AuthRequest, res) => {
  sendSuccess(res, await Booking.find({ user: req.user?._id }).sort({ createdAt: -1 }));
});

export const listBookings = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = 20;
  const [items, total] = await Promise.all([
    Booking.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Booking.countDocuments(),
  ]);
  sendPaginated(res, items, { page, limit, total });
});

export const toggleWishlist = asyncHandler(async (req: AuthRequest, res) => {
  const packageId = req.params.packageId;
  const user = await User.findById(req.user?._id);
  if (!user) throw new ApiError(404, 'User not found');
  const idx = user.wishlist.findIndex((id) => String(id) === packageId);
  if (idx >= 0) user.wishlist.splice(idx, 1);
  else user.wishlist.push(packageId as unknown as typeof user.wishlist[0]);
  await user.save();
  sendSuccess(res, user.wishlist, idx >= 0 ? 'Removed from wishlist' : 'Added to wishlist');
});

export const getWishlist = asyncHandler(async (req: AuthRequest, res) => {
  const user = await User.findById(req.user?._id).populate({
    path: 'wishlist',
    populate: { path: 'destination', select: 'name slug' },
  });
  sendSuccess(res, user?.wishlist || []);
});

export const adminStats = asyncHandler(async (_req, res) => {
  const [
    users,
    enquiries,
    bookings,
    packages,
    hotels,
    activities,
    blogs,
    revenueAgg,
  ] = await Promise.all([
    User.countDocuments(),
    Enquiry.countDocuments(),
    Booking.countDocuments(),
    Package.countDocuments(),
    Hotel.countDocuments(),
    Activity.countDocuments(),
    Blog.countDocuments(),
    Booking.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
  ]);

  sendSuccess(res, {
    users,
    enquiries,
    bookings,
    packages,
    hotels,
    activities,
    blogs,
    revenue: revenueAgg[0]?.total || 0,
  });
});

export const flightSearch = asyncHandler(async (req, res) => {
  try {
    const results = await searchFlights(req.body);
    sendSuccess(res, results);
  } catch (e) {
    throw new ApiError(503, e instanceof Error ? e.message : 'Flight service unavailable');
  }
});

export const trainSearch = asyncHandler(async (req, res) => {
  try {
    const results = await searchTrains(req.body);
    sendSuccess(res, results);
  } catch (e) {
    throw new ApiError(503, e instanceof Error ? e.message : 'Train service unavailable');
  }
});

export const busSearch = asyncHandler(async (req, res) => {
  try {
    const results = await searchBuses(req.body);
    sendSuccess(res, results);
  } catch (e) {
    throw new ApiError(503, e instanceof Error ? e.message : 'Bus service unavailable');
  }
});

export const listUsers = asyncHandler(async (_req, res) => {
  sendSuccess(res, await User.find().select('-password').sort({ createdAt: -1 }).limit(100));
});
