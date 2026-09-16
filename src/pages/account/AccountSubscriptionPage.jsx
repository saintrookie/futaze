import { Check } from 'lucide-react';
import { Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text, Price } from '@shared/ui/atoms/Typography';
import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { Separator } from '@shared/ui/atoms/Separator';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AccountSubscriptionPage() {
  const { t, formatDate } = useI18n();
  return (
    <Stack gap="xl">
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="accent" className="mb-3">
              {t('checkout.subscriptionActive')}
            </Badge>
            <Heading level="h4" as="h2">
              {t('checkout.subscriptionName')}
            </Heading>
            <Text size="sm" muted className="mt-1">
              {t('checkout.subscriptionSummary')}
            </Text>
          </div>
          <Price value={39} size="lg" />
        </div>
        <Separator className="my-5" />
        <div className="flex items-center justify-between text-sm">
          <Text size="sm" muted>
            {t('checkout.downloadsUsedThisCycle')}
          </Text>
          <Text size="sm" className="font-medium">
            4 / 10
          </Text>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
          <div className="h-full w-2/5 rounded-full bg-accent" />
        </div>
        <Text size="xs" muted className="mt-2">
          {t('checkout.renewsOn', { date: formatDate('2025-10-14') })}
        </Text>
        <div className="mt-5 flex gap-3">
          <Button variant="secondary" size="sm">
            {t('checkout.changePlan')}
          </Button>
          <Button variant="ghost" size="sm" className="text-danger">
            {t('checkout.cancelSubscription')}
          </Button>
        </div>
      </div>

      <div>
        <Heading level="h4" as="h2" className="mb-3">
          {t('checkout.whatsIncluded')}
        </Heading>
        <ul className="flex flex-col gap-2.5">
          {t('checkout.subscriptionFeatures').map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
              <Check className="size-4 text-success" /> {f}
            </li>
          ))}
        </ul>
      </div>
    </Stack>
  );
}
