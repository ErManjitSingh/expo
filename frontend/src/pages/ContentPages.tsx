import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { blogsApi, bookingsApi, destinationsApi, enquiryApi, categoriesApi } from '../api';
import type { BlogPost, Destination, TravelPackage } from '../types';
import { SEO } from '../components/shared/SEO';
import { DestinationCard, PackageCard, SectionHeader } from '../components/home/Cards';
import { EmptyState, Skeleton } from '../components/ui/Feedback';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/cn';

export function DestinationsPage() {
  const [items, setItems] = useState<Destination[]>([]);
  useEffect(() => {
    destinationsApi.list().then((r) => setItems(r.data.data));
  }, []);
  return (
    <div className="container-emb py-10">
      <SEO title="Destinations" description="Explore India destination by destination." canonical="/destinations" />
      <SectionHeader title="India destinations" subtitle="From Himalayas to islands." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((d) => (
          <DestinationCard key={d._id} destination={d} />
        ))}
      </div>
    </div>
  );
}

export function DestinationDetailPage() {
  const { slug } = useParams();
  const [data, setData] = useState<{
    destination: Destination;
    packages: TravelPackage[];
  } | null>(null);

  useEffect(() => {
    if (!slug) return;
    destinationsApi.get(slug).then((r) => setData(r.data.data));
  }, [slug]);

  if (!data) return <div className="container-emb py-10"><Skeleton className="h-96" /></div>;
  const { destination, packages } = data;

  return (
    <div>
      <SEO
        title={destination.seoTitle || `${destination.name} Tour Packages`}
        description={destination.seoDescription || destination.shortDescription}
        canonical={`/destinations/${destination.slug}`}
        image={destination.image}
      />
      <div className="relative h-[42vh] min-h-[280px]">
        <img src={destination.image} alt={destination.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 container-emb pb-8 text-white">
          <h1 className="text-4xl font-extrabold">{destination.name}</h1>
          <p className="mt-2 max-w-2xl text-white/85">{destination.shortDescription}</p>
        </div>
      </div>
      <div className="container-emb space-y-10 py-10">
        <section>
          <h2 className="text-xl font-bold">About</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{destination.description}</p>
        </section>
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 border border-line">
            <h3 className="font-bold">Best time to visit</h3>
            <p className="mt-2 text-sm text-muted">{destination.bestTimeToVisit}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 border border-line">
            <h3 className="font-bold">Top attractions</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {destination.topAttractions?.map((a) => <li key={a}>• {a}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-4 border border-line">
            <h3 className="font-bold">Travel tips</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {destination.travelTips?.map((a) => <li key={a}>• {a}</li>)}
            </ul>
          </div>
        </section>
        <section>
          <SectionHeader title="Popular packages" action={<Button asLink={`/packages?destination=${destination.slug}`} variant="outline" size="sm">View all</Button>} />
          <div className="flex gap-4 overflow-x-auto">{packages.map((p) => <PackageCard key={p._id} pkg={p} />)}</div>
        </section>
      </div>
    </div>
  );
}

export function CategoryPage() {
  const { slug } = useParams();
  const [data, setData] = useState<{ category: { name: string; description: string; slug: string }; packages: TravelPackage[] } | null>(null);
  useEffect(() => {
    if (!slug) return;
    categoriesApi.get(slug).then((r) => setData(r.data.data));
  }, [slug]);
  if (!data) return <div className="container-emb py-10"><Skeleton className="h-64" /></div>;
  return (
    <div className="container-emb py-10">
      <SEO title={data.category.name} description={data.category.description} canonical={`/category/${data.category.slug}`} />
      <SectionHeader title={data.category.name} subtitle={data.category.description} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.packages.map((p) => <PackageCard key={p._id} pkg={p} />)}
      </div>
      {!data.packages.length && <EmptyState title="Packages coming soon for this category" />}
    </div>
  );
}

export function BlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  useEffect(() => {
    blogsApi.list().then((r) => setItems(r.data.data));
  }, []);
  return (
    <div className="container-emb py-10">
      <SEO title="Travel Blog" description="Guides and itineraries from ExploreMyBharat." canonical="/blog" />
      <SectionHeader title="Travel inspiration" />
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((post) => (
          <Link key={post._id} to={`/blog/${post.slug}`} className="overflow-hidden rounded-[1.25rem] border border-line bg-white">
            <img src={post.image} alt={post.title} className="aspect-[16/10] object-cover" />
            <div className="p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-brand-500">{post.category}</div>
              <h3 className="mt-1 font-bold">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand-600">Read more →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  useEffect(() => {
    if (!slug) return;
    blogsApi.get(slug).then((r) => setPost(r.data.data));
  }, [slug]);
  if (!post) return <div className="container-emb py-10"><Skeleton className="h-80" /></div>;
  return (
    <article className="container-emb max-w-3xl py-10">
      <SEO title={post.title} description={post.excerpt} canonical={`/blog/${post.slug}`} image={post.image} type="article" />
      <div className="text-xs font-bold uppercase tracking-wide text-brand-500">{post.category}</div>
      <h1 className="mt-2 text-4xl font-extrabold">{post.title}</h1>
      <p className="mt-2 text-sm text-muted">{post.author}</p>
      <img src={post.image} alt={post.title} className="mt-6 aspect-[21/9] w-full rounded-[1.25rem] object-cover" />
      <div className="prose mt-8 max-w-none text-sm leading-relaxed text-muted" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export function LoginPage() {
  const { login, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if (user) return <Navigate to="/my-trips" replace />;

  return (
    <div className="container-emb flex min-h-[70vh] items-center justify-center py-10">
      <SEO title="Login" canonical="/login" />
      <form
        className="w-full max-w-md space-y-3 rounded-[1.5rem] border border-line bg-white p-6 shadow-soft"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await login(email, password);
            toast('Welcome back', 'success');
            navigate('/my-trips');
          } catch {
            toast('Invalid credentials', 'error');
          }
        }}
      >
        <h1 className="text-2xl font-extrabold">Login</h1>
        <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" className="w-full">Login</Button>
        <p className="text-sm text-muted">
          New here? <Link className="font-semibold text-brand-600" to="/register">Sign up</Link>
        </p>
        <p className="text-xs text-muted">
          Demo: traveler@exploremybharat.com / Travel@123
        </p>
      </form>
    </div>
  );
}

export function RegisterPage() {
  const { register, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  if (user) return <Navigate to="/my-trips" replace />;
  return (
    <div className="container-emb flex min-h-[70vh] items-center justify-center py-10">
      <SEO title="Sign Up" canonical="/register" />
      <form
        className="w-full max-w-md space-y-3 rounded-[1.5rem] border border-line bg-white p-6 shadow-soft"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await register(form);
            toast('Account created', 'success');
            navigate('/my-trips');
          } catch {
            toast('Could not register', 'error');
          }
        }}
      >
        <h1 className="text-2xl font-extrabold">Create account</h1>
        <Input label="Name" required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <Input label="Email" type="email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <Input label="Phone" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
        <Input label="Password" type="password" required value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
    </div>
  );
}

