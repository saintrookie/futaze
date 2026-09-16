import { SearchInterface } from '@widgets/search-interface/SearchInterface';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function MarketplacePage() {
  const { t } = useI18n();
  return <SearchInterface title={t('browse.marketplaceTitle')} description={t('browse.marketplaceDescription')} />;
}
