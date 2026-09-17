import { Link } from 'react-router-dom';
import { AssetThumbnail } from '@entities/asset/ui/AssetThumbnail';
import { AssetMeta } from '@entities/asset/ui/AssetMeta';
import { AssetPrice } from '@entities/asset/ui/AssetPrice';
import { AiGeneratedBadge } from '@entities/asset/ui/AssetBadge';
import { useLocalizedAsset } from '@entities/asset/model/useLocalizedAsset';
import { cn } from '@shared/lib/cn';

/**
 * Compact row presentation for "list" density — a fast-to-scan alternative
 * to the masonry grid (per docs/07-search-discovery.md §7.2's required
 * multiple result-presentation modes). Navigation-only, no inline
 * favorite/collection actions — those stay in the grid's card treatment.
 */
export function AssetListRow({ asset: rawAsset, className }) {
  const asset = useLocalizedAsset(rawAsset);
  return (
    <Link
      to={`/asset/${asset.slug}`}
      className={cn(
        'group flex items-center gap-4 rounded-lg border border-border bg-surface-elevated p-3 transition-colors duration-fast hover:bg-surface',
        className
      )}
    >
      <div className="w-24 shrink-0 sm:w-28">
        <AssetThumbnail asset={asset} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-foreground transition-colors duration-fast group-hover:text-accent">
            {asset.title}
          </p>
          {asset.isAiGenerated && <AiGeneratedBadge />}
        </div>
        <AssetMeta asset={asset} className="mt-1" />
      </div>
      <div className="shrink-0">
        <AssetPrice asset={asset} />
      </div>
    </Link>
  );
}
