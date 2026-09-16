import { Button } from '@shared/ui/atoms/Button';
import { useFollowStore } from '@features/follow-creator/model/useFollowCreator';
import { useI18n } from '@shared/i18n/LocaleProvider';

export function FollowButton({ creatorId, size = 'md' }) {
  const { t } = useI18n();
  const isFollowing = useFollowStore((s) => s.isFollowing(creatorId));
  const toggle = useFollowStore((s) => s.toggle);
  return (
    <Button
      variant={isFollowing ? 'secondary' : 'accent'}
      size={size}
      onClick={() => toggle(creatorId)}
      aria-pressed={isFollowing}
    >
      {isFollowing ? t('creator.following') : t('creator.follow')}
    </Button>
  );
}
