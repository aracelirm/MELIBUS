import Layout from "../components/Layout"
import { Link } from "react-router-dom"
import paradas from "../data/paradas"

function Paradas() {
  return (
    <Layout>
      <div className="simple-page">
        <h2>Paradas</h2>

        <p>
          Consulta las principales paradas del autobús urbano de Melilla y las líneas
          que pasan por cada una de ellas.
        </p>

        <div className="info-grid">
          {paradas.map((parada) => (
            <div key={parada.id} className="info-card">
              <h3>{parada.nombre}</h3>
              <p>{parada.direccion}</p>

              <p>
                Líneas: {parada.lineas.map((linea) => `Línea ${linea}`).join(", ")}
              </p>

              <Link to={`/parada/${parada.id}`} className="card-button">
                Ver detalle de parada
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Paradas