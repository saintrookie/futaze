import { Heading, Text } from '@shared/ui/atoms/Typography';
import { cn } from '@shared/lib/cn';

/**
 * Card-bounded settings section. Used instead of hairline `Separator`s
 * between flat sections — a 1px divider reads too low-contrast against the
 * page background to reliably signal a section boundary; a bordered card
 * surface (already the pattern everywhere else in /account) does.
 */
export function SettingsSection({ title, description, tone, actions, children, className }) {
  return (
    <section className={cn('rounded-xl border border-border bg-surface-elevated p-6', className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Heading level="h4" as="h2" className={cn(tone === 'danger' && 'text-danger')}>
            {title}
          </Heading>
          {description && (
            <Text size="sm" muted className="mt-1">
              {description}
            </Text>
          )}
        </div>
        {actions}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
