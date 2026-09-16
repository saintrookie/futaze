import { Link } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';
import { Avatar } from '@shared/ui/atoms/Avatar';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { cn } from '@shared/lib/cn';

export function CreatorIdentity({ creator, size = 'md', subtitle, className }) {
  const { t } = useI18n();
  return (
    <Link to={`/creator/${creator.username}`} className={cn('group inline-flex items-center gap-3', className)}>
      <Avatar src={creator.avatar} name={creator.name} size={size} />
      <span className="min-w-0">
        <span className="flex items-center gap-1 truncate text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-fast">
          {creator.name}
          {creator.verified && <BadgeCheck className="size-3.5 shrink-0 text-accent" />}
        </span>
        <span className="block truncate text-xs text-muted">{subtitle || t(`creator.specialty.${creator.specialtyKey}`)}</span>
      </span>
    </Link>
  );
}
