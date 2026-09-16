import { Outlet } from 'react-router-dom';
import { Header } from '@widgets/header/Header';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface/30">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
