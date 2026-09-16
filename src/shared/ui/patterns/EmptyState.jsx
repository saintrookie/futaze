import { cn } from '@shared/lib/cn';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { Button } from '@shared/ui/atoms/Button';

export function EmptyState({ icon, title, description, action, secondaryAction, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border px-6 py-16 text-center', className)}>
      {icon && (
        <span className="flex size-14 items-center justify-center rounded-full bg-surface text-muted [&>svg]:size-6" aria-hidden>
          {icon}
        </span>
      )}
      <div className="max-w-sm">
        <Heading level="h4" as="h3">
          {title}
        </Heading>
        {description && (
          <Text size="sm" muted className="mt-1.5">
            {description}
          </Text>
        )}
      </div>
      {(action || secondaryAction) && (
        <div className="mt-2 flex items-center gap-3">
          {action && (
            <Button variant="accent" size="sm" onClick={action.onClick} as={action.to ? 'a' : 'button'} href={action.to}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" size="sm" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
