// Bloque principal de la home. Es la primera zona visual que ve el usuario.
// Aquí se cambia el texto grande de bienvenida o presentación de MELIBUS.
function Hero() {
  return (
    <section className="hero">
      <p className="hero-tag">Transporte urbano de Melilla</p>
      <h1>Muévete por Melilla de forma más fácil con MELIBUS</h1>
      <p className="hero-description">
        Consulta líneas, paradas, horarios, incidencias y el mapa interactivo
        del autobús urbano desde una sola aplicación, de forma clara, rápida y sencilla.
      </p>
    </section>
  )
}

export default Hero
