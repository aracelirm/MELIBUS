// Página de detalle de una parada. Muestra sus líneas y los horarios cargados.
// Usa el id de la URL para traer la parada concreta desde la API.
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Layout from "../components/Layout"
import PageHeader from "../components/PageHeader"
import { getHorariosParada, getLineas, getParada } from "../services/melibusApi"

function obtenerProximoAutobus(horas) {
  // Compara la hora actual con las horas de la parada y devuelve la siguiente.
  const ahora = new Date()
  const horaActual = ahora.getHours() * 60 + ahora.getMinutes()

  const proximaHora = horas.find((hora) => {
    const [h, m] = hora.split(":").map(Number)
    const minutosHorario = h * 60 + m

    return minutosHorario >= horaActual
  })

  return proximaHora || "Fin de servicio"
}

function DetalleParada() {
  const { id } = useParams()
  const [parada, setParada] = useState(null)
  const [lineas, setLineas] = useState([])
  const [horariosDeParada, setHorariosDeParada] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // La pantalla cuenta con la parada, las líneas y los horarios de esa parada.
    Promise.all([getParada(id), getLineas(), getHorariosParada(id)])
      .then(([paradaData, lineasData, horariosData]) => {
        setParada(paradaData)
        setLineas(lineasData)
        setHorariosDeParada(horariosData)
      })
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false))
  }, [id])

  if (cargando) {
    return (
      <Layout>
        <div className="simple-page">
          <p className="empty-message">Cargando parada...</p>
        </div>
      </Layout>
    )
  }

  if (error || !parada) {
    return (
      <Layout>
        <div className="simple-page">
          <h2>{error || "Parada no encontrada"}</h2>

          <Link to="/paradas" className="card-button">
            Volver a paradas
          </Link>
        </div>
      </Layout>
    )
  }

  const lineasDeParada = lineas.filter((linea) =>
    // Estas líneas vienen de la relación lineas_paradas de la base de datos.
    parada.lineas.includes(linea.id)
  )

  return (
    <Layout>
      <div className="simple-page">
        <PageHeader
          tag="Detalle de parada"
          titulo={parada.nombre}
          descripcion={`Dirección: ${parada.direccion}`}
        />
        <h3>Líneas que pasan por esta parada</h3>

        {lineasDeParada.length > 0 ? (
          <div className="info-grid">
            {lineasDeParada.map((linea) => (
              <div key={linea.id} className="info-card">
                <h3>{linea.nombre}</h3>

                <p>{linea.recorrido}</p>

                <Link to={`/linea/${linea.id}`} className="card-button">
                  Ver línea
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Todavía no hay líneas asociadas a esta parada.</p>
        )}

        <h3>Horarios de esta parada</h3>

        {horariosDeParada.length > 0 ? (
          <div className="info-grid">
            {horariosDeParada.map((horario) => {
              // Cada card de horario representa una línea + tipo de día.
              const linea = lineas.find((item) => item.id === horario.idLinea)
              const proximoAutobus = obtenerProximoAutobus(horario.horas)

              return (
                <div key={horario.id} className="info-card horario-card">
                  <h3>{linea ? linea.nombre : "Línea no encontrada"}</h3>

                  <p>
                    <strong>Tipo de día:</strong> {horario.tipoDia}
                  </p>

                  <p>
                    <strong>Próximo autobús:</strong>
                  </p>

                  <span className="horario-time">{proximoAutobus}</span>

                  <p>
                    <strong>Horarios:</strong> {horario.horas.join(", ")}
                  </p>
                </div>
              )
            })}
          </div>
        ) : (
          <p>
            Todavía no hay horarios cargados para esta parada.
          </p>
        )}

        <Link to="/paradas" className="card-button">
          Volver a paradas
        </Link>
      </div>
    </Layout>
  )
}

export default DetalleParada
