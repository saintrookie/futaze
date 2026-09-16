/** Resolves an asset's display copy for the given locale — the single source of truth every UI surface reads title/description/tags through. */
export function localizeAsset(asset, locale) {
  if (locale !== 'id') return asset;
  return {
    ...asset,
    title: asset.titleId || asset.title,
    description: asset.descriptionId || asset.description,
    tags: asset.tagsId || asset.tags,
  };
}

export function filterAssets(assets, filters = {}) {
  return assets.filter((asset) => {
    if (filters.category && asset.categorySlug !== filters.category) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      // Search across both locales so a query typed in either language matches.
      const haystack = `${asset.title} ${asset.titleId || ''} ${asset.tags.join(' ')} ${(asset.tagsId || []).join(' ')}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.license && !asset.licenses.includes(filters.license)) return false;
    if (filters.orientation && asset.orientation !== filters.orientation) return false;
    if (filters.minPrice != null && asset.price < filters.minPrice) return false;
    if (filters.maxPrice != null && asset.price > filters.maxPrice) return false;
    if (filters.aiGenerated != null && asset.isAiGenerated !== filters.aiGenerated) return false;
    if (filters.creatorId && asset.creatorId !== filters.creatorId) return false;
    return true;
  });
}

export function sortAssets(assets, sort = 'popular') {
  const copy = [...assets];
  switch (sort) {
    case 'newest':
      return copy.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'popular':
    default:
      return copy.sort((a, b) => b.downloads - a.downloads);
  }
}

export function paginate(items, page = 1, pageSize = 24) {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
    page,
  };
}

export function getRelatedAssets(assets, asset, limit = 8) {
  return assets
    .filter((a) => a.id !== asset.id && (a.categorySlug === asset.categorySlug || a.tags.some((t) => asset.tags.includes(t))))
    .slice(0, limit);
}

export function getMoreFromCreator(assets, asset, limit = 8) {
  return assets.filter((a) => a.id !== asset.id && a.creatorId === asset.creatorId).slice(0, limit);
}

export function formatDuration(seconds) {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}
