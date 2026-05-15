import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Layout from "../components/Layout"
import PageHeader from "../components/PageHeader"
import { getLinea, getParadasLinea } from "../services/melibusApi"

function DetalleLinea() {
  const { id } = useParams()
  const [linea, setLinea] = useState(null)
  const [paradasDeLinea, setParadasDeLinea] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    Promise.all([getLinea(id), getParadasLinea(id)])
      .then(([lineaData, paradasData]) => {
        setLinea(lineaData)
        setParadasDeLinea(paradasData)
      })
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false))
  }, [id])

  if (cargando) {
    return (
      <Layout>
        <div className="simple-page">
          <p className="empty-message">Cargando línea...</p>
        </div>
      </Layout>
    )
  }

  if (error || !linea) {
    return (
      <Layout>
        <div className="simple-page">
          <h2>{error || "Línea no encontrada"}</h2>

          <Link to="/lineas" className="card-button">
            Volver a líneas
          </Link>
        </div>
      </Layout>
    )
  }

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
