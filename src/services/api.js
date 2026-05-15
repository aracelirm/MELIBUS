// Archivo base para conectar React con la API PHP.
// Centraliza fetch, errores y la cabecera del usuario iniciado.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/melibus/api"

export async function apiRequest(endpoint, options = {}) {
  // Función base para todas las llamadas al backend PHP.
  // Si cambia la ruta de la API, normalmente se revisa API_BASE_URL.
  const { headers, ...fetchOptions } = options
  const usuarioGuardado = localStorage.getItem("melibusUser")
  let usuario = null

  try {
    usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  } catch {
    usuario = null
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      // En esta app se manda el id del usuario para zonas como admin o favoritos.
      ...(usuario?.id ? { "X-User-Id": String(usuario.id) } : {}),
      ...(headers || {}),
    },
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error || "No se ha podido conectar con el servidor.")
  }

  return data
}
