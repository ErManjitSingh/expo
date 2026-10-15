import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bell, Menu, UserRound, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '../../data/nav';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Logo } from '../shared/Logo';
import { cn } from '../../utils/cn';

export function Header() {
  const { user, logout, isAdmin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-transparent bg-white/95 backdrop-blur-md transition-all',
        scrolled && 'border-line shadow-sm',
      )}
    >
      {/* Mobile */}
      <div className="container-emb relative flex h-14 items-center justify-between md:hidden">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6 text-ink" /> : <Menu className="h-6 w-6 text-ink" />}
        </button>

        <Link
          to="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={() => setOpen(false)}
          aria-label="ExploreMyBharat home"
        >
          <img
            src="/images/logo.jpg"
            alt="ExploreMyBharat"
            className="h-10 w-10 rounded-lg object-cover ring-1 ring-black/15"
          />
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-ink" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
          </button>
          <Link
            to={user ? '/my-trips' : '/login'}
            className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-brand-700"
            aria-label="Account"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="h-full w-full object-cover" />
            ) : (
              <UserRound className="h-4 w-4" />
            )}
          </Link>
        </div>
      </div>

      {/* Desktop */}
      <div
        className={cn(
          'container-emb hidden items-center justify-between gap-4 transition-all md:flex',
          scrolled ? 'h-14' : 'h-16 lg:h-[4.25rem]',
        )}
      >
        <Logo size="md" />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3 py-2 text-sm font-semibold text-muted transition hover:text-ink',
                  isActive && 'bg-brand-50 text-brand-700',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/my-trips" className="text-sm font-semibold text-ink hover:text-brand-600">
                My Trips
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-sm font-semibold text-muted hover:text-ink">
                  Admin
                </Link>
              )}
              <button type="button" onClick={logout} className="text-sm font-semibold text-muted hover:text-ink">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-ink hover:text-brand-600">
                Login
              </Link>
              <Button asLink="/register" size="sm">
                Sign Up
              </Button>
            </>
          )}
          <Button asLink="/plan-trip" size="sm" variant="secondary">
            Plan My Trip
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <div className="container-emb flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-xl px-3 py-3 text-base font-semibold"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/plan-trip"
              className="rounded-xl px-3 py-3 font-semibold text-brand-700"
              onClick={() => setOpen(false)}
            >
              Plan My Trip
            </Link>
            {!user && (
              <>
                <Link to="/login" className="rounded-xl px-3 py-3 font-semibold" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="rounded-xl px-3 py-3 font-semibold" onClick={() => setOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
            <p className="px-3 pt-2 text-xs text-muted">{SITE.tagline}</p>
          </div>
        </div>
      )}
    </header>
  );
}
