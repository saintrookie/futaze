import { Stack, Grid } from '@shared/ui/primitives/Layout';
import { Text } from '@shared/ui/atoms/Typography';
import { Field, Input, Switch } from '@shared/ui/atoms/FormControls';
import { Button } from '@shared/ui/atoms/Button';
import { SettingsSection } from '@shared/ui/patterns/SettingsSection';
import { useSession } from '@entities/user';
import { useTheme } from '@app/providers/AppProviders';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AccountSettingsPage() {
  const { t } = useI18n();
  const { user } = useSession();
  const [theme, setTheme] = useTheme();

  const notifications = [
    { key: 'purchase', label: t('settings.purchaseConfirmations') },
    { key: 'payout', label: t('settings.payoutUpdatesNotif') },
    { key: 'product', label: t('settings.productAnnouncements') },
  ];

  return (
    <Stack gap="lg" className="max-w-xl">
      <SettingsSection title={t('settings.profile')}>
        <Stack gap="md">
          <Grid cols="grid-cols-1 sm:grid-cols-2" gap="md">
            <Field label={t('settings.fullName')}>{(id) => <Input id={id} defaultValue={user?.name} />}</Field>
            <Field label={t('settings.email')}>{(id) => <Input id={id} type="email" defaultValue={user?.email} />}</Field>
          </Grid>
          <Button variant="accent" size="md" className="self-start">
            {t('settings.saveChanges')}
          </Button>
        </Stack>
      </SettingsSection>

      <SettingsSection title={t('settings.appearance')}>
        <div className="flex items-center justify-between">
          <div>
            <Text size="sm" className="font-medium">
              {t('settings.darkMode')}
            </Text>
            <Text size="xs" muted>
              {t('settings.darkModeHint')}
            </Text>
          </div>
          <Switch checked={theme === 'dark'} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />
        </div>
      </SettingsSection>

      <SettingsSection title={t('settings.notifications')}>
        <Stack gap="md">
          {notifications.map((n) => (
            <div key={n.key} className="flex items-center justify-between">
              <Text size="sm">{n.label}</Text>
              <Switch defaultChecked />
            </div>
          ))}
        </Stack>
      </SettingsSection>

      <SettingsSection title={t('settings.dangerZone')} tone="danger" description={t('settings.deleteAccountWarning')}>
        <Button variant="destructive" size="sm">
          {t('settings.deleteAccount')}
        </Button>
      </SettingsSection>
    </Stack>
  );
}
