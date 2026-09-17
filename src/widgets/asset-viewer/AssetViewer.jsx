import { useState } from 'react';
import { Maximize2, ZoomIn, ZoomOut, X } from 'lucide-react';
import { AspectRatio } from '@shared/ui/primitives/Layout';
import { Skeleton } from '@shared/ui/atoms/Feedback';
import { IconButton } from '@shared/ui/atoms/Button';
import { Lightbox } from '@shared/ui/molecules/Lightbox';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { cn } from '@shared/lib/cn';

const RATIO = { landscape: 16 / 10, portrait: 3 / 4, square: 1 };

export function AssetViewer({ asset }) {
  const { t } = useI18n();
  const [loaded, setLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const isVideo = asset.type === 'video';

  return (
    <>
      <div className="relative overflow-hidden rounded-xl bg-surface">
        <AspectRatio ratio={RATIO[asset.orientation] || 16 / 10}>
          {!loaded && <Skeleton className="absolute inset-0" />}
          {isVideo ? (
            <video
              controls
              poster={asset.previewImage}
              src={asset.previewVideoUrl}
              onLoadedData={() => setLoaded(true)}
              className={cn('absolute inset-0 size-full object-cover transition-opacity duration-normal', loaded ? 'opacity-100' : 'opacity-0')}
            />
          ) : (
            <img
              src={asset.previewImage}
              alt={asset.title}
              onLoad={() => setLoaded(true)}
              className={cn('absolute inset-0 size-full object-cover transition-opacity duration-normal', loaded ? 'opacity-100' : 'opacity-0')}
            />
          )}
          {!isVideo && (
            <IconButton
              label={t('asset.viewFullscreen')}
              size="sm"
              className="absolute right-3 top-3 bg-white/90 text-primary shadow-sm hover:bg-white"
              onClick={() => setFullscreen(true)}
            >
              <Maximize2 />
            </IconButton>
          )}
        </AspectRatio>
      </div>

      <Lightbox open={fullscreen} onClose={() => setFullscreen(false)} title={asset.title}>
        <IconButton
          label={t('asset.closeFullscreen')}
          variant="secondary"
          className="absolute right-4 top-4 bg-white/10 text-white hover:bg-white/20"
          onClick={() => setFullscreen(false)}
        >
          <X />
        </IconButton>
        <IconButton
          label={zoomed ? t('asset.zoomOut') : t('asset.zoomIn')}
          variant="secondary"
          className="absolute left-4 top-4 bg-white/10 text-white hover:bg-white/20"
          onClick={() => setZoomed((z) => !z)}
        >
          {zoomed ? <ZoomOut /> : <ZoomIn />}
        </IconButton>
        <img
          src={asset.previewImage}
          alt={asset.title}
          className={cn(
            'max-h-full max-w-full object-contain transition-transform duration-normal cursor-zoom-in',
            zoomed && 'scale-150 cursor-zoom-out'
          )}
          onClick={() => setZoomed((z) => !z)}
        />
      </Lightbox>
    </>
  );
}
