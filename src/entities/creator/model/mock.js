const NAMES = [
  'Alina Voss', 'Marco Teixeira', 'Priya Nair', 'Felix Moreau', 'Sana Ishikawa',
  'Theo Bergman', 'Lucia Ferretti', 'Dara Osei', 'Noor Haddad', 'Emil Kowalski',
  'Junko Abe', 'Ravi Deshmukh', 'Camila Duarte', 'Sten Aarnio', 'Yara Haidar',
  'Owen Blackwood', 'Meiying Zhou', 'Aldo Ricci', 'Ines Larsen', 'Tomas Riedel',
];

/** Maps to `creator.specialty.{key}` in shared/i18n/locales. */
const SPECIALTY_KEYS = [
  'cinematicFootage', 'editorialPhotography', 'vectorIllustration', 'motionDesign3d',
  'ambientAudio', 'brandTemplates', 'iconSystems', 'generativeArt', 'productPhotography',
  'architecturalPhotography',
];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

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

const rand = mulberry32(42);

export const CREATORS = NAMES.map((name, i) => {
  const username = slugify(name);
  return {
    id: `creator-${i + 1}`,
    username,
    name,
    avatar: `https://picsum.photos/seed/creator-${i}/160/160`,
    cover: `https://picsum.photos/seed/creator-cover-${i}/1200/400`,
    specialtyKey: SPECIALTY_KEYS[i % SPECIALTY_KEYS.length],
    locationKey: ['lisbon', 'mumbai', 'toronto', 'nairobi', 'berlin', 'seoul', 'tallinn', 'saoPaulo'][i % 8],
    verified: rand() > 0.4,
    followers: Math.floor(400 + rand() * 42000),
    assetsCount: Math.floor(20 + rand() * 260),
    rating: Number((3.8 + rand() * 1.2).toFixed(1)),
    joinedAt: `${2018 + (i % 6)}-0${1 + (i % 8)}-14`,
  };
});

export function getCreatorByUsername(username) {
  return CREATORS.find((c) => c.username === username) || null;
}

export function getCreatorById(id) {
  return CREATORS.find((c) => c.id === id) || null;
}
