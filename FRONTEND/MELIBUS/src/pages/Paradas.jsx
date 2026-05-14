import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import SearchBar from "../components/SearchBar"
import ParadaCard from "../components/ParadaCard"
import PageHeader from "../components/PageHeader"
import { getParadas } from "../services/melibusApi"

function Paradas() {
  const [paradas, setParadas] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getParadas()
      .then(setParadas)
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false))
  }, [])

  const paradasFiltradas = paradas.filter((parada) => {
    const textoBusqueda = busqueda.toLowerCase()

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

        {cargando ? (
          <p className="empty-message">Cargando paradas...</p>
        ) : error ? (
          <p className="empty-message">{error}</p>
        ) : paradasFiltradas.length > 0 ? (
          <div className="info-grid">
            {paradasFiltradas.map((parada) => (
              <ParadaCard key={parada.id} parada={parada} />
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
