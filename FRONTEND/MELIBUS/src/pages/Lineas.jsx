import Layout from "../components/Layout"
import { Link } from "react-router-dom"
import lineas from "../data/lineas.js"

function Lineas() {
  return (
    <Layout>
      <div className="simple-page">
        <h2>Líneas de autobús</h2>

        <div className="lineas-grid">
          {lineas.map((linea) => (
            <div key={linea.id} className="linea-card">
              <h3>{linea.nombre}</h3>
              <p>{linea.recorrido}</p>

              <Link to={`/linea/${linea.id}`} className="card-button">
                Ver detalle
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Lineas