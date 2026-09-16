import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { DataTable } from '@widgets/data-table/DataTable';
import { CREATORS } from '@entities/creator';

export default function AdminCreatorsPage() {
  const rows = CREATORS.map((c) => ({
    id: c.id,
    name: c.name,
    username: c.username,
    assets: c.assetsCount,
    followers: c.followers.toLocaleString(),
    verified: c.verified,
  }));

  return (
    <DataTable
      searchKeys={['name', 'username']}
      columns={[
        { key: 'name', label: 'Creator' },
        { key: 'username', label: 'Username' },
        { key: 'assets', label: 'Assets' },
        { key: 'followers', label: 'Followers' },
        {
          key: 'verified',
          label: 'Status',
          render: (row) => <Badge variant={row.verified ? 'success' : 'neutral'}>{row.verified ? 'Verified' : 'Unverified'}</Badge>,
        },
      ]}
      rows={rows}
      rowActions={() => (
        <Button variant="ghost" size="xs">
          Manage
        </Button>
      )}
    />
  );
}
