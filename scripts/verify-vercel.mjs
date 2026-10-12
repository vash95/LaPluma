import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import handler from '../api/[...route].js';
import { initialContent } from '../lib/content.mjs';
const originalFetch=globalThis.fetch;
const names=['SUPABASE_URL','SUPABASE_ANON_KEY','SUPABASE_SERVICE_ROLE_KEY','ADMIN_EMAIL'];
const previous=Object.fromEntries(names.map(k=>[k,process.env[k]]));
Object.assign(process.env,{SUPABASE_URL:'https://supabase.invalid',SUPABASE_ANON_KEY:'fake-anon',SUPABASE_SERVICE_ROLE_KEY:'fake-service',ADMIN_EMAIL:'admin@example.com'});
let record={document:null,revision:0}, objects=new Map(), revoked=false;
const reply=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json'}});
globalThis.fetch=async(url,options={})=>{
 assert.ok(url.startsWith('https://supabase.invalid/'),'Tests must never send real network requests');
 const parsed=new URL(url), token=options.headers.Authorization;
 if(parsed.pathname==='/auth/v1/token'){
  const data=JSON.parse(options.body);
  if(data.password!=='test-password')return reply({error:'bad'},400);
  revoked=false;return reply({access_token:data.email==='admin@example.com'?'admin-token':'other-token',expires_in:3600,user:{email:data.email,email_confirmed_at:'2026-10-12'}});
 }
 if(parsed.pathname==='/auth/v1/user'){
  if(token==='Bearer admin-token'&&!revoked)return reply({email:'admin@example.com',email_confirmed_at:'2026-10-12'});
  if(token==='Bearer other-token')return reply({email:'other@example.com',email_confirmed_at:'2026-10-12'});
  return reply({error:'expired'},401);
 }
 if(parsed.pathname==='/auth/v1/logout'){revoked=true;return reply({ok:true});}
 assert.equal(options.headers.apikey,'fake-service');assert.equal(token,'Bearer fake-service');
 if(parsed.pathname==='/rest/v1/lapluma_content'){
  if(options.method==='PATCH'){
   if(parsed.searchParams.get('revision')!==`eq.${record.revision}`)return reply([]);
   record=JSON.parse(options.body);return reply([record]);
  }
  return reply([record]);
 }
 if(parsed.pathname.startsWith('/storage/v1/object/authenticated/lapluma-images/')){
  const name=parsed.pathname.split('/').pop();return objects.has(name)?new Response(objects.get(name)):reply({},404);
 }
 if(parsed.pathname.startsWith('/storage/v1/object/lapluma-images/') && options.method==='POST'){
  objects.set(parsed.pathname.split('/').pop(),options.body);return reply({ok:true});
 }
 throw new Error('Unexpected Supabase route');
};
async function request(route,method='GET',data,cookie,origin='https://lapluma.example'){
 const bytes=data instanceof Buffer?data:data?Buffer.from(JSON.stringify(data)):Buffer.alloc(0);
 const req=Readable.from([bytes]);Object.assign(req,{url:route,method,headers:{host:'lapluma.example',origin,'x-requested-with':'LaPluma',...(cookie?{cookie}:{})}});
 let status,headers={},output;
 const res={writeHead(code,values){status=code;Object.assign(headers,values);},setHeader(key,value){headers[key]=value;},end(value){output=value;}};
 await handler(req,res);
 return {status,headers,body:headers['Content-Type']?.startsWith('application/json')?JSON.parse(output):output};
}
try{
 assert.equal((await request('/api/admin/content')).status,401);
 assert.equal((await request('/api/login','POST',{email:'admin@example.com',password:'wrong'})).status,401);
 assert.equal((await request('/api/login','POST',{email:'other@example.com',password:'test-password'})).status,401);
 assert.equal((await request('/api/admin/content','GET',null,'lapluma_session=other-token')).status,401);
 const login=await request('/api/login','POST',{email:'admin@example.com',password:'test-password'});assert.equal(login.status,200);assert.match(login.headers['Set-Cookie'],/HttpOnly; Secure; SameSite=Strict/);
 const cookie='lapluma_session=admin-token';
 const initial=await request('/api/admin/content','GET',null,cookie);assert.equal(initial.status,200);assert.deepEqual(initial.body.content,initialContent().content);
 const png=Buffer.from([137,80,78,71,13,10,26,10]);
 const upload=await request('/api/admin/upload','POST',png,cookie);assert.equal(upload.status,201);const image=upload.body.url;
 assert.equal((await request(image)).status,404);assert.equal((await request(image,'GET',null,cookie)).status,200);
 assert.equal((await request('/api/admin/upload','POST',Buffer.from('<svg></svg>'),cookie)).status,400);
 const state=initial.body;state.content.es.hero.title='Cambios persistentes';state.posts=[{id:'draft',title:'Borrador',body:'Privado',date:'2026-10-12',image,status:'draft',language:'es'},{id:'public',title:'Publicado',body:'Visible',date:'2026-10-12',image:'',status:'published',language:'es'}];
 assert.equal((await request('/api/admin/content','PUT',state,cookie,'https://evil.example')).status,403);
 const saved=await request('/api/admin/content','PUT',state,cookie);assert.equal(saved.status,200);assert.equal(saved.body.revision,1);
 const publicState=await request('/api/content');assert.equal(publicState.body.posts.length,1);assert.equal(publicState.body.posts[0].id,'public');assert.equal(publicState.body.content.es.hero.title,'Cambios persistentes');
 assert.equal((await request(image)).status,404);
 assert.equal((await request('/api/admin/content','PUT',state,cookie)).status,409);
 state.revision=1;state.posts[0].status='published';assert.equal((await request('/api/admin/content','PUT',state,cookie)).status,200);
 assert.equal((await request('/api/uploads/'+image.split('/').pop())).status,200);
 state.revision=2;state.photos.hero='https://unsafe.example/image.svg';assert.equal((await request('/api/admin/content','PUT',state,cookie)).status,400);
 assert.equal((await request('/api/logout','POST',{},cookie)).status,200);assert.equal((await request('/api/admin/content','GET',null,cookie)).status,401);
 delete process.env.SUPABASE_URL;assert.equal((await request('/api/content')).status,503);
 console.log('Vercel: login, permisos, CSRF, contenido, borradores, conflictos, fotos privadas y configuración verificados con Supabase simulado.');
}finally{globalThis.fetch=originalFetch;for(const name of names){if(previous[name]===undefined)delete process.env[name];else process.env[name]=previous[name];}}
