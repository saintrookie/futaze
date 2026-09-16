import { Check } from 'lucide-react';
import { Grid } from '@shared/ui/primitives/Layout';
import { Heading, Text, Price } from '@shared/ui/atoms/Typography';
import { Button } from '@shared/ui/atoms/Button';
import { Badge } from '@shared/ui/atoms/Badge';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { cn } from '@shared/lib/cn';

function buildPlans(t) {
  return [
    {
      id: 'starter',
      name: t('pricing.starterName'),
      price: 0,
      cadenceKey: 'pricing.forever',
      description: t('pricing.starterDescription'),
      features: t('pricing.starterFeatures'),
    },
    {
      id: 'pro',
      name: t('pricing.proName'),
      price: 39,
      cadenceKey: 'pricing.perMonth',
      description: t('pricing.proDescription'),
      features: t('pricing.proFeatures'),
      highlighted: true,
    },
    {
      id: 'team',
      name: t('pricing.teamName'),
      price: 129,
      cadenceKey: 'pricing.perMonth',
      description: t('pricing.teamDescription'),
      features: t('pricing.teamFeatures'),
    },
  ];
}

export function PricingTable() {
  const { t } = useI18n();
  const plans = buildPlans(t);

  return (
    <Grid cols="grid-cols-1 md:grid-cols-3" gap="lg">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            'flex flex-col rounded-2xl border p-7',
            plan.highlighted ? 'border-accent bg-accent/5 shadow-md' : 'border-border bg-surface-elevated'
          )}
        >
          {plan.highlighted && (
            <Badge variant="accent" className="mb-4 self-start">
              {t('pricing.mostPopular')}
            </Badge>
          )}
          <Heading level="h4" as="h3">
            {plan.name}
          </Heading>
          <div className="mt-3 flex items-baseline gap-1.5">
            <Price value={plan.price} size="lg" />
            <span className="text-sm text-muted">{t(plan.cadenceKey)}</span>
          </div>
          <Text size="sm" muted className="mt-3">
            {plan.description}
          </Text>
          <ul className="mt-6 flex flex-1 flex-col gap-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                {f}
              </li>
            ))}
          </ul>
          <Button variant={plan.highlighted ? 'accent' : 'secondary'} size="lg" className="mt-7">
            {plan.price === 0 ? t('pricing.startFree') : t('pricing.choosePlan', { name: plan.name })}
          </Button>
        </div>
      ))}
    </Grid>
  );
}
