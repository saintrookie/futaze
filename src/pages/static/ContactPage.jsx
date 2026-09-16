import { useState } from 'react';
import { Mail, MessageCircle, Building2 } from 'lucide-react';
import { Container, Grid, Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { Field, Input, Textarea } from '@shared/ui/atoms/FormControls';
import { Button } from '@shared/ui/atoms/Button';
import { CheckCircle2 } from 'lucide-react';

const CHANNELS = [
  { icon: Mail, title: 'Email support', detail: 'support@futaze.example' },
  { icon: MessageCircle, title: 'Live chat', detail: 'Available weekdays, 9am–6pm' },
  { icon: Building2, title: 'Enterprise sales', detail: 'sales@futaze.example' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <Container className="py-4xl">
      <Grid cols="grid-cols-1 lg:grid-cols-[1fr_1.2fr]" gap="2xl">
        <div>
          <Text size="caption" className="mb-3 text-accent">
            Contact
          </Text>
          <Heading level="h1">Talk to us</Heading>
          <Text size="base" muted className="mt-4 max-w-sm">
            Questions about licensing, an order, or partnering with us — we typically respond within one business day.
          </Text>
          <Stack gap="lg" className="mt-8">
            {CHANNELS.map((c) => (
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
                Message sent
              </Heading>
              <Text size="sm" muted className="mt-1.5">
                We'll get back to you shortly.
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
                  <Field label="Name" required>
                    {(id) => <Input id={id} required />}
                  </Field>
                  <Field label="Email" required>
                    {(id) => <Input id={id} type="email" required />}
                  </Field>
                </Grid>
                <Field label="Subject" required>
                  {(id) => <Input id={id} required />}
                </Field>
                <Field label="Message" required>
                  {(id) => <Textarea id={id} rows={5} required />}
                </Field>
                <Button type="submit" variant="accent" size="lg">
                  Send message
                </Button>
              </Stack>
            </form>
          )}
        </div>
      </Grid>
    </Container>
  );
}
