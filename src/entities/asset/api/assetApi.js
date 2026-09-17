import { request, NotFoundError } from '@shared/api/client';
import { ASSETS, getAssetBySlug } from '@entities/asset/model/mock';
import { filterAssets, sortAssets, paginate } from '@entities/asset/model/selectors';

export function fetchAssets({ filters = {}, sort = 'popular', page = 1, pageSize = 24 } = {}) {
  return request(() => {
    const filtered = filterAssets(ASSETS, filters);
    const sorted = sortAssets(filtered, sort);
    return paginate(sorted, page, pageSize);
  });
}

export function fetchAssetBySlug(slug) {
  return request(() => {
    const asset = getAssetBySlug(slug);
    if (!asset) throw new NotFoundError(`Asset "${slug}" not found`);
    return asset;
  });
}

export function fetchTrendingAssets(limit = 12) {
  return request(() => sortAssets(ASSETS, 'popular').slice(0, limit));
}

export function fetchNewArrivals(limit = 12) {
  return request(() => sortAssets(ASSETS, 'newest').slice(0, limit));
}

export function fetchAssetsByCreator(creatorId, { excludeId, limit = 12 } = {}) {
  return request(() =>
    ASSETS.filter((a) => a.creatorId === creatorId && a.id !== excludeId).slice(0, limit)
  );
}

export function fetchAssetsByCategory(categorySlug, { limit = 12 } = {}) {
  return request(() => ASSETS.filter((a) => a.categorySlug === categorySlug).slice(0, limit));
}

/** Preserves the order of `ids` (most-recent-first for recently-viewed use). */
export function fetchAssetsByIds(ids = [], { limit } = {}) {
  return request(() => {
    const found = ids.map((id) => ASSETS.find((a) => a.id === id)).filter(Boolean);
    return limit ? found.slice(0, limit) : found;
  });
}
