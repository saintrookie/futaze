import { Link } from 'react-router-dom';
import { Eye, Pencil, UploadCloud } from 'lucide-react';
import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { DataTable } from '@widgets/data-table/DataTable';
import { useSession } from '@entities/user';
import { getCreatorByUsername } from '@entities/creator/model/mock';
import { ASSETS } from '@entities/asset/model/mock';
import { useI18n } from '@shared/i18n/LocaleProvider';

const STATUS_VARIANT = { PUBLISHED: 'success', UNDER_REVIEW: 'warning', DRAFT: 'neutral' };

export default function CreatorAssetsPage() {
  const { t } = useI18n();
  const { user } = useSession();
  const creator = getCreatorByUsername(user?.creatorUsername);
  const rows = ASSETS.filter((a) => a.creatorId === creator?.id).map((a) => ({
    id: a.id,
    title: a.title,
    category: a.categorySlug,
    price: `$${a.price.toFixed(2)}`,
    downloads: a.downloads,
    status: a.status,
    slug: a.slug,
  }));

  return (
    <DataTable
      searchKeys={['title', 'category']}
      toolbar={
        <Button as={Link} to="/creator-dashboard/upload" variant="secondary" size="sm" iconLeft={<UploadCloud />}>
          {t('creatorAssets.uploadNew')}
        </Button>
      }
      columns={[
        { key: 'title', label: t('table.columnTitle') },
        { key: 'category', label: t('table.columnCategory') },
        { key: 'price', label: t('table.columnPrice') },
        { key: 'downloads', label: t('table.columnDownloads') },
        {
          key: 'status',
          label: t('table.columnStatus'),
          render: (row) => <Badge variant={STATUS_VARIANT[row.status] || 'neutral'}>{row.status.replace('_', ' ')}</Badge>,
        },
      ]}
      rows={rows}
      rowActions={(row) => (
        <div className="flex items-center justify-end gap-1">
          <Button as={Link} to={`/asset/${row.slug}`} variant="ghost" size="xs" iconLeft={<Eye />}>
            {t('common.view')}
          </Button>
          <Button variant="ghost" size="xs" iconLeft={<Pencil />}>
            {t('common.edit')}
          </Button>
        </div>
      )}
      emptyTitle={t('creatorAssets.emptyTitle')}
      emptyDescription={t('creatorAssets.emptyDescription')}
    />
  );
}
