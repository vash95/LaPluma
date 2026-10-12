export async function readApiResponse(response, url) {
  const text = await response.text();
  try {
    const result = JSON.parse(text);
    if (result && typeof result === 'object' && !Array.isArray(result)) return result;
  } catch {}
  if (response.status === 404) {
    throw new Error('No se encuentra el servicio del panel. Hay que desplegar la versión con las rutas de la API en Vercel.');
  }
  if (response.status === 413) {
    throw new Error('La imagen supera el límite de tamaño del servidor. Usa una imagen de hasta 4 MB.');
  }
  if (response.status >= 500) {
    throw new Error('El servicio del panel ha fallado. Revisa los registros de las funciones en Vercel.');
  }
  throw new Error(`El servicio del panel no ha devuelto una respuesta válida (${url}, HTTP ${response.status}). Revisa las rutas del despliegue en Vercel.`);
}
