import { useState } from "react"
import Layout from "../components/Layout"
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import paradas from "../data/paradas"
import ParadaCard from "../components/ParadaCard"
import PageHeader from "../components/PageHeader"

function Paradas() {
  const [busqueda, setBusqueda] = useState("")

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

        {paradasFiltradas.length > 0 ? (
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