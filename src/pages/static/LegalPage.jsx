import { Container } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function LegalPage({ type = 'terms' }) {
  const { t } = useI18n();
  const section =
    type === 'privacy'
      ? { title: t('legal.privacyTitle'), updated: t('legal.privacyUpdated'), body: t('legal.privacyBody') }
      : { title: t('legal.termsTitle'), updated: t('legal.termsUpdated'), body: t('legal.termsBody') };
  return (
    <Container className="py-4xl">
      <div className="mx-auto max-w-2xl">
        <Heading level="h1">{section.title}</Heading>
        <Text size="sm" muted className="mt-2">
          {section.updated}
        </Text>
        <div className="mt-8 flex flex-col gap-5">
          {section.body.map((p, i) => (
            <Text key={i} size="base" muted>
              {p}
            </Text>
          ))}
        </div>
      </div>
    </Container>
  );
}
