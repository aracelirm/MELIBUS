import { apiRequest } from "./api"

export const getLineas = () => apiRequest("/lineas")

export const getLinea = (id) => apiRequest(`/lineas/${id}`)

export const getParadasLinea = (id) => apiRequest(`/lineas/${id}/paradas`)

export const getParadas = () => apiRequest("/paradas")

export const getParada = (id) => apiRequest(`/paradas/${id}`)

export const getHorarios = () => apiRequest("/horarios")

export const getHorariosParada = (id) => apiRequest(`/paradas/${id}/horarios`)

export const getAvisos = () => apiRequest("/avisos")

export const getRecargas = () => apiRequest("/recargas")

export const loginUsuario = ({ email, password }) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })

export const registrarUsuario = ({ nombre, email, password }) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ nombre, email, password }),
  })
