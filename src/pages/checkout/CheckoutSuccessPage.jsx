import { CheckCircle2 } from 'lucide-react';
import { Container } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { Button } from '@shared/ui/atoms/Button';
import { Link } from 'react-router-dom';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function CheckoutSuccessPage() {
  const { t } = useI18n();
  return (
    <Container className="flex flex-col items-center py-4xl text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 className="size-8" />
      </span>
      <Heading level="h2" as="h1" className="mt-6">
        {t('checkout.orderConfirmedTitle')}
      </Heading>
      <Text size="base" muted className="mt-2 max-w-sm">
        {t('checkout.orderConfirmedDescription')}
      </Text>
      <div className="mt-8 flex gap-3">
        <Button as={Link} to="/account/downloads" variant="accent" size="lg">
          {t('checkout.goToDownloads')}
        </Button>
        <Button as={Link} to="/marketplace" variant="secondary" size="lg">
          {t('checkout.continueBrowsing')}
        </Button>
      </div>
    </Container>
  );
}
