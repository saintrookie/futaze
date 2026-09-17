import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { DataTable } from '@widgets/data-table/DataTable';
import { REPORTS } from '@entities/report';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AdminReportsPage() {
  const { t } = useI18n();
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
        { key: 'title', label: t('table.columnAsset') },
        { key: 'reporter', label: t('table.columnReporter') },
        { key: 'reason', label: t('table.columnReason') },
        {
          key: 'status',
          label: t('table.columnStatus'),
          render: (row) => <Badge variant={row.status === 'open' ? 'warning' : 'success'}>{row.status}</Badge>,
        },
        { key: 'date', label: t('table.columnDate') },
      ]}
      rows={rows}
      rowActions={() => (
        <Button variant="ghost" size="xs">
          {t('common.review')}
        </Button>
      )}
      emptyTitle={t('adminReports.emptyTitle')}
      emptyDescription={t('adminReports.emptyDescription')}
    />
  );
}
