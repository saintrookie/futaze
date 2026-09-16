import { Link } from 'react-router-dom';
import { Avatar } from '@shared/ui/atoms/Avatar';
import { getCreatorById } from '@entities/creator/model/mock';
import { cn } from '@shared/lib/cn';

export function AssetMeta({ asset, size = 'sm', className }) {
  const creator = getCreatorById(asset.creatorId);
  if (!creator) return null;
  return (
    <Link
      to={`/creator/${creator.username}`}
      onClick={(e) => e.stopPropagation()}
      className={cn('inline-flex items-center gap-2 group/creator', className)}
    >
      <Avatar src={creator.avatar} name={creator.name} size={size === 'sm' ? 'xs' : 'sm'} />
      <span className="truncate text-sm text-muted group-hover/creator:text-foreground transition-colors duration-fast">
        {creator.name}
      </span>
    </Link>
  );
}
