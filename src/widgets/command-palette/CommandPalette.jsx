import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import {
  Search,
  SearchX,
  Store,
  Users,
  Tags,
  Tag,
  Heart,
  ShoppingBag,
  User,
  LayoutDashboard,
  ShieldCheck,
  Sun,
  Moon,
  Languages,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { VisuallyHidden } from '@shared/ui/primitives/Layout';
import { Skeleton } from '@shared/ui/atoms/Feedback';
import { useTheme } from '@app/providers/AppProviders';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { useSession } from '@entities/user';
import { CATEGORY_NAV } from '@shared/constants/nav';
import { fetchAssets, fetchAssetsByIds, useLocalizedAssets } from '@entities/asset';
import { fetchCreators } from '@entities/creator';
import { useRecentlyViewed } from '@features/recently-viewed';

/** Mirrors ThemeToggle's own resolution so the palette's icon/label always match what's on screen. */
function resolveTheme(theme) {
  if (theme !== 'system') return theme;
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function Row({ innerRef, active, onSelect, icon: Icon, image, title, subtitle, meta }) {
  return (
    <button
      ref={innerRef}
      type="button"
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-fast',
        active ? 'bg-surface' : 'hover:bg-surface'
      )}
    >
      {image ? (
        <span className="size-9 shrink-0 overflow-hidden rounded-md bg-surface">
          <img src={image} alt="" className="size-full object-cover" loading="lazy" />
        </span>
      ) : Icon ? (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-surface text-muted [&>svg]:size-4">
          <Icon aria-hidden />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">{title}</span>
        {subtitle && <span className="block truncate text-xs text-muted">{subtitle}</span>}
      </span>
      {meta && <span className="shrink-0 text-xs text-muted">{meta}</span>}
    </button>
  );
}

function SectionLabel({ children }) {
  return <p className="mb-1.5 mt-4 px-3 text-[11px] font-medium uppercase tracking-wide text-muted first:mt-0">{children}</p>;
}

export function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const { t, locale, setLocale } = useI18n();
  const { user } = useSession();
  const [theme, setTheme] = useTheme();
  const resolvedTheme = resolveTheme(theme);
  const { ids: recentIds } = useRecentlyViewed();

  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setDebounced('');
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 200);
    return () => clearTimeout(id);
  }, [query]);

  const hasQuery = debounced.length > 0;

  const recentQuery = useQuery({
    queryKey: ['palette-recent', recentIds],
    queryFn: () => fetchAssetsByIds(recentIds, { limit: 5 }),
    enabled: open && !hasQuery && recentIds.length > 0,
  });
  const assetsQuery = useQuery({
    queryKey: ['palette-assets', debounced],
    queryFn: () => fetchAssets({ filters: { query: debounced }, pageSize: 5 }),
    enabled: open && hasQuery,
  });
  const creatorsQuery = useQuery({
    queryKey: ['palette-creators'],
    queryFn: () => fetchCreators(),
    enabled: open && hasQuery,
  });

  const recentAssets = useLocalizedAssets(recentQuery.data);
  const resultAssets = useLocalizedAssets(assetsQuery.data?.items);
  const matchingCreators = useMemo(() => {
    if (!hasQuery || !creatorsQuery.data) return [];
    const q = debounced.toLowerCase();
    return creatorsQuery.data
      .filter((c) => c.name.toLowerCase().includes(q) || c.username.toLowerCase().includes(q))
      .slice(0, 4);
  }, [creatorsQuery.data, debounced, hasQuery]);

  const goTo = (to) => {
    navigate(to);
    onClose();
  };

  const quickActions = useMemo(() => {
    const actions = [
      { key: 'marketplace', label: t('nav.marketplace'), icon: Store, onSelect: () => goTo('/marketplace') },
      { key: 'creators', label: t('nav.creators'), icon: Users, onSelect: () => goTo('/creators') },
      { key: 'pricing', label: t('nav.pricing'), icon: Tags, onSelect: () => goTo('/pricing') },
      { key: 'favorites', label: t('nav.favorites'), icon: Heart, onSelect: () => goTo('/account/favorites') },
      { key: 'cart', label: t('nav.cart'), icon: ShoppingBag, onSelect: () => goTo('/checkout') },
      user
        ? { key: 'account', label: t('common.account'), icon: User, onSelect: () => goTo('/account') }
        : { key: 'signIn', label: t('common.signIn'), icon: User, onSelect: () => goTo('/login') },
    ];
    if (user?.isCreator) {
      actions.push({ key: 'creatorDashboard', label: t('nav.creatorDashboard'), icon: LayoutDashboard, onSelect: () => goTo('/creator-dashboard') });
    }
    if (user?.isAdmin) {
      actions.push({ key: 'adminPlatform', label: t('nav.adminPlatform'), icon: ShieldCheck, onSelect: () => goTo('/admin') });
    }
    actions.push({
      key: 'theme',
      label: resolvedTheme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark'),
      icon: resolvedTheme === 'dark' ? Sun : Moon,
      onSelect: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
    });
    actions.push({
      key: 'language',
      label: `${t('nav.language')}: ${locale === 'en' ? 'Indonesia' : 'English'}`,
      icon: Languages,
      onSelect: () => setLocale(locale === 'en' ? 'id' : 'en'),
    });
    return actions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, resolvedTheme, locale, t]);

  const categoryItems = CATEGORY_NAV.map((c) => ({
    key: c.to,
    label: t(`category.${c.i18nKey}Label`),
    icon: Tag,
    onSelect: () => goTo(c.to),
  }));

  const recentItems = (recentAssets || []).map((asset) => ({
    key: asset.id,
    title: asset.title,
    image: asset.previewImage,
    onSelect: () => goTo(`/asset/${asset.slug}`),
  }));

  const assetResultItems = (resultAssets || []).map((asset) => ({
    key: asset.id,
    title: asset.title,
    image: asset.previewImage,
    onSelect: () => goTo(`/asset/${asset.slug}`),
  }));

  const creatorResultItems = matchingCreators.map((creator) => ({
    key: creator.id,
    title: creator.name,
    subtitle: `@${creator.username}`,
    image: creator.avatar,
    onSelect: () => goTo(`/creator/${creator.username}`),
  }));

  const viewAllItem = hasQuery
    ? [{ key: 'view-all', title: t('commandPalette.viewAllResults', { query: debounced }), icon: ArrowUpRight, onSelect: () => goTo(`/search?q=${encodeURIComponent(debounced)}`) }]
    : [];

  /** Sections rendered top-to-bottom; also the source of truth for keyboard roving-index order. */
  const sections = hasQuery
    ? [
        { label: t('commandPalette.assetsLabel'), items: assetResultItems, loading: assetsQuery.isLoading },
        { label: t('commandPalette.creatorsLabel'), items: creatorResultItems, loading: creatorsQuery.isLoading },
        { label: null, items: viewAllItem },
      ]
    : [
        { label: t('commandPalette.recentlyViewedLabel'), items: recentItems, loading: recentQuery.isLoading, icon: Clock },
        { label: t('commandPalette.categoriesLabel'), items: categoryItems },
        { label: t('commandPalette.quickActionsLabel'), items: quickActions },
      ];

  const flatItems = sections.flatMap((s) => s.items);
  const showEmpty = hasQuery && !assetsQuery.isLoading && !creatorsQuery.isLoading && assetResultItems.length === 0 && creatorResultItems.length === 0;

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, flatItems.length);
    itemRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, flatItems.length]);

  useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(flatItems.length - 1, 0)));
  }, [flatItems.length]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      flatItems[activeIndex]?.onSelect();
    }
  };

  let cursor = -1;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-modal bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in duration-normal" />
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
          className="fixed inset-x-4 top-[10%] z-modal mx-auto flex max-h-[70vh] w-[calc(100%-2rem)] max-w-xl flex-col overflow-hidden rounded-xl bg-surface-floating shadow-xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-normal ease-emphasized sm:top-[15%]"
        >
          <VisuallyHidden as={DialogPrimitive.Title}>{t('commandPalette.placeholder')}</VisuallyHidden>
          <VisuallyHidden as={DialogPrimitive.Description}>{t('commandPalette.placeholder')}</VisuallyHidden>

          <div className="flex items-center gap-3 border-b border-separator px-4">
            <Search className="size-4 shrink-0 text-muted" aria-hidden />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t('commandPalette.placeholder')}
              className="h-14 w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
            <kbd className="hidden shrink-0 rounded-sm border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted sm:inline-block">Esc</kbd>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {sections.map((section) =>
              section.items.length === 0 && !section.loading ? null : (
                <div key={section.label || 'view-all'}>
                  {section.label && <SectionLabel>{section.label}</SectionLabel>}
                  {section.loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                          <Skeleton className="size-9 shrink-0 rounded-md" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      ))
                    : section.items.map((item) => {
                        cursor += 1;
                        const index = cursor;
                        return (
                          <Row
                            key={item.key}
                            innerRef={(el) => (itemRefs.current[index] = el)}
                            active={index === activeIndex}
                            onSelect={item.onSelect}
                            icon={item.icon || section.icon}
                            image={item.image}
                            title={item.title || item.label}
                            subtitle={item.subtitle}
                          />
                        );
                      })}
                </div>
              )
            )}

            {showEmpty && (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                <SearchX className="size-6 text-muted" aria-hidden />
                <p className="text-sm font-medium text-foreground">{t('commandPalette.noResultsTitle')}</p>
                <p className="text-xs text-muted">{t('commandPalette.noResultsDescription')}</p>
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
