import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { DataTable } from '@widgets/data-table/DataTable';
import { MOCK_USERS } from '@entities/user';

export default function AdminUsersPage() {
  return (
    <DataTable
      searchKeys={['name', 'email']}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role', render: (row) => <Badge variant="neutral">{row.role}</Badge> },
        {
          key: 'status',
          label: 'Status',
          render: (row) => <Badge variant={row.status === 'active' ? 'success' : 'danger'}>{row.status}</Badge>,
        },
        { key: 'joined', label: 'Joined' },
      ]}
      rows={MOCK_USERS}
      rowActions={() => (
        <Button variant="ghost" size="xs">
          Manage
        </Button>
      )}
      emptyTitle="No users found"
    />
  );
}
