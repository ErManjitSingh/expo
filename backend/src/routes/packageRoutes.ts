import { Router } from 'express';
import * as ctrl from '../controllers/packageController';
import { authorize, protect } from '../middleware/auth';

const router = Router();

router.get('/', ctrl.listPackages);
router.get('/:slug', ctrl.getPackageBySlug);
router.post('/', protect, authorize('admin', 'manager'), ctrl.createPackage);
router.put('/:id', protect, authorize('admin', 'manager'), ctrl.updatePackage);
router.delete('/:id', protect, authorize('admin', 'manager'), ctrl.deletePackage);

export default router;
