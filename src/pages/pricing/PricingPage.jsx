import { Container, Section } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { PricingTable } from '@widgets/pricing-table/PricingTable';
import { LICENSE_ORDER, getLicense } from '@entities/license/model/licenses';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const { t } = useI18n();
  return (
    <Container className="py-4xl">
      <div className="mx-auto max-w-2xl text-center">
        <Text size="caption" className="mb-3 text-accent">
          {t('pricing.eyebrow')}
        </Text>
        <Heading level="h1">{t('pricing.title')}</Heading>
        <Text size="lg" muted className="mt-4">
          {t('pricing.description')}
        </Text>
      </div>

      <Section>
        <PricingTable />
      </Section>

      <Section id="licensing">
        <Heading level="h2" className="mb-8 text-center">
          {t('pricing.licensingTitle')}
        </Heading>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LICENSE_ORDER.map((key) => {
            const license = getLicense(key);
            return (
              <div key={key} className="rounded-xl border border-border bg-surface-elevated p-6">
                <Heading level="h4" as="h3">
                  {t(`license.${license.i18nKey}Label`)}
                </Heading>
                <Text size="sm" muted className="mt-1.5">
                  {t(`license.${license.i18nKey}Summary`)}
                </Text>
                <ul className="mt-4 flex flex-col gap-2">
                  {t(`license.${license.i18nKey}Includes`).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>
    </Container>
  );
}
