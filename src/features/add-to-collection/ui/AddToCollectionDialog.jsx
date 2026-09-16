import { useState } from 'react';
import { FolderPlus, Check } from 'lucide-react';
import { Dialog } from '@shared/ui/molecules/Overlay';
import { Button } from '@shared/ui/atoms/Button';
import { Input } from '@shared/ui/atoms/FormControls';
import { Text } from '@shared/ui/atoms/Typography';
import { useCollectionsStore } from '@features/add-to-collection/model/useCollections';

export function AddToCollectionDialog({ open, onClose, asset }) {
  const collections = useCollectionsStore((s) => s.collections);
  const addAssetToCollection = useCollectionsStore((s) => s.addAssetToCollection);
  const createCollection = useCollectionsStore((s) => s.createCollection);
  const [newTitle, setNewTitle] = useState('');

  if (!asset) return null;

  return (
    <Dialog open={open} onClose={onClose} title="Add to collection" description={asset.title} size="sm">
      <ul className="flex flex-col gap-1">
        {collections.map((c) => {
          const added = c.assetIds.includes(asset.id);
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => addAssetToCollection(c.id, asset.id)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left hover:bg-surface transition-colors duration-fast"
              >
                <span className="text-sm text-foreground">{c.title}</span>
                {added && <Check className="size-4 text-success" />}
              </button>
            </li>
          );
        })}
      </ul>
      <form
        className="mt-4 flex items-center gap-2 border-t border-separator pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!newTitle.trim()) return;
          createCollection(newTitle.trim());
          setNewTitle('');
        }}
      >
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New collection name"
          size="sm"
        />
        <Button type="submit" variant="secondary" size="sm" iconLeft={<FolderPlus />}>
          Create
        </Button>
      </form>
      <Text size="xs" muted className="mt-3">
        Collections are private by default. You can share them from your account.
      </Text>
    </Dialog>
  );
}
