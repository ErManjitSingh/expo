import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { POPULAR_DESTINATIONS } from '../../data/nav';

/** Split editorial hero with full-bleed mountain backdrop. */
export function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      <img
        src="/images/hero/mountains.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />

      <div className="container-emb relative grid items-center gap-10 py-12 md:grid-cols-2 md:gap-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cream-200 backdrop-blur-sm">
            <img src="/images/logo.jpg" alt="" className="h-5 w-5 rounded object-cover" />
            exploremybharat.com
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight drop-shadow-sm md:text-5xl lg:text-[3.4rem]">
            Your next India trip,
            <br />
            <span className="text-display text-cream-200 italic font-normal">footprints first.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
            Holiday packages across Himachal, Kashmir, Rajasthan, Gujarat & the Northeast —
            hotels, transfers and local planning in one place.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asLink="/packages" size="lg" className="bg-brand-500 hover:bg-brand-600">
              Browse packages
            </Button>
            <Button asLink="/plan-trip" size="lg" variant="outline" className="border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-cream-200 hover:text-cream-200">
              Plan with expert
            </Button>
          </div>

          <form
            action="/packages"
            className="mt-8 flex max-w-lg overflow-hidden rounded-2xl bg-white shadow-soft"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const q = String(fd.get('q') || '').trim().toLowerCase();
              window.location.href = q ? `/packages?destination=${encodeURIComponent(q)}` : '/packages';
            }}
          >
            <div className="flex flex-1 items-center gap-2 px-4">
              <Search className="h-4 w-4 shrink-0 text-muted" />
              <input
                name="q"
                placeholder="Search Himachal, Kashmir, Gujarat…"
                className="h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                list="emb-dest"
              />
              <datalist id="emb-dest">
                {POPULAR_DESTINATIONS.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
            </div>
            <button
              type="submit"
              className="bg-brand-500 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              Go
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative hidden h-[420px] md:block"
        >
          <div className="absolute inset-y-4 left-0 w-[58%] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/20">
            <img src="/images/destinations/himachal.jpg" alt="Himachal" className="h-full w-full object-cover" />
            <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-bold text-cream-200 backdrop-blur">
              Himachal
            </span>
          </div>
          <div className="absolute right-0 top-0 h-[48%] w-[48%] overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 ring-white/20">
            <img src="/images/destinations/kashmir.jpg" alt="Kashmir" className="h-full w-full object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-bold text-cream-200 backdrop-blur">
              Kashmir
            </span>
          </div>
          <div className="absolute bottom-0 right-0 h-[42%] w-[48%] overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 ring-white/20">
            <img src="/images/destinations/rajasthan.jpg" alt="Rajasthan" className="h-full w-full object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-bold text-cream-200 backdrop-blur">
              Rajasthan
            </span>
          </div>
          <Link
            to="/destinations"
            className="absolute right-4 top-1/2 z-10 inline-flex -translate-y-1/2 items-center gap-1 rounded-full bg-brand-500 px-3 py-2 text-xs font-bold text-white shadow-lg"
          >
            All 5 regions <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
