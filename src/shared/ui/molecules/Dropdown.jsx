import { useState } from 'react';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@shared/lib/cn';

export function Dropdown({ trigger, children, align = 'end', className }) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownPrimitive.Root open={open} onOpenChange={setOpen}>
      <DropdownPrimitive.Trigger asChild>
        {trigger({ isOpen: open, toggle: () => setOpen((v) => !v) })}
      </DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content
          align={align}
          sideOffset={8}
          className={cn(
            'z-dropdown min-w-[12rem] rounded-lg border border-border bg-surface-floating py-1.5 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=open]:slide-in-from-top-1 duration-fast',
            className
          )}
        >
          {children}
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
}

export function DropdownItem({ children, icon, className, ...props }) {
  return (
    <DropdownPrimitive.Item
      className={cn(
        'flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2 text-left text-sm text-foreground outline-none transition-colors duration-fast hover:bg-surface focus:bg-surface data-[highlighted]:bg-surface',
        className
      )}
      {...props}
    >
      {icon && <span className="[&>svg]:size-4 text-muted">{icon}</span>}
      {children}
    </DropdownPrimitive.Item>
  );
}
