import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFollowStore = create(
  persist(
    (set, get) => ({
      ids: ['creator-1', 'creator-4'],
      isFollowing: (creatorId) => get().ids.includes(creatorId),
      toggle: (creatorId) =>
        set((state) => ({
          ids: state.ids.includes(creatorId) ? state.ids.filter((id) => id !== creatorId) : [...state.ids, creatorId],
        })),
    }),
    { name: 'futaze-follows' }
  )
);
