import { useMemo } from 'react';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { localizeAsset } from '@entities/asset/model/selectors';

export function useLocalizedAsset(asset) {
  const { locale } = useI18n();
  return useMemo(() => (asset ? localizeAsset(asset, locale) : asset), [asset, locale]);
}

export function useLocalizedAssets(assets) {
  const { locale } = useI18n();
  return useMemo(() => (assets ? assets.map((a) => localizeAsset(a, locale)) : assets), [assets, locale]);
}
