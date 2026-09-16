import { Link } from 'react-router-dom';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { LoginForm } from '@features/auth';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function LoginPage() {
  const { t } = useI18n();
  return (
    <div>
      <Heading level="h3" as="h1">
        {t('auth.loginTitle')}
      </Heading>
      <Text size="sm" muted className="mt-1.5 mb-7">
        {t('auth.loginSubtitle')}
      </Text>
      <LoginForm />
      <Text size="sm" muted className="mt-6 text-center">
        {t('auth.noAccount')}{' '}
        <Link to="/register" className="font-medium text-foreground hover:text-accent">
          {t('auth.createOne')}
        </Link>
      </Text>
    </div>
  );
}
