import { Stack, Grid } from '@shared/ui/primitives/Layout';
import { Text } from '@shared/ui/atoms/Typography';
import { Field, Input, Switch } from '@shared/ui/atoms/FormControls';
import { Button } from '@shared/ui/atoms/Button';
import { SettingsSection } from '@shared/ui/patterns/SettingsSection';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AdminSettingsPage() {
  const { t } = useI18n();
  const flags = [
    { key: 'ai', label: t('settings.flagAiDiscovery'), defaultOn: true },
    { key: 'visual', label: t('settings.flagVisualSearch'), defaultOn: true },
    { key: 'creatorPricing', label: t('settings.flagCreatorPricing'), defaultOn: true },
    { key: 'enterprise', label: t('settings.flagEnterpriseLicensing'), defaultOn: false },
  ];

  return (
    <Stack gap="lg" className="max-w-xl">
      <SettingsSection title={t('settings.platform')}>
        <Stack gap="md">
          <Grid cols="grid-cols-1 sm:grid-cols-2" gap="md">
            <Field label={t('settings.platformFee')}>{(id) => <Input id={id} type="number" defaultValue={12} />}</Field>
            <Field label={t('settings.defaultCurrency')}>{(id) => <Input id={id} defaultValue="USD" />}</Field>
          </Grid>
          <Button variant="accent" size="md" className="self-start">
            {t('settings.saveChanges')}
          </Button>
        </Stack>
      </SettingsSection>

      <SettingsSection title={t('settings.featureFlags')}>
        <Stack gap="md">
          {flags.map((flag) => (
            <div key={flag.key} className="flex items-center justify-between">
              <Text size="sm">{flag.label}</Text>
              <Switch defaultChecked={flag.defaultOn} />
            </div>
          ))}
        </Stack>
      </SettingsSection>
    </Stack>
  );
}
