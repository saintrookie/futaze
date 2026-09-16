import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { AspectRatio } from '@shared/ui/primitives/Layout';
import { LazyImage } from '@shared/ui/atoms/LazyImage';
import { AssetTypeBadge } from '@entities/asset/ui/AssetBadge';
import { formatDuration } from '@entities/asset/model/selectors';
import { cn } from '@shared/lib/cn';

const RATIO = { landscape: 4 / 3, portrait: 3 / 4, square: 1 };

export function AssetThumbnail({ asset, className, eager = false }) {
  const [hovering, setHovering] = useState(false);
  const videoRef = useRef(null);

  const onEnter = () => {
    setHovering(true);
    if (asset.previewVideoUrl && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };
  const onLeave = () => {
    setHovering(false);
    if (videoRef.current) videoRef.current.pause();
  };

  return (
    <AspectRatio
      ratio={RATIO[asset.orientation] || 4 / 3}
      className={cn('rounded-lg bg-surface', className)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <LazyImage
        src={asset.previewImage}
        alt={asset.title}
        eager={eager}
        className="rounded-lg"
        imgClassName={cn(
          'rounded-lg duration-slow ease-emphasized',
          hovering && 'scale-[1.045]',
          asset.previewVideoUrl && hovering && 'opacity-0'
        )}
      />
      {asset.previewVideoUrl && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={asset.previewImage}
          src={hovering ? asset.previewVideoUrl : undefined}
          className={cn(
            'absolute inset-0 size-full rounded-lg object-cover transition-opacity duration-slow',
            hovering ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-fast group-hover:opacity-100" />
      <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5">
        <AssetTypeBadge type={asset.type} />
      </div>
      {asset.type === 'video' && !hovering && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-md">
            <Play className="size-4 translate-x-0.5 fill-current" />
          </span>
        </span>
      )}
      {asset.duration && (
        <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
          {formatDuration(asset.duration)}
        </span>
      )}
    </AspectRatio>
  );
}
