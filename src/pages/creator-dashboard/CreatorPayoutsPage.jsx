import { Badge } from '@shared/ui/atoms/Badge';
import { DataTable } from '@widgets/data-table/DataTable';
import { PAYOUTS } from '@entities/payout';

export default function CreatorPayoutsPage() {
  const rows = PAYOUTS.map((p) => ({ id: p.id, payout: p.id, amount: `$${p.amount.toFixed(2)}`, status: p.status, date: p.date }));

  return (
    <DataTable
      searchKeys={['payout']}
      columns={[
        { key: 'payout', label: 'Payout' },
        { key: 'amount', label: 'Amount' },
        { key: 'status', label: 'Status', render: (row) => <Badge variant="success">{row.status}</Badge> },
        { key: 'date', label: 'Date' },
      ]}
      rows={rows}
      emptyTitle="No payouts yet"
      emptyDescription="Once you have a positive balance, payouts will appear here on your monthly cycle."
    />
  );
}
