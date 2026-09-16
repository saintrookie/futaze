import { useParams } from 'react-router-dom';
import { SearchInterface, getCategory } from '@widgets/search-interface/SearchInterface';
import { NotFoundPage } from '@pages/not-found/NotFoundPage';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function CategoryPage() {
  const { slug } = useParams();
  const { t } = useI18n();
  const category = getCategory(slug);
  if (!category) return <NotFoundPage />;
  return (
    <SearchInterface
      title={t(`category.${category.i18nKey}Label`)}
      description={t(`category.${category.i18nKey}Description`)}
      lockedCategory={slug}
    />
  );
}
