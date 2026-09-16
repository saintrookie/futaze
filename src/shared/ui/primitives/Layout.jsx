import { cn } from '@shared/lib/cn';

/**
 * Layout primitives. Every page composition should be built from these
 * instead of page-specific margin/padding one-offs.
 */

export function Container({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-container px-4 sm:px-6 lg:px-10', className)} {...props}>
      {children}
    </Tag>
  );
}

export function Section({ as: Tag = 'section', className, children, ...props }) {
  return (
    <Tag className={cn('py-2xl sm:py-3xl', className)} {...props}>
      {children}
    </Tag>
  );
}

const gapClass = {
  none: 'gap-0',
  xs: 'gap-xs',
  sm: 'gap-sm',
  md: 'gap-md',
  lg: 'gap-lg',
  xl: 'gap-xl',
};

export function Stack({ as: Tag = 'div', gap = 'md', align, className, children, ...props }) {
  return (
    <Tag
      className={cn(
        'flex flex-col',
        gapClass[gap],
        align === 'center' && 'items-center',
        align === 'end' && 'items-end',
        align === 'stretch' && 'items-stretch',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Inline({
  as: Tag = 'div',
  gap = 'md',
  align = 'center',
  justify,
  wrap = true,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(
        'flex',
        wrap && 'flex-wrap',
        gapClass[gap],
        align === 'center' && 'items-center',
        align === 'start' && 'items-start',
        align === 'end' && 'items-end',
        align === 'stretch' && 'items-stretch',
        justify === 'between' && 'justify-between',
        justify === 'center' && 'justify-center',
        justify === 'end' && 'justify-end',
        justify === 'start' && 'justify-start',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Cluster({ gap = 'sm', className, children, ...props }) {
  return (
    <div className={cn('flex flex-wrap items-center', gapClass[gap], className)} {...props}>
      {children}
    </div>
  );
}

export function Split({ className, left, right, ...props }) {
  return (
    <div className={cn('flex items-center justify-between gap-md', className)} {...props}>
      <div className="min-w-0">{left}</div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

export function Grid({ as: Tag = 'div', cols = 'auto', gap = 'lg', className, children, ...props }) {
  const colClass =
    cols === 'auto'
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6'
      : typeof cols === 'string'
        ? cols
        : '';
  return (
    <Tag className={cn('grid', colClass, gapClass[gap], className)} {...props}>
      {children}
    </Tag>
  );
}

export function AspectRatio({ ratio = 1, className, children }) {
  return (
    <div className={cn('relative w-full overflow-hidden', className)} style={{ aspectRatio: ratio }}>
      {children}
    </div>
  );
}

export function VisuallyHidden({ as: Tag = 'span', children }) {
  return <Tag className="visually-hidden">{children}</Tag>;
}
