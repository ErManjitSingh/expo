import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { adminApi } from '../../api';
import { SEO } from '../../components/shared/SEO';
import { useAuth } from '../../context/AuthContext';
import { Skeleton } from '../../components/ui/Feedback';
import { formatPrice } from '../../utils/cn';

function Guard({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <Skeleton className="h-40" />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  useEffect(() => {
    adminApi.stats().then((r: { data: { data: Record<string, number> } }) => setStats(r.data.data)).catch(() => setStats(null));
  }, []);

  return (
    <Guard>
      <SEO title="Admin Dashboard" />
      <h1 className="text-2xl font-extrabold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">ExploreMyBharat marketplace overview</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Users', stats?.users],
          ['Enquiries', stats?.enquiries],
          ['Bookings', stats?.bookings],
          ['Revenue', stats?.revenue],
          ['Packages', stats?.packages],
          ['Hotels', stats?.hotels],
          ['Activities', stats?.activities],
          ['Blogs', stats?.blogs],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-[1.25rem] border border-line bg-white p-5">
            <div className="text-xs font-bold uppercase tracking-wide text-muted">{label}</div>
            <div className="mt-2 text-2xl font-extrabold">
              {label === 'Revenue' ? formatPrice(Number(value || 0)) : value ?? '—'}
            </div>
          </div>
        ))}
      </div>
    </Guard>
  );
}

export function AdminPackages() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  useEffect(() => {
    adminApi.packages().then((r: { data: { data: Array<Record<string, unknown>> } }) => setItems(r.data.data || [])).catch(() => undefined);
  }, []);
  return (
    <Guard>
      <SEO title="Admin Packages" />
      <h1 className="text-2xl font-extrabold">Packages</h1>
      <div className="mt-4 overflow-x-auto rounded-[1.25rem] border border-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-canvas/60 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Published</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={String(item._id)} className="border-b border-line/70">
                <td className="px-4 py-3 font-semibold">{String(item.title)}</td>
                <td className="px-4 py-3">{formatPrice(Number(item.price || 0))}</td>
                <td className="px-4 py-3">{item.published ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Guard>
  );
}

export function AdminEnquiries() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  useEffect(() => {
    adminApi.enquiries().then((r: { data: { data: Array<Record<string, unknown>> } }) => setItems(r.data.data || [])).catch(() => undefined);
  }, []);
  return (
    <Guard>
      <SEO title="Admin Enquiries" />
      <h1 className="text-2xl font-extrabold">Enquiries</h1>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={String(item._id)} className="rounded-2xl border border-line bg-white p-4">
            <div className="font-bold">{String(item.name)}</div>
            <div className="text-sm text-muted">
              {String(item.email)} · {String(item.phone)} · {String(item.status)}
            </div>
            <div className="mt-1 text-sm">{String(item.destination || item.type)}</div>
          </div>
        ))}
      </div>
    </Guard>
  );
}

export function AdminSimple({ title }: { title: string }) {
  return (
    <Guard>
      <SEO title={`Admin ${title}`} />
      <h1 className="text-2xl font-extrabold">{title}</h1>
      <p className="mt-2 text-sm text-muted">
        CRUD screens are wired to the API layer. Extend forms here for full content management.
      </p>
    </Guard>
  );
}
