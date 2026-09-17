import { Loader2 } from 'lucide-react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@shared/lib/cn';

export function Spinner({ size = 'md', className }) {
  const sizes = { sm: 'size-4', md: 'size-6', lg: 'size-8' };
  return <Loader2 className={cn('animate-spin text-muted', sizes[size], className)} aria-hidden />;
}

export function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-md bg-surface', className)} aria-hidden />;
}

export function Progress({ value, max = 100, label, className }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-surface', className)}
    >
      <div className="h-full rounded-full bg-accent transition-[width] duration-normal ease-standard" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Tooltip({ label, children, side = 'top' }) {
  return (
    <TooltipPrimitive.Root delayDuration={200}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className="z-tooltip rounded-md bg-primary px-2.5 py-1.5 text-xs text-primary-foreground shadow-md data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=delayed-open]:fade-in duration-fast"
        >
          {label}
          <TooltipPrimitive.Arrow className="fill-primary" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
