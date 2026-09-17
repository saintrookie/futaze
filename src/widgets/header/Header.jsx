import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, Heart, ShoppingBag, ChevronDown, LogOut, LayoutDashboard, ShieldCheck, User } from 'lucide-react';
import { Container, Inline } from '@shared/ui/primitives/Layout';
import { Button, IconButton } from '@shared/ui/atoms/Button';
import { Avatar } from '@shared/ui/atoms/Avatar';
import { Badge } from '@shared/ui/atoms/Badge';
import { SearchInput } from '@shared/ui/molecules/SearchInput';
import { Dropdown, DropdownItem } from '@shared/ui/molecules/Dropdown';
import { Drawer } from '@shared/ui/molecules/Overlay';
import { ThemeToggle } from '@shared/ui/molecules/ThemeToggle';
import { LanguageSwitcher } from '@shared/ui/molecules/LanguageSwitcher';
import { Separator } from '@shared/ui/atoms/Separator';
import { CommandPalette } from '@widgets/command-palette/CommandPalette';
import { PRIMARY_NAV, CATEGORY_NAV } from '@shared/constants/nav';
import { useSession } from '@entities/user';
import { useFavoritesStore } from '@features/favorite-asset';
import { useCartStore } from '@features/purchase-asset';
import { useDisclosure } from '@shared/hooks/useDisclosure';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { cn } from '@shared/lib/cn';

export function Header() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { user, signOut } = useSession();
  const favoriteCount = useFavoritesStore((s) => s.ids.length);
  const cartCount = useCartStore((s) => s.items.length);
  const { isOpen: paletteOpen, open: openPalette, close: closePalette, toggle: togglePalette } = useDisclosure(false);

  const submitSearch = (q) => {
    if (q?.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  /** ⌘K / Ctrl+K opens the command palette from anywhere Header is mounted, unless focus is already in a text field. */
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        const tag = document.activeElement?.tagName;
        const editable = tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable;
        if (editable) return;
        e.preventDefault();
        togglePalette();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [togglePalette]);

  return (
    <header className="sticky top-0 z-sticky border-b border-separator bg-background/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center gap-4 lg:gap-8">
          <Link to="/" className="flex shrink-0 items-center gap-2 font-display text-xl font-semibold tracking-tight text-foreground">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm">F</span>
            Futaze
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <Dropdown
              align="start"
              trigger={({ isOpen }) => (
                <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-surface transition-colors duration-fast">
                  {t('nav.categories')}
                  <ChevronDown className={cn('size-3.5 transition-transform duration-fast', isOpen && 'rotate-180')} />
                </button>
              )}
            >
              {CATEGORY_NAV.map((c) => (
                <DropdownItem key={c.to} onClick={() => navigate(c.to)}>
                  {t(`category.${c.i18nKey}Label`)}
                </DropdownItem>
              ))}
            </Dropdown>
            {PRIMARY_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-fast',
                    isActive ? 'text-foreground' : 'text-muted hover:text-foreground hover:bg-surface'
                  )
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto hidden max-w-md flex-1 md:block">
            <button
              type="button"
              onClick={openPalette}
              className="flex h-10 w-full items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 text-left transition-colors duration-fast hover:border-focus/60"
            >
              <Search className="size-4 shrink-0 text-muted" aria-hidden />
              <span className="flex-1 truncate text-sm text-muted">{t('common.searchPlaceholder')}</span>
              <kbd className="hidden shrink-0 rounded-sm border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted lg:inline-block">⌘K</kbd>
            </button>
          </div>

          <Inline gap="xs" className="ml-auto md:ml-0 shrink-0">
            <IconButton label={t('common.search')} className="md:hidden" onClick={openPalette}>
              <Search />
            </IconButton>
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <ThemeToggle className="hidden sm:inline-flex" />
            <Link
              to="/account/favorites"
              aria-label={t('nav.favorites')}
              className="relative hidden size-11 items-center justify-center rounded-full text-foreground transition-colors duration-fast hover:bg-surface sm:inline-flex"
            >
              <Heart className="size-[1.15rem]" />
              {favoriteCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                  {favoriteCount}
                </span>
              )}
            </Link>
            <Link
              to="/checkout"
              aria-label={t('nav.cart')}
              className="relative hidden size-11 items-center justify-center rounded-full text-foreground transition-colors duration-fast hover:bg-surface sm:inline-flex"
            >
              <ShoppingBag className="size-[1.15rem]" />
              {cartCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <Dropdown
                trigger={() => (
                  <button aria-label={t('common.account')} className="ml-1 rounded-full">
                    <Avatar src={user.avatar} name={user.name} size="sm" />
                  </button>
                )}
              >
                <div className="px-3.5 py-2">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted">{user.email}</p>
                </div>
                <Separator className="my-1" />
                <DropdownItem icon={<User />} onClick={() => navigate('/account')}>
                  {t('common.account')}
                </DropdownItem>
                {user.isCreator && (
                  <DropdownItem icon={<LayoutDashboard />} onClick={() => navigate('/creator-dashboard')}>
                    {t('nav.creatorDashboard')}
                  </DropdownItem>
                )}
                {user.isAdmin && (
                  <DropdownItem icon={<ShieldCheck />} onClick={() => navigate('/admin')}>
                    {t('nav.adminPlatform')}
                  </DropdownItem>
                )}
                <Separator className="my-1" />
                <DropdownItem icon={<LogOut />} onClick={signOut}>
                  {t('common.signOut')}
                </DropdownItem>
              </Dropdown>
            ) : (
              <Inline gap="xs" className="ml-1">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="hidden sm:inline-flex">
                  {t('common.signIn')}
                </Button>
                <Button variant="accent" size="sm" onClick={() => navigate('/register')}>
                  {t('common.getStarted')}
                </Button>
              </Inline>
            )}

            <IconButton label={t('nav.openMenu')} className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu />
            </IconButton>
          </Inline>
        </div>
      </Container>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} title={t('common.menu')} side="left">
        <div className="flex flex-col gap-1">
          <div className="mb-2">
            <SearchInput
              value={query}
              onChange={setQuery}
              onSubmit={(q) => {
                submitSearch(q);
                setMobileOpen(false);
              }}
              size="sm"
              placeholder={t('common.searchPlaceholder')}
            />
          </div>
          {PRIMARY_NAV.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface">
              {t(item.labelKey)}
            </Link>
          ))}
          <Separator className="my-2" />
          <p className="px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted">{t('nav.categories')}</p>
          {CATEGORY_NAV.map((c) => (
            <Link key={c.to} to={c.to} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-surface">
              {t(`category.${c.i18nKey}Label`)}
            </Link>
          ))}
          <Separator className="my-2" />
          <Link to="/account/favorites" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-surface">
            {t('nav.favorites')} {favoriteCount > 0 && <Badge variant="accent" className="ml-2">{favoriteCount}</Badge>}
          </Link>
          <Link to="/checkout" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-surface">
            {t('nav.cart')} {cartCount > 0 && <Badge variant="accent" className="ml-2">{cartCount}</Badge>}
          </Link>
          <Separator className="my-2" />
          <div className="flex items-center justify-between px-3 py-1.5">
            <span className="text-sm text-foreground">{t('nav.theme')}</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between px-3 py-1.5">
            <span className="text-sm text-foreground">{t('nav.language')}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </Drawer>

      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </header>
  );
}
