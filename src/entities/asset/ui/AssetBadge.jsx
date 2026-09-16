import { Sparkles, Video, Music, Box, Type } from 'lucide-react';
import { Badge } from '@shared/ui/atoms/Badge';

const TYPE_ICON = {
  video: Video,
  audio: Music,
  '3d': Box,
  font: Type,
};

export function AssetTypeBadge({ type }) {
  const Icon = TYPE_ICON[type];
  if (!Icon) return null;
  return (
    <span className="flex size-7 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm">
      <Icon className="size-3.5" />
    </span>
  );
}

export function AiGeneratedBadge() {
  return (
    <Badge variant="accent" size="sm" className="backdrop-blur-sm bg-surface-floating/90">
      <Sparkles className="size-3" /> AI
    </Badge>
  );
}
