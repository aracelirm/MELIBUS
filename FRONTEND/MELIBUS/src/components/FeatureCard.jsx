import { Link } from "react-router-dom"

function FeatureCard({ titulo, texto, boton, ruta }) {
  return (
    <article className="feature-card">
      <h3>{titulo}</h3>
      <p>{texto}</p>

      <Link to={ruta} className="feature-button">
        {boton}
      </Link>
    </article>
  )
}

export default FeatureCard