// Tarjeta para mostrar un punto de recarga del bonobús.
// Pinta nombre, dirección y horario del punto.
function RecargaCard({ punto }) {
  return (
    <div className="info-card recarga-card">
      <h3>{punto.nombre}</h3>

      <p>
        <strong>Dirección:</strong> {punto.direccion}
      </p>

      <p>
        <strong>Horario:</strong> {punto.horario}
      </p>
    </div>
  )
}

export default RecargaCard
