import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { DataTable } from '@widgets/data-table/DataTable';
import { ASSETS } from '@entities/asset/model/mock';
import { getCreatorById } from '@entities/creator/model/mock';

export default function AdminAssetsPage() {
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
        { key: 'title', label: 'Title' },
        { key: 'creator', label: 'Creator' },
        { key: 'category', label: 'Category' },
        { key: 'downloads', label: 'Downloads' },
        { key: 'status', label: 'Status', render: (row) => <Badge variant="success">{row.status}</Badge> },
      ]}
      rows={rows}
      rowActions={() => (
        <Button variant="ghost" size="xs">
          Review
        </Button>
      )}
    />
  );
}
