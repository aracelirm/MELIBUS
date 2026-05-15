// Cabecera reutilizable para las páginas. Muestra etiqueta, título y descripción.
// La uso para que todas las pantallas tengan una presentación parecida.
function PageHeader({ tag, titulo, descripcion }) {
  return (
    <section className="page-header">
      <span className="page-header-tag">{tag}</span>

      <h1>{titulo}</h1>

      <p>{descripcion}</p>
    </section>
  )
}

export default PageHeader
