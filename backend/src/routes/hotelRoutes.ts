import { Router } from 'express';
import * as ctrl from '../controllers/hotelController';
import { authorize, protect } from '../middleware/auth';

const router = Router();

router.get('/', ctrl.listHotels);
router.get('/:slug', ctrl.getHotelBySlug);
router.post('/', protect, authorize('admin', 'manager'), ctrl.createHotel);
router.put('/:id', protect, authorize('admin', 'manager'), ctrl.updateHotel);
router.delete('/:id', protect, authorize('admin', 'manager'), ctrl.deleteHotel);

export default router;
