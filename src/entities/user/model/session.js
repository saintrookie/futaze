import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEMO_USERS } from '@entities/user/model/mock';

export const useSession = create(
  persist(
    (set) => ({
      user: null,
      status: 'signed-out', // 'signed-out' | 'authenticating' | 'authenticated'
      /** @param {'customer' | 'creator' | 'admin'} role */
      signIn: async (role = 'customer') => {
        set({ status: 'authenticating' });
        await new Promise((r) => setTimeout(r, 500));
        set({ user: DEMO_USERS[role] || DEMO_USERS.customer, status: 'authenticated' });
      },
      signOut: () => set({ user: null, status: 'signed-out' }),
    }),
    { name: 'futaze-session', partialize: (state) => ({ user: state.user, status: state.user ? 'authenticated' : 'signed-out' }) }
  )
);
