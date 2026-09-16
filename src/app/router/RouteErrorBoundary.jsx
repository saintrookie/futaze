import { useRouteError, useNavigate, isRouteErrorResponse } from 'react-router-dom';
import { RefreshCw, Home } from 'lucide-react';
import { Container } from '@shared/ui/primitives/Layout';
import { ErrorState } from '@shared/ui/patterns/ErrorState';
import { Button } from '@shared/ui/atoms/Button';
import { useI18n } from '@shared/i18n/LocaleProvider';

const isStaleChunkError = (error) =>
  error instanceof Error &&
  /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed/i.test(
    error.message
  );

export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { t } = useI18n();

  // A stale build chunk (deploy happened, or the dev server restarted while
  // this tab was open) — the fix is a hard reload, not a "try again" retry.
  if (isStaleChunkError(error)) {
    return (
      <Container className="py-4xl">
        <ErrorState
          type="network"
          title={t('errorState.staleChunkTitle')}
          description={t('errorState.staleChunkDescription')}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  const status = isRouteErrorResponse(error) ? error.status : null;

  return (
    <Container className="py-4xl">
      <ErrorState
        type="generic"
        title={status === 404 ? t('errorState.routeNotFoundTitle') : t('errorState.serverTitle')}
        description={status === 404 ? t('errorState.routeNotFoundDescription') : t('errorState.routeGenericDescription')}
      />
      <div className="mt-6 flex justify-center gap-3">
        <Button variant="secondary" size="md" iconLeft={<RefreshCw />} onClick={() => window.location.reload()}>
          {t('common.reload')}
        </Button>
        <Button variant="accent" size="md" iconLeft={<Home />} onClick={() => navigate('/')}>
          {t('common.backHome')}
        </Button>
      </div>
    </Container>
  );
}
