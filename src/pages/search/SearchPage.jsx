import { useSearchParams } from 'react-router-dom';
import { SearchInterface } from '@widgets/search-interface/SearchInterface';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function SearchPage() {
  const [params] = useSearchParams();
  const { t } = useI18n();
  const q = params.get('q');
  return <SearchInterface title={q ? t('browse.searchResultsFor', { query: q }) : t('browse.searchTitle')} description={t('browse.searchTitle')} />;
}
