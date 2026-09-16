import { Link } from 'react-router-dom';
import { Eye, Pencil, UploadCloud } from 'lucide-react';
import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { DataTable } from '@widgets/data-table/DataTable';
import { useSession } from '@entities/user';
import { getCreatorByUsername } from '@entities/creator/model/mock';
import { ASSETS } from '@entities/asset/model/mock';

const STATUS_VARIANT = { PUBLISHED: 'success', UNDER_REVIEW: 'warning', DRAFT: 'neutral' };

export default function CreatorAssetsPage() {
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
          Upload new
        </Button>
      }
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price' },
        { key: 'downloads', label: 'Downloads' },
        { key: 'status', label: 'Status', render: (row) => <Badge variant={STATUS_VARIANT[row.status] || 'neutral'}>{row.status.replace('_', ' ')}</Badge> },
      ]}
      rows={rows}
      rowActions={(row) => (
        <div className="flex items-center justify-end gap-1">
          <Button as={Link} to={`/asset/${row.slug}`} variant="ghost" size="xs" iconLeft={<Eye />}>
            View
          </Button>
          <Button variant="ghost" size="xs" iconLeft={<Pencil />}>
            Edit
          </Button>
        </div>
      )}
      emptyTitle="No assets published"
      emptyDescription="Upload your first asset to start earning from your work."
    />
  );
}
