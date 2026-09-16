import { request, NotFoundError } from '@shared/api/client';
import { CREATORS, getCreatorByUsername } from '@entities/creator/model/mock';

export function fetchCreators({ limit } = {}) {
  return request(() => (limit ? CREATORS.slice(0, limit) : CREATORS));
}

export function fetchCreatorByUsername(username) {
  return request(() => {
    const creator = getCreatorByUsername(username);
    if (!creator) throw new NotFoundError(`Creator "${username}" not found`);
    return creator;
  });
}

export function fetchFeaturedCreators(limit = 6) {
  return request(() => [...CREATORS].sort((a, b) => b.followers - a.followers).slice(0, limit));
}
