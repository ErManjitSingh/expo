import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  onClick?: () => void;
}

const sizes = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
};

export function Logo({ className, size = 'md', to = '/', onClick }: LogoProps) {
  const img = (
    <img
      src="/images/logo.jpg"
      alt="ExploreMyBharat"
      className={cn('rounded-xl object-cover shadow-sm ring-1 ring-black/10', sizes[size], className)}
    />
  );

  if (!to) return img;

  return (
    <Link to={to} onClick={onClick} className="inline-flex shrink-0 items-center gap-2" aria-label="ExploreMyBharat home">
      {img}
      <span className="hidden flex-col leading-none sm:flex">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600">Explore</span>
        <span className="text-sm font-extrabold tracking-tight text-ink">My Bharat</span>
      </span>
    </Link>
  );
}
