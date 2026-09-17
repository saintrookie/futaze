import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@widgets/header/Header';
import { BottomNav } from '@widgets/navigation/BottomNav';

/**
 * Also serves /creator-dashboard/* and /admin/*, which already have
 * DashboardShell's own sidebar+drawer nav built for data-table/tool UIs —
 * the 5-tab consumer nav must only render for the /account/* surface.
 */
export function DashboardLayout() {
  const { pathname } = useLocation();
  const showBottomNav = pathname.startsWith('/account');

  return (
    <div className="flex min-h-screen flex-col bg-surface/30">
      <Header />
      <main className={showBottomNav ? 'flex-1 pb-16 lg:pb-0' : 'flex-1'}>
        <Outlet />
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
