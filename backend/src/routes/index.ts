import { Router } from 'express';
import authRoutes from './authRoutes';
import packageRoutes from './packageRoutes';
import destinationRoutes from './destinationRoutes';
import hotelRoutes from './hotelRoutes';
import * as enquiry from '../controllers/enquiryController';
import * as misc from '../controllers/miscController';
import * as pkg from '../controllers/packageController';
import { authorize, optionalAuth, protect } from '../middleware/auth';

const router = Router();

router.use('/auth', authRoutes);
router.use('/packages', packageRoutes);
router.use('/destinations', destinationRoutes);
router.use('/hotels', hotelRoutes);

router.get('/cabs', misc.listCabs);
router.get('/cabs/:slug', misc.getCabBySlug);
router.post('/cabs', protect, authorize('admin', 'manager'), misc.createCab);

router.get('/activities', misc.listActivities);
router.get('/activities/:slug', misc.getActivityBySlug);
router.post('/activities', protect, authorize('admin', 'manager'), misc.createActivity);

router.get('/offers', misc.listOffers);
router.post('/offers', protect, authorize('admin', 'manager'), misc.createOffer);
router.put('/offers/:id', protect, authorize('admin', 'manager'), misc.updateOffer);
router.delete('/offers/:id', protect, authorize('admin', 'manager'), misc.deleteOffer);

router.get('/blogs', misc.listBlogs);
router.get('/blogs/:slug', misc.getBlogBySlug);
router.post('/blogs', protect, authorize('admin', 'manager'), misc.createBlog);
router.put('/blogs/:id', protect, authorize('admin', 'manager'), misc.updateBlog);
router.delete('/blogs/:id', protect, authorize('admin', 'manager'), misc.deleteBlog);

router.get('/faqs', misc.listFaqs);
router.get('/categories', misc.listCategories);
router.get('/categories/:slug', misc.getCategoryBySlug);
router.get('/reviews', misc.listReviews);
router.get('/coupons', misc.listCoupons);

router.post('/newsletter', misc.subscribeNewsletter);
router.post('/enquiries', optionalAuth, ...enquiry.createEnquiryValidators, enquiry.createEnquiry);
router.get('/enquiries/mine', protect, enquiry.myEnquiries);
router.get('/enquiries', protect, authorize('admin', 'manager', 'agent'), enquiry.listEnquiries);
router.patch('/enquiries/:id', protect, authorize('admin', 'manager', 'agent'), enquiry.updateEnquiry);

router.post('/bookings', optionalAuth, misc.createBooking);
router.get('/bookings/mine', protect, misc.myBookings);
router.get('/bookings', protect, authorize('admin', 'manager'), misc.listBookings);

router.get('/wishlist', protect, misc.getWishlist);
router.post('/wishlist/:packageId', protect, misc.toggleWishlist);

router.post('/flights/search', misc.flightSearch);
router.post('/trains/search', misc.trainSearch);
router.post('/bus/search', misc.busSearch);

router.get('/admin/stats', protect, authorize('admin', 'manager'), misc.adminStats);
router.get('/admin/packages', protect, authorize('admin', 'manager'), pkg.adminListPackages);
router.get('/admin/users', protect, authorize('admin'), misc.listUsers);

export default router;
