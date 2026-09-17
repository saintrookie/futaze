import { Link } from 'react-router-dom';
import { DollarSign, ShoppingCart, Users, Image, ShieldAlert, Flag, ChevronRight } from 'lucide-react';
import { Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { MetricsGrid } from '@widgets/dashboard-metrics/MetricsGrid';
import { TrendChart } from '@widgets/dashboard-metrics/TrendChart';
import { EARNINGS_TREND } from '@entities/payout';
import { MODERATION_QUEUE, REPORTS } from '@entities/report';
import { useI18n } from '@shared/i18n/LocaleProvider';

const MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const GMV_TREND = EARNINGS_TREND.map((v) => v * 22);

export default function AdminDashboardPage() {
  const { t } = useI18n();
  const openReportsCount = REPORTS.filter((r) => r.status === 'open').length;

  return (
    <Stack gap="2xl">
      <MetricsGrid
        metrics={[
          { label: t('adminDashboard.gmv'), value: '$284,120', delta: 9, icon: <DollarSign /> },
          { label: t('adminDashboard.orders'), value: '4,812', delta: 5, icon: <ShoppingCart /> },
          { label: t('adminDashboard.activeUsers'), value: '38,204', delta: 3, icon: <Users /> },
          { label: t('adminDashboard.publishedAssets'), value: '92,441', delta: 7, icon: <Image /> },
        ]}
      />

      <div className="rounded-xl border border-border bg-surface-elevated p-6">
        <Heading level="h4" as="h2" className="mb-4">
          {t('adminDashboard.needsAttentionTitle')}
        </Heading>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            to="/admin/moderation"
            className="flex items-center justify-between gap-3 rounded-lg border border-border p-4 transition-colors duration-fast hover:bg-surface"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning">
                <ShieldAlert className="size-4" />
              </span>
              <Text size="sm" className="font-medium">
                {t('adminDashboard.moderationQueueCount', { count: MODERATION_QUEUE.length })}
              </Text>
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted" />
          </Link>
          <Link
            to="/admin/reports"
            className="flex items-center justify-between gap-3 rounded-lg border border-border p-4 transition-colors duration-fast hover:bg-surface"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
                <Flag className="size-4" />
              </span>
              <Text size="sm" className="font-medium">
                {t('adminDashboard.openReportsCount', { count: openReportsCount })}
              </Text>
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted" />
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface-elevated p-6">
        <Heading level="h4" as="h2" className="mb-1">
          {t('adminDashboard.gmvChartTitle')}
        </Heading>
        <Text size="sm" muted className="mb-5">
          {t('adminDashboard.gmvChartSubtitle')}
        </Text>
        <TrendChart data={GMV_TREND} labels={MONTHS} />
      </div>
    </Stack>
  );
}
