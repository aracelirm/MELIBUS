import Sidebar from "../components/Sidebar"
import Hero from "../components/Hero"
import FeatureCard from "../components/FeatureCard"

function Home() {
  return (
    <div className="page-layout home-background">
      <Sidebar />

      <main className="main-content">
        <div className="home-inner">
        <Hero />

        <section className="features-section">
          <h2>FUNCIONES PRINCIPALES</h2>

          <div className="features-grid">
            <FeatureCard
              titulo="Líneas de autobús"
              texto="Consulta las líneas disponibles y su recorrido."
              boton="Ver líneas"
            />
            <FeatureCard
              titulo="Paradas"
              texto="Busca paradas de autobús y consulta las líneas que pasan por ellas."
              boton="Ver paradas"
            />
            <FeatureCard
              titulo="Mapa de paradas"
              texto="Visualiza las paradas sobre el mapa interactivo de Melilla."
              boton="Ver mapa"
            />
            <FeatureCard
              titulo="Horarios"
              texto="Consulta el tiempo estimado para el próximo autobús."
              boton="Ver horarios"
            />
            <FeatureCard
              titulo="Avisos e incidencias"
              texto="Consulta cambios en el servicio o incidencias del transporte."
              boton="Ver avisos"
            />
            <FeatureCard
              titulo="Puntos de recarga"
              texto="Localiza estancos donde recargar el bonobús."
              boton="Ver puntos"
            />
          </div>
        </section>
        </div>
      </main>
    </div>
  )
}

export default Home