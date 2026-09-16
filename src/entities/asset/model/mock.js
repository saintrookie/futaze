import { CATEGORIES } from '@entities/category/model/categories';
import { CREATORS } from '@entities/creator/model/mock';
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
const rand = mulberry32(1337);
const pickIndex = (arr) => Math.floor(rand() * arr.length);
const pick = (arr) => arr[pickIndex(arr)];
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/**
 * Every generated asset needs a title/description/tags in both English and
 * Indonesian. Rather than translating after the fact (which risks the two
 * locales drifting out of sync per-asset), each category's EN/ID subject
 * lists are index-parallel — one seeded index picks the same subject in
 * both languages, so `localizeAsset()` can never show mismatched content.
 */
const SUBJECTS_EN = {
  photography: ['Golden Hour Skyline', 'Studio Portrait Series', 'Coastal Morning Light', 'Minimal Desk Setup', 'Urban Reflections', 'Mountain Ridge at Dawn', 'Street Market Life', 'Quiet Interior Spaces'],
  illustrations: ['Isometric City Blocks', 'Botanical Line Set', 'Abstract Gradient Shapes', 'Flat Character Pack', 'Hand-drawn Textures', 'Retro Poster Art', 'Editorial Spot Illustrations'],
  vectors: ['Outline Icon Pack', 'Geometric Pattern Set', 'Brand Badge Collection', 'Nature Icon Bundle', 'Minimal UI Icon Set', 'Weather Icon System'],
  footage: ['Aerial City Drone Pass', 'Slow Motion Ocean Waves', 'Studio Product Spin', 'Timelapse Clouds', 'Forest Canopy Flyover', 'Neon Street B-Roll', 'Macro Water Droplets'],
  '3d': ['Low Poly Terrain Scene', 'Product Render Kit', 'Abstract Glass Shapes', 'Isometric Room Scene', 'Character Base Mesh', 'Procedural Rock Set'],
  audio: ['Ambient Piano Loop', 'Cinematic Drone Swell', 'Upbeat Corporate Track', 'Lo-fi Study Beat', 'Nature Soundscape', 'Percussive Trailer Hit'],
  templates: ['Startup Pitch Deck', 'Portfolio Website Kit', 'Mobile App UI Kit', 'Resume & CV Pack', 'Social Media Bundle', 'Dashboard UI Kit'],
  fonts: ['Editorial Serif Family', 'Rounded Sans Display', 'Monospace Code Family', 'Handwritten Script', 'Condensed Headline Sans'],
};

const SUBJECTS_ID = {
  photography: ['Siluet Kota Golden Hour', 'Seri Potret Studio', 'Cahaya Pagi di Pesisir', 'Meja Kerja Minimalis', 'Refleksi Perkotaan', 'Punggung Gunung saat Fajar', 'Kehidupan Pasar Jalanan', 'Ruang Interior yang Tenang'],
  illustrations: ['Blok Kota Isometrik', 'Set Garis Botani', 'Bentuk Gradien Abstrak', 'Paket Karakter Flat', 'Tekstur Gambar Tangan', 'Poster Gaya Retro', 'Ilustrasi Spot Editorial'],
  vectors: ['Paket Ikon Outline', 'Set Pola Geometris', 'Koleksi Lencana Brand', 'Bundel Ikon Alam', 'Set Ikon UI Minimal', 'Sistem Ikon Cuaca'],
  footage: ['Footage Drone Kota dari Udara', 'Ombak Laut Slow Motion', 'Putaran Produk di Studio', 'Timelapse Awan', 'Terbang di Atas Kanopi Hutan', 'B-Roll Jalanan Neon', 'Tetesan Air Makro'],
  '3d': ['Scene Medan Low Poly', 'Kit Render Produk', 'Bentuk Kaca Abstrak', 'Scene Ruangan Isometrik', 'Mesh Dasar Karakter', 'Set Batu Prosedural'],
  audio: ['Loop Piano Ambient', 'Swell Drone Sinematik', 'Trek Korporat yang Ceria', 'Beat Lo-fi untuk Belajar', 'Soundscape Alam', 'Hentakan Perkusi Trailer'],
  templates: ['Pitch Deck Startup', 'Kit Situs Portofolio', 'UI Kit Aplikasi Mobile', 'Paket CV & Resume', 'Bundel Media Sosial', 'UI Kit Dashboard'],
  fonts: ['Keluarga Serif Editorial', 'Sans Tampilan Membulat', 'Keluarga Monospace untuk Kode', 'Skrip Tulisan Tangan', 'Sans Headline Condensed'],
};

const SUFFIXES_EN = ['I', 'II', 'Vol. 2', 'Edition', null];
const SUFFIXES_ID = ['I', 'II', 'Vol. 2', 'Edisi', null];

const TAG_STYLE_EN = ['minimal', 'bold', 'warm', 'moody', 'bright', 'editorial', 'organic', 'geometric'];
const TAG_STYLE_ID = ['minimalis', 'berani', 'hangat', 'moody', 'cerah', 'editorial', 'organik', 'geometris'];
const TAG_TECH_EN = ['4k', 'vector', 'loop', 'seamless', 'layered', 'editable'];
const TAG_TECH_ID = ['4k', 'vektor', 'loop', 'seamless', 'berlapis', 'dapat diedit'];

