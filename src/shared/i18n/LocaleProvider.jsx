import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from '@shared/i18n/locales/en';
import id from '@shared/i18n/locales/id';
import { formatPrice, formatNumber, formatDate } from '@shared/i18n/formatters';

export const LOCALES = {
  en: { code: 'en', label: 'English', flag: '🇺🇸', dict: en },
  id: { code: 'id', label: 'Indonesia', flag: '🇮🇩', dict: id },
};

const STORAGE_KEY = 'futaze-locale';
const DEFAULT_LOCALE = 'en';

const LocaleContext = createContext(null);

function resolveKey(dict, key) {
  return key.split('.').reduce((acc, part) => (acc && typeof acc === 'object' ? acc[part] : undefined), dict);
}

function interpolate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, name) => (vars[name] != null ? String(vars[name]) : ''));
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return stored && LOCALES[stored] ? stored : DEFAULT_LOCALE;
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next) => {
    if (LOCALES[next]) setLocaleState(next);
  }, []);

  /**
   * t('namespace.key', { count, ...vars }) — dot-path lookup, {{var}}
   * interpolation, and a simple i18next-style plural fallback: pass
   * `count` and the dictionary is checked for `key_one` (count === 1) /
   * `key_other` before falling back to `key` itself.
   */
  const t = useCallback(
    (key, vars) => {
      const dict = LOCALES[locale].dict;
      let lookupKey = key;
      if (vars && typeof vars.count === 'number') {
        const pluralKey = `${key}_${vars.count === 1 ? 'one' : 'other'}`;
        if (resolveKey(dict, pluralKey) !== undefined) lookupKey = pluralKey;
      }
      const value = resolveKey(dict, lookupKey);
      if (value === undefined) {
        const fallback = resolveKey(LOCALES[DEFAULT_LOCALE].dict, lookupKey);
        if (fallback === undefined) return key;
        return typeof fallback === 'string' ? interpolate(fallback, vars) : fallback;
      }
      return typeof value === 'string' ? interpolate(value, vars) : value;
    },
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      formatPrice: (v) => formatPrice(v, locale),
      formatNumber: (v) => formatNumber(v, locale),
      formatDate: (v, opts) => formatDate(v, locale, opts),
      locales: LOCALES,
    }),
    [locale, setLocale, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useI18n must be used within LocaleProvider');
  return ctx;
}
