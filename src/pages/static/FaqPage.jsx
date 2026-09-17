import { Container } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { Accordion } from '@shared/ui/molecules/Accordion';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function FaqPage() {
  const { t } = useI18n();
  const items = t('faq.items').map((item) => ({ title: item.q, content: item.a }));
  return (
    <Container className="py-4xl">
      <div className="mx-auto max-w-2xl">
        <Text size="caption" className="mb-3 text-accent">
          {t('faq.eyebrow')}
        </Text>
        <Heading level="h1" className="mb-9">
          {t('faq.title')}
        </Heading>
        <Accordion items={items} defaultOpenIndex={0} />
      </div>
    </Container>
  );
}
