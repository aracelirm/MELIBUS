import { useState } from "react"
import Layout from "../components/Layout"
import { Link } from "react-router-dom"
import paradas from "../data/paradas"

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
        <h2>Paradas</h2>

        <p>
          Consulta las principales paradas del autobús urbano de Melilla y las líneas
          que pasan por cada una de ellas.
        </p>

        <div className="search-box">
          <label htmlFor="buscar-parada">Buscar parada</label>

          <input
            id="buscar-parada"
            type="text"
            placeholder="Ejemplo: Plaza España, Barrio Real..."
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
          />
        </div>

        {paradasFiltradas.length > 0 ? (
          <div className="info-grid">
            {paradasFiltradas.map((parada) => (
              <div key={parada.id} className="info-card">
                <h3>{parada.nombre}</h3>

                <p>
                  <strong>Dirección:</strong> {parada.direccion}
                </p>

                <p>
                  <strong>Líneas:</strong>{" "}
                  {parada.lineas.map((linea) => `Línea ${linea}`).join(", ")}
                </p>

                <Link to={`/parada/${parada.id}`} className="card-button">
                  Ver detalle
                </Link>
              </div>
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