import { Sparkles } from 'lucide-react';
import { Stack } from '@shared/ui/primitives/Layout';
import { Text } from '@shared/ui/atoms/Typography';
import { Checkbox, Input } from '@shared/ui/atoms/FormControls';
import { Button } from '@shared/ui/atoms/Button';
import { LICENSE_ORDER, getLicense } from '@entities/license/model/licenses';
import { CATEGORIES } from '@entities/category/model/categories';
import { useI18n } from '@shared/i18n/LocaleProvider';

const ORIENTATIONS = [
  { value: 'landscape', labelKey: 'browse.orientationLandscape' },
  { value: 'portrait', labelKey: 'browse.orientationPortrait' },
  { value: 'square', labelKey: 'browse.orientationSquare' },
];

export function FilterPanel({ state, onChange, onClear, showCategory = true }) {
  const { t } = useI18n();
  return (
    <Stack gap="xl">
      {showCategory && (
        <FilterGroup title={t('browse.filterCategory')}>
          <Stack gap="sm">
            {CATEGORIES.map((c) => (
              <Checkbox
                key={c.slug}
                label={t(`category.${c.i18nKey}Label`)}
                checked={state.category === c.slug}
                onChange={() => onChange({ category: state.category === c.slug ? undefined : c.slug })}
              />
            ))}
          </Stack>
        </FilterGroup>
      )}

      <FilterGroup title={t('browse.filterLicense')}>
        <Stack gap="sm">
          {LICENSE_ORDER.map((key) => (
            <Checkbox
              key={key}
              label={t(`license.${getLicense(key).i18nKey}Label`)}
              checked={state.license === key}
              onChange={() => onChange({ license: state.license === key ? undefined : key })}
            />
          ))}
        </Stack>
      </FilterGroup>

      <FilterGroup title={t('browse.filterOrientation')}>
        <Stack gap="sm">
          {ORIENTATIONS.map((o) => (
            <Checkbox
              key={o.value}
              label={t(o.labelKey)}
              checked={state.orientation === o.value}
              onChange={() => onChange({ orientation: state.orientation === o.value ? undefined : o.value })}
            />
          ))}
        </Stack>
      </FilterGroup>

      <FilterGroup title={t('browse.filterPriceRange')}>
        <div className="flex items-center gap-2.5">
          <Input
            type="number"
            min="0"
            placeholder={t('browse.filterMin')}
            size="sm"
            defaultValue={state.minPrice}
            onBlur={(e) => onChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
          />
          <span className="text-muted text-sm">–</span>
          <Input
            type="number"
            min="0"
            placeholder={t('browse.filterMax')}
            size="sm"
            defaultValue={state.maxPrice}
            onBlur={(e) => onChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
          />
        </div>
      </FilterGroup>

      <FilterGroup title={t('browse.filterDiscovery')}>
        <Checkbox
          label={
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-accent" /> {t('browse.filterAiOnly')}
            </span>
          }
          checked={!!state.aiGenerated}
          onChange={() => onChange({ aiGenerated: !state.aiGenerated })}
        />
      </FilterGroup>

      {onClear && (
        <Button variant="ghost" size="sm" onClick={onClear} className="self-start -ml-3.5">
          {t('browse.clearFilters')}
        </Button>
      )}
    </Stack>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <Text size="caption" muted className="mb-3">
        {title}
      </Text>
      {children}
    </div>
  );
}
