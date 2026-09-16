import { Link } from 'react-router-dom';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { RegisterForm } from '@features/auth';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function RegisterPage() {
  const { t } = useI18n();
  return (
    <div>
      <Heading level="h3" as="h1">
        {t('auth.registerTitle')}
      </Heading>
      <Text size="sm" muted className="mt-1.5 mb-7">
        {t('auth.registerSubtitle')}
      </Text>
      <RegisterForm />
      <Text size="sm" muted className="mt-6 text-center">
        {t('auth.haveAccount')}{' '}
        <Link to="/login" className="font-medium text-foreground hover:text-accent">
          {t('common.signIn')}
        </Link>
      </Text>
    </div>
  );
}
