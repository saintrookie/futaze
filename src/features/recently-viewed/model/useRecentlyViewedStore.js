import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_ITEMS = 12;

export const useRecentlyViewedStore = create(
  persist(
    (set, get) => ({
      ids: [],
      recordView: (assetId) =>
        set((state) => ({
          ids: [assetId, ...state.ids.filter((id) => id !== assetId)].slice(0, MAX_ITEMS),
        })),
      clear: () => set({ ids: [] }),
    }),
    { name: 'futaze-recently-viewed' }
  )
);

export function useRecentlyViewed() {
  const ids = useRecentlyViewedStore((s) => s.ids);
  const recordView = useRecentlyViewedStore((s) => s.recordView);
  return { ids, recordView };
}
