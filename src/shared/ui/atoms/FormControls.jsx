import { forwardRef, useId } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@shared/lib/cn';

const fieldBase =
  'w-full rounded-md border border-border bg-surface-elevated px-3.5 text-sm text-foreground placeholder:text-muted transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:border-focus disabled:opacity-50 disabled:cursor-not-allowed';

export const Label = forwardRef(function Label({ className, required, children, ...props }, ref) {
  return (
    <label ref={ref} className={cn('text-sm font-medium text-foreground', className)} {...props}>
      {children}
      {required && (
        <span className="text-danger ml-0.5" aria-hidden>
          *
        </span>
      )}
    </label>
  );
});

export const Field = ({ label, hint, error, required, htmlFor, children }) => {
  const autoId = useId();
  const id = htmlFor || autoId;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      {typeof children === 'function' ? children(id) : children}
      {error ? (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
};

export const Input = forwardRef(function Input({ className, error, size = 'md', ...props }, ref) {
  const heights = { sm: 'h-9', md: 'h-11', lg: 'h-12' };
  return (
    <input
      ref={ref}
      className={cn(fieldBase, heights[size], error && 'border-danger focus-visible:ring-danger', className)}
      {...props}
    />
  );
});

export const Textarea = forwardRef(function Textarea({ className, error, rows = 4, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(fieldBase, 'py-2.5 resize-y', error && 'border-danger focus-visible:ring-danger', className)}
      {...props}
    />
  );
});

export const Select = forwardRef(function Select({ className, error, size = 'md', children, ...props }, ref) {
  const heights = { sm: 'h-9', md: 'h-11', lg: 'h-12' };
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          fieldBase,
          heights[size],
          'appearance-none pr-9',
          error && 'border-danger focus-visible:ring-danger',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
    </div>
  );
});

export const Checkbox = forwardRef(function Checkbox({ className, label, id, ...props }, ref) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <label htmlFor={inputId} className={cn('inline-flex items-center gap-2.5 cursor-pointer select-none', className)}>
      <span className="relative inline-flex size-5 shrink-0">
        <input ref={ref} id={inputId} type="checkbox" className="peer sr-only" {...props} />
        <span className="size-5 rounded-[6px] border border-border bg-surface-elevated transition-colors duration-fast peer-checked:bg-accent peer-checked:border-accent peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background" />
        <Check className="pointer-events-none absolute inset-0 m-auto size-3.5 text-accent-foreground opacity-0 peer-checked:opacity-100 transition-opacity duration-fast" />
      </span>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  );
});

export const Radio = forwardRef(function Radio({ className, label, id, ...props }, ref) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <label htmlFor={inputId} className={cn('inline-flex items-center gap-2.5 cursor-pointer select-none', className)}>
      <span className="relative inline-flex size-5 shrink-0">
        <input ref={ref} id={inputId} type="radio" className="peer sr-only" {...props} />
        <span className="size-5 rounded-full border border-border bg-surface-elevated transition-colors duration-fast peer-checked:border-accent peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background" />
        <span className="pointer-events-none absolute inset-0 m-auto size-2.5 scale-0 rounded-full bg-accent transition-transform duration-fast peer-checked:scale-100" />
      </span>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  );
});

export const Switch = forwardRef(function Switch({ className, label, id, ...props }, ref) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <label htmlFor={inputId} className={cn('inline-flex items-center gap-2.5 cursor-pointer select-none', className)}>
      <span className="relative inline-flex h-6 w-10 shrink-0">
        <input ref={ref} id={inputId} type="checkbox" role="switch" className="peer sr-only" {...props} />
        <span className="h-6 w-10 rounded-full bg-surface border border-border transition-colors duration-fast peer-checked:bg-accent peer-checked:border-accent peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background" />
        <span className="pointer-events-none absolute left-0.5 top-0.5 size-4 translate-x-0 rounded-full bg-white shadow-sm transition-transform duration-fast peer-checked:translate-x-4" />
      </span>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  );
});
