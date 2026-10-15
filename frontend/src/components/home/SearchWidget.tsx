import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  MapPin,
  Search,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react';
import { CITIES, POPULAR_DESTINATIONS } from '../../data/nav';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

const tabs = ['Holidays', 'Hotels', 'Cabs', 'Activities', 'Flights', 'Trains', 'Bus'] as const;

const tabRoutes: Record<(typeof tabs)[number], string> = {
  Holidays: '/packages',
  Hotels: '/hotels',
  Cabs: '/cabs',
  Activities: '/activities',
  Flights: '/flights',
  Trains: '/trains',
  Bus: '/bus',
};

export function SearchWidget() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<(typeof tabs)[number]>('Holidays');
  const [fromCity, setFromCity] = useState('New Delhi');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab !== 'Holidays') {
      navigate(tabRoutes[tab]);
      return;
    }
    const params = new URLSearchParams();
    if (toCity) params.set('destination', toCity.toLowerCase());
    if (budget) params.set('budget', budget);
    if (date) params.set('date', date);
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <div className="rounded-[1.5rem] border border-white/60 bg-white/95 p-4 shadow-soft backdrop-blur md:p-6">
      <div className="flex gap-2 overflow-x-auto pb-3">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition',
              tab === item
                ? 'bg-brand-50 text-brand-600 ring-1 ring-brand-200'
                : 'text-muted hover:bg-canvas hover:text-ink',
            )}
          >
            {item}
          </button>
        ))}
        <div className="ml-auto hidden items-center gap-1 text-xs font-semibold text-brand-700 md:flex">
          <ShieldCheck className="h-4 w-4" /> Best Price
        </div>
      </div>

      <form onSubmit={onSearch} className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <Field icon={<MapPin className="h-4 w-4" />} label="From City">
          <select
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold outline-none"
          >
            {CITIES.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </Field>
        <Field icon={<Search className="h-4 w-4" />} label="To City / Destination">
          <input
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            placeholder="e.g. Himachal, Goa"
            className="w-full bg-transparent text-sm font-semibold outline-none placeholder:font-medium placeholder:text-muted"
          />
        </Field>
        <Field icon={<CalendarDays className="h-4 w-4" />} label="Departure Date">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold outline-none"
          />
        </Field>
        <Field icon={<Users className="h-4 w-4" />} label="Rooms & Guests">
          <span className="text-sm font-semibold">1 Room, 2 Adults</span>
        </Field>
        <Field icon={<Wallet className="h-4 w-4" />} label="Budget">
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold outline-none"
          >
            <option value="">Any</option>
            <option value="10000">Under ₹10,000</option>
            <option value="20000">Under ₹20,000</option>
            <option value="40000">Under ₹40,000</option>
          </select>
        </Field>
        <div className="flex items-end">
          <Button type="submit" className="w-full" size="lg">
            Search Packages
          </Button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">Popular</span>
        {POPULAR_DESTINATIONS.map((dest) => (
          <button
            key={dest}
            type="button"
            onClick={() => navigate(`/packages?destination=${dest.toLowerCase()}`)}
            className="rounded-full border border-brand-200 px-3 py-1 text-xs font-semibold text-ink transition hover:bg-brand-50"
          >
            {dest}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-canvas/60 px-3 py-2.5">
      <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted">
        {icon}
        {label}
      </div>
      {children}
    </div>
  );
}
