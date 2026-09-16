import { Link } from 'react-router-dom';
import { Lock, Globe2 } from 'lucide-react';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { LazyImage } from '@shared/ui/atoms/LazyImage';
import { getCollectionAssets } from '@entities/collection/model/mock';

export function CollectionCard({ collection }) {
  const assets = getCollectionAssets(collection).slice(0, 4);
  return (
    <Link to={`/collection/${collection.slug}`} className="group block">
      <div className="grid aspect-[4/3] grid-cols-2 gap-1 overflow-hidden rounded-lg bg-surface">
        {assets.length ? (
          assets.map((a) => (
            <div key={a.id} className="relative">
              <LazyImage src={a.previewImage} alt="" imgClassName="transition-transform duration-slow ease-emphasized group-hover:scale-105" />
            </div>
          ))
        ) : (
          <div className="col-span-2 flex items-center justify-center text-sm text-muted">No assets yet</div>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <Heading level="h4" as="h3" className="text-base">
            {collection.title}
          </Heading>
          <Text size="sm" muted className="mt-0.5 line-clamp-1">
            {collection.description}
          </Text>
        </div>
        <span className="mt-1 shrink-0 text-muted" aria-label={collection.visibility}>
          {collection.visibility === 'private' ? <Lock className="size-3.5" /> : <Globe2 className="size-3.5" />}
        </span>
      </div>
    </Link>
  );
}
