import assert from 'node:assert/strict';
import { readApiResponse } from '../src/api-response.js';
assert.deepEqual(await readApiResponse(new Response('{"authenticated":false}'),'/api/session'),{authenticated:false});
assert.deepEqual(await readApiResponse(new Response('{"error":"Falta Supabase"}',{status:503}),'/api/session'),{error:'Falta Supabase'});
await assert.rejects(readApiResponse(new Response('The page could not be found',{status:404}),'/api/session'),/No se encuentra el servicio/);
await assert.rejects(readApiResponse(new Response('A server error has occurred',{status:500}),'/api/session'),/registros de las funciones/);
await assert.rejects(readApiResponse(new Response('<html>Login</html>'),'/api/session'),/respuesta válida/);
console.log('Respuestas de API y errores de Vercel verificados.');