export function ForgotPasswordPage() {
  const { toast } = useToast();
  return (
    <div className="container-emb flex min-h-[60vh] items-center justify-center py-10">
      <SEO title="Forgot Password" canonical="/forgot-password" />
      <form
        className="w-full max-w-md space-y-3 rounded-[1.5rem] border border-line bg-white p-6"
        onSubmit={(e) => {
          e.preventDefault();
          toast('If the account exists, reset instructions will be emailed.', 'info');
        }}
      >
        <h1 className="text-2xl font-extrabold">Forgot password</h1>
        <Input label="Email" type="email" required />
        <Button type="submit" className="w-full">Send reset link</Button>
      </form>
    </div>
  );
}

export function MyTripsPage() {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState<Array<Record<string, unknown>>>([]);
  const [enquiries, setEnquiries] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    if (!user) return;
    bookingsApi.mine().then((r) => setBookings(r.data.data || [])).catch(() => undefined);
    enquiryApi.mine().then((r) => setEnquiries(r.data.data || [])).catch(() => undefined);
  }, [user]);

  if (loading) return <div className="container-emb py-10"><Skeleton className="h-40" /></div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="container-emb py-10">
      <SEO title="My Trips" canonical="/my-trips" />
      <SectionHeader title={`Namaste, ${user.name}`} subtitle="Your bookings, enquiries and saved journeys." />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[1.25rem] border border-line bg-white p-5">
          <h2 className="font-bold">Bookings</h2>
          {!bookings.length && <p className="mt-3 text-sm text-muted">No bookings yet.</p>}
          <ul className="mt-3 space-y-3">
            {bookings.map((b, i) => (
              <li key={i} className="rounded-xl bg-canvas p-3 text-sm">
                <div className="font-semibold">{String(b.title)}</div>
                <div className="text-muted">{String(b.status)} · {formatPrice(Number(b.amount || 0))}</div>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[1.25rem] border border-line bg-white p-5">
          <h2 className="font-bold">Enquiries</h2>
          {!enquiries.length && <p className="mt-3 text-sm text-muted">No enquiries yet.</p>}
          <ul className="mt-3 space-y-3">
            {enquiries.map((e, i) => (
              <li key={i} className="rounded-xl bg-canvas p-3 text-sm">
                <div className="font-semibold">{String(e.destination || 'General')}</div>
                <div className="text-muted">{String(e.status)}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function StaticPage({ title, body }: { title: string; body: string }) {
  return (
    <div className="container-emb max-w-3xl py-10">
      <SEO title={title} />
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export function SeoDestinationAlias({ slug }: { slug: string }) {
  return <Navigate to={`/packages?destination=${slug}`} replace />;
}

export function NotFoundPage() {
  return (
    <div className="container-emb py-20 text-center">
      <SEO title="Page not found" />
      <h1 className="text-3xl font-extrabold">Page not found</h1>
      <Button asLink="/" className="mt-6">Go home</Button>
    </div>
  );
}
