import { ASSETS } from '@entities/asset/model/mock';

export const COLLECTIONS = [
  { id: 'col-1', slug: 'brand-refresh-2025', title: 'Brand Refresh 2025', description: 'Moodboard for the Q1 rebrand pitch.', visibility: 'private', assetIds: ASSETS.slice(0, 6).map((a) => a.id) },
  { id: 'col-2', slug: 'client-acme-launch', title: 'Acme Product Launch', description: 'Client-approved assets for the launch campaign.', visibility: 'private', assetIds: ASSETS.slice(6, 10).map((a) => a.id) },
  { id: 'col-3', slug: 'inspiration-editorial', title: 'Editorial Inspiration', description: 'A running board of editorial photography we love.', visibility: 'public', assetIds: ASSETS.slice(10, 18).map((a) => a.id) },
];

export function getCollectionAssets(collection) {
  return ASSETS.filter((a) => collection.assetIds.includes(a.id));
}
