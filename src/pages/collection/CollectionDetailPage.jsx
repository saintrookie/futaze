import { useParams } from 'react-router-dom';
import { Lock, Globe2 } from 'lucide-react';
import { Container } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { AssetGrid } from '@widgets/asset-grid/AssetGrid';
import { COLLECTIONS, getCollectionAssets } from '@entities/collection';
import { NotFoundPage } from '@pages/not-found/NotFoundPage';

export default function CollectionDetailPage() {
  const { slug } = useParams();
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) return <NotFoundPage />;
  const assets = getCollectionAssets(collection);

  return (
    <Container className="py-9">
      <div className="mb-7 flex items-center gap-3">
        <Heading level="h2" as="h1">
          {collection.title}
        </Heading>
        <span className="flex items-center gap-1 text-sm text-muted">
          {collection.visibility === 'private' ? <Lock className="size-3.5" /> : <Globe2 className="size-3.5" />}
          {collection.visibility}
        </span>
      </div>
      {collection.description && (
        <Text size="base" muted className="mb-7 max-w-xl">
          {collection.description}
        </Text>
      )}
      <AssetGrid assets={assets} />
    </Container>
  );
}
