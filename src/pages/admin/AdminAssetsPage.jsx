import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { DataTable } from '@widgets/data-table/DataTable';
import { ASSETS } from '@entities/asset/model/mock';
import { getCreatorById } from '@entities/creator/model/mock';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AdminAssetsPage() {
  const { t } = useI18n();
  const rows = ASSETS.slice(0, 40).map((a) => ({
    id: a.id,
    title: a.title,
    creator: getCreatorById(a.creatorId)?.name,
    category: a.categorySlug,
    status: a.status,
    downloads: a.downloads,
  }));

  return (
    <DataTable
      searchKeys={['title', 'creator', 'category']}
      columns={[
        { key: 'title', label: t('table.columnTitle') },
        { key: 'creator', label: t('table.columnCreator') },
        { key: 'category', label: t('table.columnCategory') },
        { key: 'downloads', label: t('table.columnDownloads') },
        { key: 'status', label: t('table.columnStatus'), render: (row) => <Badge variant="success">{row.status}</Badge> },
      ]}
      rows={rows}
      rowActions={() => (
        <Button variant="ghost" size="xs">
          {t('common.review')}
        </Button>
      )}
    />
  );
}
