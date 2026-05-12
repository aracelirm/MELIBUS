import { useState } from "react"
import Layout from "../components/Layout"
import SearchBar from "../components/SearchBar"
import LineaCard from "../components/LineaCard"
import lineas from "../data/lineas"
import PageHeader from "../components/PageHeader"

function Lineas() {
  const [busqueda, setBusqueda] = useState("")

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

        {lineasFiltradas.length > 0 ? (
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