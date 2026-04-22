const lineas = [
  { id: 1, nombre: 'Línea 1', recorrido: 'Lope de Vega - Frontera Beni Enzar' },
  { id: 2, nombre: 'Línea 2', recorrido: 'Lope de Vega - Centro Comercial' },
  { id: 3, nombre: 'Línea 3', recorrido: 'Barrio Victoria - Real' },
  { id: 4, nombre: 'Línea 4', recorrido: 'Monte María Cristina - Melilla la Vieja' },
]

function Lineas() {
  return (
    <div className="simple-page">
      <h2>Líneas de autobús</h2>
      <div className="lineas-grid">
        {lineas.map((linea) => (
          <div key={linea.id} className="linea-card">
            <h3>{linea.nombre}</h3>
            <p>{linea.recorrido}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lineas