function FeatureCard({ titulo, texto, boton }) {
  return (
    <article className="feature-card">
      <h3>{titulo}</h3>
      <p>{texto}</p>
      <button>{boton}</button>
    </article>
  )
}

export default FeatureCard