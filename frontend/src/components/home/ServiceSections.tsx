import { Link } from 'react-router-dom';
import { MapPin, Snowflake, Users, Briefcase } from 'lucide-react';
import type { Cab, Hotel, TravelPackage } from '../../types';
import { discountedPrice, formatPrice } from '../../utils/cn';
import { Button } from '../ui/Button';
import { SectionHeader } from './Cards';
import { FeaturedPackageCard } from './FeaturedPackageCard';

export function PackagesShowcase({ packages }: { packages: TravelPackage[] }) {
  const [hero, ...rest] = packages.slice(0, 7);
  if (!hero) return null;

  return (
    <section className="hidden bg-gradient-to-b from-canvas via-white to-white py-16 md:block">
      <div className="container-emb">
        <SectionHeader
          eyebrow="Featured packages"
          title="Trips worth packing for"
          subtitle="Cinematic routes, clear pricing — hotels, meals and transfers as listed."
          action={
            <Button asLink="/packages" variant="outline" size="sm">
              View all packages
            </Button>
          }
        />

        <FeaturedPackageCard pkg={hero} featured />

        {rest.length > 0 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {rest.map((pkg) => (
              <FeaturedPackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function HotelsShowcase({ hotels }: { hotels: Hotel[] }) {
  const list = hotels.slice(0, 4);
  if (!list.length) return null;

  return (
    <section className="hidden py-16 md:block">
      <div className="container-emb">
        <SectionHeader
          eyebrow="Stays"
          title="Hotels travelers actually like"
          subtitle="Hill cottages, heritage homes and city stays — clear per-night rates."
          action={
            <Button asLink="/hotels" variant="outline" size="sm">
              Browse hotels
            </Button>
          }
        />
        <div className="grid gap-4 lg:grid-cols-12">
          {list.map((hotel, i) => {
            const large = i === 0;
            return (
              <Link
                key={hotel._id}
                to={`/hotels/${hotel.slug}`}
                className={`group relative overflow-hidden rounded-[1.5rem] ${
                  large ? 'min-h-[340px] lg:col-span-7 lg:row-span-2' : 'min-h-[160px] lg:col-span-5'
                }`}
              >
                <img
                  src={hotel.images?.[0] || '/images/hotels/manali.jpg'}
                  alt={hotel.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <div className={`absolute inset-x-0 bottom-0 text-white ${large ? 'p-6' : 'p-4'}`}>
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-cream-200">
                    <span>{'★'.repeat(Math.min(hotel.starRating || 3, 5))}</span>
                    <span className="text-white/50">·</span>
                    <span className="normal-case tracking-normal text-white/70">{hotel.propertyType}</span>
                  </div>
                  <h3 className={`mt-1 font-extrabold leading-tight ${large ? 'text-2xl' : 'text-lg'}`}>
                    {hotel.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-white/70">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {hotel.location}
                  </p>
                  <p className={`mt-2 font-extrabold text-cream-200 ${large ? 'text-xl' : 'text-base'}`}>
                    {formatPrice(discountedPrice(hotel.pricePerNight, hotel.discount))}
                    <span className="ml-1 text-[10px] font-medium text-white/60">/night</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CabsShowcase({ cabs }: { cabs: Cab[] }) {
  const list = cabs.slice(0, 4);
  if (!list.length) return null;

  return (
    <section className="hidden bg-ink py-16 text-white md:block">
      <div className="container-emb">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Cabs & transfers</p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight">Ride the route your way</h2>
            <p className="mt-2 max-w-xl text-sm text-white/65">
              Sedans to tempo travellers — airport drops, hill runs and outstation days.
            </p>
          </div>
          <Button asLink="/cabs" size="sm" className="bg-brand-500 hover:bg-brand-600">
            Book a cab
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {list.map((cab) => (
            <Link
              key={cab._id}
              to="/cabs"
              className="group overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/5 transition hover:border-brand-400/40 hover:bg-white/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                <img
                  src={cab.image || '/images/activities/cab-innova.jpg'}
                  alt={cab.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2.5 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-extrabold leading-snug">{cab.name}</h3>
                  <span className="shrink-0 rounded-full bg-brand-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-300">
                    {cab.vehicleType}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/60">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3 w-3" /> {cab.seats} seats
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-3 w-3" /> {cab.luggage} bags
                  </span>
                  {cab.ac && (
                    <span className="inline-flex items-center gap-1">
                      <Snowflake className="h-3 w-3" /> AC
                    </span>
                  )}
                </div>
                <p className="pt-1 text-lg font-extrabold text-cream-200">
                  {formatPrice(cab.startingPrice)}
                  <span className="ml-1 text-[10px] font-medium text-white/50">starting</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
