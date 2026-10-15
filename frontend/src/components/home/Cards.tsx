import { Link } from 'react-router-dom';
import type { Destination, Offer, TravelPackage, Category, Review, FAQItem } from '../../types';
import { destName, formatPrice } from '../../utils/cn';
import { discountedPrice } from '../../utils/cn';
import { Badge, PriceDisplay, Rating, Skeleton } from '../ui/Feedback';
import { Button } from '../ui/Button';

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-500">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-muted md:text-base">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="group relative block overflow-hidden rounded-[1.25rem] bg-white shadow-soft"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <h3 className="text-lg font-bold">{destination.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-white/80">{destination.shortDescription}</p>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span>{destination.packageCount} packages</span>
          <span className="font-semibold">From {formatPrice(destination.startingPrice)}</span>
        </div>
        <span className="mt-3 inline-flex text-sm font-semibold text-brand-200">Explore →</span>
      </div>
    </Link>
  );
}

export function PackageCard({ pkg }: { pkg: TravelPackage }) {
  return (
    <article className="flex h-full min-w-[280px] max-w-sm flex-col overflow-hidden rounded-[1.25rem] border border-line bg-white shadow-soft">
      <Link to={`/packages/${pkg.slug}`} className="relative block aspect-[16/11] overflow-hidden">
        <img
          src={pkg.images?.[0] || '/images/packages/manali.jpg'}
          alt={pkg.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
          loading="lazy"
        />
        {pkg.badge && (
          <div className="absolute left-3 top-3">
            <Badge>{pkg.badge}</Badge>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-2 text-base font-bold leading-snug">
            <Link to={`/packages/${pkg.slug}`}>{pkg.title}</Link>
          </h3>
          <p className="mt-1 text-sm text-muted">
            {destName(pkg.destination)} · {pkg.duration} Days / {pkg.nights} Nights
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-muted">
          <span className="rounded-full bg-canvas px-2 py-1">Hotel</span>
          <span className="rounded-full bg-canvas px-2 py-1">Meals</span>
          <span className="rounded-full bg-canvas px-2 py-1">Transfers</span>
          <span className="rounded-full bg-canvas px-2 py-1">Sightseeing</span>
        </div>
        <Rating value={pkg.rating} count={pkg.reviewCount} />
        <div className="mt-auto flex items-end justify-between gap-3">
          <PriceDisplay price={pkg.price} discount={pkg.discount} />
          <Button asLink={`/packages/${pkg.slug}`} size="sm">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Link
      to={offer.ctaLink}
      className="group relative min-w-[240px] overflow-hidden rounded-[1.25rem] border border-line bg-white"
    >
      <div className="aspect-[5/4] overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      {offer.discountLabel && (
        <div className="absolute left-3 top-3">
          <Badge>{offer.discountLabel}</Badge>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold">{offer.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{offer.description}</p>
        {offer.startingPrice && (
          <p className="mt-2 text-sm font-semibold">
            From {formatPrice(discountedPrice(offer.startingPrice, 0))}
          </p>
        )}
        <span className="mt-3 inline-block text-sm font-semibold text-brand-600">
          {offer.ctaLabel} →
        </span>
      </div>
    </Link>
  );
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group overflow-hidden rounded-[1.25rem] border border-line bg-white"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold">{category.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{category.description}</p>
      </div>
    </Link>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="min-w-[280px] rounded-[1.25rem] border border-line bg-white p-5 shadow-soft">
      <Rating value={review.rating} />
      <p className="mt-3 text-sm leading-relaxed text-ink/90">“{review.comment}”</p>
      <div className="mt-4 flex items-center gap-3">
        <img
          src={review.avatar || '/images/avatars/a1.jpg'}
          alt={review.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-bold">{review.name}</div>
          <div className="text-xs text-muted">
            {[review.city, review.tripName].filter(Boolean).join(' · ')}
          </div>
        </div>
      </div>
    </article>
  );
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="divide-y divide-line rounded-[1.25rem] border border-line bg-white">
      {items.map((item) => (
        <details key={item._id} className="group px-5 py-4">
          <summary className="cursor-pointer list-none font-semibold marker:content-none">
            <span className="flex items-center justify-between gap-4">
              {item.question}
              <span className="text-brand-500 transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CardSkeletonRow() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-80 w-72 shrink-0" />
      ))}
    </div>
  );
}
