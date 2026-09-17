import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { DataTable } from '@widgets/data-table/DataTable';
import { CREATORS } from '@entities/creator';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AdminCreatorsPage() {
  const { t } = useI18n();
  const rows = CREATORS.map((c) => ({
    id: c.id,
    name: c.name,
    username: c.username,
    assets: c.assetsCount,
    followers: c.followers.toLocaleString(),
    verified: c.verified,
  }));

  return (
    <DataTable
      searchKeys={['name', 'username']}
      columns={[
        { key: 'name', label: t('table.columnCreator') },
        { key: 'username', label: t('table.columnUsername') },
        { key: 'assets', label: t('table.columnAssets') },
        { key: 'followers', label: t('table.columnFollowers') },
        {
          key: 'verified',
          label: t('table.columnStatus'),
          render: (row) => (
            <Badge variant={row.verified ? 'success' : 'neutral'}>
              {row.verified ? t('adminCreators.verified') : t('adminCreators.unverified')}
            </Badge>
          ),
        },
      ]}
      rows={rows}
      rowActions={() => (
        <Button variant="ghost" size="xs">
          {t('common.manage')}
        </Button>
      )}
    />
  );
}
