import { ASSETS } from '@entities/asset/model/mock';

export const MODERATION_QUEUE = ASSETS.slice(0, 6).map((a, i) => ({
  id: `mod-${i}`,
  asset: a,
  submittedAt: `2025-09-${String(2 + i).padStart(2, '0')}`,
  reason: i % 2 === 0 ? 'First-time submission review' : 'Flagged for metadata check',
}));

export const REPORTS = ASSETS.slice(6, 12).map((a, i) => ({
  id: `report-${i}`,
  asset: a,
  reporter: ['user-482', 'user-119', 'user-733', 'user-021', 'user-558', 'user-904'][i],
  reason: ['Copyright concern', 'Miscategorized', 'Low quality', 'Duplicate listing', 'Inappropriate content', 'Incorrect license'][i],
  status: i % 3 === 0 ? 'resolved' : 'open',
  submittedAt: `2025-09-${String(3 + i).padStart(2, '0')}`,
}));
