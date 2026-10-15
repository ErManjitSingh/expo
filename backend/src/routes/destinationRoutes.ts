import { Router } from 'express';
import * as ctrl from '../controllers/destinationController';
import { authorize, protect } from '../middleware/auth';

const router = Router();

router.get('/', ctrl.listDestinations);
router.get('/:slug', ctrl.getDestinationBySlug);
router.post('/', protect, authorize('admin', 'manager'), ctrl.createDestination);
router.put('/:id', protect, authorize('admin', 'manager'), ctrl.updateDestination);
router.delete('/:id', protect, authorize('admin', 'manager'), ctrl.deleteDestination);

export default router;
