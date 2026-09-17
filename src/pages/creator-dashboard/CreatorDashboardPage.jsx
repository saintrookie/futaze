import { Link } from 'react-router-dom';
import { DollarSign, Download, Eye, Heart, ChevronRight } from 'lucide-react';
import { Stack, Grid } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { MetricsGrid } from '@widgets/dashboard-metrics/MetricsGrid';
import { TrendChart } from '@widgets/dashboard-metrics/TrendChart';
import { AssetCard } from '@entities/asset';
import { fetchAssetsByCreator } from '@entities/asset/api/assetApi';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@entities/user';
import { getCreatorByUsername } from '@entities/creator/model/mock';
import { EARNINGS_TREND, EARNINGS_SUMMARY } from '@entities/payout';
import { useI18n } from '@shared/i18n/LocaleProvider';

const MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

export default function CreatorDashboardPage() {
  const { t, formatPrice, formatDate } = useI18n();
  const { user } = useSession();
  const creator = getCreatorByUsername(user?.creatorUsername);
  const { data: assets } = useQuery({
    queryKey: ['creator-dashboard-assets', creator?.id],
    queryFn: () => fetchAssetsByCreator(creator.id, { limit: 4 }),
    enabled: !!creator,
  });

  return (
    <Stack gap="2xl">
      <MetricsGrid
        metrics={[
          { label: t('creatorHome.revenue'), value: '$1,284', delta: 12, icon: <DollarSign /> },
          { label: t('creatorHome.downloads'), value: '842', delta: 6, icon: <Download /> },
          { label: t('creatorHome.views'), value: '18.2k', delta: -3, icon: <Eye /> },
          { label: t('creatorHome.favorites'), value: '312', delta: 9, icon: <Heart /> },
        ]}
      />

      <Link
        to="/creator-dashboard/earnings"
        className="flex flex-col gap-1 rounded-xl border border-accent/20 bg-accent/5 p-5 transition-colors duration-fast hover:bg-accent/10 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <Text size="caption" muted>
            {t('creatorHome.nextPayoutTitle')}
          </Text>
          <p className="mt-1 font-display text-xl font-medium text-foreground">
            {t('creatorHome.nextPayoutAmount', { amount: formatPrice(EARNINGS_SUMMARY.availableBalance) })}
          </p>
          <Text size="sm" muted className="mt-0.5">
            {t('creatorHome.nextPayoutDate', { date: formatDate(EARNINGS_SUMMARY.nextPayoutDate) })}
          </Text>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-accent">
          {t('creatorHome.viewEarnings')} <ChevronRight className="size-4" />
        </span>
      </Link>

      <div className="rounded-xl border border-border bg-surface-elevated p-6">
        <Heading level="h4" as="h2" className="mb-1">
          {t('creatorHome.earningsChartTitle')}
        </Heading>
        <Text size="sm" muted className="mb-5">
          {t('creatorHome.earningsChartSubtitle')}
        </Text>
        <TrendChart data={EARNINGS_TREND} labels={MONTHS} />
      </div>

      <div>
        <Heading level="h4" as="h2" className="mb-4">
          {t('creatorHome.topAssetsTitle')}
        </Heading>
        {assets && assets.length > 0 ? (
          <Grid cols="grid-cols-2 lg:grid-cols-4" gap="lg">
            {assets.map((a) => (
              <AssetCard key={a.id} asset={a} showCreator={false} />
            ))}
          </Grid>
        ) : (
          <Text size="sm" muted>
            {t('creatorHome.topAssetsEmpty')}
          </Text>
        )}
      </div>
    </Stack>
  );
}
