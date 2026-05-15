// Página de paradas. Muestra el listado, buscador y favoritos del usuario.
// Desde aquí se añade o quita una parada favorita pulsando la estrella.
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import SearchBar from "../components/SearchBar"
import ParadaCard from "../components/ParadaCard"
import PageHeader from "../components/PageHeader"
import {
  agregarParadaFavorita,
  eliminarParadaFavorita,
  getParadas,
  getParadasFavoritas,
} from "../services/melibusApi"

function Paradas() {
  const [usuario] = useState(() => {
    const guardado = localStorage.getItem("melibusUser")

    try {
      return guardado ? JSON.parse(guardado) : null
    } catch {
      return null
    }
  })
  const [paradas, setParadas] = useState([])
  const [favoritas, setFavoritas] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [mensajeFavoritos, setMensajeFavoritos] = useState("")

  useEffect(() => {
    // Cargo paradas siempre. Si hay usuario normal, cargo también sus favoritas.
    const peticiones = [getParadas()]

    if (usuario?.id && usuario.rol === "usuario") {
      peticiones.push(getParadasFavoritas(usuario.id))
    }

    Promise.all(peticiones)
      .then(([paradasData, favoritasData = []]) => {
        setParadas(paradasData)
        setFavoritas(favoritasData.map((parada) => parada.id))
      })
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false))
  }, [usuario])

  const alternarFavorita = async (parada) => {
    // Esta función se pasa a ParadaCard y se ejecuta al pulsar la estrella.
    if (!usuario) {
      setMensajeFavoritos("Debes iniciar sesión para guardar paradas favoritas.")
      return
    }

    if (usuario.rol !== "usuario") {
      setMensajeFavoritos("Las paradas favoritas están disponibles para usuarios.")
      return
    }

    const yaEsFavorita = favoritas.includes(parada.id)

    try {
      if (yaEsFavorita) {
        await eliminarParadaFavorita(usuario.id, parada.id)
        setFavoritas((actuales) => actuales.filter((id) => id !== parada.id))
        setMensajeFavoritos("Parada eliminada de favoritas.")
      } else {
        await agregarParadaFavorita(usuario.id, parada.id)
        setFavoritas((actuales) => [...actuales, parada.id])
        setMensajeFavoritos("Parada añadida a favoritas.")
      }
    } catch (error) {
      setMensajeFavoritos(error.message)
    }
  }

  const paradasFiltradas = paradas.filter((parada) => {
    const textoBusqueda = busqueda.toLowerCase()

    // Filtro sencillo para busca por nombre o dirección.
    return (
      parada.nombre.toLowerCase().includes(textoBusqueda) ||
      parada.direccion.toLowerCase().includes(textoBusqueda)
    )
  })

  return (
    <Layout>
      <div className="simple-page">
        <PageHeader
          tag="Paradas"
          titulo="Paradas"
          descripcion="Consulta las principales paradas del autobús urbano de Melilla y las líneas que pasan por cada una de ellas."
        />

        <SearchBar
          id="buscar-parada"
          label="Buscar parada"
          placeholder="Ejemplo: Plaza España, Barrio Real..."
          value={busqueda}
          onChange={setBusqueda}
        />

        {mensajeFavoritos && (
          <p className="empty-message">{mensajeFavoritos}</p>
        )}

        {cargando ? (
          <p className="empty-message">Cargando paradas...</p>
        ) : error ? (
          <p className="empty-message">{error}</p>
        ) : paradasFiltradas.length > 0 ? (
          <div className="info-grid">
            {paradasFiltradas.map((parada) => (
              <ParadaCard
                key={parada.id}
                parada={parada}
                favorita={favoritas.includes(parada.id)}
                onToggleFavorita={alternarFavorita}
              />
            ))}
          </div>
        ) : (
          <p className="empty-message">
            No se han encontrado paradas con esa búsqueda.
          </p>
        )}
      </div>
    </Layout>
  )
}

export default Paradas
