import { DollarSign, ShoppingCart, Users, Image } from 'lucide-react';
import { Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { MetricsGrid } from '@widgets/dashboard-metrics/MetricsGrid';
import { TrendChart } from '@widgets/dashboard-metrics/TrendChart';
import { EARNINGS_TREND } from '@entities/payout';

const MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const GMV_TREND = EARNINGS_TREND.map((v) => v * 22);

export default function AdminDashboardPage() {
  return (
    <Stack gap="2xl">
      <MetricsGrid
        metrics={[
          { label: 'GMV (30d)', value: '$284,120', delta: 9, icon: <DollarSign /> },
          { label: 'Orders (30d)', value: '4,812', delta: 5, icon: <ShoppingCart /> },
          { label: 'Active users', value: '38,204', delta: 3, icon: <Users /> },
          { label: 'Published assets', value: '92,441', delta: 7, icon: <Image /> },
        ]}
      />
      <div className="rounded-xl border border-border bg-surface-elevated p-6">
        <Heading level="h4" as="h2" className="mb-1">
          Gross merchandise value
        </Heading>
        <Text size="sm" muted className="mb-5">
          Last 8 months, platform-wide
        </Text>
        <TrendChart data={GMV_TREND} labels={MONTHS} />
      </div>
    </Stack>
  );
}
