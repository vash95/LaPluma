import http from 'node:http';
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { commercialContent } from './src/main.js';
import { validContent } from './lib/content.mjs';
const root = fileURLToPath(new URL('.', import.meta.url));
const dataDir = process.env.DATA_DIR || path.join(root, 'data');
await mkdir(path.join(dataDir, 'uploads'), { recursive: true });
let state;
try { state = JSON.parse(await readFile(path.join(dataDir, 'content.json'), 'utf8')); }
catch (e) { if (e.code !== 'ENOENT') throw e; state = { content: structuredClone(commercialContent), photos: {}, posts: [] }; }
let account;
try { account = JSON.parse(await readFile(path.join(dataDir, 'account.json'), 'utf8')); } catch (e) { if (e.code !== 'ENOENT') throw e; }
const sessions = new Map(), attempts = new Map();
const json = (res, code, value) => { res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(value)); };
async function body(req, max = 2_000_000) { let size = 0; const chunks = []; for await (const chunk of req) { size += chunk.length; if (size > max) throw new Error('Archivo demasiado grande'); chunks.push(chunk); } return Buffer.concat(chunks); }
async function persist(next) { const temp = path.join(dataDir, 'content.tmp'); await writeFile(temp, JSON.stringify(next), { mode: 0o600 }); await rename(temp, path.join(dataDir, 'content.json')); state = next; }
const imagePath = value => value === '' || /^\/uploads\/[a-f0-9]{32}\.(png|jpg|webp)$/.test(value);
let writeQueue = Promise.resolve();
async function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const token = /(?:^|; )session=([a-f0-9]+)/.exec(req.headers.cookie || '')?.[1];
  const authenticated = (sessions.get(token) || 0) > Date.now();
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const origin = req.headers.origin;
    if (!origin || new URL(origin).host !== req.headers.host || req.headers['x-requested-with'] !== 'LaPluma') return json(res, 403, { error: 'Solicitud no autorizada' });
  }
  if (url.pathname === '/api/login' && req.method === 'POST') {
    if (!account) return json(res, 503, { error: 'Primero configura tu cuenta con npm run setup en el servidor.' });
    const ip = req.socket.remoteAddress, now = Date.now();
    const previous = attempts.get(ip); const attempt = previous && previous.until > now ? previous : { count: 0, until: now + 900000 };
    if (attempt.count >= 10) return json(res, 429, { error: 'Demasiados intentos. Espera 15 minutos.' });
    const input = JSON.parse((await body(req, 10000)).toString());
    const valid = typeof input.password === 'string' && input.password.length <= 200 && timingSafeEqual(scryptSync(input.password, account.salt, 64), Buffer.from(account.hash, 'hex')) && input.email === account.email;
    if (!valid) { attempt.count++; attempts.set(ip, attempt); return json(res, 401, { error: 'Email o contraseña incorrectos' }); }
    attempts.delete(ip);
    const session = randomBytes(32).toString('hex'); sessions.set(session, now + 8 * 3600000);
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader('Set-Cookie', `session=${session}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${secure}`);
    return json(res, 200, { ok: true });
  }
  if (url.pathname === '/api/session') return json(res, 200, { authenticated });
  if (url.pathname === '/api/logout' && req.method === 'POST') { sessions.delete(token); res.setHeader('Set-Cookie', 'session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0'); return json(res, 200, { ok: true }); }
  if (url.pathname === '/api/content' && req.method === 'GET') return json(res, 200, { ...state, posts: state.posts.filter(p => p.status === 'published') });
  if (url.pathname.startsWith('/api/admin')) {
    if (!authenticated) return json(res, 401, { error: 'Inicia sesión para editar' });
    if (url.pathname === '/api/admin/content' && req.method === 'GET') return json(res, 200, state);
    if (url.pathname === '/api/admin/upload' && req.method === 'POST') {
      const bytes = await body(req, 4_000_000);
      let ext;
      if (bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) ext = 'png';
      else if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) ext = 'jpg';
      else if (bytes.toString('ascii',0,4) === 'RIFF' && bytes.toString('ascii',8,12) === 'WEBP') ext = 'webp';
      if (!ext) return json(res, 400, { error: 'Usa una imagen PNG, JPG o WebP (máximo 4 MB)' });
      const name = `${randomBytes(16).toString('hex')}.${ext}`; await writeFile(path.join(dataDir, 'uploads', name), bytes);
      return json(res, 201, { url: `/uploads/${name}` });
    }
    if (url.pathname === '/api/admin/content' && req.method === 'PUT') {
      const next = JSON.parse((await body(req)).toString());
      if (!validContent(next)) return json(res, 400, { error: 'Revisa los campos antes de guardar' });
      await persist({ content: next.content, photos: next.photos, posts: next.posts }); return json(res, 200, { ok: true });
    }
    return json(res, 404, { error: 'Ruta desconocida' });
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'Método no permitido' });
  const route = url.pathname === '/' ? '/index.html' : url.pathname === '/admin' ? '/admin.html' : url.pathname;
  const allowed = ['/index.html','/admin.html','/src/main.js','/src/admin.js','/src/api-response.js','/src/styles.css','/src/admin.css'];
  let file;
  if (allowed.includes(route)) file = path.join(root, route);
  else if (imagePath(route) && route.startsWith('/uploads/')) file = path.join(dataDir, route);
  else return json(res, 404, { error: 'Página no encontrada' });
  try {
    const bytes = await readFile(file); const type = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp'}[path.extname(file)];
    res.writeHead(200, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'self'; img-src 'self' blob:; style-src 'self'; script-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'", 'Cache-Control':'no-cache' }); res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch { json(res, 404, { error: 'Archivo no encontrado' }); }
}
const server = http.createServer((req,res) => {
  const run = () => handle(req,res).catch(e => { if (!res.headersSent) json(res, 400, { error: e instanceof SyntaxError ? 'Datos incorrectos' : 'No se ha podido completar la solicitud' }); else res.end(); });
  if (req.method === 'PUT') { writeQueue = writeQueue.then(run); } else run();
});
server.listen(Number(process.env.PORT || 3000), process.env.HOST || '127.0.0.1', () => console.log(`La Pluma disponible en el puerto ${server.address().port}`));
