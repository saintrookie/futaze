import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Tag } from 'lucide-react';
import { Container, Grid, Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text, Price } from '@shared/ui/atoms/Typography';
import { Separator } from '@shared/ui/atoms/Separator';
import { Button, IconButton } from '@shared/ui/atoms/Button';
import { Input } from '@shared/ui/atoms/FormControls';
import { EmptyState } from '@shared/ui/patterns/EmptyState';
import { useCartStore } from '@features/purchase-asset';
import { getLicense } from '@entities/license/model/licenses';
import { useLocalizedAssets } from '@entities/asset';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function CheckoutPage() {
  const { t } = useI18n();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  const localizedAssets = useLocalizedAssets(items.map((i) => i.asset));

  const subtotal = items.reduce((sum, i) => sum + i.price, 0);
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <Container className="py-4xl">
        <EmptyState
          icon={<ShoppingBag />}
          title={t('emptyState.emptyCartTitle')}
          description={t('emptyState.emptyCartDescription')}
          action={{ label: t('emptyState.browseMarketplace'), to: '/marketplace' }}
        />
      </Container>
    );
  }

  const placeOrder = async () => {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 900));
    clear();
    navigate('/checkout/success');
  };

  return (
    <Container className="py-9">
      <Heading level="h2" as="h1" className="mb-7">
        {t('checkout.title')}
      </Heading>
      <Grid cols="grid-cols-1 lg:grid-cols-[1fr_22rem]" gap="2xl">
        <div>
          <Stack gap="none">
            {items.map((item, i) => (
              <div key={item.assetId} className="flex items-center gap-4 border-b border-separator py-4 first:pt-0 last:border-0">
                <img src={item.asset.previewImage} alt="" className="size-16 shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{localizedAssets[i]?.title}</p>
                  <p className="text-xs text-muted">
                    {t(`license.${getLicense(item.license).i18nKey}Label`)} {t('license.licenseSuffix')}
                  </p>
                </div>
                <Price value={item.price} size="sm" />
                <IconButton label={t('common.remove')} size="sm" onClick={() => removeItem(item.assetId)}>
                  <Trash2 className="size-4" />
                </IconButton>
              </div>
            ))}
          </Stack>

          <div className="mt-7">
            <Heading level="h4" as="h2" className="mb-4">
              {t('checkout.paymentDetails')}
            </Heading>
            <Stack gap="md">
              <Input placeholder={t('checkout.cardNumberPlaceholder')} />
              <Grid cols="grid-cols-2" gap="md">
                <Input placeholder={t('checkout.expiryPlaceholder')} />
                <Input placeholder={t('checkout.cvcPlaceholder')} />
              </Grid>
            </Stack>
            <Text size="xs" muted className="mt-3">
              {t('checkout.demoNotice')}
            </Text>
          </div>
        </div>

        <aside>
          <div className="rounded-xl border border-border bg-surface-elevated p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="size-4 text-muted" />
              <Input placeholder={t('checkout.couponPlaceholder')} size="sm" />
              <Button variant="secondary" size="sm">
                {t('checkout.apply')}
              </Button>
            </div>
            <Separator className="mb-4" />
            <Stack gap="sm">
              <Row label={t('checkout.subtotal')} value={subtotal} />
              <Row label={t('checkout.estimatedTax')} value={tax} />
            </Stack>
            <Separator className="my-4" />
            <Row label={t('checkout.total')} value={total} bold />
            <Button variant="accent" size="lg" className="mt-6 w-full" loading={placing} onClick={placeOrder}>
              {t('checkout.completePurchase')}
            </Button>
          </div>
        </aside>
      </Grid>
    </Container>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between">
      <Text size="sm" muted={!bold} className={bold ? 'font-medium text-foreground' : undefined}>
        {label}
      </Text>
      <Price value={value} size={bold ? 'md' : 'sm'} />
    </div>
  );
}
