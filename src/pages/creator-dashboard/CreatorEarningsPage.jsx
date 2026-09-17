import { Grid, Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text, Price } from '@shared/ui/atoms/Typography';
import { TrendChart } from '@widgets/dashboard-metrics/TrendChart';
import { DataTable } from '@widgets/data-table/DataTable';
import { EARNINGS_SUMMARY, EARNINGS_TREND } from '@entities/payout';
import { ASSETS } from '@entities/asset/model/mock';
import { useI18n } from '@shared/i18n/LocaleProvider';

const MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

export default function CreatorEarningsPage() {
  const { t } = useI18n();
  const rows = ASSETS.slice(0, 10).map((a) => ({
    id: a.id,
    title: a.title,
    downloads: a.downloads,
    revenue: `$${(a.downloads * a.price * 0.012).toFixed(2)}`,
  }));

  return (
    <Stack gap="2xl">
      <Grid cols="grid-cols-1 sm:grid-cols-3" gap="md">
        <SummaryCard label={t('creatorEarnings.availableBalance')} value={EARNINGS_SUMMARY.availableBalance} />
        <SummaryCard label={t('creatorEarnings.pendingBalance')} value={EARNINGS_SUMMARY.pendingBalance} />
        <SummaryCard label={t('creatorEarnings.lifetimeEarnings')} value={EARNINGS_SUMMARY.lifetimeEarnings} />
      </Grid>

      <div className="rounded-xl border border-border bg-surface-elevated p-6">
        <Heading level="h4" as="h2" className="mb-1">
          {t('creatorEarnings.trendTitle')}
        </Heading>
        <Text size="sm" muted className="mb-5">
          {t('creatorEarnings.nextPayout', { date: EARNINGS_SUMMARY.nextPayoutDate })}
        </Text>
        <TrendChart data={EARNINGS_TREND} labels={MONTHS} />
      </div>

      <div>
        <Heading level="h4" as="h2" className="mb-4">
          {t('creatorEarnings.revenueByAssetTitle')}
        </Heading>
        <DataTable
          searchKeys={['title']}
          columns={[
            { key: 'title', label: t('table.columnAsset') },
            { key: 'downloads', label: t('table.columnDownloads') },
            { key: 'revenue', label: t('table.columnRevenue') },
          ]}
          rows={rows}
        />
      </div>
    </Stack>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated p-5">
      <Text size="caption" muted>
        {label}
      </Text>
      <Price value={value} size="lg" className="mt-2 block" />
    </div>
  );
}
