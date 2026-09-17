import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@shared/ui/primitives/Layout';

/**
 * Full-bleed fullscreen overlay for immersive media (image/video zoom,
 * etc). Deliberately not built on the `Dialog` molecule in Overlay.jsx —
 * that one bakes in a bordered header/title bar and caps at max-w-4xl,
 * which is wrong for a full-bleed lightbox. Built directly on
 * DialogPrimitive instead, so it still gets Radix's focus trap, portal,
 * and Escape handling for free — replacing a hand-rolled overlay that had
 * none of those.
 */
export function Lightbox({ open, onClose, title, children }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-modal bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in duration-normal" />
        <DialogPrimitive.Content className="fixed inset-0 z-modal flex items-center justify-center p-4 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in duration-normal">
          <VisuallyHidden as={DialogPrimitive.Title}>{title}</VisuallyHidden>
          <VisuallyHidden as={DialogPrimitive.Description}>{title}</VisuallyHidden>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
