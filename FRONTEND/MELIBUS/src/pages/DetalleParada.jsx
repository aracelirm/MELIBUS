import { useParams, Link } from "react-router-dom"
import Layout from "../components/Layout"
import paradas from "../data/paradas"
import lineas from "../data/lineas"
import horarios from "../data/horarios"

function obtenerProximoAutobus(horas) {
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

  const lineasDeParada = lineas.filter((linea) =>
    parada.lineas.includes(linea.id)
  )

  const horariosDeParada = horarios.filter((horario) =>
    horario.idParada === parada.id
  )

  return (
    <Layout>
      <div className="simple-page">
        <h2>{parada.nombre}</h2>

        <p>
          <strong>Dirección:</strong> {parada.direccion}
        </p>

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