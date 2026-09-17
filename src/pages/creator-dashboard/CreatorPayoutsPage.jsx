import { Badge } from '@shared/ui/atoms/Badge';
import { DataTable } from '@widgets/data-table/DataTable';
import { PAYOUTS } from '@entities/payout';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function CreatorPayoutsPage() {
  const { t } = useI18n();
  const rows = PAYOUTS.map((p) => ({ id: p.id, payout: p.id, amount: `$${p.amount.toFixed(2)}`, status: p.status, date: p.date }));

  return (
    <DataTable
      searchKeys={['payout']}
      columns={[
        { key: 'payout', label: t('table.columnPayout') },
        { key: 'amount', label: t('table.columnAmount') },
        { key: 'status', label: t('table.columnStatus'), render: (row) => <Badge variant="success">{row.status}</Badge> },
        { key: 'date', label: t('table.columnDate') },
      ]}
      rows={rows}
      emptyTitle={t('creatorPayouts.emptyTitle')}
      emptyDescription={t('creatorPayouts.emptyDescription')}
    />
  );
}
