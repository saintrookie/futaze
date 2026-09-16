import { Link } from 'react-router-dom';
import { Container, Grid } from '@shared/ui/primitives/Layout';
import { Text } from '@shared/ui/atoms/Typography';
import { Separator } from '@shared/ui/atoms/Separator';
import { CATEGORY_NAV } from '@shared/constants/nav';
import { useI18n } from '@shared/i18n/LocaleProvider';

function buildColumns(t) {
  return [
    {
      titleKey: 'footer.marketplace',
      links: CATEGORY_NAV.slice(0, 5).map((c) => ({ labelKey: `category.${c.i18nKey}Label`, to: c.to })),
    },
    {
      titleKey: 'footer.company',
      links: [
        { labelKey: 'footer.about', to: '/about' },
        { labelKey: 'footer.contact', to: '/contact' },
        { labelKey: 'footer.faq', to: '/faq' },
        { labelKey: 'nav.pricing', to: '/pricing' },
      ],
    },
    {
      titleKey: 'footer.creators',
      links: [
        { labelKey: 'footer.sellOnFutaze', to: '/register' },
        { labelKey: 'footer.creatorDashboard', to: '/creator-dashboard' },
        { labelKey: 'footer.creatorGuidelines', to: '/faq' },
      ],
    },
    {
      titleKey: 'footer.legal',
      links: [
        { labelKey: 'footer.terms', to: '/terms' },
        { labelKey: 'footer.privacy', to: '/privacy' },
        { labelKey: 'footer.licensing', to: '/pricing#licensing' },
      ],
    },
  ];
}

export function Footer() {
  const { t } = useI18n();
  const columns = buildColumns(t);

  return (
    <footer className="border-t border-separator bg-surface/40">
      <Container className="py-3xl">
        <Grid cols="grid-cols-2 sm:grid-cols-4" gap="xl">
          {columns.map((col) => (
            <div key={col.titleKey}>
              <Text size="caption" muted className="mb-3.5">
                {t(col.titleKey)}
              </Text>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-foreground hover:text-accent transition-colors duration-fast">
                      {t(l.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Grid>
        <Separator className="my-8" />
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Link to="/" className="font-display text-lg font-semibold text-foreground">
            Futaze
          </Link>
          <Text size="xs" muted>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
