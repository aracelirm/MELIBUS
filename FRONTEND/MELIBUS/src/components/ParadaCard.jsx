import { Link } from "react-router-dom"

function ParadaCard({ parada, favorita = false, onToggleFavorita }) {
  return (
    <div className="info-card parada-card">
      <button
        type="button"
        className={`favorite-button ${favorita ? "active" : ""}`}
        onClick={() => onToggleFavorita?.(parada)}
        title={favorita ? "Quitar de favoritas" : "Añadir a favoritas"}
        aria-label={favorita ? "Quitar parada de favoritas" : "Añadir parada a favoritas"}
      >
        {favorita ? "★" : "☆"}
      </button>

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
