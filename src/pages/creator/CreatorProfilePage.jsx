import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Container } from '@shared/ui/primitives/Layout';
import { Tabs } from '@shared/ui/molecules/Tabs';
import { Text } from '@shared/ui/atoms/Typography';
import { Skeleton } from '@shared/ui/atoms/Feedback';
import { CreatorProfileHeader } from '@widgets/creator-profile/CreatorProfileHeader';
import { AssetGrid } from '@widgets/asset-grid/AssetGrid';
import { fetchCreatorByUsername } from '@entities/creator';
import { fetchAssetsByCreator } from '@entities/asset';
import { NotFoundPage } from '@pages/not-found/NotFoundPage';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function CreatorProfilePage() {
  const { username } = useParams();
  const { t } = useI18n();
  const [tab, setTab] = useState('published');
  const TABS = [
    { value: 'published', label: t('creator.tabPublished') },
    { value: 'about', label: t('creator.tabAbout') },
  ];

  const { data: creator, isLoading } = useQuery({
    queryKey: ['creator', username],
    queryFn: () => fetchCreatorByUsername(username),
    retry: false,
  });

  const { data: assets, isLoading: assetsLoading } = useQuery({
    queryKey: ['creator-assets', creator?.id],
    queryFn: () => fetchAssetsByCreator(creator.id, { limit: 24 }),
    enabled: !!creator,
  });

  if (isLoading) {
    return (
      <Container className="py-9">
        <Skeleton className="h-64 w-full rounded-xl" />
      </Container>
    );
  }

  if (!creator) return <NotFoundPage />;

  return (
    <>
      <CreatorProfileHeader creator={creator} />
      <Container className="py-8">
        <Tabs items={TABS} value={tab} onChange={setTab} className="mb-7" />
        {tab === 'published' ? (
          <AssetGrid assets={assets} loading={assetsLoading} />
        ) : (
          <div className="max-w-2xl">
            <Text size="base">
              {t('creator.bio', {
                name: creator.name.split(' ')[0],
                specialty: t(`creator.specialty.${creator.specialtyKey}`),
                year: new Date(creator.joinedAt).getFullYear(),
              })}
            </Text>
            <Text size="sm" muted className="mt-4">
              {t('creator.basedInPublishing', {
                location: t(`creator.location.${creator.locationKey}`),
                specialty: t(`creator.specialty.${creator.specialtyKey}`),
                year: new Date(creator.joinedAt).getFullYear(),
              })}
            </Text>
          </div>
        )}
      </Container>
    </>
  );
}
