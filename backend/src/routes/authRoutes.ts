import { Router } from 'express';
import * as auth from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/register', ...auth.registerValidators, auth.register);
router.post('/login', ...auth.loginValidators, auth.login);
router.get('/me', protect, auth.me);
router.post('/forgot-password', auth.forgotPassword);

export default router;
