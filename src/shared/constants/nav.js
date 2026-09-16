import { CATEGORIES } from '@entities/category/model/categories';

/**
 * `labelKey` / navigation `icon` names resolve through the i18n layer and
 * DynamicIcon respectively — nothing here is a literal display string.
 */
export const CATEGORY_NAV = CATEGORIES.map((c) => ({ i18nKey: c.i18nKey, to: `/category/${c.slug}` }));

export const PRIMARY_NAV = [
  { labelKey: 'nav.marketplace', to: '/marketplace' },
  { labelKey: 'nav.creators', to: '/creators' },
  { labelKey: 'nav.pricing', to: '/pricing' },
];

export const ACCOUNT_NAV = [
  { labelKey: 'accountNav.overview', to: '/account', icon: 'LayoutGrid' },
  { labelKey: 'accountNav.purchases', to: '/account/purchases', icon: 'Receipt' },
  { labelKey: 'accountNav.downloads', to: '/account/downloads', icon: 'Download' },
  { labelKey: 'accountNav.favorites', to: '/account/favorites', icon: 'Heart' },
  { labelKey: 'accountNav.collections', to: '/account/collections', icon: 'FolderHeart' },
  { labelKey: 'accountNav.subscription', to: '/account/subscription', icon: 'CreditCard' },
  { labelKey: 'accountNav.notifications', to: '/account/notifications', icon: 'Bell' },
  { labelKey: 'accountNav.settings', to: '/account/settings', icon: 'Settings' },
];

export const CREATOR_NAV = [
  { labelKey: 'creatorNav.dashboard', to: '/creator-dashboard', icon: 'LayoutGrid' },
  { labelKey: 'creatorNav.assets', to: '/creator-dashboard/assets', icon: 'Image' },
  { labelKey: 'creatorNav.upload', to: '/creator-dashboard/upload', icon: 'UploadCloud' },
  { labelKey: 'creatorNav.analytics', to: '/creator-dashboard/analytics', icon: 'BarChart3' },
  { labelKey: 'creatorNav.earnings', to: '/creator-dashboard/earnings', icon: 'Wallet' },
  { labelKey: 'creatorNav.payouts', to: '/creator-dashboard/payouts', icon: 'Landmark' },
  { labelKey: 'creatorNav.settings', to: '/creator-dashboard/settings', icon: 'Settings' },
];

export const ADMIN_NAV = [
  { labelKey: 'adminNav.dashboard', to: '/admin', icon: 'LayoutGrid' },
  { labelKey: 'adminNav.users', to: '/admin/users', icon: 'Users' },
  { labelKey: 'adminNav.creators', to: '/admin/creators', icon: 'Star' },
  { labelKey: 'adminNav.assets', to: '/admin/assets', icon: 'Image' },
  { labelKey: 'adminNav.moderation', to: '/admin/moderation', icon: 'ShieldAlert' },
  { labelKey: 'adminNav.orders', to: '/admin/orders', icon: 'Receipt' },
  { labelKey: 'adminNav.reports', to: '/admin/reports', icon: 'Flag' },
  { labelKey: 'adminNav.settings', to: '/admin/settings', icon: 'Settings' },
];
