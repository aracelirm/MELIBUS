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

export const getAdminUsuarios = () => apiRequest("/admin/usuarios")

export const actualizarAdminUsuario = (idUsuario, datos) =>
  apiRequest(`/admin/usuarios/${idUsuario}`, {
    method: "PUT",
    body: JSON.stringify(datos),
  })

export const getAdminParadas = () => apiRequest("/admin/paradas")

export const crearAdminParada = (datos) =>
  apiRequest("/admin/paradas", {
    method: "POST",
    body: JSON.stringify(datos),
  })

export const actualizarAdminParada = (idParada, datos) =>
  apiRequest(`/admin/paradas/${idParada}`, {
    method: "PUT",
    body: JSON.stringify(datos),
  })

export const desactivarAdminParada = (idParada) =>
  apiRequest(`/admin/paradas/${idParada}`, {
    method: "DELETE",
  })

export const getAdminAvisos = () => apiRequest("/admin/avisos")

export const crearAdminAviso = (datos) =>
  apiRequest("/admin/avisos", {
    method: "POST",
    body: JSON.stringify(datos),
  })

export const actualizarAdminAviso = (idAviso, datos) =>
  apiRequest(`/admin/avisos/${idAviso}`, {
    method: "PUT",
    body: JSON.stringify(datos),
  })

export const desactivarAdminAviso = (idAviso) =>
  apiRequest(`/admin/avisos/${idAviso}`, {
    method: "DELETE",
  })

export const getParadasFavoritas = (idUsuario) =>
  apiRequest(`/usuarios/${idUsuario}/paradas-favoritas`)

export const agregarParadaFavorita = (idUsuario, idParada) =>
  apiRequest(`/usuarios/${idUsuario}/paradas-favoritas`, {
    method: "POST",
    body: JSON.stringify({ idParada }),
  })

export const eliminarParadaFavorita = (idUsuario, idParada) =>
  apiRequest(`/usuarios/${idUsuario}/paradas-favoritas/${idParada}`, {
    method: "DELETE",
  })

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
