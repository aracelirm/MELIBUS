// Página de líneas. Carga las líneas desde la API y permite buscar por nombre o recorrido.
// Cada resultado se pinta usando el componente LineaCard.
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import SearchBar from "../components/SearchBar"
import LineaCard from "../components/LineaCard"
import PageHeader from "../components/PageHeader"
import { getLineas } from "../services/melibusApi"

function Lineas() {
  const [lineas, setLineas] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getLineas()
      .then(setLineas)
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false))
  }, [])

  const lineasFiltradas = lineas.filter((linea) => {
    const textoBusqueda = busqueda.toLowerCase()

    return (
      linea.nombre.toLowerCase().includes(textoBusqueda) ||
      linea.recorrido.toLowerCase().includes(textoBusqueda)
    )
  })

  return (
    <Layout>
      <div className="simple-page">
        <PageHeader
          tag="Líneas"
          titulo="Líneas de autobús"
          descripcion="Consulta las líneas disponibles del autobús urbano y accede al detalle de su recorrido."
        />

        <SearchBar
          id="buscar-linea"
          label="Buscar línea"
          placeholder="Ejemplo: Línea 1, Frontera, Centro..."
          value={busqueda}
          onChange={setBusqueda}
        />

        {cargando ? (
          <p className="empty-message">Cargando líneas...</p>
        ) : error ? (
          <p className="empty-message">{error}</p>
        ) : lineasFiltradas.length > 0 ? (
          <div className="lineas-grid">
            {lineasFiltradas.map((linea) => (
              <LineaCard key={linea.id} linea={linea} />
            ))}
          </div>
        ) : (
          <p className="empty-message">
            No se han encontrado líneas con esa búsqueda.
          </p>
        )}
      </div>
    </Layout>
  )
}

export default Lineas
