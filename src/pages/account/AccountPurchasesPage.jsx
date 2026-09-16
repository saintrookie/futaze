import { Badge } from '@shared/ui/atoms/Badge';
import { DataTable } from '@widgets/data-table/DataTable';
import { ORDERS } from '@entities/order';
import { getLicense } from '@entities/license/model/licenses';

export default function AccountPurchasesPage() {
  const rows = ORDERS.map((o) => ({
    id: o.id,
    order: o.id,
    title: o.asset.title,
    license: getLicense(o.license).label,
    amount: `$${o.amount.toFixed(2)}`,
    status: o.status,
    date: o.purchasedAt,
  }));

  return (
    <DataTable
      searchKeys={['title', 'order']}
      columns={[
        { key: 'order', label: 'Order' },
        { key: 'title', label: 'Asset' },
        { key: 'license', label: 'License' },
        { key: 'amount', label: 'Amount' },
        {
          key: 'status',
          label: 'Status',
          render: (row) => <Badge variant={row.status === 'completed' ? 'success' : 'danger'}>{row.status}</Badge>,
        },
        { key: 'date', label: 'Date' },
      ]}
      rows={rows}
      emptyTitle="No purchases yet"
      emptyDescription="Assets you buy will show up here with their order details and license."
    />
  );
}
