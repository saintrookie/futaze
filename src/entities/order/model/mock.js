import { ASSETS } from '@entities/asset/model/mock';
import { LICENSE_ORDER } from '@entities/license/model/licenses';

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(7);

export const ORDERS = Array.from({ length: 14 }, (_, i) => {
  const asset = ASSETS[(i * 5) % ASSETS.length];
  const license = LICENSE_ORDER[Math.floor(rand() * LICENSE_ORDER.length)];
  return {
    id: `ORD-${2000 + i}`,
    assetId: asset.id,
    asset,
    license,
    amount: asset.price,
    status: rand() > 0.15 ? 'completed' : 'refunded',
    purchasedAt: `2025-0${1 + (i % 8)}-${String(2 + i).padStart(2, '0')}`,
  };
});

export const DOWNLOADS = ORDERS.filter((o) => o.status === 'completed').map((o, i) => ({
  id: `dl-${i}`,
  assetId: o.assetId,
  asset: o.asset,
  license: o.license,
  downloadedAt: o.purchasedAt,
  version: 'v1.2',
}));

export const FAVORITES_SEED_IDS = ASSETS.filter((_, i) => i % 9 === 0).map((a) => a.id);
