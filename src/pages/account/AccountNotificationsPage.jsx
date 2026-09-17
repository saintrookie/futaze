import { Bell } from 'lucide-react';
import { EmptyState } from '@shared/ui/patterns/EmptyState';
import { Text } from '@shared/ui/atoms/Typography';
import { NOTIFICATIONS } from '@entities/notification';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { cn } from '@shared/lib/cn';

export default function AccountNotificationsPage() {
  const { t } = useI18n();
  if (NOTIFICATIONS.length === 0) {
    return <EmptyState icon={<Bell />} title={t('account.noNotificationsTitle')} description={t('account.noNotificationsDescription')} />;
  }

  return (
    <div className="rounded-xl border border-border bg-surface-elevated divide-y divide-separator">
      {NOTIFICATIONS.map((n) => (
        <div key={n.id} className={cn('flex items-start gap-3 p-4', !n.read && 'bg-accent/5')}>
          <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', n.read ? 'bg-transparent' : 'bg-accent')} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-foreground">{n.title}</p>
              <span className="shrink-0 text-xs text-muted">{n.at}</span>
            </div>
            <Text size="sm" muted className="mt-0.5">
              {n.body}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
