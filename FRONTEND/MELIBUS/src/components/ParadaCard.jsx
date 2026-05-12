import { Link } from "react-router-dom"

function ParadaCard({ parada }) {
  return (
    <div className="info-card">
      <h3>{parada.nombre}</h3>

      <p>
        <strong>Dirección:</strong> {parada.direccion}
      </p>

      <p>
        <strong>Líneas:</strong>{" "}
        {parada.lineas.map((linea) => `Línea ${linea}`).join(", ")}
      </p>

      <Link to={`/parada/${parada.id}`} className="card-button">
        Ver detalle
      </Link>
    </div>
  )
}

export default ParadaCard