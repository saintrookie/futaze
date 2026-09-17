import { X, ChevronDown } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { useI18n } from '@shared/i18n/LocaleProvider';

export function FilterChip({ label, active = false, onClick, onRemove, expandable = false, className }) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors duration-fast',
        active
          ? 'border-accent bg-accent/10 text-accent'
          : 'border-border bg-surface-elevated text-foreground hover:bg-surface',
        className
      )}
    >
      {label}
      {expandable && <ChevronDown className="size-3.5 opacity-70" />}
      {onRemove && (
        <span
          role="button"
          tabIndex={-1}
          aria-label={t('browse.removeFilter', { label })}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="-mr-1 rounded-full p-0.5 hover:bg-accent/20"
        >
          <X className="size-3.5" />
        </span>
      )}
    </button>
  );
}
