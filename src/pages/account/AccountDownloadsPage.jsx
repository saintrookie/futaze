import { Download } from 'lucide-react';
import { Button } from '@shared/ui/atoms/Button';
import { DataTable } from '@widgets/data-table/DataTable';
import { DOWNLOADS } from '@entities/order';
import { getLicense } from '@entities/license/model/licenses';

export default function AccountDownloadsPage() {
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
        { key: 'title', label: 'Asset' },
        { key: 'license', label: 'License' },
        { key: 'version', label: 'Version' },
        { key: 'date', label: 'Downloaded' },
      ]}
      rows={rows}
      rowActions={() => (
        <Button variant="secondary" size="xs" iconLeft={<Download />}>
          Re-download
        </Button>
      )}
      emptyTitle="No downloads yet"
      emptyDescription="Files from your purchases will appear here, available to re-download at any time."
    />
  );
}
