import { Star } from 'lucide-react';
import { cn } from '@shared/lib/cn';

export function RatingDisplay({ value = 0, count, size = 'sm', showValue = true }) {
  const dims = { xs: 'size-3', sm: 'size-3.5', md: 'size-4' };
  return (
    <span className="inline-flex items-center gap-1.5" aria-label={`Rated ${value} out of 5${count ? ` from ${count} reviews` : ''}`}>
      <span className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(dims[size], i < Math.round(value) ? 'fill-accent text-accent' : 'fill-none text-border')}
          />
        ))}
      </span>
      {showValue && (
        <span className="text-xs text-muted">
          {value.toFixed(1)}
          {count != null && ` (${count})`}
        </span>
      )}
    </span>
  );
}
