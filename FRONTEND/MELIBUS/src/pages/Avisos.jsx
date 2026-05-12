import Layout from "../components/Layout"
import avisos from "../data/avisos"
import AvisoCard from "../components/AvisoCard"
import PageHeader from "../components/PageHeader"

function Avisos() {
  const avisosActivos = avisos.filter((aviso) => aviso.activo)

  return (
    <Layout>
      <div className="simple-page">
        <PageHeader
          tag="Avisos"
          titulo="Avisos e incidencias"
          descripcion="Consulta posibles cambios, avisos o incidencias relacionados con el servicio de autobús urbano."
        />

        {avisosActivos.length > 0 ? (
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