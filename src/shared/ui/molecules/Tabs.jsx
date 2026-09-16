import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@shared/lib/cn';

export function Tabs({ items, value, onChange, className }) {
  return (
    <TabsPrimitive.Root value={value} onValueChange={onChange}>
      <TabsPrimitive.List className={cn('flex items-center gap-1 overflow-x-auto no-scrollbar border-b border-separator', className)}>
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              'relative shrink-0 px-4 py-3 text-sm font-medium text-muted outline-none transition-colors duration-fast hover:text-foreground',
              'data-[state=active]:text-foreground',
              "after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-accent after:opacity-0 after:transition-opacity after:duration-fast data-[state=active]:after:opacity-100"
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}
