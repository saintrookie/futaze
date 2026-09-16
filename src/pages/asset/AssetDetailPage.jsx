import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Check, FileType, Ruler, Clock, Tag as TagIcon } from 'lucide-react';
import { Container, Grid, Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { Breadcrumbs } from '@shared/ui/molecules/Breadcrumbs';
import { RatingDisplay } from '@shared/ui/molecules/RatingDisplay';
import { Badge } from '@shared/ui/atoms/Badge';
import { Separator } from '@shared/ui/atoms/Separator';
import { Skeleton } from '@shared/ui/atoms/Feedback';
import { ErrorState } from '@shared/ui/patterns/ErrorState';
import { AssetViewer } from '@widgets/asset-viewer/AssetViewer';
import { RecommendationSection } from '@widgets/recommendation-section/RecommendationSection';
import { fetchAssetBySlug, fetchAssetsByCreator, formatDuration, useLocalizedAsset } from '@entities/asset';
import { ASSETS } from '@entities/asset/model/mock';
import { getRelatedAssets } from '@entities/asset/model/selectors';
import { getCreatorById } from '@entities/creator/model/mock';
import { CreatorIdentity } from '@entities/creator';
import { getCategory } from '@entities/category/model/categories';
import { getReviewsForAsset } from '@entities/review/model/mock';
import { ReviewItem } from '@entities/review/ui/ReviewItem';
import { BuyPanel } from '@features/purchase-asset';
import { DownloadButton } from '@features/download-asset';
import { NotFoundPage } from '@pages/not-found/NotFoundPage';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AssetDetailPage() {
  const { slug } = useParams();
  const { t, formatNumber } = useI18n();
  const { data: rawAsset, isLoading, isError, refetch } = useQuery({
    queryKey: ['asset', slug],
    queryFn: () => fetchAssetBySlug(slug),
    retry: false,
  });
  const asset = useLocalizedAsset(rawAsset);

  if (isLoading) {
    return (
      <Container className="py-9">
        <Skeleton className="h-[28rem] w-full rounded-xl" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="py-9">
        <ErrorState type="generic" title={t('asset.unavailableTitle')} description={t('asset.unavailableDescription')} onRetry={refetch} />
      </Container>
    );
  }

  if (!asset) return <NotFoundPage />;

  const creator = getCreatorById(asset.creatorId);
  const category = getCategory(asset.categorySlug);
  const related = getRelatedAssets(ASSETS, rawAsset, 8);
  const reviews = getReviewsForAsset(asset.id);

  return (
    <>
      <Container className="pt-6">
        <Breadcrumbs
          items={[
            { label: t('asset.marketplace'), to: '/marketplace' },
            { label: category ? t(`category.${category.i18nKey}Label`) : asset.categorySlug, to: `/category/${asset.categorySlug}` },
            { label: asset.title },
          ]}
        />
      </Container>

      <Container className="py-7">
        <Grid cols="grid-cols-1 lg:grid-cols-[1fr_22rem]" gap="2xl">
          <div>
            <AssetViewer asset={asset} />

            <div className="mt-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Heading level="h2" as="h1">
                    {asset.title}
                  </Heading>
                  <div className="mt-2 flex items-center gap-3">
                    <RatingDisplay value={asset.rating} count={asset.ratingCount} />
                    <Separator orientation="vertical" className="h-4" />
                    <Text size="sm" muted>
                      {formatNumber(asset.downloads)} {t('asset.downloads')}
                    </Text>
                  </div>
                </div>
                {asset.isAiGenerated && <Badge variant="accent">{t('asset.aiGenerated')}</Badge>}
              </div>

              <Text size="base" muted className="mt-5 max-w-2xl">
                {asset.description}
              </Text>

              {creator && (
                <div className="mt-6">
                  <CreatorIdentity creator={creator} />
                </div>
              )}

              <Separator className="my-8" />

              <div>
                <Heading level="h4" as="h2" className="mb-4">
                  {t('asset.specifications')}
                </Heading>
                <Grid cols="grid-cols-2 sm:grid-cols-4" gap="md">
                  {asset.resolution && <Spec icon={<Ruler />} label={t('asset.resolution')} value={asset.resolution} />}
                  {asset.duration && <Spec icon={<Clock />} label={t('asset.duration')} value={formatDuration(asset.duration)} />}
                  <Spec icon={<FileType />} label={t('asset.fileTypes')} value={asset.fileTypes.join(', ')} />
                  <Spec icon={<TagIcon />} label={t('asset.category')} value={category ? t(`category.${category.i18nKey}Label`) : undefined} />
                </Grid>
              </div>

              <Separator className="my-8" />

              <div>
                <Heading level="h4" as="h2" className="mb-3">
                  {t('asset.tags')}
                </Heading>
                <div className="flex flex-wrap gap-2">
                  {asset.tags.map((tag) => (
                    <Badge key={tag} variant="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-8" />

              <div>
                <div className="flex items-center justify-between">
                  <Heading level="h4" as="h2">
                    {t('asset.reviews')}
                  </Heading>
                  <RatingDisplay value={asset.rating} count={asset.ratingCount} />
                </div>
                {reviews.length === 0 ? (
                  <Text size="sm" muted className="mt-4">
                    {t('asset.noReviews')}
                  </Text>
                ) : (
                  <div className="mt-2">
                    {reviews.map((r) => (
                      <ReviewItem key={r.id} review={r} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside>
            <div className="sticky top-24 rounded-xl border border-border bg-surface-elevated p-6">
              <Stack gap="sm">
                <Text size="caption" muted>
                  {t('asset.chooseLicense')}
                </Text>
                <BuyPanel asset={asset} />
                <Separator className="my-2" />
                <DownloadButton assetId={asset.id} variant="ghost" label={t('asset.alreadyOwn')} />
              </Stack>
              <ul className="mt-6 flex flex-col gap-2 border-t border-separator pt-5 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" /> {t('asset.instantDelivery')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" /> {t('asset.licenseDocsIncluded')}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" /> {t('asset.satisfactionGuarantee')}
                </li>
              </ul>
            </div>
          </aside>
        </Grid>
      </Container>

      <RecommendationSection title={t('asset.relatedAssets')} assets={related} />
      {creator && <MoreFromCreator creatorId={creator.id} excludeId={asset.id} />}
    </>
  );
}

function Spec({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-border bg-surface p-3.5">
      <span className="mt-0.5 text-muted [&>svg]:size-4">{icon}</span>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

function MoreFromCreator({ creatorId, excludeId }) {
  const { t } = useI18n();
  const { data, isLoading } = useQuery({
    queryKey: ['creator-assets', creatorId, excludeId],
    queryFn: () => fetchAssetsByCreator(creatorId, { excludeId }),
  });
  return <RecommendationSection title={t('asset.moreFromCreator')} assets={data} loading={isLoading} />;
}
