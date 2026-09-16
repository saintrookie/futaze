import { Link } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';
import { Avatar } from '@shared/ui/atoms/Avatar';
import { RatingDisplay } from '@shared/ui/molecules/RatingDisplay';
import { Text } from '@shared/ui/atoms/Typography';
import { useI18n } from '@shared/i18n/LocaleProvider';

export function CreatorCard({ creator }) {
  const { t, formatNumber } = useI18n();
  return (
    <Link to={`/creator/${creator.username}`} className="group flex flex-col items-center rounded-xl border border-border bg-surface-elevated p-6 text-center transition-colors duration-fast hover:bg-surface">
      <Avatar src={creator.avatar} name={creator.name} size="lg" />
      <span className="mt-3.5 flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-fast">
        {creator.name}
        {creator.verified && <BadgeCheck className="size-3.5 text-accent" />}
      </span>
      <Text size="xs" muted className="mt-0.5">
        {t(`creator.specialty.${creator.specialtyKey}`)}
      </Text>
      <RatingDisplay value={creator.rating} className="mt-2.5" showValue={false} />
      <Text size="xs" muted className="mt-2.5">
        {formatNumber(creator.followers)} {t('creator.followers').toLowerCase()} · {formatNumber(creator.assetsCount)} {t('creator.assetsLabel').toLowerCase()}
      </Text>
    </Link>
  );
}
