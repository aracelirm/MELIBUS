import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import PageHeader from "../components/PageHeader"
import {
  actualizarAdminAviso,
  actualizarAdminParada,
  actualizarAdminUsuario,
  crearAdminAviso,
  crearAdminParada,
  desactivarAdminAviso,
  desactivarAdminParada,
  getAdminAvisos,
  getAdminParadas,
  getAdminUsuarios,
  getLineas,
} from "../services/melibusApi"

const paradaInicial = {
  id: null,
  nombre: "",
  direccion: "",
  latitud: "",
  longitud: "",
  activa: true,
}

const avisoInicial = {
  id: null,
  tipo: "incidencia",
  titulo: "",
  descripcion: "",
  estado: "pendiente",
  idParada: "",
  idLinea: "",
  activo: true,
}

function AdminPanel() {
  const [usuario] = useState(() => {
    const guardado = localStorage.getItem("melibusUser")

    try {
      return guardado ? JSON.parse(guardado) : null
    } catch {
      return null
    }
  })
  const [tab, setTab] = useState("usuarios")
  const [usuarios, setUsuarios] = useState([])
  const [paradas, setParadas] = useState([])
  const [avisos, setAvisos] = useState([])
  const [lineas, setLineas] = useState([])
  const [formParada, setFormParada] = useState(paradaInicial)
  const [formAviso, setFormAviso] = useState(avisoInicial)
  const [cargando, setCargando] = useState(usuario?.rol === "admin")
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState("")

  function cargarDatos() {
    setCargando(true)
    setError("")

    obtenerDatosPanel()
      .then(([usuariosData, paradasData, avisosData, lineasData]) => {
        setUsuarios(usuariosData)
        setParadas(paradasData)
        setAvisos(avisosData)
        setLineas(lineasData)
      })
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false))
  }

  function obtenerDatosPanel() {
    return Promise.all([
      getAdminUsuarios(),
      getAdminParadas(),
      getAdminAvisos(),
      getLineas(),
    ])
  }

  useEffect(() => {
    if (!usuario || usuario.rol !== "admin") {
      return
    }

    obtenerDatosPanel()
      .then(([usuariosData, paradasData, avisosData, lineasData]) => {
        setUsuarios(usuariosData)
        setParadas(paradasData)
        setAvisos(avisosData)
        setLineas(lineasData)
      })
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false))
  }, [usuario])

  const cambiarEstadoUsuario = async (item, datos) => {
    try {
      await actualizarAdminUsuario(item.id, datos)
      setMensaje("Usuario actualizado correctamente.")
      cargarDatos()
    } catch (error) {
      setError(error.message)
    }
  }

  const guardarParada = async (event) => {
    event.preventDefault()

    try {
      const datos = prepararParada(formParada)

      if (formParada.id) {
        await actualizarAdminParada(formParada.id, datos)
        setMensaje("Parada actualizada correctamente.")
      } else {
        await crearAdminParada(datos)
        setMensaje("Parada creada correctamente.")
      }

      setFormParada(paradaInicial)
      cargarDatos()
    } catch (error) {
      setError(error.message)
    }
  }

  const guardarAviso = async (event) => {
    event.preventDefault()

    try {
      const datos = prepararAviso(formAviso)

      if (formAviso.id) {
        await actualizarAdminAviso(formAviso.id, datos)
        setMensaje("Aviso actualizado correctamente.")
      } else {
        await crearAdminAviso(datos)
        setMensaje("Aviso creado correctamente.")
      }

      setFormAviso(avisoInicial)
      cargarDatos()
    } catch (error) {
      setError(error.message)
    }
  }

  const desactivarParada = async (idParada) => {
    try {
      await desactivarAdminParada(idParada)
      setMensaje("Parada desactivada correctamente.")
      cargarDatos()
    } catch (error) {
      setError(error.message)
    }
  }

  const desactivarAviso = async (idAviso) => {
    try {
      await desactivarAdminAviso(idAviso)
      setMensaje("Aviso desactivado correctamente.")
      cargarDatos()
    } catch (error) {
      setError(error.message)
    }
  }

  if (!usuario || usuario.rol !== "admin") {
    return (
      <Layout>
        <div className="simple-page">
          <h2>Acceso restringido</h2>
          <p>Esta zona solo está disponible para administradores.</p>
          <Link to="/" className="card-button">Volver al inicio</Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="simple-page admin-page">
        <PageHeader
          tag="Administración"
          titulo="Panel de administrador"
          descripcion="Gestiona usuarios, paradas y avisos de MELIBUS desde un único panel."
        />

        <div className="admin-tabs">
          <button className={tab === "usuarios" ? "active" : ""} onClick={() => setTab("usuarios")}>
            Usuarios
          </button>
          <button className={tab === "paradas" ? "active" : ""} onClick={() => setTab("paradas")}>
            Paradas
          </button>
          <button className={tab === "avisos" ? "active" : ""} onClick={() => setTab("avisos")}>
            Avisos
          </button>
        </div>

        {mensaje && <p className="empty-message">{mensaje}</p>}
        {error && <p className="empty-message">{error}</p>}
        {cargando && <p className="empty-message">Cargando panel...</p>}

        {!cargando && tab === "usuarios" && (
          <section className="admin-section">
            <h3>Gestión de usuarios</h3>
            <div className="admin-list">
              {usuarios.map((item) => (
                <div key={item.id} className="admin-row">
                  <div>
                    <strong>{item.nombre}</strong>
                    <span>{item.email}</span>
                  </div>
                  <select
                    value={item.rol}
                    onChange={(event) =>
                      cambiarEstadoUsuario(item, { rol: event.target.value })
                    }
                  >
                    <option value="usuario">Usuario</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    type="button"
                    className={item.activo ? "admin-action danger" : "admin-action"}
                    onClick={() =>
                      cambiarEstadoUsuario(item, { activo: !item.activo })
                    }
                  >
                    {item.activo ? "Desactivar" : "Activar"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {!cargando && tab === "paradas" && (
          <section className="admin-section">
            <h3>{formParada.id ? "Editar parada" : "Nueva parada"}</h3>
            <form className="admin-form" onSubmit={guardarParada}>
              <input
                value={formParada.nombre}
                onChange={(event) => setFormParada({ ...formParada, nombre: event.target.value })}
                placeholder="Nombre"
              />
              <input
                value={formParada.direccion}
                onChange={(event) => setFormParada({ ...formParada, direccion: event.target.value })}
                placeholder="Dirección"
              />
              <input
                value={formParada.latitud ?? ""}
                onChange={(event) => setFormParada({ ...formParada, latitud: event.target.value })}
                placeholder="Latitud"
              />
              <input
                value={formParada.longitud ?? ""}
                onChange={(event) => setFormParada({ ...formParada, longitud: event.target.value })}
                placeholder="Longitud"
              />
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={formParada.activa}
                  onChange={(event) => setFormParada({ ...formParada, activa: event.target.checked })}
                />
                Activa
              </label>
              <button type="submit" className="card-button">
                {formParada.id ? "Guardar cambios" : "Crear parada"}
              </button>
              {formParada.id && (
                <button type="button" className="admin-action" onClick={() => setFormParada(paradaInicial)}>
                  Cancelar
                </button>
              )}
            </form>

            <div className="admin-list">
              {paradas.map((parada) => (
                <div key={parada.id} className="admin-row">
                  <div>
                    <strong>{parada.nombre}</strong>
                    <span>{parada.direccion}</span>
                  </div>
                  <span>{parada.activa ? "Activa" : "Inactiva"}</span>
                  <button type="button" className="admin-action" onClick={() => setFormParada(parada)}>
                    Editar
                  </button>
                  <button type="button" className="admin-action danger" onClick={() => desactivarParada(parada.id)}>
                    Desactivar
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {!cargando && tab === "avisos" && (
          <section className="admin-section">
            <h3>{formAviso.id ? "Editar aviso" : "Nuevo aviso"}</h3>
            <form className="admin-form" onSubmit={guardarAviso}>
              <select value={formAviso.tipo} onChange={(event) => setFormAviso({ ...formAviso, tipo: event.target.value })}>
                <option value="aviso">Aviso</option>
                <option value="incidencia">Incidencia</option>
              </select>
              <select value={formAviso.estado} onChange={(event) => setFormAviso({ ...formAviso, estado: event.target.value })}>
                <option value="pendiente">Pendiente</option>
                <option value="en_revision">En revisión</option>
                <option value="resuelta">Resuelta</option>
              </select>
              <input
                value={formAviso.titulo}
                onChange={(event) => setFormAviso({ ...formAviso, titulo: event.target.value })}
                placeholder="Título"
              />
              <textarea
                value={formAviso.descripcion}
                onChange={(event) => setFormAviso({ ...formAviso, descripcion: event.target.value })}
                placeholder="Descripción"
              />
              <select value={formAviso.idLinea ?? ""} onChange={(event) => setFormAviso({ ...formAviso, idLinea: event.target.value })}>
                <option value="">Sin línea asociada</option>
                {lineas.map((linea) => (
                  <option key={linea.id} value={linea.id}>{linea.nombre}</option>
                ))}
              </select>
              <select value={formAviso.idParada ?? ""} onChange={(event) => setFormAviso({ ...formAviso, idParada: event.target.value })}>
                <option value="">Sin parada asociada</option>
                {paradas.map((parada) => (
                  <option key={parada.id} value={parada.id}>{parada.nombre}</option>
                ))}
              </select>
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={formAviso.activo}
                  onChange={(event) => setFormAviso({ ...formAviso, activo: event.target.checked })}
                />
                Activo
              </label>
              <button type="submit" className="card-button">
                {formAviso.id ? "Guardar cambios" : "Crear aviso"}
              </button>
              {formAviso.id && (
                <button type="button" className="admin-action" onClick={() => setFormAviso(avisoInicial)}>
                  Cancelar
                </button>
              )}
            </form>

            <div className="admin-list">
              {avisos.map((aviso) => (
                <div key={aviso.id} className="admin-row">
                  <div>
                    <strong>{aviso.titulo}</strong>
                    <span>{aviso.tipo} · {aviso.estado} · {aviso.activo ? "Activo" : "Inactivo"}</span>
                  </div>
                  <button type="button" className="admin-action" onClick={() => setFormAviso(aviso)}>
                    Editar
                  </button>
                  <button type="button" className="admin-action danger" onClick={() => desactivarAviso(aviso.id)}>
                    Desactivar
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}

function prepararParada(parada) {
  return {
    nombre: parada.nombre,
    direccion: parada.direccion,
    latitud: parada.latitud === "" ? null : parada.latitud,
    longitud: parada.longitud === "" ? null : parada.longitud,
    activa: parada.activa,
  }
}

function prepararAviso(aviso) {
  return {
    tipo: aviso.tipo,
    titulo: aviso.titulo,
    descripcion: aviso.descripcion,
    estado: aviso.estado,
    idLinea: aviso.idLinea === "" ? null : aviso.idLinea,
    idParada: aviso.idParada === "" ? null : aviso.idParada,
    activo: aviso.activo,
  }
}

export default AdminPanel
