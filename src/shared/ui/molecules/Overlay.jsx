import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { IconButton } from '@shared/ui/atoms/Button';
import { VisuallyHidden } from '@shared/ui/primitives/Layout';

const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

export function Dialog({ open, onClose, title, description, children, size = 'md' }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-modal bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in duration-normal" />
        <DialogPrimitive.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-modal w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-surface-floating shadow-xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-normal ease-emphasized',
            sizes[size]
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-separator px-6 py-5">
            <div>
              <DialogPrimitive.Title className="font-display text-lg font-medium text-foreground">
                {title}
              </DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className="mt-1 text-sm text-muted">
                  {description}
                </DialogPrimitive.Description>
              ) : (
                <VisuallyHidden as={DialogPrimitive.Description}>{title}</VisuallyHidden>
              )}
            </div>
            <DialogPrimitive.Close asChild>
              <IconButton label="Close dialog" size="sm">
                <X />
              </IconButton>
            </DialogPrimitive.Close>
          </div>
          <div className="px-6 py-5">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

const sideClass = {
  right: 'right-0 top-0 h-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
  left: 'left-0 top-0 h-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
  bottom: 'bottom-0 left-0 w-full max-h-[85vh] rounded-t-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
};

export function Drawer({ open, onClose, title, side = 'right', children, widthClass = 'max-w-md' }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-modal bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in duration-normal" />
        <DialogPrimitive.Content
          className={cn(
            'fixed z-modal flex flex-col bg-surface-floating shadow-xl duration-normal ease-emphasized focus:outline-none',
            side !== 'bottom' && ['w-full', widthClass],
            sideClass[side]
          )}
        >
          <div className="flex items-center justify-between gap-4 border-b border-separator px-5 py-4">
            <DialogPrimitive.Title className="font-display text-base font-medium text-foreground">
              {title}
            </DialogPrimitive.Title>
            <VisuallyHidden as={DialogPrimitive.Description}>{title}</VisuallyHidden>
            <DialogPrimitive.Close asChild>
              <IconButton label="Close" size="sm">
                <X />
              </IconButton>
            </DialogPrimitive.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
