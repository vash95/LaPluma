import { randomBytes } from 'node:crypto';
import { initialContent, validContent, imageType, imagePath } from '../lib/content.mjs';
// Vercel must leave request bodies intact, including binary image uploads.
export const config = { api: { bodyParser: false } };
const BUCKET = 'lapluma-images';
const json = (res, code, value) => { res.writeHead(code, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(value)); };
class HttpError extends Error { constructor(status,message){super(message);this.status=status;} }
async function body(req, max) { const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>max)throw new HttpError(413,'El archivo o contenido supera el tamaño permitido');chunks.push(chunk);}return Buffer.concat(chunks); }
function settings() {
 const { SUPABASE_URL:url, SUPABASE_ANON_KEY:anon, SUPABASE_SERVICE_ROLE_KEY:service, ADMIN_EMAIL:email }=process.env;
 if(!url || !anon || !service || !email)throw new HttpError(503,'Falta configurar Supabase y ADMIN_EMAIL en Vercel. Consulta las instrucciones del proyecto.');
 return {url:url.replace(/\/$/,''),anon,service,email:email.trim().toLowerCase()};
}
async function supabase(s,route,options={},privileged=true) {
 return fetch(s.url+route,{...options,headers:{apikey:privileged?s.service:s.anon,Authorization:`Bearer ${privileged?s.service:s.anon}`,...options.headers},signal:AbortSignal.timeout(15000)});
}
const sessionToken = req => /(?:^|;\s*)lapluma_session=([a-zA-Z0-9_.-]+)/.exec(req.headers.cookie||'')?.[1];
async function authenticated(req,s) {
 const token=sessionToken(req);if(!token)return false;
 const response=await supabase(s,'/auth/v1/user',{headers:{Authorization:`Bearer ${token}`}},false);
 if(response.status===401 || response.status===403)return false;
 if(!response.ok)throw new HttpError(502,'No se ha podido comprobar la sesión. Inténtalo de nuevo.');
 const user=await response.json();return user.email?.toLowerCase()===s.email && !!user.email_confirmed_at;
}
async function readState(s) {
 const response=await supabase(s,'/rest/v1/lapluma_content?id=eq.1&select=document,revision');
 if(!response.ok)throw new HttpError(502,'No se ha podido leer el contenido. Revisa la configuración de Supabase.');
 const rows=await response.json();if(!rows[0])throw new HttpError(503,'Ejecuta supabase/setup.sql para crear el contenido inicial.');
 return {...(rows[0].document || initialContent()),revision:rows[0].revision};
}
export default async function handler(req,res) {
 try {
  const route=new URL(req.url,'https://localhost').pathname;
  if(!['GET','HEAD','POST','PUT'].includes(req.method))return json(res,405,{error:'Método no permitido'});
  if(req.method==='POST' || req.method==='PUT'){
   let origin;try{origin=new URL(req.headers.origin).host;}catch{}
   if(origin!==req.headers.host || req.headers['x-requested-with']!=='LaPluma')return json(res,403,{error:'Solicitud no autorizada'});
  }
  const s=settings();
  if(route==='/api/login' && req.method==='POST'){
   const input=JSON.parse((await body(req,10000)).toString());
   if(typeof input.email!=='string' || typeof input.password!=='string' || input.password.length>200)return json(res,400,{error:'Revisa el email y la contraseña'});
   const email=input.email.trim().toLowerCase();
   // Supabase Auth checks credentials and applies its persistent login rate limits.
   const response=await supabase(s,'/auth/v1/token?grant_type=password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password:input.password})},false);
   if(response.status===429)return json(res,429,{error:'Demasiados intentos. Espera antes de volver a entrar.'});
   if(!response.ok)return json(res,401,{error:'Email o contraseña incorrectos'});
   const session=await response.json();
   if(email!==s.email || session.user?.email?.toLowerCase()!==s.email || !session.user?.email_confirmed_at)return json(res,401,{error:'Email o contraseña incorrectos'});
   res.setHeader('Set-Cookie',`lapluma_session=${session.access_token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${Math.min(session.expires_in||3600,28800)}`);
   return json(res,200,{ok:true});
  }
  if(route==='/api/logout' && req.method==='POST'){
   const token=sessionToken(req);
   if(token){const response=await supabase(s,'/auth/v1/logout',{method:'POST',headers:{Authorization:`Bearer ${token}`}},false);if(!response.ok && response.status!==401 && response.status!==403)throw new HttpError(502,'No se ha podido cerrar la sesión. Inténtalo de nuevo.');}
   res.setHeader('Set-Cookie','lapluma_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');return json(res,200,{ok:true});
  }
  if(route==='/api/session' && req.method==='GET')return json(res,200,{authenticated:await authenticated(req,s)});
  if(route==='/api/content' && req.method==='GET'){
   const state=await readState(s);return json(res,200,{content:state.content,photos:state.photos,posts:state.posts.filter(p=>p.status==='published')});
  }
  if(route.startsWith('/api/admin/')){
   if(!await authenticated(req,s))return json(res,401,{error:'Inicia sesión para editar'});
   if(route==='/api/admin/content' && req.method==='GET')return json(res,200,await readState(s));
   if(route==='/api/admin/content' && req.method==='PUT'){
    const next=JSON.parse((await body(req,2_000_000)).toString());
    if(!validContent(next) || !Number.isSafeInteger(next.revision) || next.revision<0)return json(res,400,{error:'Revisa los campos antes de guardar'});
    const response=await supabase(s,`/rest/v1/lapluma_content?id=eq.1&revision=eq.${next.revision}`,{method:'PATCH',headers:{'Content-Type':'application/json',Prefer:'return=representation'},body:JSON.stringify({document:{content:next.content,photos:next.photos,posts:next.posts},revision:next.revision+1})});
    if(!response.ok)throw new HttpError(502,'No se han guardado los cambios. Inténtalo de nuevo.');
    const rows=await response.json();if(!rows.length)return json(res,409,{error:'Se ha guardado una versión más reciente desde otra pestaña. Copia tus cambios y recarga el panel antes de guardar.'});
    return json(res,200,{ok:true,revision:rows[0].revision});
   }
   if(route==='/api/admin/upload' && req.method==='POST'){
    // Vercel Functions limit payloads to 4.5 MB; leave room for request overhead.
    const bytes=await body(req,4_000_000);const type=imageType(bytes);
    if(!type)return json(res,400,{error:'Usa una imagen JPG, PNG o WebP de hasta 4 MB'});
    const name=`${randomBytes(16).toString('hex')}.${type[0]}`;
    const response=await supabase(s,`/storage/v1/object/${BUCKET}/${name}`,{method:'POST',headers:{'Content-Type':type[1],'x-upsert':'false'},body:bytes});
    if(!response.ok)throw new HttpError(502,'No se ha podido subir la imagen. Inténtalo de nuevo.');
    return json(res,201,{url:`/uploads/${name}`});
   }
   return json(res,404,{error:'Ruta desconocida'});
  }
  const image=route.replace(/^\/api\/uploads\//,'/uploads/');
  if(image.startsWith('/uploads/') && imagePath(image) && ['GET','HEAD'].includes(req.method)){
   const name=image.slice('/uploads/'.length);
   // Only serve images referenced publicly; draft uploads stay private.
   const state=await readState(s);
   if(!Object.values(state.photos).includes(image) && !state.posts.some(p=>p.status==='published' && p.image===image) && !await authenticated(req,s))return json(res,404,{error:'Imagen no encontrada'});
   const response=await supabase(s,`/storage/v1/object/authenticated/${BUCKET}/${name}`);
   if(!response.ok)return json(res,response.status===404?404:502,{error:'Imagen no disponible'});
   res.writeHead(200,{'Content-Type':{'jpg':'image/jpeg','png':'image/png','webp':'image/webp'}[name.split('.').pop()],'X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});
   return res.end(req.method==='HEAD'?undefined:Buffer.from(await response.arrayBuffer()));
  }
  return json(res,404,{error:'Ruta desconocida'});
 }catch(error){return json(res,error.status|| (error instanceof SyntaxError ? 400 : 502),{error:error.status?error.message:error instanceof SyntaxError?'Datos incorrectos':'No se ha podido completar la solicitud. Inténtalo de nuevo.'});}
}
