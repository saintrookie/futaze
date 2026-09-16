const INTL_LOCALE = { en: 'en-US', id: 'id-ID' };

// Mock, fixed conversion so IDR prices look realistic in the demo — a real
// implementation would source this from a pricing/FX service.
const USD_TO_IDR = 15800;

export function formatPrice(valueUsd, locale) {
  if (locale === 'id') {
    const idr = Math.round(valueUsd * USD_TO_IDR);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(idr);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: valueUsd % 1 === 0 ? 0 : 2,
  }).format(valueUsd);
}

export function formatNumber(value, locale) {
  return new Intl.NumberFormat(INTL_LOCALE[locale] || INTL_LOCALE.en).format(value);
}

export function formatDate(value, locale, options = { year: 'numeric', month: 'short', day: 'numeric' }) {
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date?.getTime?.())) return String(value);
  return new Intl.DateTimeFormat(INTL_LOCALE[locale] || INTL_LOCALE.en, options).format(date);
}
