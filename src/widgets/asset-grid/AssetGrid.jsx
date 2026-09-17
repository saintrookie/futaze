import { AssetCard, AssetListRow } from '@entities/asset';
import { AddToCollectionDialog } from '@features/add-to-collection';
import { useFavoritesStore } from '@features/favorite-asset';
import { useDisclosure } from '@shared/hooks/useDisclosure';
import { useState } from 'react';
import { m } from 'framer-motion';
import { Skeleton } from '@shared/ui/atoms/Feedback';
import { EmptyState } from '@shared/ui/patterns/EmptyState';
import { ErrorState } from '@shared/ui/patterns/ErrorState';
import { AspectRatio } from '@shared/ui/primitives/Layout';
import { cn } from '@shared/lib/cn';
import { fadeInUp } from '@shared/lib/motion';
import { usePrefersReducedMotion } from '@shared/hooks/useMediaQuery';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { SearchX } from 'lucide-react';

/**
 * Responsive masonry: mobile 2 cols, tablet 3, desktop 4, wide 6 — per the
 * asset grid spec. CSS multi-column keeps DOM/tab order document-order
 * (top-to-bottom, left-to-right in source), so reading and keyboard order
 * stay correct even though columns pack visually column-by-column.
 */
const MASONRY_COLS = 'columns-2 sm:columns-3 lg:columns-4 3xl:columns-6';

export function AssetGridSkeleton({ count = 12, cols = MASONRY_COLS, density = 'grid' }) {
  if (density === 'list') {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-lg border border-border bg-surface-elevated p-3">
            <Skeleton className="h-20 w-24 shrink-0 rounded-lg sm:w-28" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="mt-2 h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  const ratios = [4 / 3, 3 / 4, 1, 4 / 3, 3 / 4, 4 / 3];
  return (
    <div className={cn(cols, 'gap-lg [column-fill:balance]')}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="mb-lg break-inside-avoid">
          <AspectRatio ratio={ratios[i % ratios.length]}>
            <Skeleton className="absolute inset-0 rounded-lg" />
          </AspectRatio>
          <Skeleton className="mt-2.5 h-4 w-3/4" />
          <Skeleton className="mt-1.5 h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function AssetGrid({ assets, loading, error, onRetry, emptyState, cols = MASONRY_COLS, density = 'grid' }) {
  const { t } = useI18n();
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorited = useFavoritesStore((s) => s.isFavorited);
  const { isOpen, open, close } = useDisclosure(false);
  const [activeAsset, setActiveAsset] = useState(null);
  const reduced = usePrefersReducedMotion();

  if (loading) return <AssetGridSkeleton cols={cols} density={density} />;
  if (error) return <ErrorState type="server" onRetry={onRetry} />;
  if (!assets || assets.length === 0) {
    return (
      emptyState || (
        <EmptyState icon={<SearchX />} title={t('browse.noResultsTitle')} description={t('browse.noResultsDescription')} />
      )
    );
  }

  if (density === 'list') {
    return (
      <div className="flex flex-col gap-3">
        {assets.map((asset, i) => (
          <m.div key={asset.id} {...fadeInUp(reduced, { delay: Math.min(i * 0.03, 0.3) })}>
            <AssetListRow asset={asset} />
          </m.div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={cn(cols, 'gap-lg [column-fill:balance]')}>
        {assets.map((asset, i) => (
          <m.div
            key={asset.id}
            className="mb-lg break-inside-avoid"
            {...fadeInUp(reduced, { delay: Math.min(i * 0.03, 0.3) })}
          >
            <AssetCard
              asset={asset}
              eager={i < 6}
              isFavorited={isFavorited(asset.id)}
              onToggleFavorite={toggleFavorite}
              onAddToCollection={(a) => {
                setActiveAsset(a);
                open();
              }}
            />
          </m.div>
        ))}
      </div>
      <AddToCollectionDialog open={isOpen} onClose={close} asset={activeAsset} />
    </>
  );
}
