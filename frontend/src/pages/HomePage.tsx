import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  cabsApi,
  categoriesApi,
  destinationsApi,
  faqsApi,
  hotelsApi,
  newsletterApi,
  offersApi,
  packagesApi,
  reviewsApi,
} from '../api';
import type { Cab, Category, Destination, FAQItem, Hotel, Offer, Review, TravelPackage } from '../types';
import { SEO } from '../components/shared/SEO';
import { Hero } from '../components/home/Hero';
import { MobileHome } from '../components/home/MobileHome';
import {
  FAQAccordion,
  ReviewCard,
  SectionHeader,
} from '../components/home/Cards';
import {
  CabsShowcase,
  HotelsShowcase,
  PackagesShowcase,
} from '../components/home/ServiceSections';
import { Button } from '../components/ui/Button';
import { EmptyState, ErrorState, Skeleton } from '../components/ui/Feedback';
import { Input } from '../components/ui/Input';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/cn';
import { ArrowUpRight, Headphones, ShieldCheck, Sparkles } from 'lucide-react';

export default function HomePage() {
  const { toast } = useToast();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [cabs, setCabs] = useState<Cab[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loadingPkgs, setLoadingPkgs] = useState(true);
  const [pkgError, setPkgError] = useState('');
  const [email, setEmail] = useState('');

  const loadPackages = () => {
    setLoadingPkgs(true);
    setPkgError('');
    packagesApi
      .list({ featured: 'true', limit: 8 })
      .then((res) => setPackages(res.data.data))
      .catch(() => setPkgError('Unable to load packages right now.'))
      .finally(() => setLoadingPkgs(false));
  };

  useEffect(() => {
    destinationsApi.list({ featured: 'true' }).then((r) => setDestinations(r.data.data)).catch(() => undefined);
    hotelsApi.list({ limit: 4 }).then((r) => setHotels(r.data.data)).catch(() => undefined);
    cabsApi.list().then((r) => setCabs(r.data.data)).catch(() => undefined);
    offersApi.list().then((r) => setOffers(r.data.data)).catch(() => undefined);
    categoriesApi.list().then((r) => setCategories(r.data.data)).catch(() => undefined);
    reviewsApi.list({ featured: 'true' }).then((r) => setReviews(r.data.data)).catch(() => undefined);
    faqsApi.list().then((r) => setFaqs(r.data.data)).catch(() => undefined);
    loadPackages();
  }, []);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await newsletterApi.subscribe(email);
      toast('Subscribed successfully', 'success');
      setEmail('');
    } catch {
      toast('Subscription failed', 'error');
    }
  };

  const promo = offers.find((o) => o.featured) || offers[0];

  return (
    <>
      <SEO
        title="ExploreMyBharat | Discover India. Experience More."
        description="Holiday packages across Himachal, Kashmir, Rajasthan, Gujarat and Northeast India."
        canonical="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name: 'ExploreMyBharat',
          url: 'https://exploremybharat.com',
          description: 'Discover India. Experience More.',
        }}
      />

      <MobileHome
        destinations={destinations}
        packages={packages}
        hotels={hotels}
        cabs={cabs}
        promo={promo}
      />

      {/* Desktop hero — hidden on mobile */}
      <div className="hidden md:block">
        <Hero />
      </div>

      {/* Desktop destinations — numbered editorial rows */}
      <section className="container-emb hidden py-16 md:block">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Regions we cover</p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight">Five footprints. Endless routes.</h2>
          </div>
          <Button asLink="/destinations" variant="outline" size="sm">
            All destinations
          </Button>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {destinations.map((d, i) => (
            <Link
              key={d._id}
              to={`/destinations/${d.slug}`}
              className="group grid items-center gap-6 py-5 transition hover:bg-brand-50/40 md:grid-cols-[72px_1fr_180px_40px]"
            >
              <span className="text-display text-3xl text-brand-400/80 italic">0{i + 1}</span>
              <div className="flex items-center gap-4">
                <img
                  src={d.image}
                  alt=""
                  className="h-16 w-24 rounded-xl object-cover ring-1 ring-black/5 transition group-hover:scale-[1.02]"
                />
                <div>
                  <h3 className="text-xl font-extrabold text-ink">{d.name}</h3>
                  <p className="mt-0.5 line-clamp-1 text-sm text-muted">{d.shortDescription}</p>
                </div>
              </div>
              <div className="text-sm font-semibold text-brand-700">
                From {formatPrice(d.startingPrice)}
                <span className="block text-xs font-medium text-muted">{d.packageCount} packages</span>
              </div>
              <ArrowUpRight className="justify-self-end text-ink transition group-hover:text-brand-600" />
            </Link>
          ))}
        </div>
      </section>

      {loadingPkgs && (
        <section className="hidden bg-white py-16 md:block">
          <div className="container-emb grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-72" />
            ))}
          </div>
        </section>
      )}
      {!loadingPkgs && pkgError && (
        <section className="container-emb hidden py-10 md:block">
          <ErrorState message={pkgError} onRetry={loadPackages} />
        </section>
      )}
      {!loadingPkgs && !pkgError && packages.length === 0 && (
        <section className="container-emb hidden py-10 md:block">
          <EmptyState title="No packages yet" />
        </section>
      )}
      {!loadingPkgs && !pkgError && <PackagesShowcase packages={packages} />}

      <HotelsShowcase hotels={hotels} />
      <CabsShowcase cabs={cabs} />

      {/* Themes as text links + thin images */}
      <section className="container-emb hidden py-16 md:block">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Travel styles</p>
        <h2 className="mt-1 text-3xl font-extrabold">How do you like to travel?</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((c) => (
            <Link
              key={c._id}
              to={`/category/${c.slug}`}
              className="group relative flex h-28 items-end overflow-hidden rounded-2xl"
            >
              <img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-ink/45" />
              <span className="relative p-4 text-base font-bold text-white">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust — 3 big statements */}
      <section className="border-y border-line bg-brand-50/60 py-14">
        <div className="container-emb grid gap-8 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: 'Verified partners', text: 'Hotels and fleets checked before they go live.' },
            { icon: Sparkles, title: 'Flexible packages', text: 'Swap hotels and pacing to match your budget.' },
            { icon: Headphones, title: 'Human support', text: 'Talk to an expert on WhatsApp or call anytime.' },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <item.icon className="mx-auto h-7 w-7 text-brand-600 md:mx-0" />
              <h3 className="mt-3 text-lg font-extrabold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-emb py-14">
        <SectionHeader title="Traveler notes" subtitle="Short stories from recent trips." />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </section>

      <section id="faq" className="bg-white py-14">
        <div className="container-emb grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-3xl font-extrabold">Questions, answered</h2>
            <p className="mt-2 text-sm text-muted">Before you book a package.</p>
            <Button asLink="/plan-trip" className="mt-6">
              Ask an expert
            </Button>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="container-emb py-14">
        <div className="grid gap-6 overflow-hidden rounded-[1.75rem] bg-ink md:grid-cols-2">
          <div className="p-8 text-white md:p-10">
            <h2 className="text-2xl font-extrabold md:text-3xl">Trip ideas in your inbox</h2>
            <p className="mt-2 text-sm text-cream-200/80">
              New packages and the best weeks to visit — nothing else.
            </p>
            <form onSubmit={subscribe} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
              />
              <Button type="submit" className="shrink-0 bg-brand-500 hover:bg-brand-600">
                Subscribe
              </Button>
            </form>
          </div>
          <div className="relative hidden min-h-[220px] md:block">
            <img src="/images/destinations/northeast.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
          </div>
        </div>
      </section>
    </>
  );
}
