// Página de avisos e incidencias. Carga los avisos activos desde la API.
// Sirve para que cualquier usuario vea cambios o problemas del servicio.
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import AvisoCard from "../components/AvisoCard"
import PageHeader from "../components/PageHeader"
import { getAvisos } from "../services/melibusApi"

function Avisos() {
  const [avisos, setAvisos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getAvisos()
      .then(setAvisos)
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false))
  }, [])

  const avisosActivos = avisos.filter((aviso) => aviso.activo)

  return (
    <Layout>
      <div className="simple-page">
        <PageHeader
          tag="Avisos"
          titulo="Avisos e incidencias"
          descripcion="Consulta posibles cambios, avisos o incidencias relacionados con el servicio de autobús urbano."
        />

        {cargando ? (
          <p className="empty-message">Cargando avisos...</p>
        ) : error ? (
          <p className="empty-message">{error}</p>
        ) : avisosActivos.length > 0 ? (
          <div className="info-grid">
            {avisosActivos.map((aviso) => (
              <AvisoCard key={aviso.id} aviso={aviso} />
            ))}
          </div>
        ) : (
          <p className="empty-message">
            No hay avisos ni incidencias activas actualmente.
          </p>
        )}
      </div>
    </Layout>
  )
}

export default Avisos
