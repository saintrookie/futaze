import { Compass } from 'lucide-react';
import { Container } from '@shared/ui/primitives/Layout';
import { EmptyState } from '@shared/ui/patterns/EmptyState';
import { useI18n } from '@shared/i18n/LocaleProvider';

export function NotFoundPage() {
  const { t } = useI18n();
  return (
    <Container className="py-4xl">
      <EmptyState
        icon={<Compass />}
        title={t('emptyState.notFoundTitle')}
        description={t('emptyState.notFoundDescription')}
        action={{ label: t('emptyState.backToMarketplace'), to: '/marketplace' }}
      />
    </Container>
  );
}

export default NotFoundPage;
