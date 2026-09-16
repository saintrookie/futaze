import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { useI18n } from '@shared/i18n/LocaleProvider';

export function Pagination({ page, totalPages, onChange }) {
  const { t } = useI18n();
  if (totalPages <= 1) return null;

  const pages = [];
  const windowSize = 1;
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= windowSize) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }

  return (
    <nav aria-label={t('pagination.label')} className="flex items-center justify-center gap-1.5">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label={t('pagination.previous')}
        className="flex size-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-surface disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronLeft className="size-4" />
      </button>
      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="px-2 text-sm text-muted">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              'flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors duration-fast',
              p === page ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-surface'
            )}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        aria-label={t('pagination.next')}
        className="flex size-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-surface disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
