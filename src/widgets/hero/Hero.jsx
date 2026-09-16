import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { Container, Cluster } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { SearchInput } from '@shared/ui/molecules/SearchInput';
import { usePrefersReducedMotion, useMediaQuery } from '@shared/hooks/useMediaQuery';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { cn } from '@shared/lib/cn';

export function Hero() {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();
  const suggestions = t('hero.suggestions');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const showVideo = isDesktop && !reducedMotion;

  const submit = (q) => {
    if (q?.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div className="relative flex min-h-[85vh] flex-col overflow-hidden bg-primary">
      {/* Background video — desktop only (bandwidth) and skipped under reduced-motion; decorative, still fully understandable without it */}
      {showVideo && (
        <video
          ref={videoRef}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-slow ease-emphasized',
            videoReady ? 'opacity-100' : 'opacity-0'
          )}
          src="/videos/bg-main-banner.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          aria-hidden
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/55" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

      <Container className="relative flex flex-1 flex-col items-center justify-center py-4xl text-center">
        <Text size="caption" className="mb-5 text-accent">
          {t('hero.eyebrow')}
        </Text>
        <Heading level="display" as="h1" className="max-w-3xl text-white">
          {t('hero.headline')}
        </Heading>
        <Text size="lg" className="mt-5 max-w-xl text-white/75">
          {t('hero.description')}
        </Text>

        <div className="mt-9 w-full max-w-2xl">
          <SearchInput value={query} onChange={setQuery} onSubmit={submit} size="lg" placeholder={t('hero.searchPlaceholder')} autoFocus={false} />
        </div>

        <Cluster gap="sm" className="mt-5 justify-center">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => submit(s)}
              className="rounded-full border border-white/25 px-3.5 py-1.5 text-xs text-white/75 backdrop-blur-sm transition-colors duration-fast hover:border-white/50 hover:text-white"
            >
              {s}
            </button>
          ))}
        </Cluster>
      </Container>

      <div className="relative flex justify-center pb-6 text-white/60">
        <ArrowDown className="size-4 animate-bounce" aria-hidden />
      </div>
    </div>
  );
}
