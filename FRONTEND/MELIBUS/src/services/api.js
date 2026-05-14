const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api"

export async function apiRequest(endpoint, options = {}) {
  const { headers, ...fetchOptions } = options

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error || "No se ha podido conectar con el servidor.")
  }

  return data
}
