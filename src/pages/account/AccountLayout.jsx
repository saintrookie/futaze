import { Outlet } from 'react-router-dom';
import { DashboardShell } from '@widgets/dashboard-shell/DashboardShell';
import { ACCOUNT_NAV } from '@shared/constants/nav';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function AccountLayout() {
  const { t } = useI18n();
  return (
    <DashboardShell navItems={ACCOUNT_NAV} eyebrow={t('dashboard.accountEyebrow')} title={t('dashboard.accountTitle')}>
      <Outlet />
    </DashboardShell>
  );
}
