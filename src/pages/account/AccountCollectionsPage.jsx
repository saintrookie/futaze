import { FolderHeart } from 'lucide-react';
import { Grid } from '@shared/ui/primitives/Layout';
import { EmptyState } from '@shared/ui/patterns/EmptyState';
import { CollectionCard } from '@entities/collection';
import { useCollectionsStore } from '@features/add-to-collection';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AccountCollectionsPage() {
  const { t } = useI18n();
  const collections = useCollectionsStore((s) => s.collections);

  if (collections.length === 0) {
    return (
      <EmptyState
        icon={<FolderHeart />}
        title={t('account.noCollectionsTitle')}
        description={t('account.noCollectionsDescription')}
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
