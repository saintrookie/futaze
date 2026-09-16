import { BadgeCheck } from 'lucide-react';
import { Avatar } from '@shared/ui/atoms/Avatar';
import { RatingDisplay } from '@shared/ui/molecules/RatingDisplay';
import { Text } from '@shared/ui/atoms/Typography';

export function ReviewItem({ review }) {
  return (
    <article className="flex gap-3.5 py-5 border-b border-separator last:border-0">
      <Avatar src={review.avatar} name={review.author} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-foreground">{review.author}</span>
          {review.verifiedPurchase && (
            <span className="inline-flex items-center gap-1 text-xs text-success">
              <BadgeCheck className="size-3.5" /> Verified purchase
            </span>
          )}
          <span className="text-xs text-muted">{review.date}</span>
        </div>
        <RatingDisplay value={review.rating} showValue={false} className="mt-1" />
        <Text size="sm" muted className="mt-2">
          {review.comment}
        </Text>
      </div>
    </article>
  );
}
