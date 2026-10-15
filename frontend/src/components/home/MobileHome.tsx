import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Building2, Car, Footprints, Ticket } from 'lucide-react';
import type { Cab, Destination, Hotel, Offer, TravelPackage } from '../../types';
import { formatPrice, discountedPrice } from '../../utils/cn';
import { FeaturedPackageCardMobile } from './FeaturedPackageCard';

const quickLinks = [
  { label: 'Packages', to: '/packages', icon: Footprints },
  { label: 'Hotels', to: '/hotels', icon: Building2 },
  { label: 'Cabs', to: '/cabs', icon: Car },
  { label: 'Activities', to: '/activities', icon: Ticket },
] as const;

interface MobileHomeProps {
  destinations: Destination[];
  packages: TravelPackage[];
  hotels: Hotel[];
  cabs: Cab[];
  promo?: Offer;
}

/** Distinct mobile home — editorial mosaic, not marketplace clone. */
export function MobileHome({ destinations, packages, hotels, cabs, promo }: MobileHomeProps) {
  const navigate = useNavigate();
  const [first, second, ...rest] = destinations;

  return (
    <div className="md:hidden">
      {/* Compact brand strip + mountain backdrop */}
      <section className="relative z-0 overflow-hidden px-4 pb-12 pt-5 text-white">
        <img
          src="/images/hero/mountains.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink/85" />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cream-200">
            footprints across india
          </p>
          <h1 className="mt-2 text-[1.75rem] font-extrabold leading-tight drop-shadow-sm">
            Pick a region.
            <br />
            <span className="text-display text-cream-200 italic font-normal">We plan the rest.</span>
          </h1>
          <button
            type="button"
            onClick={() => navigate('/packages')}
            className="mt-5 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3.5 text-left text-sm text-muted"
          >
            <span>Find packages by destination…</span>
            <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">Search</span>
          </button>
        </div>
      </section>

      {/* Quick links — overlaps banner bottom */}
      <section className="relative z-10 -mt-7 px-4">
        <div className="grid grid-cols-4 gap-2 rounded-2xl border border-line bg-white p-2 shadow-[0_12px_32px_rgba(38,38,38,0.14)]">
          {quickLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1.5 rounded-xl py-2.5 text-center active:bg-brand-50"
            >
              <item.icon className="h-5 w-5 text-brand-600" strokeWidth={1.75} />
              <span className="text-[10px] font-bold text-ink">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Destination mosaic */}
      <section className="px-4 pt-8">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-lg font-extrabold text-ink">Where to next</h2>
          <Link to="/destinations" className="text-xs font-bold text-brand-700">
            Map view →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {first && (
            <Link to={`/destinations/${first.slug}`} className="relative col-span-2 h-44 overflow-hidden rounded-[1.35rem]">
              <img src={first.image} alt={first.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                <div>
                  <div className="text-lg font-bold">{first.name.replace(' Pradesh', '')}</div>
                  <div className="text-xs text-cream-200">From {formatPrice(first.startingPrice)}</div>
                </div>
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </Link>
          )}
          {second && (
            <Link to={`/destinations/${second.slug}`} className="relative h-36 overflow-hidden rounded-[1.25rem]">
              <img src={second.image} alt={second.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute bottom-2.5 left-2.5 text-sm font-bold text-white">{second.name}</span>
            </Link>
          )}
          {rest[0] && (
            <Link to={`/destinations/${rest[0].slug}`} className="relative h-36 overflow-hidden rounded-[1.25rem]">
              <img src={rest[0].image} alt={rest[0].name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute bottom-2.5 left-2.5 text-sm font-bold text-white">{rest[0].name}</span>
            </Link>
          )}
        </div>
        {rest.length > 1 && (
          <div className="mt-2.5 flex gap-2">
            {rest.slice(1).map((d) => (
              <Link
                key={d._id}
                to={`/destinations/${d.slug}`}
                className="flex flex-1 items-center gap-2 rounded-2xl border border-line bg-white p-2"
              >
                <img src={d.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
                <div className="min-w-0">
                  <div className="truncate text-xs font-bold">{d.name}</div>
                  <div className="text-[10px] text-muted">{formatPrice(d.startingPrice)}+</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Packages — attractive horizontal cards */}
      <section className="pt-8">
        <div className="mb-4 flex items-end justify-between px-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">
              Featured packages
            </p>
            <h2 className="mt-0.5 text-lg font-extrabold text-ink">Trips worth packing for</h2>
          </div>
          <Link to="/packages" className="text-xs font-bold text-brand-700">
            See all →
          </Link>
        </div>
        <div className="flex gap-3.5 overflow-x-auto px-4 pb-2 scrollbar-none">
          {packages.slice(0, 5).map((pkg) => (
            <FeaturedPackageCardMobile key={pkg._id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* Hotels */}
      {hotels.length > 0 && (
        <section className="px-4 pt-8">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="text-lg font-extrabold text-ink">Stay somewhere nice</h2>
            <Link to="/hotels" className="text-xs font-bold text-brand-700">
              Hotels →
            </Link>
          </div>
          <div className="space-y-3">
            {hotels.slice(0, 3).map((hotel) => (
              <Link
                key={hotel._id}
                to={`/hotels/${hotel.slug}`}
                className="flex gap-3 overflow-hidden rounded-[1.25rem] border border-line bg-white"
              >
                <img
                  src={hotel.images?.[0]}
                  alt=""
                  className="h-[104px] w-[100px] shrink-0 object-cover"
                />
                <div className="flex flex-1 flex-col justify-center py-2.5 pr-3">
                  <p className="text-[10px] font-bold text-brand-600">
                    {'★'.repeat(Math.min(hotel.starRating || 3, 5))} · {hotel.propertyType}
                  </p>
                  <h3 className="mt-0.5 line-clamp-1 text-sm font-extrabold">{hotel.name}</h3>
                  <p className="mt-0.5 line-clamp-1 text-[11px] text-muted">{hotel.location}</p>
                  <p className="mt-1.5 text-sm font-extrabold text-brand-700">
                    {formatPrice(discountedPrice(hotel.pricePerNight, hotel.discount))}
                    <span className="ml-1 text-[10px] font-medium text-muted">/night</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Cabs */}
      {cabs.length > 0 && (
        <section className="pt-8">
          <div className="mx-4 overflow-hidden rounded-[1.5rem] bg-ink px-4 py-5 text-white">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-300">Cabs</p>
                <h2 className="mt-1 text-lg font-extrabold">Fleet for every trip</h2>
              </div>
              <Link to="/cabs" className="text-xs font-bold text-cream-200">
                Book →
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
              {cabs.slice(0, 4).map((cab) => (
                <Link
                  key={cab._id}
                  to="/cabs"
                  className="w-[150px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <img src={cab.image} alt="" className="aspect-[16/10] w-full object-cover" />
                  <div className="p-2.5">
                    <h3 className="truncate text-xs font-bold">{cab.name}</h3>
                    <p className="mt-0.5 text-[10px] text-white/55">
                      {cab.seats} seats · {cab.ac ? 'AC' : 'Non-AC'}
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-cream-200">
                      {formatPrice(cab.startingPrice)}+
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {promo && (
        <section className="px-4 py-8">
          <div className="rounded-[1.5rem] bg-brand-50 p-5 ring-1 ring-brand-200/60">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700">This week</p>
            <h3 className="mt-2 text-xl font-extrabold text-ink">{promo.subtitle || promo.title}</h3>
            <p className="mt-2 text-sm text-muted">{promo.description}</p>
            <Link
              to={promo.ctaLink}
              className="mt-4 inline-flex rounded-full bg-brand-500 px-4 py-2 text-sm font-bold text-white"
            >
              {promo.ctaLabel}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
