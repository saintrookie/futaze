import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { SlidersHorizontal, X, LayoutGrid, List } from 'lucide-react';
import { Container } from '@shared/ui/primitives/Layout';
import { Select } from '@shared/ui/atoms/FormControls';
import { Button, IconButton } from '@shared/ui/atoms/Button';
import { FilterChip } from '@shared/ui/molecules/FilterChip';
import { Pagination } from '@shared/ui/molecules/Pagination';
import { Text, Heading } from '@shared/ui/atoms/Typography';
import { Drawer } from '@shared/ui/molecules/Overlay';
import { useDisclosure } from '@shared/hooks/useDisclosure';
import { AssetGrid } from '@widgets/asset-grid/AssetGrid';
import { FilterPanel } from '@widgets/filter-panel/FilterPanel';
import { useAssetQueryState } from '@features/filter-assets';
import { fetchAssets } from '@entities/asset';
import { getCategory } from '@entities/category/model/categories';
import { getLicense } from '@entities/license/model/licenses';
import { useI18n } from '@shared/i18n/LocaleProvider';

const SORT_OPTIONS = [
  { value: 'popular', labelKey: 'browse.sortPopular' },
  { value: 'newest', labelKey: 'browse.sortNewest' },
  { value: 'rating', labelKey: 'browse.sortRating' },
  { value: 'price-asc', labelKey: 'browse.sortPriceAsc' },
  { value: 'price-desc', labelKey: 'browse.sortPriceDesc' },
];

/**
 * Shared browse experience behind /marketplace, /search, and /category/:slug.
 * A locked `category` disables the category filter (the route already
 * scopes it) but otherwise all three surfaces share one implementation.
 */
export function SearchInterface({ title, description, lockedCategory }) {
  const { t } = useI18n();
  const state = useAssetQueryState();
  const { isOpen, open, close } = useDisclosure(false);
  const [density, setDensity] = useState('grid');
  const filters = {
    category: lockedCategory || state.category,
    license: state.license,
    orientation: state.orientation,
    minPrice: state.minPrice,
    maxPrice: state.maxPrice,
    aiGenerated: state.aiGenerated,
    query: state.query,
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['assets', filters, state.sort, state.page],
    queryFn: () => fetchAssets({ filters, sort: state.sort, page: state.page, pageSize: 24 }),
    placeholderData: keepPreviousData,
  });

  const activeChips = [
    state.license && { key: 'license', label: t(`license.${getLicense(state.license).i18nKey}Label`) },
    state.orientation && { key: 'orientation', label: t(`browse.orientation${state.orientation[0].toUpperCase()}${state.orientation.slice(1)}`) },
    state.aiGenerated && { key: 'aiGenerated', label: t('asset.aiGenerated') },
    (state.minPrice != null || state.maxPrice != null) && {
      key: 'price',
      label: `$${state.minPrice ?? 0}–${state.maxPrice ?? '∞'}`,
    },
  ].filter(Boolean);

  return (
    <Container className="py-9">
      <div className="mb-7">
        {description && (
          <Text size="caption" muted className="mb-2 text-accent">
            {description}
          </Text>
        )}
        <Heading level="h2" as="h1">
          {title}
        </Heading>
        {!isLoading && data && (
          <Text size="sm" muted className="mt-2">
            {t('browse.assetCount', { count: data.total })}
          </Text>
        )}
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[15rem_1fr]">
        <aside className="hidden lg:block">
          <FilterPanel state={state} onChange={state.update} onClear={state.clearFilters} showCategory={!lockedCategory} />
        </aside>

        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            <Button variant="secondary" size="sm" iconLeft={<SlidersHorizontal />} onClick={open} className="lg:hidden">
              {t('browse.filters')}
              {state.activeFilterCount > 0 && ` (${state.activeFilterCount})`}
            </Button>
            {activeChips.map((chip) => (
              <FilterChip
                key={chip.key}
                label={chip.label}
                active
                onRemove={() =>
                  state.update(
                    chip.key === 'price'
                      ? { minPrice: undefined, maxPrice: undefined }
                      : { [chip.key]: undefined }
                  )
                }
              />
            ))}
            <div className="ml-auto flex items-center gap-2.5">
              <Select
                aria-label={t('browse.sortBy')}
                size="sm"
                value={state.sort}
                onChange={(e) => state.update({ sort: e.target.value })}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {t(o.labelKey)}
                  </option>
                ))}
              </Select>
              <div className="flex items-center gap-0.5 rounded-md border border-border p-0.5">
                <IconButton
                  label={t('browse.gridView')}
                  size="sm"
                  variant={density === 'grid' ? 'secondary' : 'ghost'}
                  onClick={() => setDensity('grid')}
                >
                  <LayoutGrid />
                </IconButton>
                <IconButton
                  label={t('browse.listView')}
                  size="sm"
                  variant={density === 'list' ? 'secondary' : 'ghost'}
                  onClick={() => setDensity('list')}
                >
                  <List />
                </IconButton>
              </div>
            </div>
          </div>

          <AssetGrid assets={data?.items} loading={isLoading} error={isError} onRetry={refetch} density={density} />

          {data && data.totalPages > 1 && (
            <div className="mt-10">
              <Pagination page={data.page} totalPages={data.totalPages} onChange={(p) => state.update({ page: p })} />
            </div>
          )}
        </div>
      </div>

      <Drawer open={isOpen} onClose={close} title={t('browse.filters')} side="left">
        <FilterPanel state={state} onChange={state.update} onClear={state.clearFilters} showCategory={!lockedCategory} />
        <Button variant="accent" size="md" onClick={close} className="mt-6 w-full">
          <X className="size-4" /> {t('common.close')}
        </Button>
      </Drawer>
    </Container>
  );
}

export { getCategory };
