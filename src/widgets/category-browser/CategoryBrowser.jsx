import { Link } from 'react-router-dom';
import { CATEGORIES } from '@entities/category/model/categories';
import { Grid } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { LazyImage } from '@shared/ui/atoms/LazyImage';
import { useI18n } from '@shared/i18n/LocaleProvider';

export function CategoryBrowser() {
  const { t } = useI18n();
  return (
    <Grid cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" gap="md">
      {CATEGORIES.map((c, i) => (
        <Link
          key={c.slug}
          to={`/category/${c.slug}`}
          className="group relative flex aspect-[5/4] flex-col justify-end overflow-hidden rounded-xl bg-surface p-5"
        >
          <LazyImage
            src={`https://picsum.photos/seed/category-${c.slug}/600/480`}
            alt=""
            eager={i < 4}
            imgClassName="transition-transform duration-slow ease-emphasized group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="relative">
            <Heading level="h4" as="h3" className="text-white">
              {t(`category.${c.i18nKey}Label`)}
            </Heading>
            <Text size="xs" className="mt-1 text-white/75">
              {t(`category.${c.i18nKey}Description`)}
            </Text>
          </div>
        </Link>
      ))}
    </Grid>
  );
}
