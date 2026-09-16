import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UploadCloud } from 'lucide-react';
import { DashboardShell } from '@widgets/dashboard-shell/DashboardShell';
import { Button } from '@shared/ui/atoms/Button';
import { CREATOR_NAV } from '@shared/constants/nav';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function CreatorDashboardLayout() {
  const { t } = useI18n();
  return (
    <DashboardShell
      navItems={CREATOR_NAV}
      eyebrow={t('dashboard.creatorEyebrow')}
      title={t('dashboard.creatorTitle')}
      actions={
        <Button as={Link} to="/creator-dashboard/upload" variant="accent" size="sm" iconLeft={<UploadCloud />}>
          {t('dashboard.upload')}
        </Button>
      }
    >
      <Outlet />
    </DashboardShell>
  );
}
