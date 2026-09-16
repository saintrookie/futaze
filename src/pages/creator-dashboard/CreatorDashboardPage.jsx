import { DollarSign, Download, Eye, Heart } from 'lucide-react';
import { Stack, Grid } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { MetricsGrid } from '@widgets/dashboard-metrics/MetricsGrid';
import { TrendChart } from '@widgets/dashboard-metrics/TrendChart';
import { AssetCard } from '@entities/asset';
import { fetchAssetsByCreator } from '@entities/asset/api/assetApi';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@entities/user';
import { getCreatorByUsername } from '@entities/creator/model/mock';
import { EARNINGS_TREND } from '@entities/payout';

const MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

export default function CreatorDashboardPage() {
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
          { label: 'Revenue (30d)', value: '$1,284', delta: 12, icon: <DollarSign /> },
          { label: 'Downloads (30d)', value: '842', delta: 6, icon: <Download /> },
          { label: 'Views (30d)', value: '18.2k', delta: -3, icon: <Eye /> },
          { label: 'Favorites (30d)', value: '312', delta: 9, icon: <Heart /> },
        ]}
      />

      <div className="rounded-xl border border-border bg-surface-elevated p-6">
        <Heading level="h4" as="h2" className="mb-1">
          Earnings trend
        </Heading>
        <Text size="sm" muted className="mb-5">
          Last 8 months
        </Text>
        <TrendChart data={EARNINGS_TREND} labels={MONTHS} />
      </div>

      <div>
        <Heading level="h4" as="h2" className="mb-4">
          Your top assets
        </Heading>
        {assets && assets.length > 0 ? (
          <Grid cols="grid-cols-2 lg:grid-cols-4" gap="lg">
            {assets.map((a) => (
              <AssetCard key={a.id} asset={a} showCreator={false} />
            ))}
          </Grid>
        ) : (
          <Text size="sm" muted>
            Publish your first asset to see performance here.
          </Text>
        )}
      </div>
    </Stack>
  );
}
