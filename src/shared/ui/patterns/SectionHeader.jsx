import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { Split } from '@shared/ui/primitives/Layout';

export function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <Split
      className="mb-8 items-end"
      left={
        <div>
          {eyebrow && (
            <Text size="caption" muted className="mb-2 text-accent">
              {eyebrow}
            </Text>
          )}
          <Heading level="h2">{title}</Heading>
          {description && (
            <Text size="base" muted className="mt-2 max-w-xl">
              {description}
            </Text>
          )}
        </div>
      }
      right={
        action && (
          <Link
            to={action.to}
            className="group hidden items-center gap-1.5 text-sm font-medium text-foreground sm:inline-flex"
          >
            {action.label}
            <ArrowRight className="size-4 transition-transform duration-fast group-hover:translate-x-0.5" />
          </Link>
        )
      }
    />
  );
}
