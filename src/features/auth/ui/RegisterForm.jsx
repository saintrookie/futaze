import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Lock } from 'lucide-react';
import { Field, Input, Checkbox } from '@shared/ui/atoms/FormControls';
import { Button } from '@shared/ui/atoms/Button';
import { Stack } from '@shared/ui/primitives/Layout';
import { Text } from '@shared/ui/atoms/Typography';
import { useSession } from '@entities/user';
import { useI18n } from '@shared/i18n/LocaleProvider';

export function RegisterForm() {
  const { t } = useI18n();
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('validation.nameMin')),
        email: z.string().min(1, t('validation.emailRequired')).email(t('validation.emailInvalid')),
        password: z.string().min(8, t('validation.passwordMin')),
        terms: z.literal(true, { errorMap: () => ({ message: t('validation.termsRequired') }) }),
      }),
    [t]
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { terms: false } });
  const signIn = useSession((s) => s.signIn);
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');

  const onSubmit = async () => {
    setFormError('');
    try {
      await signIn();
      navigate('/account');
    } catch {
      setFormError(t('auth.registerError'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap="lg">
        <Field label={t('auth.fieldName')} error={errors.name?.message} required>
          {(id) => (
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <Input id={id} className="pl-10" placeholder={t('auth.fieldNamePlaceholder')} {...register('name')} />
            </div>
          )}
        </Field>
        <Field label={t('auth.fieldEmail')} error={errors.email?.message} required>
          {(id) => (
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <Input id={id} type="email" className="pl-10" placeholder={t('auth.emailPlaceholder')} {...register('email')} />
            </div>
          )}
        </Field>
        <Field label={t('auth.fieldPassword')} hint={t('auth.fieldPasswordHint')} error={errors.password?.message} required>
          {(id) => (
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <Input id={id} type="password" className="pl-10" placeholder={t('auth.passwordPlaceholder')} {...register('password')} />
            </div>
          )}
        </Field>
        <div>
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Checkbox
                label={t('auth.agreeTerms')}
                checked={field.value}
                name={field.name}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
              />
            )}
          />
          {errors.terms && (
            <Text size="xs" className="mt-1.5 text-danger" role="alert">
              {errors.terms.message}
            </Text>
          )}
        </div>
        {formError && (
          <Text size="sm" className="text-danger" role="alert">
            {formError}
          </Text>
        )}
        <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-full">
          {t('auth.createAccount')}
        </Button>
      </Stack>
    </form>
  );
}
