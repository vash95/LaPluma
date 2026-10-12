import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { randomBytes, scryptSync } from 'node:crypto';
const dir = await mkdtemp(path.join(tmpdir(),'lapluma-test-'));
const password = randomBytes(24).toString('hex'), salt = randomBytes(32).toString('hex');
await writeFile(path.join(dir,'account.json'),JSON.stringify({email:'test@example.com',salt,hash:scryptSync(password,salt,64).toString('hex')}));
const child = spawn(process.execPath,['server.mjs'],{cwd:new URL('../',import.meta.url),env:{...process.env,DATA_DIR:dir,PORT:'0'},stdio:['ignore','pipe','inherit']});
try {
 const port = await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Server startup timeout')),5000);child.on('exit',()=>{clearTimeout(timer);reject(new Error('Server exited'));});child.stdout.on('data',chunk=>{const match=/puerto (\d+)/.exec(chunk.toString());if(match){clearTimeout(timer);resolve(match[1]);}});});
 const base=`http://127.0.0.1:${port}`;
 async function request(route,method='GET',data,cookie,origin=base){return fetch(base+route,{method,headers:{Origin:origin,'X-Requested-With':'LaPluma','Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},body:data?JSON.stringify(data):undefined});}
 assert.equal((await request('/api/admin/content')).status,401);
 assert.equal((await request('/data/account.json')).status,404);
 assert.equal((await request('/api/login','POST',{email:'test@example.com',password:'wrong'})).status,401);
 const login=await request('/api/login','POST',{email:'test@example.com',password});assert.equal(login.status,200);const cookie=login.headers.get('set-cookie').split(';')[0];assert.match(login.headers.get('set-cookie'),/HttpOnly/);
 const state=await (await request('/api/admin/content','GET',null,cookie)).json();
 state.content.es.hero.title='Texto actualizado';
 state.posts=[{id:'test-draft',title:'Borrador privado',body:'No visible',status:'draft',language:'es',date:'2026-10-12',image:''},{id:'test-public',title:'Entrada publicada',body:'Hola taller',status:'published',language:'es',date:'2026-10-12',image:''}];
 assert.equal((await request('/api/admin/content','PUT',state,cookie,'https://other.example')).status,403);
 assert.equal((await request('/api/admin/content','PUT',state,cookie)).status,200);
 const published=await (await request('/api/content')).json();assert.equal(published.content.es.hero.title,'Texto actualizado');assert.equal(published.posts.length,1);assert.equal(published.posts[0].id,'test-public');
 const persisted=JSON.parse(await (await import('node:fs/promises')).readFile(path.join(dir,'content.json'),'utf8'));assert.equal(persisted.posts.length,2);
 const upload=await fetch(base+'/api/admin/upload',{method:'POST',headers:{Origin:base,'X-Requested-With':'LaPluma',Cookie:cookie},body:Buffer.from([137,80,78,71,13,10,26,10,0])});assert.equal(upload.status,201);const image=(await upload.json()).url;assert.equal((await fetch(base+image)).status,200);
 const invalidUpload=await fetch(base+'/api/admin/upload',{method:'POST',headers:{Origin:base,'X-Requested-With':'LaPluma',Cookie:cookie},body:'<svg onload="alert(1)"></svg>'});assert.equal(invalidUpload.status,400);
 state.photos.hero='https://other.example/image.svg';assert.equal((await request('/api/admin/content','PUT',state,cookie)).status,400);
 assert.equal((await request('/api/logout','POST',{},cookie)).status,200);assert.equal((await request('/api/admin/content','GET',null,cookie)).status,401);
 console.log('Login, autorización, CSRF, borradores, persistencia, imágenes y cierre de sesión verificados.');
} finally {if(child.exitCode===null){const stopped=new Promise(resolve=>child.once('exit',resolve));child.kill();await stopped;}await rm(dir,{recursive:true,force:true});}
