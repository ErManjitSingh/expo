import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { activitiesApi, cabsApi, hotelsApi, enquiryApi } from '../api';
import type { Activity, Cab, Hotel } from '../types';
import { SEO } from '../components/shared/SEO';
import { SectionHeader } from '../components/home/Cards';
import { Badge, EmptyState, ErrorState, PriceDisplay, Rating, Skeleton } from '../components/ui/Feedback';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { EnquiryModal } from '../components/packages/EnquiryModal';
import { destName, formatPrice } from '../utils/cn';
import { useToast } from '../context/ToastContext';

export function HotelsPage() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    hotelsApi
      .list({
        destination: params.get('destination') || undefined,
        starRating: params.get('star') || undefined,
        maxPrice: params.get('maxPrice') || undefined,
      })
      .then((r) => setItems(r.data.data))
      .catch(() => setError('Failed to load hotels'))
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <div className="container-emb py-10">
      <SEO title="Hotels" description="Handpicked hotels across India." canonical="/hotels" />
      <SectionHeader title="Hotels across India" subtitle="Boutique stays, hill hotels and beach resorts." />
      <div className="mb-6 grid gap-3 md:grid-cols-4">
        <Select
          label="Destination"
          value={params.get('destination') || ''}
          onChange={(e) => {
            const n = new URLSearchParams(params);
            e.target.value ? n.set('destination', e.target.value) : n.delete('destination');
            setParams(n);
          }}
          options={[
            { label: 'All', value: '' },
            { label: 'Himachal', value: 'himachal' },
            { label: 'Kashmir', value: 'kashmir' },
            { label: 'Rajasthan', value: 'rajasthan' },
            { label: 'Gujarat', value: 'gujarat' },
            { label: 'Northeast', value: 'northeast' },
          ]}
        />
      </div>
      {loading && <div className="grid gap-4 md:grid-cols-3">{[1,2,3].map((i)=><Skeleton key={i} className="h-80"/>)}</div>}
      {error && <ErrorState message={error} />}
      {!loading && !error && items.length === 0 && <EmptyState title="No hotels found" />}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((hotel) => (
          <article key={hotel._id} className="overflow-hidden rounded-[1.25rem] border border-line bg-white shadow-soft">
            <Link to={`/hotels/${hotel.slug}`} className="block aspect-[16/10] overflow-hidden">
              <img src={hotel.images?.[0]} alt={hotel.name} className="h-full w-full object-cover" loading="lazy" />
            </Link>
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold"><Link to={`/hotels/${hotel.slug}`}>{hotel.name}</Link></h3>
                  <p className="text-sm text-muted">{hotel.location}</p>
                </div>
                {hotel.discount > 0 && <Badge>-{hotel.discount}%</Badge>}
              </div>
              <Rating value={hotel.rating} count={hotel.reviewCount} />
              <div className="flex flex-wrap gap-1">
                {hotel.amenities?.slice(0, 4).map((a) => (
                  <span key={a} className="rounded-full bg-canvas px-2 py-1 text-[11px] font-semibold text-muted">{a}</span>
                ))}
              </div>
              <div className="flex items-end justify-between">
                <PriceDisplay price={hotel.pricePerNight} discount={hotel.discount} suffix="/night" />
                <Button asLink={`/hotels/${hotel.slug}`} size="sm">Book Now</Button>
              </div>
              <p className="text-xs text-muted">+ {formatPrice(hotel.taxes)} taxes & fees</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function HotelDetailPage() {
  const { slug } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    hotelsApi.get(slug).then((r) => setHotel(r.data.data)).catch(() => setHotel(null));
  }, [slug]);

  if (!hotel) return <div className="container-emb py-10"><Skeleton className="h-96" /></div>;

  return (
    <div className="container-emb py-10">
      <SEO title={hotel.name} description={hotel.description} canonical={`/hotels/${hotel.slug}`} image={hotel.images?.[0]} />
      <img src={hotel.images?.[0]} alt={hotel.name} className="aspect-[21/9] w-full rounded-[1.5rem] object-cover" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold">{hotel.name}</h1>
            <p className="mt-1 text-muted">{hotel.location} · {destName(hotel.destination)}</p>
            <Rating value={hotel.rating} count={hotel.reviewCount} />
          </div>
          <p className="text-sm leading-relaxed text-muted">{hotel.description}</p>
          <div>
            <h2 className="font-bold">Amenities</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {hotel.amenities.map((a) => <span key={a} className="rounded-full bg-canvas px-3 py-1 text-sm">{a}</span>)}
            </div>
          </div>
          <div>
            <h2 className="font-bold">Rooms</h2>
            <div className="mt-3 space-y-3">
              {hotel.rooms?.map((room) => (
                <div key={room.name} className="rounded-2xl border border-line p-4">
                  <div className="font-semibold">{room.name}</div>
                  <div className="text-sm text-muted">Up to {room.maxGuests} guests · {formatPrice(room.price)}/night</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-bold">Policies</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {hotel.policies?.map((p) => <li key={p}>• {p}</li>)}
            </ul>
          </div>
        </div>
        <aside className="h-fit rounded-[1.5rem] border border-line bg-white p-5 shadow-soft">
          <PriceDisplay price={hotel.pricePerNight} discount={hotel.discount} suffix="/night" size="lg" />
          <Button className="mt-4 w-full" onClick={() => setOpen(true)}>Book Now</Button>
        </aside>
      </div>
      <EnquiryModal open={open} onClose={() => setOpen(false)} defaults={{ destination: hotel.location, type: 'hotel' }} />
    </div>
  );
}

export function CabsPage() {
  const [tab, setTab] = useState('One Way');
  const [cabs, setCabs] = useState<Cab[]>([]);
  const [open, setOpen] = useState(false);
  const tabs = ['One Way', 'Round Trip', 'Local', 'Airport Transfer', 'Outstation'];

  useEffect(() => {
    cabsApi.list().then((r) => setCabs(r.data.data)).catch(() => undefined);
  }, []);

  return (
    <div className="container-emb py-10">
      <SEO title="Cabs" description="Book sedans, SUVs and tempo travellers across India." canonical="/cabs" />
      <SectionHeader title="Cabs for every journey" subtitle="One way, round trip, airport and outstation." />
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab===t?'bg-brand-500 text-white':'bg-white border border-line'}`}>{t}</button>
        ))}
      </div>
      <div className="mb-8 grid gap-3 rounded-[1.25rem] border border-line bg-white p-4 md:grid-cols-5">
        <Input label="Pickup" placeholder="City / airport" />
        <Input label="Drop" placeholder="Destination" />
        <Input label="Date" type="date" />
        <Input label="Time" type="time" />
        <Input label="Passengers" type="number" defaultValue={2} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cabs.map((cab) => (
          <article key={cab._id} className="overflow-hidden rounded-[1.25rem] border border-line bg-white">
            <img src={cab.image} alt={cab.name} className="aspect-[16/10] w-full object-cover" />
            <div className="space-y-2 p-4">
              <h3 className="font-bold">{cab.name}</h3>
              <p className="text-sm text-muted">{cab.seats} seats · {cab.luggage} bags · {cab.ac ? 'AC' : 'Non-AC'}</p>
              <PriceDisplay price={cab.startingPrice} suffix={`/${tab.toLowerCase()}`} />
              <Button className="w-full" size="sm" onClick={() => setOpen(true)}>Book Now</Button>
            </div>
          </article>
        ))}
      </div>
      <EnquiryModal open={open} onClose={() => setOpen(false)} defaults={{ type: 'cab', destination: tab }} />
    </div>
  );
}

export function ActivitiesPage() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<Activity[]>([]);
  const categories = ['', 'Adventure', 'Trekking', 'Water Sports', 'Sightseeing', 'Camping', 'Wildlife', 'Cultural', 'Family'];

  useEffect(() => {
    activitiesApi.list({ category: params.get('category') || undefined }).then((r) => setItems(r.data.data));
  }, [params]);

  return (
    <div className="container-emb py-10">
      <SEO title="Activities" description="Adventure, sightseeing and experiences across India." canonical="/activities" />
      <SectionHeader title="Activities & experiences" />
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {categories.map((c) => (
          <button
            key={c || 'all'}
            type="button"
            onClick={() => {
              const n = new URLSearchParams();
              if (c) n.set('category', c);
              setParams(n);
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${(params.get('category') || '') === c ? 'bg-brand-500 text-white' : 'border border-line bg-white'}`}
          >
            {c || 'All'}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((a) => (
          <Link key={a._id} to={`/activities/${a.slug}`} className="overflow-hidden rounded-[1.25rem] border border-line bg-white shadow-soft">
            <img src={a.image} alt={a.title} className="aspect-[16/10] w-full object-cover" loading="lazy" />
            <div className="space-y-2 p-4">
              <h3 className="font-bold">{a.title}</h3>
              <p className="text-sm text-muted">{a.location} · {a.duration}</p>
              <Rating value={a.rating} />
              <PriceDisplay price={a.price} discount={a.discount} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ActivityDetailPage() {
  const { slug } = useParams();
  const [item, setItem] = useState<Activity | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!slug) return;
    activitiesApi.get(slug).then((r) => setItem(r.data.data));
  }, [slug]);
  if (!item) return <div className="container-emb py-10"><Skeleton className="h-80" /></div>;
  return (
    <div className="container-emb py-10">
      <SEO title={item.title} description={item.description} canonical={`/activities/${item.slug}`} />
      <img src={item.image} alt={item.title} className="aspect-[21/9] w-full rounded-[1.5rem] object-cover" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold">{item.title}</h1>
          <p className="text-muted">{item.location} · {item.duration}</p>
          <p className="text-sm leading-relaxed text-muted">{item.description}</p>
          <ul className="space-y-1 text-sm">{item.highlights?.map((h)=><li key={h}>• {h}</li>)}</ul>
        </div>
        <aside className="h-fit rounded-[1.5rem] border border-line bg-white p-5 shadow-soft">
          <PriceDisplay price={item.price} discount={item.discount} size="lg" />
          <Button className="mt-4 w-full" onClick={() => setOpen(true)}>Book Now</Button>
        </aside>
      </div>
      <EnquiryModal open={open} onClose={() => setOpen(false)} defaults={{ type: 'activity', destination: item.location }} />
    </div>
  );
}

export function TransportComingSoon({ mode }: { mode: 'Flights' | 'Trains' | 'Bus' }) {
  const { toast } = useToast();
  return (
    <div className="container-emb py-10">
      <SEO title={mode} description={`${mode} search will connect to partner APIs soon.`} canonical={`/${mode.toLowerCase()}`} />
      <SectionHeader title={`${mode} search`} subtitle="Marketplace UI is ready. External inventory API is not connected yet." />
      <div className="grid gap-3 rounded-[1.25rem] border border-line bg-white p-4 md:grid-cols-4">
        <Input label="From" placeholder="City" />
        <Input label="To" placeholder="City" />
        <Input label="Date" type="date" />
        <Button
          className="self-end"
          onClick={() => toast(`${mode} search service is unavailable until a partner API is connected.`, 'info')}
        >
          Search {mode}
        </Button>
      </div>
      <div className="mt-8 rounded-[1.25rem] border border-dashed border-line bg-canvas/60 px-6 py-16 text-center">
        <h3 className="text-lg font-bold">Coming soon / Search service unavailable</h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
          We will not pretend a real {mode.toLowerCase()} booking happened. Once a provider is wired through our {mode.toLowerCase()} service interface, live results will appear here.
        </p>
      </div>
    </div>
  );
}

export function PlanTripPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', destination: '', travelDate: '', travelers: '2', budget: '', message: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await enquiryApi.create({ ...form, travelers: Number(form.travelers), budget: form.budget ? Number(form.budget) : undefined, type: 'plan-trip' });
      toast('Thank you! Our travel expert will contact you shortly.', 'success');
      setForm({ name: '', phone: '', email: '', destination: '', travelDate: '', travelers: '2', budget: '', message: '' });
    } catch {
      toast('Could not submit. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-emb max-w-2xl py-10">
      <SEO title="Plan My Trip" description="Tell us where you want to go across India." canonical="/plan-trip" />
      <SectionHeader title="Plan My Trip" subtitle="Share a few details and an ExploreMyBharat expert will craft options." />
      <form onSubmit={submit} className="grid gap-3 rounded-[1.5rem] border border-line bg-white p-6">
        <Input label="Name" required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <Input label="Phone" required value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
        <Input label="Email" type="email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <Input label="Destination" value={form.destination} onChange={(e)=>setForm({...form,destination:e.target.value})} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Travel date" type="date" value={form.travelDate} onChange={(e)=>setForm({...form,travelDate:e.target.value})} />
          <Input label="Travelers" type="number" value={form.travelers} onChange={(e)=>setForm({...form,travelers:e.target.value})} />
        </div>
        <Input label="Budget" type="number" value={form.budget} onChange={(e)=>setForm({...form,budget:e.target.value})} />
        <Input label="Message" value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} />
        <Button type="submit" disabled={loading}>{loading ? 'Submitting…' : 'Request plan'}</Button>
      </form>
    </div>
  );
}
