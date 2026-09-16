import { AssetCard } from '@entities/asset';
import { AddToCollectionDialog } from '@features/add-to-collection';
import { useFavoritesStore } from '@features/favorite-asset';
import { useDisclosure } from '@shared/hooks/useDisclosure';
import { useState } from 'react';
import { Skeleton } from '@shared/ui/atoms/Feedback';
import { EmptyState } from '@shared/ui/patterns/EmptyState';
import { ErrorState } from '@shared/ui/patterns/ErrorState';
import { AspectRatio } from '@shared/ui/primitives/Layout';
import { cn } from '@shared/lib/cn';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { SearchX } from 'lucide-react';

/**
 * Responsive masonry: mobile 2 cols, tablet 3, desktop 4, wide 6 — per the
 * asset grid spec. CSS multi-column keeps DOM/tab order document-order
 * (top-to-bottom, left-to-right in source), so reading and keyboard order
 * stay correct even though columns pack visually column-by-column.
 */
const MASONRY_COLS = 'columns-2 sm:columns-3 lg:columns-4 3xl:columns-6';

export function AssetGridSkeleton({ count = 12, cols = MASONRY_COLS }) {
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

export function AssetGrid({ assets, loading, error, onRetry, emptyState, cols = MASONRY_COLS }) {
  const { t } = useI18n();
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorited = useFavoritesStore((s) => s.isFavorited);
  const { isOpen, open, close } = useDisclosure(false);
  const [activeAsset, setActiveAsset] = useState(null);

  if (loading) return <AssetGridSkeleton cols={cols} />;
  if (error) return <ErrorState type="server" onRetry={onRetry} />;
  if (!assets || assets.length === 0) {
    return (
      emptyState || (
        <EmptyState icon={<SearchX />} title={t('browse.noResultsTitle')} description={t('browse.noResultsDescription')} />
      )
    );
  }

  return (
    <>
      <div className={cn(cols, 'gap-lg [column-fill:balance]')}>
        {assets.map((asset, i) => (
          <div key={asset.id} className="mb-lg break-inside-avoid">
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
          </div>
        ))}
      </div>
      <AddToCollectionDialog open={isOpen} onClose={close} asset={activeAsset} />
    </>
  );
}
