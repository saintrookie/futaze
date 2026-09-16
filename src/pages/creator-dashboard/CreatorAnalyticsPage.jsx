import { Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { MetricsGrid } from '@widgets/dashboard-metrics/MetricsGrid';
import { TrendChart } from '@widgets/dashboard-metrics/TrendChart';
import { Eye, MousePointerClick, Percent } from 'lucide-react';

const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
const VIEWS = [1200, 1600, 1450, 1900, 2100, 1800, 2400, 2650];
const CONVERSIONS = [3.1, 3.4, 2.9, 3.8, 4.2, 3.6, 4.5, 4.8];

export default function CreatorAnalyticsPage() {
  return (
    <Stack gap="2xl">
      <MetricsGrid
        metrics={[
          { label: 'Total views', value: '18,200', delta: 8, icon: <Eye /> },
          { label: 'Click-through rate', value: '6.4%', delta: 2, icon: <MousePointerClick /> },
          { label: 'Conversion rate', value: '4.8%', delta: 4, icon: <Percent /> },
        ]}
      />
      <div className="rounded-xl border border-border bg-surface-elevated p-6">
        <Heading level="h4" as="h2" className="mb-1">
          Views over time
        </Heading>
        <Text size="sm" muted className="mb-5">
          Last 8 weeks
        </Text>
        <TrendChart data={VIEWS} labels={WEEKS} />
      </div>
      <div className="rounded-xl border border-border bg-surface-elevated p-6">
        <Heading level="h4" as="h2" className="mb-1">
          Conversion rate
        </Heading>
        <Text size="sm" muted className="mb-5">
          Percentage of views that led to a purchase
        </Text>
        <TrendChart data={CONVERSIONS} labels={WEEKS} />
      </div>
    </Stack>
  );
}
