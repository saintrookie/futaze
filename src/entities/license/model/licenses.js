/**
 * `i18nKey` maps to `license.{i18nKey}Label` / `Summary` / `Includes` in
 * shared/i18n/locales — resolved via components' t(), never stored literally.
 */
export const LICENSE_TIERS = {
  personal: { key: 'personal', i18nKey: 'personal', priceMultiplier: 1 },
  commercial: { key: 'commercial', i18nKey: 'commercial', priceMultiplier: 2.4 },
  extended: { key: 'extended', i18nKey: 'extended', priceMultiplier: 6 },
  editorial: { key: 'editorial', i18nKey: 'editorial', priceMultiplier: 1.2 },
  enterprise: { key: 'enterprise', i18nKey: 'enterprise', priceMultiplier: 14 },
};

export const LICENSE_ORDER = ['personal', 'commercial', 'extended', 'editorial', 'enterprise'];

export function getLicense(key) {
  return LICENSE_TIERS[key];
}
