import { mkdir, cp, rm } from 'node:fs/promises';
const dest=new URL('../public/',import.meta.url);
await rm(dest,{recursive:true,force:true});await mkdir(new URL('src/',dest),{recursive:true});
for(const name of ['index.html','admin.html','src/main.js','src/styles.css','src/admin.js','src/api-response.js','src/admin.css'])await cp(new URL('../'+name,import.meta.url),new URL(name,dest));
console.log('Web estática preparada para Vercel.');
