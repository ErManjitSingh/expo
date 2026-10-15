import { z } from 'zod';
import { Enquiry } from '../models/Enquiry';
import { asyncHandler } from '../utils/asyncHandler';
import { sendPaginated, sendSuccess } from '../utils/ApiResponse';
import { validate } from '../middleware/validate';
import { notifyEnquiryEmail } from '../services/emailService';
import { notifyEnquiryWhatsApp } from '../services/whatsappService';
import { AuthRequest } from '../middleware/auth';
import { ApiError } from '../utils/ApiError';

const enquirySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  travelDate: z.string().optional(),
  travelers: z.coerce.number().optional(),
  destination: z.string().optional(),
  budget: z.coerce.number().optional(),
  message: z.string().optional(),
  package: z.string().optional(),
  type: z
    .enum(['package', 'hotel', 'cab', 'activity', 'general', 'plan-trip'])
    .optional(),
});

export const createEnquiryValidators = [validate(enquirySchema)];

export const createEnquiry = asyncHandler(async (req: AuthRequest, res) => {
  const payload = {
    ...req.body,
    travelDate: req.body.travelDate ? new Date(req.body.travelDate) : undefined,
    user: req.user?._id,
  };
  const enquiry = await Enquiry.create(payload);

  await Promise.allSettled([
    notifyEnquiryEmail({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      destination: enquiry.destination,
    }),
    notifyEnquiryWhatsApp(enquiry.phone, enquiry.name),
  ]);

  sendSuccess(
    res,
    enquiry,
    'Thank you! Our travel expert will contact you shortly.',
    201,
  );
});

export const listEnquiries = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 20);
  const filter: Record<string, unknown> = {};
  if (req.query.status) filter.status = String(req.query.status);
  const [items, total] = await Promise.all([
    Enquiry.find(filter)
      .populate('package', 'title slug')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Enquiry.countDocuments(filter),
  ]);
  sendPaginated(res, items, { page, limit, total });
});

export const updateEnquiry = asyncHandler(async (req, res) => {
  const updated = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) throw new ApiError(404, 'Enquiry not found');
  sendSuccess(res, updated, 'Enquiry updated');
});

export const myEnquiries = asyncHandler(async (req: AuthRequest, res) => {
  const items = await Enquiry.find({ user: req.user?._id }).sort({ createdAt: -1 });
  sendSuccess(res, items);
});
