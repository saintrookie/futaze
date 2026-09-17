import { useState } from 'react';
import { Mail, MessageCircle, Building2 } from 'lucide-react';
import { Container, Grid, Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { Field, Input, Textarea } from '@shared/ui/atoms/FormControls';
import { Button } from '@shared/ui/atoms/Button';
import { CheckCircle2 } from 'lucide-react';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const channels = [
    { icon: Mail, title: t('contact.channelEmailTitle'), detail: t('contact.channelEmailDetail') },
    { icon: MessageCircle, title: t('contact.channelChatTitle'), detail: t('contact.channelChatDetail') },
    { icon: Building2, title: t('contact.channelEnterpriseTitle'), detail: t('contact.channelEnterpriseDetail') },
  ];
  return (
    <Container className="py-4xl">
      <Grid cols="grid-cols-1 lg:grid-cols-[1fr_1.2fr]" gap="2xl">
        <div>
          <Text size="caption" className="mb-3 text-accent">
            {t('contact.eyebrow')}
          </Text>
          <Heading level="h1">{t('contact.title')}</Heading>
          <Text size="base" muted className="mt-4 max-w-sm">
            {t('contact.description')}
          </Text>
          <Stack gap="lg" className="mt-8">
            {channels.map((c) => (
              <div key={c.title} className="flex items-start gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-surface text-muted">
                  <c.icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{c.title}</p>
                  <p className="text-sm text-muted">{c.detail}</p>
                </div>
              </div>
            ))}
          </Stack>
        </div>

        <div className="rounded-2xl border border-border bg-surface-elevated p-7">
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 className="size-10 text-success" />
              <Heading level="h4" as="h2" className="mt-4">
                {t('contact.sentTitle')}
              </Heading>
              <Text size="sm" muted className="mt-1.5">
                {t('contact.sentDescription')}
              </Text>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <Stack gap="lg">
                <Grid cols="grid-cols-1 sm:grid-cols-2" gap="md">
                  <Field label={t('contact.fieldName')} required>
                    {(id) => <Input id={id} required />}
                  </Field>
                  <Field label={t('auth.fieldEmail')} required>
                    {(id) => <Input id={id} type="email" required />}
                  </Field>
                </Grid>
                <Field label={t('contact.fieldSubject')} required>
                  {(id) => <Input id={id} required />}
                </Field>
                <Field label={t('contact.fieldMessage')} required>
                  {(id) => <Textarea id={id} rows={5} required />}
                </Field>
                <Button type="submit" variant="accent" size="lg">
                  {t('contact.send')}
                </Button>
              </Stack>
            </form>
          )}
        </div>
      </Grid>
    </Container>
  );
}
