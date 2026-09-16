import { BadgeCheck, MapPin, Calendar } from 'lucide-react';
import { Container } from '@shared/ui/primitives/Layout';
import { Avatar } from '@shared/ui/atoms/Avatar';
import { LazyImage } from '@shared/ui/atoms/LazyImage';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { RatingDisplay } from '@shared/ui/molecules/RatingDisplay';
import { FollowButton } from '@features/follow-creator';
import { useI18n } from '@shared/i18n/LocaleProvider';

export function CreatorProfileHeader({ creator }) {
  const { t, formatNumber } = useI18n();
  return (
    <div className="border-b border-separator">
      <div className="relative h-48 w-full sm:h-64">
        <LazyImage src={creator.cover} alt="" eager />
      </div>
      <Container>
        <div className="flex flex-col items-start gap-5 pb-8 pt-0 sm:flex-row sm:items-end sm:justify-between">
          <div className="-mt-12 flex flex-col items-start gap-4 sm:-mt-14 sm:flex-row sm:items-end">
            <Avatar src={creator.avatar} name={creator.name} size="xl" ring />
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <Heading level="h2" as="h1">
                  {creator.name}
                </Heading>
                {creator.verified && <BadgeCheck className="size-5 text-accent" />}
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                <span>{t(`creator.specialty.${creator.specialtyKey}`)}</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" /> {t(`creator.location.${creator.locationKey}`)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3.5" /> {t('creator.joined', { year: new Date(creator.joinedAt).getFullYear() })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 pb-1">
            <Stat label={t('creator.followers')} value={formatNumber(creator.followers)} />
            <Stat label={t('creator.assetsLabel')} value={formatNumber(creator.assetsCount)} />
            <div>
              <RatingDisplay value={creator.rating} />
            </div>
            <FollowButton creatorId={creator.id} />
          </div>
        </div>
        <Text size="base" muted className="max-w-2xl pb-8 -mt-2">
          {t('creator.bio', { name: creator.name.split(' ')[0], specialty: t(`creator.specialty.${creator.specialtyKey}`), year: new Date(creator.joinedAt).getFullYear() })}
        </Text>
      </Container>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center">
      <p className="font-display text-lg font-medium text-foreground">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
