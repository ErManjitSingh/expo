import { Link } from 'react-router-dom';
import { SITE } from '../../data/nav';

const explore = [
  { label: 'All Packages', to: '/packages' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Hotels', to: '/hotels' },
  { label: 'Activities', to: '/activities' },
  { label: 'Cabs', to: '/cabs' },
  { label: 'Flights', to: '/flights' },
  { label: 'Trains', to: '/trains' },
  { label: 'Bus', to: '/bus' },
];

const quick = [
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Careers', to: '/contact' },
];

const policies = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Cancellation Policy', to: '/cancellation' },
  { label: 'Refund Policy', to: '/refund' },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-ink text-white md:mt-20">
      <div className="container-emb grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-3">
            <img
              src="/images/logo.jpg"
              alt="ExploreMyBharat"
              className="h-14 w-14 rounded-xl object-cover ring-1 ring-white/15"
            />
            <div>
              <div className="text-display text-2xl font-bold tracking-tight">emb</div>
              <div className="text-xs font-semibold text-cream-200">exploremybharat.com</div>
            </div>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-white/65">{SITE.tagline}</p>
          <div className="mt-5 space-y-1 text-sm text-white/80">
            <a href={`tel:${SITE.phone}`} className="block hover:text-cream-200">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="block hover:text-cream-200">
              {SITE.email}
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="block hover:text-cream-200"
            >
              WhatsApp
            </a>
          </div>
          <div className="mt-5 flex gap-3 text-sm font-semibold">
            <a href="https://instagram.com" className="rounded-full bg-white/10 px-3 py-2 hover:bg-brand-500" aria-label="Instagram">
              IG
            </a>
            <a href="https://facebook.com" className="rounded-full bg-white/10 px-3 py-2 hover:bg-brand-500" aria-label="Facebook">
              FB
            </a>
            <a href="https://youtube.com" className="rounded-full bg-white/10 px-3 py-2 hover:bg-brand-500" aria-label="YouTube">
              YT
            </a>
          </div>
        </div>

        <FooterCol title="Explore" links={explore} />
        <FooterCol title="Quick Links" links={quick} />
        <FooterCol title="Policies" links={policies} />
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/45">
        © 2026 ExploreMyBharat. All Rights Reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wide text-cream-200">{title}</h3>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.to + link.label}>
            <Link to={link.to} className="text-sm text-white/60 transition hover:text-brand-300">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
