import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models/User';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/ApiResponse';
import { env } from '../config/env';
import { AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function signToken(id: string) {
  return jwt.sign({ id }, env.jwtSecret, {
    expiresIn: env.jwtExpire as jwt.SignOptions['expiresIn'],
  });
}

export const registerValidators = [validate(registerSchema)];
export const loginValidators = [validate(loginSchema)];

export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(409, 'Email already registered');

  const user = await User.create({ name, email, phone, password, role: 'customer' });
  const token = signToken(String(user._id));

  sendSuccess(
    res,
    {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    },
    'Registered successfully',
    201,
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  if (!user.isActive) throw new ApiError(403, 'Account is inactive');

  const token = signToken(String(user._id));
  sendSuccess(res, {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  }, 'Logged in successfully');
});

export const me = asyncHandler(async (req: AuthRequest, res) => {
  sendSuccess(res, req.user);
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const email = z.string().email().parse(req.body.email);
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, 'No account found with this email');
  // Token email flow to be wired with SMTP.
  sendSuccess(res, null, 'If the account exists, password reset instructions will be emailed.');
});
