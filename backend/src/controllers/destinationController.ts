import { Destination } from '../models/Destination';
import { Package } from '../models/Package';
import { Hotel } from '../models/Hotel';
import { Activity } from '../models/Activity';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { slugify } from '../utils/slugify';

export const listDestinations = asyncHandler(async (req, res) => {
  const filter: Record<string, unknown> = { published: true };
  if (req.query.featured === 'true') filter.featured = true;
  const items = await Destination.find(filter).sort({ featured: -1, name: 1 });
  sendSuccess(res, items);
});

export const getDestinationBySlug = asyncHandler(async (req, res) => {
  const destination = await Destination.findOne({
    slug: req.params.slug,
    published: true,
  });
  if (!destination) throw new ApiError(404, 'Destination not found');

  const [packages, hotels, activities] = await Promise.all([
    Package.find({ destination: destination._id, published: true }).limit(8),
    Hotel.find({ destination: destination._id, published: true }).limit(6),
    Activity.find({ destination: destination._id, published: true }).limit(6),
  ]);

  sendSuccess(res, { destination, packages, hotels, activities });
});

export const createDestination = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (!data.slug) data.slug = slugify(data.name);
  const created = await Destination.create(data);
  sendSuccess(res, created, 'Destination created', 201);
});

export const updateDestination = asyncHandler(async (req, res) => {
  const updated = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) throw new ApiError(404, 'Destination not found');
  sendSuccess(res, updated);
});

export const deleteDestination = asyncHandler(async (req, res) => {
  const deleted = await Destination.findByIdAndDelete(req.params.id);
  if (!deleted) throw new ApiError(404, 'Destination not found');
  sendSuccess(res, null, 'Deleted');
});
