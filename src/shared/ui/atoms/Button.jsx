import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@shared/lib/cn';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-fast ease-standard focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none';

const variants = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90 active:opacity-80',
  accent: 'bg-accent text-accent-foreground hover:brightness-105 active:brightness-95',
  secondary: 'bg-surface-elevated text-foreground border border-border hover:bg-surface active:bg-surface',
  outline: 'bg-transparent text-foreground border border-border hover:bg-surface',
  ghost: 'bg-transparent text-foreground hover:bg-surface',
  link: 'bg-transparent text-foreground underline-offset-4 hover:underline px-0',
  destructive: 'bg-danger text-white hover:brightness-110 active:brightness-95',
};

const sizes = {
  xs: 'h-7 px-2.5 text-xs rounded-sm',
  sm: 'h-9 px-3.5 text-sm rounded-md',
  md: 'h-11 px-5 text-sm rounded-md',
  lg: 'h-12 px-6 text-base rounded-lg',
  xl: 'h-14 px-8 text-base rounded-lg',
};

export const Button = forwardRef(function Button(
  {
    as: Tag = 'button',
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    iconLeft,
    iconRight,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={cn(
        base,
        variants[variant],
        size !== 'inherit' && sizes[size],
        'active:scale-[0.98]',
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden />
      ) : (
        iconLeft && <span className="[&>svg]:size-4 shrink-0">{iconLeft}</span>
      )}
      {children && <span className={loading ? 'opacity-70' : undefined}>{children}</span>}
      {!loading && iconRight && <span className="[&>svg]:size-4 shrink-0">{iconRight}</span>}
    </Tag>
  );
});

export const IconButton = forwardRef(function IconButton(
  { as: Tag = 'button', variant = 'ghost', size = 'md', label, className, children, ...props },
  ref
) {
  const dims = { xs: 'size-7', sm: 'size-9', md: 'size-11', lg: 'size-12' };
  return (
    <Tag
      ref={ref}
      aria-label={label}
      role={Tag !== 'button' ? 'button' : undefined}
      tabIndex={Tag !== 'button' ? 0 : undefined}
      className={cn(
        base,
        variants[variant],
        dims[size] || dims.md,
        'rounded-full p-0 active:scale-[0.94]',
        className
      )}
      {...props}
    >
      <span className="[&>svg]:size-[1.15rem]">{children}</span>
    </Tag>
  );
});
