import { forwardRef, useId } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SwitchPrimitive from '@radix-ui/react-switch';
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

/**
 * Checkbox/Radio/Switch are built on Radix primitives (already installed
 * deps, previously unused) rather than hand-rolled sr-only-input + peer-*
 * CSS. External API is preserved: `onChange` still receives a
 * native-shaped `{ target: { checked, name } }` event, so existing
 * consumers reading `e.target.checked` (e.g. AccountSettingsPage) keep
 * working unchanged. `Radio` is now a `RadioGroup`-based single-select
 * (matches how consumers like FilterPanel already model state — one
 * selected value, not independent booleans per option).
 */

export const Checkbox = forwardRef(function Checkbox({ className, label, id, onChange, name, ...props }, ref) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <label htmlFor={inputId} className={cn('inline-flex items-center gap-2.5 cursor-pointer select-none', className)}>
      <CheckboxPrimitive.Root
        ref={ref}
        id={inputId}
        name={name}
        onCheckedChange={(checked) => onChange?.({ target: { checked, name, type: 'checkbox' } })}
        className="flex size-5 shrink-0 items-center justify-center rounded-[6px] border border-border bg-surface-elevated transition-colors duration-fast data-[state=checked]:bg-accent data-[state=checked]:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
        {...props}
      >
        <CheckboxPrimitive.Indicator>
          <Check className="size-3.5 text-accent-foreground" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  );
});

export const RadioGroup = forwardRef(function RadioGroup({ className, ...props }, ref) {
  return <RadioGroupPrimitive.Root ref={ref} className={cn('flex flex-col gap-2.5', className)} {...props} />;
});

export const Radio = forwardRef(function Radio({ className, label, value, id, ...props }, ref) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <label htmlFor={inputId} className={cn('inline-flex items-center gap-2.5 cursor-pointer select-none', className)}>
      <RadioGroupPrimitive.Item
        ref={ref}
        id={inputId}
        value={value}
        className="flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated transition-colors duration-fast data-[state=checked]:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <span className="size-2.5 rounded-full bg-accent" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  );
});

export const Switch = forwardRef(function Switch({ className, label, id, onChange, name, ...props }, ref) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <label htmlFor={inputId} className={cn('inline-flex items-center gap-2.5 cursor-pointer select-none', className)}>
      <SwitchPrimitive.Root
        ref={ref}
        id={inputId}
        name={name}
        onCheckedChange={(checked) => onChange?.({ target: { checked, name, type: 'checkbox' } })}
        className="relative h-6 w-10 shrink-0 rounded-full border border-border bg-surface transition-colors duration-fast data-[state=checked]:bg-accent data-[state=checked]:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
        {...props}
      >
        <SwitchPrimitive.Thumb className="block size-4 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform duration-fast data-[state=checked]:translate-x-4" />
      </SwitchPrimitive.Root>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  );
});
