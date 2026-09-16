import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { Field, Input } from '@shared/ui/atoms/FormControls';
import { Button } from '@shared/ui/atoms/Button';
import { Stack } from '@shared/ui/primitives/Layout';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function ForgotPasswordPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center py-4 text-center">
        <MailCheck className="size-10 text-success" />
        <Heading level="h4" as="h1" className="mt-4">
          {t('auth.checkEmailTitle')}
        </Heading>
        <Text size="sm" muted className="mt-1.5">
          {t('auth.checkEmailDescription')}
        </Text>
        <Link to="/login" className="mt-6 text-sm font-medium text-foreground hover:text-accent">
          {t('auth.backToSignIn')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Heading level="h3" as="h1">
        {t('auth.forgotTitle')}
      </Heading>
      <Text size="sm" muted className="mt-1.5 mb-7">
        {t('auth.forgotSubtitle')}
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <Stack gap="lg">
          <Field label={t('auth.fieldEmail')} required>
            {(id) => <Input id={id} type="email" required placeholder="you@studio.com" />}
          </Field>
          <Button type="submit" variant="accent" size="lg" className="w-full">
            {t('auth.sendResetLink')}
          </Button>
        </Stack>
      </form>
    </div>
  );
}
