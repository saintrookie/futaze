import { Heart } from 'lucide-react';
import { AssetGrid } from '@widgets/asset-grid/AssetGrid';
import { EmptyState } from '@shared/ui/patterns/EmptyState';
import { useFavoritesStore } from '@features/favorite-asset';
import { ASSETS } from '@entities/asset/model/mock';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AccountFavoritesPage() {
  const { t } = useI18n();
  const ids = useFavoritesStore((s) => s.ids);
  const assets = ASSETS.filter((a) => ids.includes(a.id));

  return (
    <AssetGrid
      assets={assets}
      emptyState={
        <EmptyState
          icon={<Heart />}
          title={t('emptyState.noFavoritesTitle')}
          description={t('emptyState.noFavoritesDescription')}
          action={{ label: t('emptyState.browseMarketplace'), to: '/marketplace' }}
        />
      }
    />
  );
}
