import Layout from "../components/Layout"
import recargas from "../data/recargas"
import RecargaCard from "../components/RecargaCard"
import PageHeader from "../components/PageHeader"

function Recargas() {
  return (
    <Layout>
      <div className="simple-page">
        <PageHeader
          tag="Bonobús"
          titulo="Puntos de recarga"
          descripcion="Consulta los puntos donde se podrá recargar el bonobús. Esta información se completará con los datos reales durante la integración final del proyecto."
        />
        <div className="info-grid">
          {recargas.map((punto) => (
            <RecargaCard key={punto.id} punto={punto} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Recargas