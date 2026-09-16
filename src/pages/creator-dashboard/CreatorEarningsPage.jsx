import { Grid, Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text, Price } from '@shared/ui/atoms/Typography';
import { TrendChart } from '@widgets/dashboard-metrics/TrendChart';
import { DataTable } from '@widgets/data-table/DataTable';
import { EARNINGS_SUMMARY, EARNINGS_TREND } from '@entities/payout';
import { ASSETS } from '@entities/asset/model/mock';

const MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

export default function CreatorEarningsPage() {
  const rows = ASSETS.slice(0, 10).map((a) => ({
    id: a.id,
    title: a.title,
    downloads: a.downloads,
    revenue: `$${(a.downloads * a.price * 0.012).toFixed(2)}`,
  }));

  return (
    <Stack gap="2xl">
      <Grid cols="grid-cols-1 sm:grid-cols-3" gap="md">
        <SummaryCard label="Available balance" value={EARNINGS_SUMMARY.availableBalance} />
        <SummaryCard label="Pending balance" value={EARNINGS_SUMMARY.pendingBalance} />
        <SummaryCard label="Lifetime earnings" value={EARNINGS_SUMMARY.lifetimeEarnings} />
      </Grid>

      <div className="rounded-xl border border-border bg-surface-elevated p-6">
        <Heading level="h4" as="h2" className="mb-1">
          Earnings trend
        </Heading>
        <Text size="sm" muted className="mb-5">
          Next payout on {EARNINGS_SUMMARY.nextPayoutDate}
        </Text>
        <TrendChart data={EARNINGS_TREND} labels={MONTHS} />
      </div>

      <div>
        <Heading level="h4" as="h2" className="mb-4">
          Revenue by asset
        </Heading>
        <DataTable
          searchKeys={['title']}
          columns={[
            { key: 'title', label: 'Asset' },
            { key: 'downloads', label: 'Downloads' },
            { key: 'revenue', label: 'Revenue' },
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
