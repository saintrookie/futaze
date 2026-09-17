import { Home, Compass, Search, FolderHeart, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSession } from '@entities/user';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { cn } from '@shared/lib/cn';

/**
 * Primary mobile navigation, per docs/11-screens-ux-catalog.md §11.5 —
 * Home / Explore / Search / Collections / Account. Desktop keeps the
 * Header's own nav (`lg:hidden` here); this doesn't replace the mobile
 * hamburger drawer, it adds the doc-required persistent tab bar on top.
 */
const TABS = [
  { key: 'home', to: '/', icon: Home, end: true },
  { key: 'explore', to: '/marketplace', icon: Compass },
  { key: 'search', to: '/search', icon: Search },
  { key: 'collections', to: '/account/collections', icon: FolderHeart },
  { key: 'account', to: '/account', icon: User, end: true },
];

export function BottomNav() {
  const { t } = useI18n();
  const { user } = useSession();

  return (
    <nav
      aria-label={t('mobileNav.navLabel')}
      className="fixed inset-x-0 bottom-0 z-sticky flex items-stretch border-t border-separator bg-background/95 backdrop-blur-md lg:hidden"
    >
      {TABS.map((tab) => {
        const to = tab.key === 'account' && !user ? '/login' : tab.to;
        return (
          <NavLink
            key={tab.key}
            to={to}
            end={tab.end}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors duration-fast',
                isActive ? 'text-foreground' : 'text-muted'
              )
            }
          >
            <tab.icon className="size-5" aria-hidden />
            {t(`mobileNav.${tab.key}`)}
          </NavLink>
        );
      })}
    </nav>
  );
}
