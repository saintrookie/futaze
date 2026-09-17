import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from '@widgets/header/Header';
import { Footer } from '@widgets/footer/Footer';
import { BottomNav } from '@widgets/navigation/BottomNav';
import { useI18n } from '@shared/i18n/LocaleProvider';

export function PublicLayout() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-toast focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        {t('nav.skipToContent')}
      </a>
      <Header />
      <main id="main-content" className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <ScrollRestoration />
    </div>
  );
}
