import { Search, X } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { useI18n } from '@shared/i18n/LocaleProvider';

export function SearchInput({ value, onChange, onSubmit, placeholder, size = 'md', className, autoFocus }) {
  const { t } = useI18n();
  const heights = { sm: 'h-10', md: 'h-12', lg: 'h-14' };
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
      className={cn(
        'group flex w-full items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 transition-colors duration-fast focus-within:border-focus focus-within:ring-2 focus-within:ring-focus/40',
        heights[size],
        className
      )}
    >
      <Search className="size-4 shrink-0 text-muted" aria-hidden />
      <label className="visually-hidden" htmlFor="global-search">
        {t('common.search')}
      </label>
      <input
        id="global-search"
        type="search"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder ?? t('common.searchPlaceholder')}
        className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
      />
      {value ? (
        <button
          type="button"
          aria-label={t('common.clearSearch')}
          onClick={() => onChange?.('')}
          className="shrink-0 rounded-full p-1 text-muted hover:bg-surface hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </form>
  );
}
