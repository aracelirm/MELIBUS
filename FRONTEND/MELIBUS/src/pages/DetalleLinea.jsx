import { useParams, Link } from "react-router-dom"
import Layout from "../components/Layout"
import lineas from "../data/lineas"

function DetalleLinea() {
  const { id } = useParams()

  const linea = lineas.find(
    (item) => item.id === Number(id)
  )

  if (!linea) {
    return (
      <Layout>
        <div className="simple-page">
          <h2>Línea no encontrada</h2>

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
        <h2>{linea.nombre}</h2>

        <p>{linea.recorrido}</p>

        <h3>Información de la línea</h3>

        <p>
          Aquí se mostrará el recorrido completo, las paradas asociadas y los horarios
          de paso de esta línea.
        </p>

        <Link to="/lineas" className="card-button">
          Volver a líneas
        </Link>
      </div>
    </Layout>
  )
}

export default DetalleLinea