import Layout from "../components/Layout"
import recargas from "../data/recargas"

function Recargas() {
  return (
    <Layout>
      <div className="simple-page">
        <h2>Puntos de recarga</h2>

        <p>
          Consulta los puntos donde se podrá recargar el bonobús. Esta información se
          completará con los datos reales durante la integración final del proyecto.
        </p>

        <div className="info-grid">
          {recargas.map((punto) => (
            <div key={punto.id} className="info-card recarga-card">
              <h3>{punto.nombre}</h3>

              <p>
                <strong>Dirección:</strong> {punto.direccion}
              </p>

              <p>
                <strong>Horario:</strong> {punto.horario}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Recargas