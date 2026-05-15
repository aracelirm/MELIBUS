// Tarjeta para mostrar una línea de autobús dentro del listado.
// Tiene el nombre, recorrido y el botón para entrar al detalle.
import { Link } from "react-router-dom"

function LineaCard({ linea }) {
  return (
    <div className="linea-card">
      <h3>{linea.nombre}</h3>

      <p>{linea.recorrido}</p>

      <Link to={`/linea/${linea.id}`} className="card-button">
        Ver detalle
      </Link>
    </div>
  )
}

export default LineaCard
