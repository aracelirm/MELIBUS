// Página general de horarios. Muestra los horarios agrupados por línea, parada y día.
// También calcula cuál sería el próximo autobús según la hora actual.
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import PageHeader from "../components/PageHeader"
import { getHorarios, getLineas, getParadas } from "../services/melibusApi"

function obtenerProximoAutobus(horas) {
  // Misma lógica que en DetalleParada, busca la próxima hora disponible.
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
  const [horarios, setHorarios] = useState([])
  const [lineas, setLineas] = useState([])
  const [paradas, setParadas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Horarios trae ids, por eso también cargo líneas y paradas para mostrar sus nombres.
    Promise.all([getHorarios(), getLineas(), getParadas()])
      .then(([horariosData, lineasData, paradasData]) => {
        setHorarios(horariosData)
        setLineas(lineasData)
        setParadas(paradasData)
      })
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false))
  }, [])

  return (
    <Layout>
      <div className="simple-page">
        <PageHeader
          tag="Horarios"
          titulo="Horarios"
          descripcion="Consulta los horarios teóricos de paso del autobús según la línea y la parada seleccionada."
        />
        {cargando ? (
          <p className="empty-message">Cargando horarios...</p>
        ) : error ? (
          <p className="empty-message">{error}</p>
        ) : (
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
        )}
      </div>
    </Layout>
  )
}

export default Horarios
