import { Check } from 'lucide-react';
import { LICENSE_ORDER, getLicense } from '@entities/license/model/licenses';
import { Price } from '@shared/ui/atoms/Typography';
import { priceFor } from '@features/purchase-asset/model/useCart';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { cn } from '@shared/lib/cn';

export function LicenseSelector({ asset, value, onChange }) {
  const { t } = useI18n();
  const available = LICENSE_ORDER.filter((key) => asset.licenses.includes(key));
  return (
    <div role="radiogroup" aria-label={t('asset.chooseLicense')} className="flex flex-col gap-2.5">
      {available.map((key) => {
        const license = getLicense(key);
        const selected = value === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(key)}
            className={cn(
              'flex items-start gap-3 rounded-lg border p-4 text-left transition-colors duration-fast',
              selected ? 'border-accent bg-accent/5' : 'border-border hover:bg-surface'
            )}
          >
            <span
              className={cn(
                'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border',
                selected ? 'border-accent bg-accent text-accent-foreground' : 'border-border'
              )}
            >
              {selected && <Check className="size-3" />}
            </span>
            <span className="flex-1">
              <span className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">
                  {t(`license.${license.i18nKey}Label`)} {t('license.licenseSuffix')}
                </span>
                <Price value={priceFor(asset, key)} size="sm" />
              </span>
              <span className="mt-1 block text-xs text-muted">{t(`license.${license.i18nKey}Summary`)}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