const CATEGORY_NOUN_EN = { photography: 'photography', illustrations: 'illustration', vectors: 'vector', footage: 'footage', '3d': '3D', audio: 'audio', templates: 'template', fonts: 'font' };
const CATEGORY_NOUN_ID = { photography: 'fotografi', illustrations: 'ilustrasi', vectors: 'vektor', footage: 'footage', '3d': '3D', audio: 'audio', templates: 'template', fonts: 'font' };

const COLORS = ['#0b0c0f', '#ff5a2b', '#1f9d63', '#2c6bed', '#d98d1f', '#e5484d', '#faf8f4', '#7c5cff'];
const ORIENTATIONS = ['landscape', 'portrait', 'square'];
const RESOLUTIONS = ['1920x1080', '2400x1600', '3840x2160', '4000x3000', '6000x4000'];

function buildAsset(i) {
  const category = CATEGORIES[i % CATEGORIES.length];
  const creator = pick(CREATORS);

  const subjectIdx = pickIndex(SUBJECTS_EN[category.slug]);
  const hasSuffix = rand() > 0.6;
  const suffixIdx = hasSuffix ? Math.floor(rand() * (SUFFIXES_EN.length - 1)) : SUFFIXES_EN.length - 1;
  const suffixNumber = 1 + Math.floor(rand() * 9);

  const titleEn = SUBJECTS_EN[category.slug][subjectIdx] + (SUFFIXES_EN[suffixIdx] ? ` ${SUFFIXES_EN[suffixIdx] === 'Edition' ? `Edition ${suffixNumber}` : SUFFIXES_EN[suffixIdx]}` : '');
  const titleId = SUBJECTS_ID[category.slug][subjectIdx] + (SUFFIXES_ID[suffixIdx] ? ` ${SUFFIXES_ID[suffixIdx] === 'Edisi' ? `Edisi ${suffixNumber}` : SUFFIXES_ID[suffixIdx]}` : '');

  const slug = `${slugify(titleEn)}-${i}`;
  const basePrice = category.type === 'template' || category.type === '3d' ? 39 : category.type === 'font' ? 24 : category.type === 'video' ? 49 : 12;
  const price = Math.round((basePrice + rand() * basePrice * 1.5) * 100) / 100;
  const availableLicenses = LICENSE_ORDER.filter(() => rand() > 0.35);
  if (!availableLicenses.includes('commercial')) availableLicenses.push('commercial');

  const isVideo = category.type === 'video';
  const isAudio = category.type === 'audio';

  const styleIdx = pickIndex(TAG_STYLE_EN);
  const techIdx = pickIndex(TAG_TECH_EN);

  return {
    id: `asset-${i}`,
    slug,
    title: titleEn,
    titleId,
    description: `${titleEn} — a ${CATEGORY_NOUN_EN[category.slug]} asset by ${creator.name}, delivered in production-ready formats with full licensing documentation.`,
    descriptionId: `${titleId} — aset ${CATEGORY_NOUN_ID[category.slug]} oleh ${creator.name}, tersedia dalam format siap produksi lengkap dengan dokumen lisensi.`,
    type: category.type,
    categorySlug: category.slug,
    creatorId: creator.id,
    tags: [category.slug, TAG_STYLE_EN[styleIdx], TAG_TECH_EN[techIdx]],
    tagsId: [category.slug, TAG_STYLE_ID[styleIdx], TAG_TECH_ID[techIdx]],
    orientation: isAudio ? 'square' : pick(ORIENTATIONS),
    resolution: isAudio ? null : pick(RESOLUTIONS),
    duration: isVideo ? Math.floor(6 + rand() * 40) : isAudio ? Math.floor(20 + rand() * 150) : null,
    fileTypes: category.type === 'vector' ? ['SVG', 'AI', 'EPS'] : category.type === 'template' ? ['FIGMA', 'SKETCH', 'PNG'] : category.type === 'font' ? ['OTF', 'TTF', 'WOFF2'] : category.type === '3d' ? ['OBJ', 'FBX', 'GLTF'] : category.type === 'audio' ? ['WAV', 'MP3'] : ['JPG', 'PNG', isVideo ? 'MP4' : 'TIFF'],
    color: pick(COLORS),
    isAiGenerated: rand() > 0.85,
    price,
    licenses: availableLicenses,
    rating: Number((3.6 + rand() * 1.4).toFixed(1)),
    ratingCount: Math.floor(rand() * 480),
    downloads: Math.floor(rand() * 24000),
    favorites: Math.floor(rand() * 3200),
    views: Math.floor(2000 + rand() * 90000),
    publishedAt: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 27)).padStart(2, '0')}`,
    previewImage: `https://picsum.photos/seed/asset-${i}/900/${pick([600, 900, 1200])}`,
    previewVideoUrl: isVideo ? 'https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4' : null,
    status: 'PUBLISHED',
  };
}

export const ASSETS = Array.from({ length: 72 }, (_, i) => buildAsset(i));

export function getAssetBySlug(slug) {
  return ASSETS.find((a) => a.slug === slug) || null;
}
