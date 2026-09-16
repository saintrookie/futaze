import { cn } from '@shared/lib/cn';

export function Separator({ orientation = 'horizontal', className }) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'bg-separator',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className
      )}
    />
  );
}
