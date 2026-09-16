import { Price } from '@shared/ui/atoms/Typography';

export function AssetPrice({ asset, size = 'sm' }) {
  return <Price value={asset.price} from={asset.licenses.length > 1} size={size} />;
}
