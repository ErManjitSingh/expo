import { Package, IPackage } from '../models/Package';
import { Destination } from '../models/Destination';
import { asyncHandler } from '../utils/asyncHandler';
import { sendPaginated, sendSuccess } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { slugify } from '../utils/slugify';
import { AuthRequest } from '../middleware/auth';

export const listPackages = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 12);
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = { published: true };

  if (req.query.destination) {
    const dest = await Destination.findOne({
      $or: [
        { slug: String(req.query.destination) },
        { name: new RegExp(String(req.query.destination), 'i') },
      ],
    });
    if (dest) filter.destination = dest._id;
  }

  if (req.query.duration) filter.duration = Number(req.query.duration);
  if (req.query.minDuration) {
    filter.duration = { ...(typeof filter.duration === 'object' && filter.duration ? filter.duration : {}), $gte: Number(req.query.minDuration) };
  }
  if (req.query.maxDuration) {
    filter.duration = {
      ...(typeof filter.duration === 'object' && filter.duration ? (filter.duration as object) : {}),
      $lte: Number(req.query.maxDuration),
    };
  }
  if (req.query.budget) filter.price = { $lte: Number(req.query.budget) };
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {
      ...(req.query.minPrice ? { $gte: Number(req.query.minPrice) } : {}),
      ...(req.query.maxPrice ? { $lte: Number(req.query.maxPrice) } : {}),
    };
  }
  if (req.query.hotelCategory) filter.hotelCategory = String(req.query.hotelCategory);
  if (req.query.mealPlan) filter.mealPlan = String(req.query.mealPlan);
  if (req.query.travelType) filter.travelType = String(req.query.travelType);
  if (req.query.category) filter.category = String(req.query.category);
  if (req.query.rating) filter.rating = { $gte: Number(req.query.rating) };
  if (req.query.featured === 'true') filter.featured = true;
  if (req.query.q) {
    filter.$or = [
      { title: new RegExp(String(req.query.q), 'i') },
      { shortDescription: new RegExp(String(req.query.q), 'i') },
    ];
  }

  let sort: Record<string, 1 | -1> = { featured: -1, rating: -1 };
  switch (String(req.query.sort || 'recommended')) {
    case 'price_asc':
      sort = { price: 1 };
      break;
    case 'price_desc':
      sort = { price: -1 };
      break;
    case 'rating':
      sort = { rating: -1 };
      break;
    case 'popular':
      sort = { reviewCount: -1 };
      break;
    default:
      break;
  }

  const [items, total] = await Promise.all([
    Package.find(filter)
      .populate('destination', 'name slug image')
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Package.countDocuments(filter),
  ]);

  sendPaginated(res, items, { page, limit, total });
});

export const getPackageBySlug = asyncHandler(async (req, res) => {
  const pkg = await Package.findOne({ slug: req.params.slug, published: true }).populate(
    'destination',
    'name slug image state',
  );
  if (!pkg) throw new ApiError(404, 'Package not found');
  sendSuccess(res, pkg);
});

export const createPackage = asyncHandler(async (req: AuthRequest, res) => {
  const data = { ...req.body };
  if (!data.slug) data.slug = slugify(data.title);
  const created = await Package.create(data);
  sendSuccess(res, created, 'Package created', 201);
});

export const updatePackage = asyncHandler(async (req, res) => {
  const updated = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new ApiError(404, 'Package not found');
  sendSuccess(res, updated, 'Package updated');
});

export const deletePackage = asyncHandler(async (req, res) => {
  const deleted = await Package.findByIdAndDelete(req.params.id);
  if (!deleted) throw new ApiError(404, 'Package not found');
  sendSuccess(res, null, 'Package deleted');
});

export const adminListPackages = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 20);
  const [items, total] = await Promise.all([
    Package.find()
      .populate('destination', 'name slug')
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Package.countDocuments(),
  ]);
  sendPaginated(res, items, { page, limit, total });
});
