import { Star } from 'lucide-react';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { cn } from '@shared/lib/cn';

export function RatingDisplay({ value = 0, count, size = 'sm', showValue = true }) {
  const { t } = useI18n();
  const dims = { xs: 'size-3', sm: 'size-3.5', md: 'size-4', lg: 'size-5' };
  const label = count ? t('asset.ratedOutOfWithCount', { value, count }) : t('asset.ratedOutOf', { value });
  return (
    <span className="inline-flex items-center gap-1.5" aria-label={label}>
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
