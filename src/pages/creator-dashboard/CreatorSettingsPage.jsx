import { Stack, Grid } from '@shared/ui/primitives/Layout';
import { Text } from '@shared/ui/atoms/Typography';
import { Field, Input, Textarea } from '@shared/ui/atoms/FormControls';
import { Button } from '@shared/ui/atoms/Button';
import { SettingsSection } from '@shared/ui/patterns/SettingsSection';
import { useSession } from '@entities/user';
import { getCreatorByUsername } from '@entities/creator/model/mock';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function CreatorSettingsPage() {
  const { t } = useI18n();
  const { user } = useSession();
  const creator = getCreatorByUsername(user?.creatorUsername);
  const specialty = creator ? t(`creator.specialty.${creator.specialtyKey}`) : '';
  const bio = creator
    ? t('creator.bio', { name: creator.name.split(' ')[0], specialty, year: new Date(creator.joinedAt).getFullYear() })
    : '';

  return (
    <Stack gap="lg" className="max-w-xl">
      <SettingsSection title={t('settings.publicProfile')}>
        <Stack gap="md">
          <Field label={t('settings.displayName')}>{(id) => <Input id={id} defaultValue={creator?.name} />}</Field>
          <Field label={t('settings.username')}>{(id) => <Input id={id} defaultValue={creator?.username} />}</Field>
          <Field label={t('settings.specialty')}>{(id) => <Input id={id} defaultValue={specialty} />}</Field>
          <Field label={t('settings.bio')}>{(id) => <Textarea id={id} rows={4} defaultValue={bio} />}</Field>
          <Button variant="accent" size="md" className="self-start">
            {t('settings.saveProfile')}
          </Button>
        </Stack>
      </SettingsSection>

      <SettingsSection title={t('settings.payoutDetails')}>
        <Stack gap="md">
          <Grid cols="grid-cols-1 sm:grid-cols-2" gap="md">
            <Field label={t('settings.payoutMethod')}>{(id) => <Input id={id} defaultValue={t('settings.bankTransfer')} />}</Field>
            <Field label={t('settings.accountHolder')}>{(id) => <Input id={id} defaultValue={creator?.name} />}</Field>
          </Grid>
          <Text size="xs" muted>
            {t('settings.payoutNote')}
          </Text>
        </Stack>
      </SettingsSection>
    </Stack>
  );
}
