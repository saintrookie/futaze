import { useState } from 'react';
import { Check, X, ShieldAlert } from 'lucide-react';
import { Stack } from '@shared/ui/primitives/Layout';
import { Text } from '@shared/ui/atoms/Typography';
import { Button } from '@shared/ui/atoms/Button';
import { Badge } from '@shared/ui/atoms/Badge';
import { EmptyState } from '@shared/ui/patterns/EmptyState';
import { MODERATION_QUEUE } from '@entities/report';
import { getCreatorById } from '@entities/creator/model/mock';

export default function AdminModerationPage() {
  const [queue, setQueue] = useState(MODERATION_QUEUE);
  const [decided, setDecided] = useState({});

  const decide = (id, decision) => {
    setDecided((prev) => ({ ...prev, [id]: decision }));
    setTimeout(() => setQueue((prev) => prev.filter((item) => item.id !== id)), 400);
  };

  if (queue.length === 0) {
    return <EmptyState icon={<ShieldAlert />} title="Queue is clear" description="No assets are currently awaiting moderation review." />;
  }

  return (
    <Stack gap="md">
      {queue.map((item) => {
        const creator = getCreatorById(item.asset.creatorId);
        const decision = decided[item.id];
        return (
          <div key={item.id} className="flex items-center gap-4 rounded-xl border border-border bg-surface-elevated p-4">
            <img src={item.asset.previewImage} alt="" className="size-16 shrink-0 rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{item.asset.title}</p>
              <p className="text-xs text-muted">
                by {creator?.name} · submitted {item.submittedAt}
              </p>
              <Text size="xs" muted className="mt-1">
                {item.reason}
              </Text>
            </div>
            {decision ? (
              <Badge variant={decision === 'approved' ? 'success' : 'danger'}>{decision}</Badge>
            ) : (
              <div className="flex shrink-0 items-center gap-2">
                <Button variant="secondary" size="sm" iconLeft={<X />} onClick={() => decide(item.id, 'rejected')}>
                  Reject
                </Button>
                <Button variant="accent" size="sm" iconLeft={<Check />} onClick={() => decide(item.id, 'approved')}>
                  Approve
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </Stack>
  );
}
