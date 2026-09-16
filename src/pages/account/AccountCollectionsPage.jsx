import { FolderHeart } from 'lucide-react';
import { Grid } from '@shared/ui/primitives/Layout';
import { EmptyState } from '@shared/ui/patterns/EmptyState';
import { CollectionCard } from '@entities/collection';
import { useCollectionsStore } from '@features/add-to-collection';

export default function AccountCollectionsPage() {
  const collections = useCollectionsStore((s) => s.collections);

  if (collections.length === 0) {
    return (
      <EmptyState
        icon={<FolderHeart />}
        title="No collections yet"
        description="Create a collection from any asset page to start organizing your favorites into moodboards or projects."
      />
    );
  }

  return (
    <Grid cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" gap="lg">
      {collections.map((c) => (
        <CollectionCard key={c.id} collection={c} />
      ))}
    </Grid>
  );
}
