import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Container } from '@shared/ui/primitives/Layout';
import { IconButton } from '@shared/ui/atoms/Button';
import { Drawer } from '@shared/ui/molecules/Overlay';
import { Heading } from '@shared/ui/atoms/Typography';
import { DynamicIcon } from '@shared/lib/icons';
import { cn } from '@shared/lib/cn';
import { useI18n } from '@shared/i18n/LocaleProvider';

function SidebarNav({ items, onNavigate, className }) {
  const { t } = useI18n();
  return (
    <nav className={cn('flex flex-col gap-0.5', className)}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to.split('/').length <= 2}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-fast',
              isActive ? 'bg-surface text-foreground' : 'text-muted hover:bg-surface hover:text-foreground'
            )
          }
        >
          <DynamicIcon name={item.icon} className="size-4" />
          {t(item.labelKey)}
        </NavLink>
      ))}
    </nav>
  );
}

export function DashboardShell({ navItems, title, eyebrow, actions, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between gap-4 pb-6 lg:hidden">
        <Heading level="h3" as="h1">
          {title}
        </Heading>
        <IconButton label={t('nav.openMenu')} onClick={() => setMobileOpen(true)}>
          <Menu />
        </IconButton>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <SidebarNav items={navItems} />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-7 hidden items-center justify-between gap-4 lg:flex">
            <div>
              {eyebrow && <p className="mb-1 text-xs font-medium uppercase tracking-wide text-accent">{eyebrow}</p>}
              <Heading level="h3" as="h1">
                {title}
              </Heading>
            </div>
            {actions}
          </div>
          {actions && <div className="mb-6 flex lg:hidden">{actions}</div>}
          {children}
        </div>
      </div>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} title={t('common.menu')} side="left">
        <SidebarNav items={navItems} onNavigate={() => setMobileOpen(false)} />
      </Drawer>
    </Container>
  );
}
