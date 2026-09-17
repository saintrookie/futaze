import { TrendingUp, TrendingDown } from 'lucide-react';
import { Grid } from '@shared/ui/primitives/Layout';
import { Text } from '@shared/ui/atoms/Typography';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { cn } from '@shared/lib/cn';

function MetricCard({ label, value, delta, icon }) {
  const { t } = useI18n();
  const positive = delta != null && delta >= 0;
  return (
    <div className="rounded-xl border border-border bg-surface-elevated p-5">
      <div className="flex items-center justify-between">
        <Text size="caption" muted>
          {label}
        </Text>
        {icon && <span className="text-muted [&>svg]:size-4">{icon}</span>}
      </div>
      <p className="mt-2 font-display text-2xl font-medium text-foreground">{value}</p>
      {delta != null && (
        <p className={cn('mt-1.5 flex items-center gap-1 text-xs font-medium', positive ? 'text-success' : 'text-danger')}>
          {positive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
          {t('metrics.vsLastPeriod', { delta: Math.abs(delta) })}
        </p>
      )}
    </div>
  );
}

export function MetricsGrid({ metrics }) {
  return (
    <Grid cols="grid-cols-2 lg:grid-cols-4" gap="md">
      {metrics.map((m) => (
        <MetricCard key={m.label} {...m} />
      ))}
    </Grid>
  );
}
