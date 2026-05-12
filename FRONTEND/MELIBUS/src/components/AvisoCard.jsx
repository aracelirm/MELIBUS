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