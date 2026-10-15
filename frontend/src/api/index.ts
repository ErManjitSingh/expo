import api from './client';
import type {
  Activity,
  ApiResponse,
  BlogPost,
  Cab,
  Category,
  Destination,
  FAQItem,
  Hotel,
  Offer,
  Paginated,
  Review,
  TravelPackage,
  User,
} from '../types';

export const authApi = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<{ token: string; user: User }>>('/auth/login', { email, password }),
  register: (payload: { name: string; email: string; phone?: string; password: string }) =>
    api.post<ApiResponse<{ token: string; user: User }>>('/auth/register', payload),
  me: () => api.get<ApiResponse<User>>('/auth/me'),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
};

export const packagesApi = {
  list: (params?: Record<string, string | number | undefined>) =>
    api.get<Paginated<TravelPackage>>('/packages', { params }),
  get: (slug: string) => api.get<ApiResponse<TravelPackage>>(`/packages/${slug}`),
};

export const destinationsApi = {
  list: (params?: Record<string, string>) =>
    api.get<ApiResponse<Destination[]>>('/destinations', { params }),
  get: (slug: string) =>
    api.get<
      ApiResponse<{
        destination: Destination;
        packages: TravelPackage[];
        hotels: Hotel[];
        activities: Activity[];
      }>
    >(`/destinations/${slug}`),
};

export const hotelsApi = {
  list: (params?: Record<string, string | number | undefined>) =>
    api.get<Paginated<Hotel>>('/hotels', { params }),
  get: (slug: string) => api.get<ApiResponse<Hotel>>(`/hotels/${slug}`),
};

export const cabsApi = {
  list: () => api.get<ApiResponse<Cab[]>>('/cabs'),
};

export const activitiesApi = {
  list: (params?: Record<string, string | number | undefined>) =>
    api.get<Paginated<Activity>>('/activities', { params }),
  get: (slug: string) => api.get<ApiResponse<Activity>>(`/activities/${slug}`),
};

export const offersApi = {
  list: () => api.get<ApiResponse<Offer[]>>('/offers'),
};

export const blogsApi = {
  list: (params?: Record<string, number>) => api.get<Paginated<BlogPost>>('/blogs', { params }),
  get: (slug: string) => api.get<ApiResponse<BlogPost>>(`/blogs/${slug}`),
};

export const faqsApi = {
  list: () => api.get<ApiResponse<FAQItem[]>>('/faqs'),
};

export const categoriesApi = {
  list: () => api.get<ApiResponse<Category[]>>('/categories'),
  get: (slug: string) =>
    api.get<ApiResponse<{ category: Category; packages: TravelPackage[] }>>(
      `/categories/${slug}`,
    ),
};

export const reviewsApi = {
  list: (params?: Record<string, string>) =>
    api.get<ApiResponse<Review[]>>('/reviews', { params }),
};

export const enquiryApi = {
  create: (payload: Record<string, unknown>) => api.post('/enquiries', payload),
  mine: () => api.get('/enquiries/mine'),
};

export const newsletterApi = {
  subscribe: (email: string) => api.post('/newsletter', { email }),
};

export const bookingsApi = {
  mine: () => api.get('/bookings/mine'),
  create: (payload: Record<string, unknown>) => api.post('/bookings', payload),
};

export const wishlistApi = {
  list: () => api.get('/wishlist'),
  toggle: (packageId: string) => api.post(`/wishlist/${packageId}`),
};

export const adminApi = {
  stats: () => api.get('/admin/stats'),
  packages: () => api.get('/admin/packages'),
  enquiries: () => api.get('/enquiries'),
  users: () => api.get('/admin/users'),
};
