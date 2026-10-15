import { NavLink, Outlet } from 'react-router-dom';
import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Package,
  Percent,
  Settings,
  Users,
} from 'lucide-react';
import { cn } from '../../utils/cn';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/packages', label: 'Packages', icon: Package },
  { to: '/admin/enquiries', label: 'Enquiries', icon: ClipboardList },
  { to: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { to: '/admin/offers', label: 'Offers', icon: Percent },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-canvas lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-line bg-white lg:border-b-0 lg:border-r">
        <div className="px-5 py-5">
          <div className="text-[10px] font-extrabold tracking-[0.2em] text-brand-500">EXPLORE</div>
          <div className="font-extrabold">Admin</div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:flex-col">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  'inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted whitespace-nowrap',
                  isActive && 'bg-brand-50 text-brand-600',
                )
              }
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
}
