import { ASSETS } from '@entities/asset/model/mock';
import { CREATORS } from '@entities/creator/model/mock';

const COMMENTS = [
  'Exactly what I needed for the campaign — clean files, no surprises.',
  'Great quality, but the color grading needed a bit of tweaking for our brand.',
  'Downloaded and delivered to the client same day. Will buy from this creator again.',
  'License terms were crystal clear, which made legal sign-off painless.',
  'Resolution held up beautifully even at billboard size.',
  'Good asset, wish there were more format options included.',
];

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
const rand = mulberry32(99);

export function getReviewsForAsset(assetId) {
  const count = Math.floor(rand() * 5);
  return Array.from({ length: count }, (_, i) => {
    const reviewer = CREATORS[Math.floor(rand() * CREATORS.length)];
    return {
      id: `${assetId}-review-${i}`,
      author: reviewer.name,
      avatar: reviewer.avatar,
      rating: Math.floor(3 + rand() * 3),
      comment: COMMENTS[Math.floor(rand() * COMMENTS.length)],
      date: `2024-${String(1 + Math.floor(rand() * 12)).padStart(2, '0')}-1${Math.floor(rand() * 8)}`,
      verifiedPurchase: rand() > 0.2,
    };
  });
}

export const RECENT_PLATFORM_REVIEWS = ASSETS.slice(0, 6).map((a, i) => ({
  assetId: a.id,
  assetSlug: a.slug,
  assetTitle: a.title,
  ...getReviewsForAsset(a.id)[0],
  rating: 4 + (i % 2),
}));
