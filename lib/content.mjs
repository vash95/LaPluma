import { commercialContent, normalizeContentBrand } from '../src/main.js';
export const normalizeSiteBrand = site => ({ ...site, content: normalizeContentBrand(site.content) });
export const initialContent = () => ({ content: structuredClone(commercialContent), photos: {}, posts: [] });
export const imagePath = value => typeof value === 'string' && (value === '' || /^\/uploads\/[a-f0-9]{32}\.(png|jpg|webp)$/.test(value));
function stringsMatch(reference, candidate) {
  if (typeof reference === 'string') return typeof candidate === 'string' && candidate.length <= 20000;
  if (Array.isArray(reference)) return Array.isArray(candidate) && candidate.length === reference.length && reference.every((v, i) => stringsMatch(v, candidate[i]));
  return candidate && typeof candidate === 'object' && Object.keys(candidate).length === Object.keys(reference).length && Object.entries(reference).every(([k,v]) => stringsMatch(v, candidate[k]));
}
export function validContent(next) {
  return next && stringsMatch(commercialContent, next.content) && next.photos && typeof next.photos === 'object' && !Array.isArray(next.photos) && Object.entries(next.photos).every(([k,v]) => /^(hero|gallery-[0-5])$/.test(k) && imagePath(v)) && Array.isArray(next.posts) && next.posts.length <= 500 && next.posts.every(p => p && typeof p.id === 'string' && /^[a-zA-Z0-9-]{1,100}$/.test(p.id) && typeof p.title === 'string' && p.title.trim().length > 0 && p.title.length < 300 && typeof p.body === 'string' && p.body.length < 50000 && ['draft','published'].includes(p.status) && ['es','en','ca'].includes(p.language) && imagePath(p.image) && typeof p.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(p.date)) && new Set(next.posts.map(p=>p.id)).size === next.posts.length;
}
export function imageType(bytes) {
  if (bytes.length >= 8 && bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return ['png','image/png'];
  if (bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return ['jpg','image/jpeg'];
  if (bytes.length >= 12 && bytes.toString('ascii',0,4) === 'RIFF' && bytes.toString('ascii',8,12) === 'WEBP') return ['webp','image/webp'];
}
