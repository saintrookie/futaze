import { Download } from 'lucide-react';
import { Button } from '@shared/ui/atoms/Button';
import { DataTable } from '@widgets/data-table/DataTable';
import { DOWNLOADS } from '@entities/order';
import { getLicense } from '@entities/license/model/licenses';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AccountDownloadsPage() {
  const { t } = useI18n();
  const rows = DOWNLOADS.map((d) => ({
    id: d.id,
    title: d.asset.title,
    license: getLicense(d.license).label,
    version: d.version,
    date: d.downloadedAt,
    assetId: d.assetId,
  }));

  return (
    <DataTable
      searchKeys={['title']}
      columns={[
        { key: 'title', label: t('table.columnAsset') },
        { key: 'license', label: t('table.columnLicense') },
        { key: 'version', label: t('table.columnVersion') },
        { key: 'date', label: t('table.columnDownloaded') },
      ]}
      rows={rows}
      rowActions={() => (
        <Button variant="secondary" size="xs" iconLeft={<Download />}>
          {t('account.redownload')}
        </Button>
      )}
      emptyTitle={t('account.noDownloadsTitle')}
      emptyDescription={t('account.noDownloadsDescription')}
    />
  );
}
