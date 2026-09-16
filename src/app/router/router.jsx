import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PublicLayout } from '@app/layouts/PublicLayout';
import { AuthLayout } from '@app/layouts/AuthLayout';
import { DashboardLayout } from '@app/layouts/DashboardLayout';
import { RequireRole } from '@app/router/guards';
import { RouteErrorBoundary } from '@app/router/RouteErrorBoundary';
import { AUTH_PANELS } from '@shared/constants/authPanels';
import { Container } from '@shared/ui/primitives/Layout';
import { Skeleton } from '@shared/ui/atoms/Feedback';

const HomePage = lazy(() => import('@pages/home/HomePage'));
const MarketplacePage = lazy(() => import('@pages/marketplace/MarketplacePage'));
const SearchPage = lazy(() => import('@pages/search/SearchPage'));
const CategoryPage = lazy(() => import('@pages/category/CategoryPage'));
const AssetDetailPage = lazy(() => import('@pages/asset/AssetDetailPage'));
const CreatorProfilePage = lazy(() => import('@pages/creator/CreatorProfilePage'));
const CreatorsDirectoryPage = lazy(() => import('@pages/creators/CreatorsDirectoryPage'));
const CollectionDetailPage = lazy(() => import('@pages/collection/CollectionDetailPage'));
const PricingPage = lazy(() => import('@pages/pricing/PricingPage'));
const AboutPage = lazy(() => import('@pages/static/AboutPage'));
const ContactPage = lazy(() => import('@pages/static/ContactPage'));
const FaqPage = lazy(() => import('@pages/static/FaqPage'));
const LegalPage = lazy(() => import('@pages/static/LegalPage'));
const CheckoutPage = lazy(() => import('@pages/checkout/CheckoutPage'));
const CheckoutSuccessPage = lazy(() => import('@pages/checkout/CheckoutSuccessPage'));
const NotFoundPage = lazy(() => import('@pages/not-found/NotFoundPage'));

const LoginPage = lazy(() => import('@pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@pages/auth/ForgotPasswordPage'));

const AccountLayout = lazy(() => import('@pages/account/AccountLayout'));
const AccountOverviewPage = lazy(() => import('@pages/account/AccountOverviewPage'));
const AccountPurchasesPage = lazy(() => import('@pages/account/AccountPurchasesPage'));
const AccountDownloadsPage = lazy(() => import('@pages/account/AccountDownloadsPage'));
const AccountFavoritesPage = lazy(() => import('@pages/account/AccountFavoritesPage'));
const AccountCollectionsPage = lazy(() => import('@pages/account/AccountCollectionsPage'));
const AccountSubscriptionPage = lazy(() => import('@pages/account/AccountSubscriptionPage'));
const AccountNotificationsPage = lazy(() => import('@pages/account/AccountNotificationsPage'));
const AccountSettingsPage = lazy(() => import('@pages/account/AccountSettingsPage'));

const CreatorDashboardLayout = lazy(() => import('@pages/creator-dashboard/CreatorDashboardLayout'));
const CreatorDashboardPage = lazy(() => import('@pages/creator-dashboard/CreatorDashboardPage'));
const CreatorAssetsPage = lazy(() => import('@pages/creator-dashboard/CreatorAssetsPage'));
const CreatorUploadPage = lazy(() => import('@pages/creator-dashboard/CreatorUploadPage'));
const CreatorAnalyticsPage = lazy(() => import('@pages/creator-dashboard/CreatorAnalyticsPage'));
const CreatorEarningsPage = lazy(() => import('@pages/creator-dashboard/CreatorEarningsPage'));
const CreatorPayoutsPage = lazy(() => import('@pages/creator-dashboard/CreatorPayoutsPage'));
const CreatorSettingsPage = lazy(() => import('@pages/creator-dashboard/CreatorSettingsPage'));

