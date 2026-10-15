import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { packagesApi } from '../api';
import type { TravelPackage } from '../types';
import { SEO } from '../components/shared/SEO';
import { Badge, EmptyState, ErrorState, PriceDisplay, Rating, Skeleton } from '../components/ui/Feedback';
import { Button } from '../components/ui/Button';
import { EnquiryModal } from '../components/packages/EnquiryModal';
import { FAQAccordion } from '../components/home/Cards';
import { destName } from '../utils/cn';
import { PackageCard } from '../components/home/Cards';

export default function PackageDetailPage() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [similar, setSimilar] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    packagesApi
      .get(slug)
      .then(async (res) => {
        setPkg(res.data.data);
        const dest =
          typeof res.data.data.destination === 'object'
            ? res.data.data.destination.slug
            : undefined;
        if (dest) {
          const list = await packagesApi.list({ destination: dest, limit: 4 });
          setSimilar(list.data.data.filter((p) => p.slug !== slug));
        }
      })
      .catch(() => setError('Package not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="container-emb py-10">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="mt-6 h-40 w-2/3" />
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="container-emb py-10">
        <ErrorState message={error || 'Not found'} />
      </div>
    );
  }

  const destinationName = destName(pkg.destination);

  return (
    <div className="pb-24 lg:pb-10">
      <SEO
        title={pkg.seoTitle || pkg.title}
        description={pkg.seoDescription || pkg.shortDescription}
        canonical={`/packages/${pkg.slug}`}
        image={pkg.images?.[0]}
        type="product"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: pkg.title,
          description: pkg.shortDescription,
          image: pkg.images,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: pkg.price,
          },
        }}
      />

      <div className="container-emb py-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <div className="overflow-hidden rounded-[1.5rem]">
              <img
                src={pkg.images?.[0] || '/images/packages/manali.jpg'}
                alt={pkg.title}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {(pkg.images?.length ? pkg.images : [pkg.images?.[0]]).slice(0, 3).map((img, i) => (
                <img
                  key={i}
                  src={img || '/images/packages/manali.jpg'}
                  alt=""
                  className="aspect-video rounded-2xl object-cover"
                />
              ))}
            </div>

            <div className="mt-8 space-y-8">
              <header>
                <div className="flex flex-wrap items-center gap-2">
                  {pkg.badge && <Badge>{pkg.badge}</Badge>}
                  <Rating value={pkg.rating} count={pkg.reviewCount} />
                </div>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                  {pkg.title}
                </h1>
                <p className="mt-2 text-muted">
                  {destinationName} · {pkg.duration} Days / {pkg.nights} Nights
                </p>
              </header>

              <section>
                <h2 className="text-xl font-bold">Overview</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.description}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold">Highlights</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {pkg.highlights?.map((h) => (
                    <li key={h} className="rounded-xl bg-canvas px-3 py-2 text-sm">
                      {h}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold">Day-wise itinerary</h2>
                <div className="mt-4 space-y-3">
                  {pkg.itinerary?.map((day) => (
                    <div key={day.day} className="rounded-2xl border border-line bg-white p-4">
                      <div className="text-xs font-bold uppercase tracking-wide text-brand-500">
                        Day {day.day}
                      </div>
                      <h3 className="mt-1 font-bold">{day.title}</h3>
                      <p className="mt-1 text-sm text-muted">{day.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid gap-6 md:grid-cols-2">
                <ListBlock title="Inclusions" items={pkg.inclusions} />
                <ListBlock title="Exclusions" items={pkg.exclusions} />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Info title="Hotels" text={pkg.hotels?.join(', ') || 'As per itinerary'} />
                <Info title="Meals" text={pkg.meals} />
                <Info title="Transfers" text={pkg.transfers} />
              </div>

              <section>
                <h2 className="mb-3 text-xl font-bold">FAQs</h2>
                {pkg.faqs?.length ? (
                  <FAQAccordion
                    items={pkg.faqs.map((f, i) => ({
                      _id: String(i),
                      question: f.question,
                      answer: f.answer,
                      order: i,
                    }))}
                  />
                ) : (
                  <EmptyState title="No FAQs for this package" />
                )}
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">Similar packages</h2>
                <div className="flex gap-4 overflow-x-auto">
                  {similar.map((item) => (
                    <PackageCard key={item._id} pkg={item} />
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-[1.5rem] border border-line bg-white p-5 shadow-soft">
              <PriceDisplay price={pkg.price} discount={pkg.discount} size="lg" />
              <div className="mt-5 grid gap-2">
                <Button onClick={() => setEnquiryOpen(true)}>Get Quote</Button>
                <Button variant="secondary" onClick={() => setEnquiryOpen(true)}>
                  Book Now
                </Button>
                <Button variant="outline" asLink="/plan-trip">
                  Talk to Expert
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted">
                No payment required to request a quote. An expert will confirm availability.
              </p>
              <Link to="/packages" className="mt-4 inline-block text-sm font-semibold text-brand-600">
                ← Back to packages
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg gap-2">
          <Button className="flex-1" variant="outline" onClick={() => setEnquiryOpen(true)}>
            Get Quote
          </Button>
          <Button className="flex-1" onClick={() => setEnquiryOpen(true)}>
            Book Now
          </Button>
        </div>
      </div>

      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaults={{
          destination: destinationName,
          packageId: pkg._id,
          type: 'package',
        }}
      />
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items?: string[] }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-4">
      <h2 className="font-bold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {items?.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </section>
  );
}

function Info({ title, text }: { title: string; text?: string }) {
  return (
    <div className="rounded-2xl bg-canvas p-4">
      <div className="text-xs font-bold uppercase tracking-wide text-muted">{title}</div>
      <div className="mt-1 text-sm font-semibold">{text}</div>
    </div>
  );
}
