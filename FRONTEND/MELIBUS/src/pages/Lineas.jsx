import { useState } from "react"
import Layout from "../components/Layout"
import { Link } from "react-router-dom"
import lineas from "../data/lineas"

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
        <h2>Líneas de autobús</h2>

        <p>
          Consulta las líneas disponibles del autobús urbano y accede al detalle de su
          recorrido.
        </p>

        <div className="search-box">
          <label htmlFor="buscar-linea">Buscar linea</label>

          <input
            id="buscar-linea"
            type="text"
            placeholder="Ejemplo: Línea 1, Frontera, Centro..."
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
          />
        </div>

        {lineasFiltradas.length > 0 ? (
          <div className="lineas-grid">
            {lineasFiltradas.map((linea) => (
              <div key={linea.id} className="linea-card">
                <h3>{linea.nombre}</h3>
                <p>{linea.recorrido}</p>

                <Link to={`/linea/${linea.id}`} className="card-button">
                  Ver detalle
                </Link>
              </div>
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