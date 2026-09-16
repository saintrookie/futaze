import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { DataTable } from '@widgets/data-table/DataTable';
import { REPORTS } from '@entities/report';

export default function AdminReportsPage() {
  const rows = REPORTS.map((r) => ({
    id: r.id,
    title: r.asset.title,
    reporter: r.reporter,
    reason: r.reason,
    status: r.status,
    date: r.submittedAt,
  }));

  return (
    <DataTable
      searchKeys={['title', 'reason']}
      columns={[
        { key: 'title', label: 'Asset' },
        { key: 'reporter', label: 'Reporter' },
        { key: 'reason', label: 'Reason' },
        { key: 'status', label: 'Status', render: (row) => <Badge variant={row.status === 'open' ? 'warning' : 'success'}>{row.status}</Badge> },
        { key: 'date', label: 'Date' },
      ]}
      rows={rows}
      rowActions={() => (
        <Button variant="ghost" size="xs">
          Review
        </Button>
      )}
      emptyTitle="No reports"
      emptyDescription="User-submitted content reports will appear here."
    />
  );
}
