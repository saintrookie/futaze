import { Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { MetricsGrid } from '@widgets/dashboard-metrics/MetricsGrid';
import { TrendChart } from '@widgets/dashboard-metrics/TrendChart';
import { Eye, MousePointerClick, Percent } from 'lucide-react';
import { useI18n } from '@shared/i18n/LocaleProvider';

const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
const VIEWS = [1200, 1600, 1450, 1900, 2100, 1800, 2400, 2650];
const CONVERSIONS = [3.1, 3.4, 2.9, 3.8, 4.2, 3.6, 4.5, 4.8];

export default function CreatorAnalyticsPage() {
  const { t } = useI18n();
  return (
    <Stack gap="2xl">
      <MetricsGrid
        metrics={[
          { label: t('creatorAnalytics.totalViews'), value: '18,200', delta: 8, icon: <Eye /> },
          { label: t('creatorAnalytics.clickThroughRate'), value: '6.4%', delta: 2, icon: <MousePointerClick /> },
          { label: t('creatorAnalytics.conversionRate'), value: '4.8%', delta: 4, icon: <Percent /> },
        ]}
      />
      <div className="rounded-xl border border-border bg-surface-elevated p-6">
        <Heading level="h4" as="h2" className="mb-1">
          {t('creatorAnalytics.viewsChartTitle')}
        </Heading>
        <Text size="sm" muted className="mb-5">
          {t('creatorAnalytics.viewsChartSubtitle')}
        </Text>
        <TrendChart data={VIEWS} labels={WEEKS} />
      </div>
      <div className="rounded-xl border border-border bg-surface-elevated p-6">
        <Heading level="h4" as="h2" className="mb-1">
          {t('creatorAnalytics.conversionChartTitle')}
        </Heading>
        <Text size="sm" muted className="mb-5">
          {t('creatorAnalytics.conversionChartSubtitle')}
        </Text>
        <TrendChart data={CONVERSIONS} labels={WEEKS} />
      </div>
    </Stack>
  );
}
