// Tarjeta simple para mostrar un aviso o incidencia.
// Recibe un aviso y pinta su título, descripción y fecha.
function AvisoCard({ aviso }) {
  return (
    <div className="info-card aviso-card">
      <h3>{aviso.titulo}</h3>

      <p>{aviso.descripcion}</p>

      <p>
        <strong>Fecha:</strong> {aviso.fecha}
      </p>
    </div>
  )
}

export default AvisoCard
