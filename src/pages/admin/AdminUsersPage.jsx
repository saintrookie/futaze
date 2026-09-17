import { useState } from 'react';
import { CircleCheck, Ban } from 'lucide-react';
import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { DataTable } from '@widgets/data-table/DataTable';
import { MOCK_USERS } from '@entities/user';
import { useI18n } from '@shared/i18n/LocaleProvider';

/**
 * Reference adoption of DataTable's selection + bulk-action capability:
 * status updates are applied to a local copy of the mock rows (front-end
 * only, same realism level as the rest of the mock data layer) rather than
 * a real mutation, since no admin API exists yet.
 */
export default function AdminUsersPage() {
  const { t } = useI18n();
  const [users, setUsers] = useState(MOCK_USERS);

  const setStatus = (rows, status) => {
    const ids = new Set(rows.map((r) => r.id));
    setUsers((prev) => prev.map((u) => (ids.has(u.id) ? { ...u, status } : u)));
  };

  return (
    <DataTable
      searchKeys={['name', 'email']}
      columns={[
        { key: 'name', label: t('table.columnName') },
        { key: 'email', label: t('table.columnEmail') },
        { key: 'role', label: t('table.columnRole'), render: (row) => <Badge variant="neutral">{row.role}</Badge> },
        {
          key: 'status',
          label: t('table.columnStatus'),
          render: (row) => <Badge variant={row.status === 'active' ? 'success' : 'danger'}>{row.status}</Badge>,
        },
        { key: 'joined', label: t('table.columnJoined') },
      ]}
      rows={users}
      rowActions={() => (
        <Button variant="ghost" size="xs">
          {t('common.manage')}
        </Button>
      )}
      emptyTitle={t('adminUsers.emptyTitle')}
      selectable
      bulkActions={[
        { label: t('adminUsers.activate'), icon: <CircleCheck />, onClick: (rows) => setStatus(rows, 'active') },
        { label: t('adminUsers.suspend'), icon: <Ban />, variant: 'destructive', onClick: (rows) => setStatus(rows, 'suspended') },
      ]}
    />
  );
}
