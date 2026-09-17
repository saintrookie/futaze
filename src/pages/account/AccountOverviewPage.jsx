import { Link } from 'react-router-dom';
import { Receipt, Download, Heart, FolderHeart } from 'lucide-react';
import { Grid, Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text, Price } from '@shared/ui/atoms/Typography';
import { Avatar } from '@shared/ui/atoms/Avatar';
import { Separator } from '@shared/ui/atoms/Separator';
import { useSession } from '@entities/user';
import { ORDERS, DOWNLOADS } from '@entities/order';
import { useFavoritesStore } from '@features/favorite-asset';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AccountOverviewPage() {
  const { t } = useI18n();
  const { user } = useSession();
  const favoriteCount = useFavoritesStore((s) => s.ids.length);

  const stats = [
    { label: t('accountNav.purchases'), value: ORDERS.length, icon: Receipt, to: '/account/purchases' },
    { label: t('accountNav.downloads'), value: DOWNLOADS.length, icon: Download, to: '/account/downloads' },
    { label: t('accountNav.favorites'), value: favoriteCount, icon: Heart, to: '/account/favorites' },
    { label: t('accountNav.collections'), value: 3, icon: FolderHeart, to: '/account/collections' },
  ];

  return (
    <Stack gap="2xl">
      <div className="flex items-center gap-4 rounded-xl border border-border bg-surface-elevated p-5">
        <Avatar src={user?.avatar} name={user?.name} size="lg" />
        <div>
          <p className="font-medium text-foreground">{user?.name}</p>
          <p className="text-sm text-muted">{user?.email}</p>
          <p className="mt-1 text-xs text-accent">{user?.plan}</p>
        </div>
      </div>

      <Grid cols="grid-cols-2 lg:grid-cols-4" gap="md">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="rounded-xl border border-border bg-surface-elevated p-5 transition-colors duration-fast hover:bg-surface">
            <s.icon className="size-4 text-muted" />
            <p className="mt-3 font-display text-2xl font-medium text-foreground">{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </Link>
        ))}
      </Grid>

      <div>
        <Heading level="h4" as="h2" className="mb-4">
          {t('account.recentPurchases')}
        </Heading>
        <div className="rounded-xl border border-border bg-surface-elevated">
          {ORDERS.slice(0, 4).map((o, i) => (
            <div key={o.id}>
              {i > 0 && <Separator />}
              <div className="flex items-center gap-4 p-4">
                <img src={o.asset.previewImage} alt="" className="size-12 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{o.asset.title}</p>
                  <p className="text-xs text-muted">{o.purchasedAt}</p>
                </div>
                <Price value={o.amount} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Stack>
  );
}
