import { Outlet } from 'react-router-dom';
import { DashboardShell } from '@widgets/dashboard-shell/DashboardShell';
import { ADMIN_NAV } from '@shared/constants/nav';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AdminLayout() {
  const { t } = useI18n();
  return (
    <DashboardShell navItems={ADMIN_NAV} eyebrow={t('dashboard.adminEyebrow')} title={t('dashboard.adminTitle')}>
      <Outlet />
    </DashboardShell>
  );
}
