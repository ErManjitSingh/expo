import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { packagesApi } from '../api';
import type { TravelPackage } from '../types';
import { SEO } from '../components/shared/SEO';
import { PackageCard, SectionHeader } from '../components/home/Cards';
import { EmptyState, ErrorState, Skeleton } from '../components/ui/Feedback';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Input';
import { cn } from '../utils/cn';

const destinations = ['himachal', 'kashmir', 'rajasthan', 'gujarat', 'northeast'];

export default function PackagesPage() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<TravelPackage[]>([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const query = useMemo(
    () => ({
      destination: params.get('destination') || undefined,
      duration: params.get('duration') || undefined,
      budget: params.get('budget') || undefined,
      hotelCategory: params.get('hotelCategory') || undefined,
      mealPlan: params.get('mealPlan') || undefined,
      travelType: params.get('travelType') || undefined,
      rating: params.get('rating') || undefined,
      sort: params.get('sort') || 'recommended',
      page: Number(params.get('page') || 1),
    }),
    [params],
  );

  const load = () => {
    setLoading(true);
    setError('');
    packagesApi
      .list(query)
      .then((res) => {
        setItems(res.data.data);
        setMeta({
          page: res.data.meta.page,
          totalPages: res.data.meta.totalPages,
          total: res.data.meta.total,
        });
      })
      .catch(() => setError('Failed to load packages'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value) next.delete(key);
    else next.set(key, value);
    if (key !== 'page') next.delete('page');
    setParams(next);
  };

  const Filters = (
    <div className="space-y-4">
      <Select
        label="Destination"
        value={query.destination || ''}
        onChange={(e) => setFilter('destination', e.target.value)}
        options={[
          { label: 'All', value: '' },
          ...destinations.map((d) => ({
            label: d.charAt(0).toUpperCase() + d.slice(1),
            value: d,
          })),
        ]}
      />
      <Select
        label="Duration"
        value={query.duration || ''}
        onChange={(e) => setFilter('duration', e.target.value)}
        options={[
          { label: 'Any', value: '' },
          { label: '3 Days', value: '3' },
          { label: '4 Days', value: '4' },
          { label: '5 Days', value: '5' },
          { label: '6 Days', value: '6' },
          { label: '7 Days', value: '7' },
        ]}
      />
      <Select
        label="Budget"
        value={query.budget || ''}
        onChange={(e) => setFilter('budget', e.target.value)}
        options={[
          { label: 'Any', value: '' },
          { label: 'Under ₹10,000', value: '10000' },
          { label: 'Under ₹15,000', value: '15000' },
          { label: 'Under ₹20,000', value: '20000' },
          { label: 'Under ₹40,000', value: '40000' },
        ]}
      />
      <Select
        label="Hotel category"
        value={query.hotelCategory || ''}
        onChange={(e) => setFilter('hotelCategory', e.target.value)}
        options={[
          { label: 'Any', value: '' },
          { label: '3 Star', value: '3 Star' },
          { label: '4 Star', value: '4 Star' },
          { label: '5 Star', value: '5 Star' },
        ]}
      />
      <Select
        label="Meal plan"
        value={query.mealPlan || ''}
        onChange={(e) => setFilter('mealPlan', e.target.value)}
        options={[
          { label: 'Any', value: '' },
          { label: 'Breakfast', value: 'Breakfast' },
          { label: 'MAP', value: 'MAP' },
        ]}
      />
      <Select
        label="Travel type"
        value={query.travelType || ''}
        onChange={(e) => setFilter('travelType', e.target.value)}
        options={[
          { label: 'Any', value: '' },
          { label: 'Family', value: 'family' },
          { label: 'Honeymoon', value: 'honeymoon' },
          { label: 'Adventure', value: 'adventure' },
          { label: 'Weekend', value: 'weekend' },
        ]}
      />
      <Select
        label="Rating"
        value={query.rating || ''}
        onChange={(e) => setFilter('rating', e.target.value)}
        options={[
          { label: 'Any', value: '' },
          { label: '4.0+', value: '4' },
          { label: '4.5+', value: '4.5' },
        ]}
      />
    </div>
  );

  return (
    <div className="container-emb py-10">
      <SEO
        title="Holiday Packages"
        description="Browse India holiday packages with hotels, transfers and sightseeing."
        canonical="/packages"
      />
      <SectionHeader
        title="Holiday packages"
        subtitle={`${meta.total || 0} packages across India`}
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setFiltersOpen(true)}>
          <Filter className="h-4 w-4" /> Filters
        </Button>
        <Select
          label="Sort"
          value={query.sort || 'recommended'}
          onChange={(e) => setFilter('sort', e.target.value)}
          options={[
            { label: 'Recommended', value: 'recommended' },
            { label: 'Price: Low to High', value: 'price_asc' },
            { label: 'Price: High to Low', value: 'price_desc' },
            { label: 'Rating', value: 'rating' },
            { label: 'Popular', value: 'popular' },
          ]}
          className="min-w-[200px]"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden rounded-[1.25rem] border border-line bg-white p-4 lg:block">
          <h2 className="mb-4 font-bold">Filters</h2>
          {Filters}
        </aside>

        <div>
          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-96" />
              ))}
            </div>
          )}
          {!loading && error && <ErrorState message={error} onRetry={load} />}
          {!loading && !error && items.length === 0 && (
            <EmptyState
              title="No packages match these filters"
              description="Try widening budget or destination."
            />
          )}
          {!loading && !error && items.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          )}

          {meta.totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: meta.totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setFilter('page', String(page))}
                    className={cn(
                      'h-10 w-10 rounded-full text-sm font-semibold',
                      meta.page === page ? 'bg-brand-500 text-white' : 'border border-line bg-white',
                    )}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-[70] bg-black/40 lg:hidden">
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold">Filters</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            {Filters}
            <Button className="mt-4 w-full" onClick={() => setFiltersOpen(false)}>
              Show results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
