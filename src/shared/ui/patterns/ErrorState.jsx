import { AlertTriangle, WifiOff, ShieldAlert, ServerCrash } from 'lucide-react';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { Button } from '@shared/ui/atoms/Button';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { cn } from '@shared/lib/cn';

const iconFor = {
  network: WifiOff,
  permission: ShieldAlert,
  server: ServerCrash,
  generic: AlertTriangle,
};

const copyKeysFor = {
  network: { titleKey: 'errorState.networkTitle', descriptionKey: 'errorState.networkDescription' },
  permission: { titleKey: 'errorState.permissionTitle', descriptionKey: 'errorState.permissionDescription' },
  server: { titleKey: 'errorState.serverTitle', descriptionKey: 'errorState.serverDescription' },
  generic: { titleKey: 'errorState.genericTitle', descriptionKey: 'errorState.genericDescription' },
};

export function ErrorState({ type = 'generic', title, description, onRetry, className }) {
  const { t } = useI18n();
  const Icon = iconFor[type] || iconFor.generic;
  const copyKeys = copyKeysFor[type] || copyKeysFor.generic;
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-surface px-6 py-16 text-center', className)} role="alert">
      <span className="flex size-14 items-center justify-center rounded-full bg-danger/10 text-danger [&>svg]:size-6">
        <Icon aria-hidden />
      </span>
      <div className="max-w-sm">
        <Heading level="h4" as="h3">
          {title || t(copyKeys.titleKey)}
        </Heading>
        <Text size="sm" muted className="mt-1.5">
          {description || t(copyKeys.descriptionKey)}
        </Text>
      </div>
      {onRetry && type !== 'permission' && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          {t('common.tryAgain')}
        </Button>
      )}
    </div>
  );
}
