import Layout from "../components/Layout"
import horarios from "../data/horarios"
import lineas from "../data/lineas"
import paradas from "../data/paradas"

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

function Horarios() {
  return (
    <Layout>
      <div className="simple-page">
        <h2>Horarios</h2>

        <p>
          Consulta los horarios teóricos de paso del autobús según la línea y la parada
          seleccionada.
        </p>

        <div className="info-grid">
          {horarios.map((horario) => {
            const linea = lineas.find((item) => item.id === horario.idLinea)
            const parada = paradas.find((item) => item.id === horario.idParada)
            const proximoAutobus = obtenerProximoAutobus(horario.horas)

            return (
              <div key={horario.id} className="info-card horario-card">
                <h3>{linea ? linea.nombre : "Línea no encontrada"}</h3>

                <p>
                  <strong>Parada:</strong>{" "}
                  {parada ? parada.nombre : "Parada no encontrada"}
                </p>

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
      </div>
    </Layout>
  )
}

export default Horarios