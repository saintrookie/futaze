import { cn } from '@shared/lib/cn';

const variants = {
  neutral: 'bg-surface text-foreground border border-border',
  accent: 'bg-accent/10 text-accent border border-accent/20',
  success: 'bg-success/10 text-success border border-success/20',
  warning: 'bg-warning/10 text-warning border border-warning/20',
  danger: 'bg-danger/10 text-danger border border-danger/20',
  solid: 'bg-primary text-primary-foreground',
};

export function Badge({ variant = 'neutral', size = 'sm', className, children }) {
  const sizes = { sm: 'text-[11px] px-2 py-0.5', md: 'text-xs px-2.5 py-1' };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium uppercase tracking-wide',
        sizes[size],
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
