import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Skeleton } from '../components/ui/Feedback';
import {
  ActivitiesPage,
  ActivityDetailPage,
  CabsPage,
  HotelDetailPage,
  HotelsPage,
  PlanTripPage,
  TransportComingSoon,
} from '../pages/MarketplacePages';
import {
  BlogDetailPage,
  BlogPage,
  CategoryPage,
  DestinationDetailPage,
  DestinationsPage,
  ForgotPasswordPage,
  LoginPage,
  MyTripsPage,
  NotFoundPage,
  RegisterPage,
  StaticPage,
} from '../pages/ContentPages';
import {
  AdminDashboard,
  AdminEnquiries,
  AdminPackages,
  AdminSimple,
} from '../pages/admin/AdminPages';

const HomePage = lazy(() => import('../pages/HomePage'));
const PackagesPage = lazy(() => import('../pages/PackagesPage'));
const PackageDetailPage = lazy(() => import('../pages/PackageDetailPage'));

function FallBack() {
  return (
    <div className="container-emb py-10">
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<FallBack />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="packages/:slug" element={<PackageDetailPage />} />
          <Route path="hotels" element={<HotelsPage />} />
          <Route path="hotels/:slug" element={<HotelDetailPage />} />
          <Route path="cabs" element={<CabsPage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="activities/:slug" element={<ActivityDetailPage />} />
          <Route path="flights" element={<TransportComingSoon mode="Flights" />} />
          <Route path="trains" element={<TransportComingSoon mode="Trains" />} />
          <Route path="bus" element={<TransportComingSoon mode="Bus" />} />
          <Route path="plan-trip" element={<PlanTripPage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="destinations/:slug" element={<DestinationDetailPage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="my-trips" element={<MyTripsPage />} />
          <Route
            path="about"
            element={
              <StaticPage
                title="About ExploreMyBharat"
                body="ExploreMyBharat is a premium Indian travel marketplace helping travellers discover destinations, compare holiday packages, hotels, cabs and experiences — with local experts on every quote."
              />
            }
          />
          <Route
            path="contact"
            element={
              <StaticPage
                title="Contact"
                body="Email hello@exploremybharat.com or call +91 62305 57851. For trip planning, use Plan My Trip."
              />
            }
          />
          <Route
            path="privacy"
            element={
              <StaticPage
                title="Privacy Policy"
                body="We respect your privacy and only use enquiry details to plan your travel."
              />
            }
          />
          <Route
            path="terms"
            element={
              <StaticPage
                title="Terms of Service"
                body="By using ExploreMyBharat you agree to our marketplace terms for quotes and bookings."
              />
            }
          />
          <Route
            path="cancellation"
            element={
              <StaticPage
                title="Cancellation Policy"
                body="Cancellation windows vary by package and season and are confirmed before payment."
              />
            }
          />
          <Route
            path="refund"
            element={
              <StaticPage
                title="Refund Policy"
                body="Eligible refunds are processed according to the supplier and package terms shared at booking."
              />
            }
          />
          <Route path="himachal-tour-packages" element={<Navigate to="/packages?destination=himachal" replace />} />
          <Route path="manali-tour-packages" element={<Navigate to="/packages?destination=himachal" replace />} />
          <Route path="kashmir-tour-packages" element={<Navigate to="/packages?destination=kashmir" replace />} />
          <Route path="rajasthan-tour-packages" element={<Navigate to="/packages?destination=rajasthan" replace />} />
          <Route path="gujarat-tour-packages" element={<Navigate to="/packages?destination=gujarat" replace />} />
          <Route path="northeast-tour-packages" element={<Navigate to="/packages?destination=northeast" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="blogs" element={<AdminSimple title="Blogs" />} />
          <Route path="offers" element={<AdminSimple title="Offers" />} />
          <Route path="users" element={<AdminSimple title="Users" />} />
          <Route path="settings" element={<AdminSimple title="Settings" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
