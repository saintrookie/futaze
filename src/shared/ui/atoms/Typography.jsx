import { cn } from '@shared/lib/cn';
import { useI18n } from '@shared/i18n/LocaleProvider';

const headingSizes = {
  display: 'text-[clamp(2.5rem,5vw+1rem,5rem)] leading-[1.02] tracking-tight',
  h1: 'text-[clamp(2rem,3vw+1rem,3.25rem)] leading-[1.05] tracking-tight',
  h2: 'text-[clamp(1.6rem,2vw+1rem,2.5rem)] leading-[1.1] tracking-tight',
  h3: 'text-[clamp(1.35rem,1.2vw+1rem,1.85rem)] leading-[1.15]',
  h4: 'text-xl leading-snug',
};

export function Heading({ as, level = 'h2', className, children, ...props }) {
  const Tag = as || (level === 'display' ? 'h1' : level);
  return (
    <Tag className={cn(headingSizes[level], 'font-display font-medium text-foreground', className)} {...props}>
      {children}
    </Tag>
  );
}

const textSizes = {
  lg: 'text-lg leading-relaxed',
  base: 'text-[0.95rem] leading-relaxed',
  sm: 'text-sm leading-relaxed',
  xs: 'text-xs leading-normal',
  caption: 'text-[11px] leading-normal uppercase tracking-wide',
};

export function Text({ as: Tag = 'p', size = 'base', muted = false, className, children, ...props }) {
  return (
    <Tag className={cn(textSizes[size], muted ? 'text-muted' : 'text-foreground', className)} {...props}>
      {children}
    </Tag>
  );
}

export function Price({ value, from = false, size = 'md', className }) {
  const { formatPrice, t } = useI18n();
  const sizes = { sm: 'text-sm', md: 'text-base font-semibold', lg: 'text-2xl font-semibold' };
  return (
    <span className={cn('tabular-nums text-foreground', sizes[size], className)}>
      {from && <span className="text-muted font-normal mr-1 text-sm">{t('common.from')}</span>}
      {formatPrice(value)}
    </span>
  );
}
