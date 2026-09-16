import { useQuery } from '@tanstack/react-query';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Hero } from '@widgets/hero/Hero';
import { RecommendationSection } from '@widgets/recommendation-section/RecommendationSection';
import { CategoryBrowser } from '@widgets/category-browser/CategoryBrowser';
import { PricingTable } from '@widgets/pricing-table/PricingTable';
import { Container, Section, Grid } from '@shared/ui/primitives/Layout';
import { SectionHeader } from '@shared/ui/patterns/SectionHeader';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { Button } from '@shared/ui/atoms/Button';
import { LazyImage } from '@shared/ui/atoms/LazyImage';
import { CollectionCard, COLLECTIONS } from '@entities/collection';
import { CreatorCard, fetchFeaturedCreators } from '@entities/creator';
import { fetchTrendingAssets, fetchNewArrivals, fetchAssetsByCategory, useLocalizedAssets } from '@entities/asset';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { t } = useI18n();
  const trending = useQuery({ queryKey: ['home-trending'], queryFn: () => fetchTrendingAssets(12) });
  const newArrivals = useQuery({ queryKey: ['home-new'], queryFn: () => fetchNewArrivals(12) });
  const videos = useQuery({ queryKey: ['home-videos'], queryFn: () => fetchAssetsByCategory('footage', { limit: 8 }) });
  const images = useQuery({ queryKey: ['home-images'], queryFn: () => fetchAssetsByCategory('photography', { limit: 12 }) });
  const aiAssets = useQuery({
    queryKey: ['home-ai'],
    queryFn: () => fetchTrendingAssets(48).then((assets) => assets.filter((a) => a.isAiGenerated).slice(0, 8)),
  });
  const creators = useQuery({ queryKey: ['home-creators'], queryFn: () => fetchFeaturedCreators(6) });
  const localizedAiAssets = useLocalizedAssets(aiAssets.data);

  return (
    <>
      <Hero />

      <RecommendationSection
        eyebrow={t('home.trendingEyebrow')}
        title={t('home.trendingTitle')}
        description={t('home.trendingDescription')}
        action={{ label: t('home.viewAll'), to: '/marketplace' }}
        assets={trending.data}
        loading={trending.isLoading}
      />

      <Section className="bg-surface/40">
        <Container>
          <SectionHeader eyebrow={t('home.exploreEyebrow')} title={t('home.popularCategories')} />
          <CategoryBrowser />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow={t('home.curatedEyebrow')}
            title={t('home.editorialCollections')}
            description={t('home.editorialDescription')}
            action={{ label: t('home.browseCollections'), to: '/marketplace' }}
          />
          <Grid cols="grid-cols-1 sm:grid-cols-3" gap="lg">
            {COLLECTIONS.map((c) => (
              <CollectionCard key={c.id} collection={c} />
            ))}
          </Grid>
        </Container>
      </Section>

      <Section className="bg-surface/40">
        <Container>
          <SectionHeader eyebrow={t('home.communityEyebrow')} title={t('home.featuredCreators')} action={{ label: t('home.viewAllCreators'), to: '/creators' }} />
          <Grid cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" gap="md">
            {(creators.data || []).map((c) => (
              <CreatorCard key={c.id} creator={c} />
            ))}
          </Grid>
        </Container>
      </Section>

      <RecommendationSection
        eyebrow={t('home.inMotionEyebrow')}
        title={t('home.trendingVideos')}
        action={{ label: t('home.browseFootage'), to: '/category/footage' }}
        assets={videos.data}
        loading={videos.isLoading}
      />

      <RecommendationSection
        eyebrow={t('home.frameByFrameEyebrow')}
        title={t('home.popularImages')}
        action={{ label: t('home.browsePhotography'), to: '/category/photography' }}
        assets={images.data}
        loading={images.isLoading}
      />

      <RecommendationSection
        eyebrow={t('home.freshEyebrow')}
        title={t('home.newArrivals')}
        action={{ label: t('home.seeWhatsNew'), to: '/marketplace?sort=newest' }}
        assets={newArrivals.data}
        loading={newArrivals.isLoading}
      />

      <Section>
        <Container>
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 sm:p-10">
            <SectionHeader
              eyebrow={t('home.smartDiscoveryEyebrow')}
              title={t('home.aiTitle')}
              description={t('home.aiDescription')}
              action={{ label: t('home.exploreAi'), to: '/marketplace?ai=1' }}
            />
            <Grid cols="grid-cols-2 sm:grid-cols-4" gap="md">
              {(localizedAiAssets || []).slice(0, 4).map((a) => (
                <Link key={a.id} to={`/asset/${a.slug}`} className="group relative aspect-square overflow-hidden rounded-lg">
                  <LazyImage src={a.previewImage} alt={a.title} imgClassName="transition-transform duration-slow group-hover:scale-105" />
                  <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-accent">
                    <Sparkles className="size-2.5" /> {t('asset.aiGenerated')}
                  </span>
                </Link>
              ))}
            </Grid>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col items-center gap-5 rounded-2xl bg-primary px-8 py-14 text-center text-primary-foreground sm:px-16">
            <Heading level="h2" className="text-primary-foreground">
              {t('home.creatorCtaTitle')}
            </Heading>
            <Text size="base" className="max-w-lg text-primary-foreground/75">
              {t('home.creatorCtaDescription')}
            </Text>
            <Button as={Link} to="/register" variant="accent" size="lg" iconRight={<ArrowRight />}>
              {t('home.becomeCreator')}
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow={t('home.plansEyebrow')} title={t('home.pricingTitle')} description={t('home.pricingDescription')} />
          <PricingTable />
        </Container>
      </Section>
    </>
  );
}
