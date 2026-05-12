import { useParams, Link } from "react-router-dom"
import Layout from "../components/Layout"
import paradas from "../data/paradas"

function DetalleParada() {
  const { id } = useParams()

  const parada = paradas.find(
    (item) => item.id === Number(id)
  )

  if (!parada) {
    return (
      <Layout>
        <div className="simple-page">
          <h2>Parada no encontrada</h2>

          <Link to="/paradas" className="card-button">
            Volver a paradas
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="simple-page">
        <h2>{parada.nombre}</h2>

        <p>{parada.direccion}</p>

        <h3>Líneas que pasan por esta parada</h3>

        <div className="info-grid">
          {parada.lineas.map((linea) => (
            <div key={linea} className="info-card">
              <h3>Línea {linea}</h3>
              <p>Esta línea tiene parada en {parada.nombre}.</p>
            </div>
          ))}
        </div>

        <h3>Horarios</h3>
        <p>
          En esta sección se mostrarán los horarios de paso y el próximo autobús
          estimado según los datos almacenados.
        </p>

        <Link to="/paradas" className="card-button">
          Volver a paradas
        </Link>
      </div>
    </Layout>
  )
}

export default DetalleParada