import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';
import { discountedPrice, formatPrice } from '../../utils/cn';

export function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <div className="inline-flex items-center gap-1 text-sm">
      <Star className="h-4 w-4 fill-brand-400 text-brand-400" />
      <span className="font-semibold">{value.toFixed(1)}</span>
      {typeof count === 'number' && <span className="text-muted">({count})</span>}
    </div>
  );
}

export function PriceDisplay({
  price,
  discount = 0,
  suffix = '/person',
  size = 'md',
}: {
  price: number;
  discount?: number;
  suffix?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const finalPrice = discountedPrice(price, discount);
  return (
    <div className={cn(size === 'lg' && 'space-y-1')}>
      <div className="text-xs text-muted">Starting from</div>
      <div className="flex flex-wrap items-baseline gap-2">
        <span
          className={cn(
            'font-extrabold text-ink',
            size === 'sm' && 'text-base',
            size === 'md' && 'text-lg',
            size === 'lg' && 'text-2xl',
          )}
        >
          {formatPrice(finalPrice)}
        </span>
        {discount > 0 && (
          <span className="text-sm text-muted line-through">{formatPrice(price)}</span>
        )}
        <span className="text-xs text-muted">{suffix}</span>
      </div>
    </div>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full bg-brand-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-2xl bg-line/70', className)} />;
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-line bg-white px-6 py-16 text-center">
      <h3 className="text-lg font-bold">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-3xl border border-red-100 bg-red-50 px-6 py-12 text-center">
      <p className="font-semibold text-red-700">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 text-sm font-semibold text-brand-600 underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}
