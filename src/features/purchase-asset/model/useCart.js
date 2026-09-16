import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getLicense } from '@entities/license/model/licenses';

function priceFor(asset, licenseKey) {
  const license = getLicense(licenseKey);
  return Math.round(asset.price * license.priceMultiplier * 100) / 100;
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (asset, licenseKey) =>
        set((state) => {
          const existing = state.items.find((i) => i.assetId === asset.id);
          const item = { assetId: asset.id, asset, license: licenseKey, price: priceFor(asset, licenseKey) };
          if (existing) {
            return { items: state.items.map((i) => (i.assetId === asset.id ? item : i)) };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (assetId) => set((state) => ({ items: state.items.filter((i) => i.assetId !== assetId) })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price, 0),
    }),
    { name: 'futaze-cart' }
  )
);

export { priceFor };
