import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FAVORITES_SEED_IDS } from '@entities/order';

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      ids: FAVORITES_SEED_IDS,
      isFavorited: (assetId) => get().ids.includes(assetId),
      toggle: (asset) =>
        set((state) => ({
          ids: state.ids.includes(asset.id)
            ? state.ids.filter((id) => id !== asset.id)
            : [...state.ids, asset.id],
        })),
    }),
    { name: 'futaze-favorites' }
  )
);

export function useFavoriteAsset(assetId) {
  const isFavorited = useFavoritesStore((s) => (assetId ? s.ids.includes(assetId) : false));
  const toggle = useFavoritesStore((s) => s.toggle);
  return { isFavorited, toggle };
}
