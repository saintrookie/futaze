/**
 * `i18nKey` maps to `category.{i18nKey}Label` / `category.{i18nKey}Description`
 * in shared/i18n/locales — labels are never stored as literal strings here.
 */
export const CATEGORIES = [
  { slug: 'photography', type: 'image', i18nKey: 'photography' },
  { slug: 'illustrations', type: 'illustration', i18nKey: 'illustrations' },
  { slug: 'vectors', type: 'vector', i18nKey: 'vectors' },
  { slug: 'footage', type: 'video', i18nKey: 'footage' },
  { slug: '3d', type: '3d', i18nKey: 'threeD' },
  { slug: 'audio', type: 'audio', i18nKey: 'audio' },
  { slug: 'templates', type: 'template', i18nKey: 'templates' },
  { slug: 'fonts', type: 'font', i18nKey: 'fonts' },
];

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}
