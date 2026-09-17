import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';
import { AssetThumbnail } from '@entities/asset/ui/AssetThumbnail';
import { AssetMeta } from '@entities/asset/ui/AssetMeta';
import { AssetPrice } from '@entities/asset/ui/AssetPrice';
import { AiGeneratedBadge } from '@entities/asset/ui/AssetBadge';
import { useLocalizedAsset } from '@entities/asset/model/useLocalizedAsset';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { usePrefersReducedMotion } from '@shared/hooks/useMediaQuery';
import { hoverLift } from '@shared/lib/motion';
import { cn } from '@shared/lib/cn';

/**
 * Canonical Asset Card. Presentational only — favoriting/collection
 * mutations are wired in by the consumer (features/favorite-asset,
 * features/add-to-collection), passed here as plain callbacks + state.
 * Localizes title/description/tags for the current locale once here, so
 * every consumer (grids, dashboards, checkout) gets localized copy for free.
 */
export function AssetCard({
  asset: rawAsset,
  isFavorited = false,
  onToggleFavorite,
  onAddToCollection,
  showCreator = true,
  eager = false,
  className,
}) {
  const asset = useLocalizedAsset(rawAsset);
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  return (
    <m.article className={cn('group relative flex flex-col gap-2.5', className)} {...hoverLift(reduced)}>
      <Link to={`/asset/${asset.slug}`} className="relative block" aria-label={asset.title}>
        <AssetThumbnail asset={asset} eager={eager} />
        <div className="pointer-events-none absolute inset-x-2.5 top-2.5 flex items-start justify-between">
          <span className="pointer-events-auto">{asset.isAiGenerated && <AiGeneratedBadge />}</span>
          <span className="pointer-events-auto flex flex-col gap-1.5 opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-within:opacity-100">
            {onToggleFavorite && (
              <button
                type="button"
                aria-label={isFavorited ? t('asset.removeFavorite') : t('asset.addFavorite')}
                aria-pressed={isFavorited}
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFavorite(asset);
                }}
                className={cn(
                  'flex size-8 items-center justify-center rounded-full bg-white/95 text-primary shadow-sm transition-transform duration-fast hover:scale-105 active:scale-95',
                  isFavorited && 'text-danger'
                )}
              >
                <Heart className={cn('size-4', isFavorited && 'fill-current')} />
              </button>
            )}
            {onAddToCollection && (
              <button
                type="button"
                aria-label={t('asset.addToCollection')}
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCollection(asset);
                }}
                className="flex size-8 items-center justify-center rounded-full bg-white/95 text-primary shadow-sm transition-transform duration-fast hover:scale-105 active:scale-95"
              >
                <Plus className="size-4" />
              </button>
            )}
          </span>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to={`/asset/${asset.slug}`} className="block truncate text-sm font-medium text-foreground hover:text-accent transition-colors duration-fast">
            {asset.title}
          </Link>
          {showCreator && <AssetMeta asset={asset} className="mt-1" />}
        </div>
        <AssetPrice asset={asset} className="shrink-0 pt-0.5" />
      </div>
    </m.article>
  );
}
