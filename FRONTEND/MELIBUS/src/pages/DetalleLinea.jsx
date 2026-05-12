import { useParams, Link } from "react-router-dom"
import Layout from "../components/Layout"
import lineas from "../data/lineas"
import paradas from "../data/paradas"
import PageHeader from "../components/PageHeader"

function DetalleLinea() {
  const { id } = useParams()

  const linea = lineas.find(
    (item) => item.id === Number(id)
  )

  if (!linea) {
    return (
      <Layout>
        <div className="simple-page">
          <h2>Línea no encontrada</h2>

          <Link to="/lineas" className="card-button">
            Volver a líneas
          </Link>
        </div>
      </Layout>
    )
  }

  const paradasDeLinea = paradas.filter((parada) =>
    parada.lineas.includes(linea.id)
  )

  return (
    <Layout>
      <div className="simple-page">
        <PageHeader
          tag="Detalle de línea"
          titulo={linea.nombre}
          descripcion={`Recorrido: ${linea.recorrido}`}
        />

        <h3>Paradas de esta línea</h3>

        {paradasDeLinea.length > 0 ? (
          <div className="info-grid">
            {paradasDeLinea.map((parada) => (
              <div key={parada.id} className="info-card">
                <h3>{parada.nombre}</h3>

                <p>{parada.direccion}</p>

                <Link to={`/parada/${parada.id}`} className="card-button">
                  Ver parada
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>
            Todavía no hay paradas asociadas a esta línea.
          </p>
        )}

        <h3>Horarios</h3>

        <p>
          Los horarios de esta línea se mostrarán según la parada seleccionada y los
          datos almacenados en el sistema.
        </p>

        <Link to="/lineas" className="card-button">
          Volver a líneas
        </Link>
      </div>
    </Layout>
  )
}

export default DetalleLinea