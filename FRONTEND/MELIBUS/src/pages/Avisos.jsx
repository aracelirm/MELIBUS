import Layout from "../components/Layout"
import avisos from "../data/avisos"

function Avisos() {
  const avisosActivos = avisos.filter((aviso) => aviso.activo)

  return (
    <Layout>
      <div className="simple-page">
        <h2>Avisos e incidencias</h2>

        <p>
          Consulta posibles cambios, avisos o incidencias relacionados con el servicio
          de autobús urbano.
        </p>

        <div className="info-grid">
          {avisosActivos.map((aviso) => (
            <div key={aviso.id} className="info-card aviso-card">
              <h3>{aviso.titulo}</h3>
              <p>{aviso.descripcion}</p>
              <p>
                <strong>Fecha:</strong> {aviso.fecha}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Avisos