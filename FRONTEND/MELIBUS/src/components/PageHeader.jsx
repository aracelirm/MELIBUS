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