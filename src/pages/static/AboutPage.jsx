import { Container, Section } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <Container className="py-4xl">
      <div className="mx-auto max-w-2xl">
        <Text size="caption" className="mb-3 text-accent">
          {t('about.eyebrow')}
        </Text>
        <Heading level="h1">{t('about.title')}</Heading>
        <Section className="prose-content">
          <Text size="lg" muted>
            {t('about.paragraph1')}
          </Text>
          <Text size="base" muted className="mt-6">
            {t('about.paragraph2')}
          </Text>
          <Text size="base" muted className="mt-6">
            {t('about.paragraph3')}
          </Text>
        </Section>
      </div>
    </Container>
  );
}
