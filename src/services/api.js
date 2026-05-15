const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/melibus/api"

export async function apiRequest(endpoint, options = {}) {
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
