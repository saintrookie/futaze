import { Search, X } from 'lucide-react';
import { cn } from '@shared/lib/cn';

export function SearchInput({ value, onChange, onSubmit, placeholder = 'Search assets…', size = 'md', className, autoFocus }) {
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
        Search
      </label>
      <input
        id="global-search"
        type="search"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange?.('')}
          className="shrink-0 rounded-full p-1 text-muted hover:bg-surface hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </form>
  );
}
