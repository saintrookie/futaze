import { Link, Outlet, useMatches } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useI18n } from '@shared/i18n/LocaleProvider';

const DEFAULT_PANEL = {
  eyebrowKey: 'auth.defaultPanelEyebrow',
  headlineKey: 'auth.defaultPanelHeadline',
  descriptionKey: 'auth.defaultPanelDescription',
  pointKeys: ['auth.defaultPanelPoint1', 'auth.defaultPanelPoint2', 'auth.defaultPanelPoint3'],
  image: 'https://picsum.photos/seed/auth-default/1200/1600',
};

export function AuthLayout() {
  const { t } = useI18n();
  const matches = useMatches();
  const panel = matches.find((m) => m.handle?.authPanel)?.handle.authPanel || DEFAULT_PANEL;

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Editorial panel — desktop only */}
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <img
          src={panel.image}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-70"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <div className="absolute -top-24 right-0 size-96 rounded-full bg-accent/30 blur-3xl" aria-hidden />

        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-white">
            <span className="flex size-8 items-center justify-center rounded-md bg-white text-primary text-sm">F</span>
            Futaze
          </Link>

          <div className="max-w-md">
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-white/70">{t(panel.eyebrowKey)}</p>
            <h1 className="font-display text-4xl font-medium leading-[1.1] text-white xl:text-5xl">{t(panel.headlineKey)}</h1>
            <p className="mt-5 text-base text-white/75">{t(panel.descriptionKey)}</p>
            <ul className="mt-8 flex flex-col gap-3">
              {panel.pointKeys.map((pointKey) => (
                <li key={pointKey} className="flex items-center gap-2.5 text-sm text-white/90">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Check className="size-3" />
                  </span>
                  {t(pointKey)}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Futaze. {t('auth.allRightsReserved')}
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col bg-background">
        <div className="flex items-center justify-between px-6 py-6 sm:px-10">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-foreground lg:hidden">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm">F</span>
            Futaze
          </Link>
          <Link
            to="/marketplace"
            className="ml-auto inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-fast hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            {t('nav.backToMarketplace')}
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-10">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>

        <p className="px-6 pb-8 text-center text-xs text-muted sm:px-10">
          {t('auth.legalPrefix')}{' '}
          <Link to="/terms" className="text-foreground underline underline-offset-2">
            {t('footer.terms')}
          </Link>{' '}
          {t('auth.legalAnd')}{' '}
          <Link to="/privacy" className="text-foreground underline underline-offset-2">
            {t('footer.privacy')}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
