import { useMemo, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Sparkles, ShieldCheck } from 'lucide-react';
import { Field, Input } from '@shared/ui/atoms/FormControls';
import { Button } from '@shared/ui/atoms/Button';
import { Stack, Inline } from '@shared/ui/primitives/Layout';
import { Text } from '@shared/ui/atoms/Typography';
import { Separator } from '@shared/ui/atoms/Separator';
import { useSession } from '@entities/user';
import { useI18n } from '@shared/i18n/LocaleProvider';

const DEMO_ROLES = [
  { role: 'customer', labelKey: 'auth.demoCustomer', icon: User, to: '/account' },
  { role: 'creator', labelKey: 'auth.demoCreator', icon: Sparkles, to: '/creator-dashboard' },
  { role: 'admin', labelKey: 'auth.demoAdmin', icon: ShieldCheck, to: '/admin' },
];

export function LoginForm() {
  const { t } = useI18n();
  const schema = useMemo(
    () =>
      z.object({
        email: z.string().min(1, t('validation.emailRequired')).email(t('validation.emailInvalid')),
        password: z.string().min(1, t('validation.passwordRequired')),
      }),
    [t]
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const signIn = useSession((s) => s.signIn);
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState('');
  const [demoLoading, setDemoLoading] = useState(null);

  const onSubmit = async () => {
    setFormError('');
    try {
      await signIn('customer');
      navigate(location.state?.from || '/account');
    } catch {
      setFormError(t('auth.loginError'));
    }
  };

  const signInAsDemo = async (demo) => {
    setDemoLoading(demo.role);
    try {
      await signIn(demo.role);
      navigate(demo.to);
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <Stack gap="lg">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack gap="lg">
          <Field label={t('auth.fieldEmail')} error={errors.email?.message} required>
            {(id) => (
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <Input id={id} type="email" className="pl-10" placeholder="you@studio.com" {...register('email')} />
              </div>
            )}
          </Field>
          <Field label={t('auth.fieldPassword')} error={errors.password?.message} required>
            {(id) => (
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <Input id={id} type="password" className="pl-10" placeholder="••••••••" {...register('password')} />
              </div>
            )}
          </Field>
          {formError && (
            <Text size="sm" className="text-danger" role="alert">
              {formError}
            </Text>
          )}
          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="text-muted hover:text-foreground transition-colors duration-fast">
              {t('auth.forgotPassword')}
            </Link>
          </div>
          <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-full">
            {t('common.signIn')}
          </Button>
        </Stack>
      </form>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <Text size="xs" muted className="shrink-0 uppercase tracking-wide">
          {t('auth.orDivider')}
        </Text>
        <Separator className="flex-1" />
      </div>

      <div>
        <Text size="sm" className="font-medium text-foreground">
          {t('auth.demoAccountsTitle')}
        </Text>
        <Text size="xs" muted className="mt-1">
          {t('auth.demoAccountsDescription')}
        </Text>
        <Inline gap="sm" className="mt-3">
          {DEMO_ROLES.map((demo) => (
            <Button
              key={demo.role}
              variant="secondary"
              size="sm"
              className="flex-1"
              iconLeft={<demo.icon />}
              loading={demoLoading === demo.role}
              disabled={demoLoading !== null}
              onClick={() => signInAsDemo(demo)}
            >
              {t(demo.labelKey)}
            </Button>
          ))}
        </Inline>
      </div>
    </Stack>
  );
}
