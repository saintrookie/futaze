import { create } from 'zustand';
import { COLLECTIONS as SEED } from '@entities/collection';

export const useCollectionsStore = create((set) => ({
  collections: SEED,
  addAssetToCollection: (collectionId, assetId) =>
    set((state) => ({
      collections: state.collections.map((c) =>
        c.id === collectionId && !c.assetIds.includes(assetId)
          ? { ...c, assetIds: [...c.assetIds, assetId] }
          : c
      ),
    })),
  createCollection: (title) =>
    set((state) => ({
      collections: [
        {
          id: `col-${Date.now()}`,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          title,
          description: '',
          visibility: 'private',
          assetIds: [],
        },
        ...state.collections,
      ],
    })),
}));
