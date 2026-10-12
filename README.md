# La Pluma

Web con panel en `/admin`: publicaciones por idioma, borradores, edición de textos y fotos JPG/PNG/WebP (máximo 4 MB). Node.js 20 o posterior, sin dependencias externas.

## Vercel + Supabase

La web pública se despliega como archivos estáticos. Las rutas `/api/*` son funciones de Vercel; Supabase guarda los datos, las imágenes y la cuenta de administrador de forma permanente. No se guardan datos en el disco de Vercel.

1. Crea un proyecto de Supabase. En **SQL Editor**, ejecuta [supabase/setup.sql](supabase/setup.sql). Crea una tabla privada para el contenido y un bucket privado para las fotos. Usa un proyecto dedicado, sin políticas de almacenamiento que permitan leer el bucket a usuarios anónimos.
2. En **Authentication → Users → Add user**, crea tu usuario con email y contraseña, y confirma su email (opción de confirmación automática al crearlo). Desactiva el registro público de usuarios en los ajustes de Authentication. No necesitas un registro en la web.
3. En **Vercel → tu proyecto → Settings → Environment Variables**, configura estas variables para Production y, si quieres probar allí, Preview:

   | Variable | Valor |
   | --- | --- |
   | `SUPABASE_URL` | URL del proyecto, en los ajustes API de Supabase |
   | `SUPABASE_ANON_KEY` | Clave `anon` del proyecto |
   | `SUPABASE_SERVICE_ROLE_KEY` | Clave secreta `service_role` del proyecto |
   | `ADMIN_EMAIL` | Email exacto del usuario administrador que has creado |

   La clave `service_role` solo se usa dentro de las funciones del servidor. No la compartas en el chat, en el navegador ni en el repositorio. No añadas prefijos `PUBLIC_`, `VITE_` o `NEXT_PUBLIC_` a estas variables.
4. Sube estos cambios al repositorio conectado a Vercel. Usa preset **Other**, directorio raíz del proyecto (o `LaPluma` si está dentro de otro repositorio), comando de build `npm run build` y carpeta de salida `public`. `vercel.json` contiene estas opciones y las rutas del panel y las imágenes. Si añadiste las variables después del despliegue, haz **Redeploy**.
5. Visita `https://TU-DOMINIO/admin` e inicia sesión. Cambia un texto, guarda y comprueba la web recargándola. Crea un borrador con una foto: solo podrás verlo en el panel hasta marcarlo como publicado y guardar. Las sesiones duran lo configurado en Supabase Auth (normalmente una hora); al caducar se solicita entrar de nuevo.

No se migra automáticamente la carpeta `data/` del servidor local. El contenido inicial es el de la web del repositorio. Las entradas publicadas se muestran en su idioma; las fotos de portada y galería se comparten entre idiomas. Un guardado simultáneo en otra pestaña se detecta y no sobrescribe sus cambios.

Las fotos del panel se muestran mediante el servidor, también mientras son borradores. Quitar una foto o eliminar una entrada la retira de la web, pero no borra el archivo del bucket. Puedes limpiar los archivos sin referencias desde Supabase Storage. Conserva copias de seguridad de la base de datos y del bucket.

## Desarrollo local sin Supabase

```sh
npm run setup
npm start
```

La configuración pide email y contraseña (mínimo 12 caracteres, entrada oculta). Visita http://localhost:3000/admin. Para cambiar la contraseña, vuelve a ejecutar `npm run setup` y reinicia el servidor. Esta cuenta local es independiente de Supabase.

Los datos locales se guardan en `data/`, excluido de Git. `DATA_DIR` permite elegir otro directorio persistente. Las sesiones locales duran ocho horas y se invalidan al reiniciar.

## Verificación

```sh
npm test
npm run build
```

Las pruebas de las funciones Vercel usan una simulación de Supabase para verificar autorización, borradores, persistencia, conflictos entre guardados e imágenes privadas. La prueba del servidor local necesita permiso para abrir un puerto local. Tras configurar las variables, verifica también el login, guardado y subida en el despliegue real.
