import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3, Star } from 'lucide-react';
import type { TravelPackage } from '../../types';
import { destName, discountedPrice, formatPrice } from '../../utils/cn';

const PERKS = ['Hotel', 'Meals', 'Transfers', 'Sightseeing'] as const;

interface FeaturedPackageCardProps {
  pkg: TravelPackage;
  featured?: boolean;
  className?: string;
}

export function FeaturedPackageCard({ pkg, featured = false, className = '' }: FeaturedPackageCardProps) {
  const finalPrice = discountedPrice(pkg.price, pkg.discount);
  const hasDiscount = pkg.discount > 0;
  const destination = destName(pkg.destination);

  if (featured) {
    return (
      <Link
        to={`/packages/${pkg.slug}`}
        className={`group relative block min-h-[380px] overflow-hidden rounded-[1.75rem] shadow-[0_20px_50px_rgba(38,38,38,0.18)] md:min-h-[440px] ${className}`}
      >
        <img
          src={pkg.images?.[0] || '/images/packages/manali.jpg'}
          alt={pkg.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />

        <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">
            Featured
          </span>
          {pkg.badge && (
            <span className="rounded-full bg-cream-200 px-3 py-1 text-[11px] font-bold text-ink">
              {pkg.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold text-cream-200 backdrop-blur-md">
              {pkg.discount}% OFF
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cream-200">{destination}</p>
          <h3 className="mt-2 max-w-xl text-2xl font-extrabold leading-tight text-white md:text-4xl">
            {pkg.title}
          </h3>
          {pkg.shortDescription && (
            <p className="mt-2 max-w-lg line-clamp-2 text-sm text-white/70">{pkg.shortDescription}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/80">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md">
              <Clock3 className="h-3.5 w-3.5 text-cream-200" />
              {pkg.duration} Days / {pkg.nights} Nights
            </span>
            {pkg.rating > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md">
                <Star className="h-3.5 w-3.5 fill-cream-200 text-cream-200" />
                {pkg.rating.toFixed(1)}
                {pkg.reviewCount > 0 && (
                  <span className="text-white/50">({pkg.reviewCount})</span>
                )}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Starting from</p>
              <div className="mt-0.5 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-cream-200 md:text-4xl">
                  {formatPrice(finalPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-white/40 line-through">{formatPrice(pkg.price)}</span>
                )}
                <span className="text-xs font-medium text-white/50">/person</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition group-hover:bg-brand-600 group-hover:gap-3">
              Explore trip <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/packages/${pkg.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_8px_30px_rgba(38,38,38,0.08)] ring-1 ring-black/[0.04] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(38,38,38,0.14)] ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pkg.images?.[0] || '/images/packages/manali.jpg'}
          alt={pkg.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-ink shadow-sm backdrop-blur">
            {pkg.duration}D · {pkg.nights}N
          </span>
          {hasDiscount && (
            <span className="rounded-full bg-brand-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              −{pkg.discount}%
            </span>
          )}
        </div>

        {pkg.rating > 0 && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink/75 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-md">
            <Star className="h-3 w-3 fill-cream-200 text-cream-200" />
            {pkg.rating.toFixed(1)}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream-200">
            {destination}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-[15px] font-extrabold leading-snug text-ink transition group-hover:text-brand-700">
          {pkg.title}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {PERKS.map((perk) => (
            <span
              key={perk}
              className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700"
            >
              {perk}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line/70 pt-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">From</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-brand-700">{formatPrice(finalPrice)}</span>
              {hasDiscount && (
                <span className="text-xs text-muted line-through">{formatPrice(pkg.price)}</span>
              )}
            </div>
            <p className="text-[10px] font-medium text-muted">per person</p>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-cream-200 transition group-hover:bg-brand-500 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Compact horizontal card for mobile carousels */
export function FeaturedPackageCardMobile({ pkg }: { pkg: TravelPackage }) {
  const finalPrice = discountedPrice(pkg.price, pkg.discount);
  const hasDiscount = pkg.discount > 0;

  return (
    <Link
      to={`/packages/${pkg.slug}`}
      className="w-[78%] max-w-[300px] shrink-0 overflow-hidden rounded-[1.5rem] bg-white shadow-[0_10px_32px_rgba(38,38,38,0.12)] ring-1 ring-black/[0.04]"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={pkg.images?.[0] || '/images/packages/manali.jpg'}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />

        <div className="absolute left-2.5 top-2.5 flex gap-1.5">
          <span className="rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-ink shadow-sm">
            {pkg.duration}D / {pkg.nights}N
          </span>
          {hasDiscount && (
            <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-white">
              −{pkg.discount}%
            </span>
          )}
        </div>

        {pkg.rating > 0 && (
          <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-0.5 rounded-full bg-ink/70 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
            <Star className="h-2.5 w-2.5 fill-cream-200 text-cream-200" />
            {pkg.rating.toFixed(1)}
          </span>
        )}

        <p className="absolute bottom-2.5 left-3 text-[10px] font-bold uppercase tracking-[0.18em] text-cream-200">
          {destName(pkg.destination)}
        </p>
      </div>

      <div className="space-y-2.5 p-3.5">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-extrabold leading-snug text-ink">
          {pkg.title}
        </h3>
        <div className="flex flex-wrap gap-1">
          {PERKS.slice(0, 3).map((perk) => (
            <span
              key={perk}
              className="rounded-full bg-brand-50 px-1.5 py-0.5 text-[9px] font-bold text-brand-700"
            >
              {perk}
            </span>
          ))}
        </div>
        <div className="flex items-end justify-between border-t border-line/60 pt-2.5">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-brand-700">{formatPrice(finalPrice)}</span>
              {hasDiscount && (
                <span className="text-[10px] text-muted line-through">{formatPrice(pkg.price)}</span>
              )}
            </div>
            <p className="text-[10px] text-muted">per person</p>
          </div>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream-200">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