const AdminLayout = lazy(() => import('@pages/admin/AdminLayout'));
const AdminDashboardPage = lazy(() => import('@pages/admin/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('@pages/admin/AdminUsersPage'));
const AdminCreatorsPage = lazy(() => import('@pages/admin/AdminCreatorsPage'));
const AdminAssetsPage = lazy(() => import('@pages/admin/AdminAssetsPage'));
const AdminModerationPage = lazy(() => import('@pages/admin/AdminModerationPage'));
const AdminOrdersPage = lazy(() => import('@pages/admin/AdminOrdersPage'));
const AdminReportsPage = lazy(() => import('@pages/admin/AdminReportsPage'));
const AdminSettingsPage = lazy(() => import('@pages/admin/AdminSettingsPage'));

function RouteFallback() {
  return (
    <Container className="py-9">
      <Skeleton className="h-96 w-full rounded-xl" />
    </Container>
  );
}

function withSuspense(element) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: '/', element: withSuspense(<HomePage />) },
      { path: '/marketplace', element: withSuspense(<MarketplacePage />) },
      { path: '/search', element: withSuspense(<SearchPage />) },
      { path: '/category/:slug', element: withSuspense(<CategoryPage />) },
      { path: '/asset/:slug', element: withSuspense(<AssetDetailPage />) },
      { path: '/creators', element: withSuspense(<CreatorsDirectoryPage />) },
      { path: '/creator/:username', element: withSuspense(<CreatorProfilePage />) },
      { path: '/collection/:slug', element: withSuspense(<CollectionDetailPage />) },
      { path: '/pricing', element: withSuspense(<PricingPage />) },
      { path: '/about', element: withSuspense(<AboutPage />) },
      { path: '/contact', element: withSuspense(<ContactPage />) },
      { path: '/faq', element: withSuspense(<FaqPage />) },
      { path: '/terms', element: withSuspense(<LegalPage type="terms" />) },
      { path: '/privacy', element: withSuspense(<LegalPage type="privacy" />) },
      { path: '/checkout', element: withSuspense(<CheckoutPage />) },
      { path: '/checkout/success', element: withSuspense(<CheckoutSuccessPage />) },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: '/login', element: withSuspense(<LoginPage />), handle: { authPanel: AUTH_PANELS.login } },
      { path: '/register', element: withSuspense(<RegisterPage />), handle: { authPanel: AUTH_PANELS.register } },
      {
        path: '/forgot-password',
        element: withSuspense(<ForgotPasswordPage />),
        handle: { authPanel: AUTH_PANELS.forgotPassword },
      },
    ],
  },
  {
    element: <DashboardLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: '/account',
        element: withSuspense(<AccountLayout />),
        children: [
          { index: true, element: withSuspense(<AccountOverviewPage />) },
          { path: 'purchases', element: withSuspense(<AccountPurchasesPage />) },
          { path: 'downloads', element: withSuspense(<AccountDownloadsPage />) },
          { path: 'favorites', element: withSuspense(<AccountFavoritesPage />) },
          { path: 'collections', element: withSuspense(<AccountCollectionsPage />) },
          { path: 'subscription', element: withSuspense(<AccountSubscriptionPage />) },
          { path: 'notifications', element: withSuspense(<AccountNotificationsPage />) },
          { path: 'settings', element: withSuspense(<AccountSettingsPage />) },
        ],
      },
      {
        path: '/creator-dashboard',
        element: <RequireRole role="creator">{withSuspense(<CreatorDashboardLayout />)}</RequireRole>,
        children: [
          { index: true, element: withSuspense(<CreatorDashboardPage />) },
          { path: 'assets', element: withSuspense(<CreatorAssetsPage />) },
          { path: 'upload', element: withSuspense(<CreatorUploadPage />) },
          { path: 'analytics', element: withSuspense(<CreatorAnalyticsPage />) },
          { path: 'earnings', element: withSuspense(<CreatorEarningsPage />) },
          { path: 'payouts', element: withSuspense(<CreatorPayoutsPage />) },
          { path: 'settings', element: withSuspense(<CreatorSettingsPage />) },
        ],
      },
      {
        path: '/admin',
        element: <RequireRole role="admin">{withSuspense(<AdminLayout />)}</RequireRole>,
        children: [
          { index: true, element: withSuspense(<AdminDashboardPage />) },
          { path: 'users', element: withSuspense(<AdminUsersPage />) },
          { path: 'creators', element: withSuspense(<AdminCreatorsPage />) },
          { path: 'assets', element: withSuspense(<AdminAssetsPage />) },
          { path: 'moderation', element: withSuspense(<AdminModerationPage />) },
          { path: 'orders', element: withSuspense(<AdminOrdersPage />) },
          { path: 'reports', element: withSuspense(<AdminReportsPage />) },
          { path: 'settings', element: withSuspense(<AdminSettingsPage />) },
        ],
      },
    ],
  },
  {
    element: <PublicLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [{ path: '*', element: withSuspense(<NotFoundPage />) }],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
