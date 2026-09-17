import { Badge } from '@shared/ui/atoms/Badge';
import { DataTable } from '@widgets/data-table/DataTable';
import { ORDERS } from '@entities/order';
import { getLicense } from '@entities/license/model/licenses';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AccountPurchasesPage() {
  const { t } = useI18n();
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
        { key: 'order', label: t('table.columnOrder') },
        { key: 'title', label: t('table.columnAsset') },
        { key: 'license', label: t('table.columnLicense') },
        { key: 'amount', label: t('table.columnAmount') },
        {
          key: 'status',
          label: t('table.columnStatus'),
          render: (row) => <Badge variant={row.status === 'completed' ? 'success' : 'danger'}>{row.status}</Badge>,
        },
        { key: 'date', label: t('table.columnDate') },
      ]}
      rows={rows}
      emptyTitle={t('account.noPurchasesTitle')}
      emptyDescription={t('account.noPurchasesDescription')}
    />
  );
}
