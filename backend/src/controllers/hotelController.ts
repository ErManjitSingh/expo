import { Hotel } from '../models/Hotel';
import { Destination } from '../models/Destination';
import { asyncHandler } from '../utils/asyncHandler';
import { sendPaginated, sendSuccess } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { slugify } from '../utils/slugify';

export const listHotels = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 12);
  const filter: Record<string, unknown> = { published: true };

  if (req.query.destination) {
    const dest = await Destination.findOne({ slug: String(req.query.destination) });
    if (dest) filter.destination = dest._id;
  }
  if (req.query.starRating) filter.starRating = { $gte: Number(req.query.starRating) };
  if (req.query.maxPrice) filter.pricePerNight = { $lte: Number(req.query.maxPrice) };
  if (req.query.propertyType) filter.propertyType = String(req.query.propertyType);
  if (req.query.featured === 'true') filter.featured = true;

  const [items, total] = await Promise.all([
    Hotel.find(filter)
      .populate('destination', 'name slug')
      .sort({ featured: -1, rating: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Hotel.countDocuments(filter),
  ]);
  sendPaginated(res, items, { page, limit, total });
});

export const getHotelBySlug = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findOne({ slug: req.params.slug, published: true }).populate(
    'destination',
    'name slug',
  );
  if (!hotel) throw new ApiError(404, 'Hotel not found');
  sendSuccess(res, hotel);
});

export const createHotel = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (!data.slug) data.slug = slugify(data.name);
  const created = await Hotel.create(data);
  sendSuccess(res, created, 'Hotel created', 201);
});

export const updateHotel = asyncHandler(async (req, res) => {
  const updated = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) throw new ApiError(404, 'Hotel not found');
  sendSuccess(res, updated);
});

export const deleteHotel = asyncHandler(async (req, res) => {
  const deleted = await Hotel.findByIdAndDelete(req.params.id);
  if (!deleted) throw new ApiError(404, 'Hotel not found');
  sendSuccess(res, null, 'Deleted');
});
