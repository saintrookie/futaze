import { useEffect, useRef, useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { Skeleton } from '@shared/ui/atoms/Feedback';

/**
 * Image that only starts fetching once it's near the viewport (via
 * IntersectionObserver, not just the `loading="lazy"` hint), shows a
 * layout-stable skeleton until it decodes, and degrades to a designed
 * broken-image state on error instead of the browser's default icon.
 *
 * Always fills its parent (`absolute inset-0`) — wrap it in AspectRatio or
 * a sized container, same contract as a plain <img className="absolute …">.
 */
export function LazyImage({ src, alt = '', className, imgClassName, eager = false, rootMargin = '200px', onLoad, ...props }) {
  const [inView, setInView] = useState(eager);
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const ref = useRef(null);

  useEffect(() => {
    if (eager || inView) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, inView, rootMargin]);

  // Reset when the source changes (e.g. a card recycled in a virtualized list).
  useEffect(() => {
    setStatus('loading');
  }, [src]);

  return (
    <div ref={ref} className={cn('absolute inset-0', className)}>
      {status !== 'loaded' && <Skeleton className="absolute inset-0" />}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface text-muted">
          <ImageOff className="size-5" aria-hidden />
        </div>
      )}
      {inView && status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={(e) => {
            setStatus('loaded');
            onLoad?.(e);
          }}
          onError={() => setStatus('error')}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-normal ease-standard',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName
          )}
          {...props}
        />
      )}
    </div>
  );
}
