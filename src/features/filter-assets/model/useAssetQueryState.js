import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Discovery-critical state (query, filters, sort, page) lives in the URL
 * per the architecture's URL-state rule — shareable, bookmarkable,
 * back/forward-correct. This hook is the single read/write surface for it,
 * used by features/search-assets, features/filter-assets, and
 * features/sort-assets alike (they are one state shape, three interactions).
 */
export function useAssetQueryState() {
  const [params, setParams] = useSearchParams();

  const state = useMemo(
    () => ({
      query: params.get('q') || '',
      category: params.get('category') || undefined,
      license: params.get('license') || undefined,
      orientation: params.get('orientation') || undefined,
      minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : undefined,
      maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined,
      aiGenerated: params.get('ai') === '1' ? true : undefined,
      sort: params.get('sort') || 'popular',
      page: params.get('page') ? Number(params.get('page')) : 1,
    }),
    [params]
  );

  const update = useCallback(
    (patch) => {
      const next = new URLSearchParams(params);
      Object.entries(patch).forEach(([key, value]) => {
        const paramKey = { query: 'q', aiGenerated: 'ai' }[key] || key;
        if (value === undefined || value === '' || value === false) {
          next.delete(paramKey);
        } else {
          next.set(paramKey, value === true ? '1' : String(value));
        }
      });
      if (!('page' in patch)) next.delete('page');
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const clearFilters = useCallback(() => {
    const next = new URLSearchParams();
    if (state.query) next.set('q', state.query);
    if (state.category) next.set('category', state.category);
    setParams(next, { replace: true });
  }, [setParams, state.query, state.category]);

  const activeFilterCount = ['license', 'orientation', 'minPrice', 'maxPrice', 'aiGenerated'].filter(
    (k) => state[k] !== undefined
  ).length;

  return { ...state, update, clearFilters, activeFilterCount };
}
