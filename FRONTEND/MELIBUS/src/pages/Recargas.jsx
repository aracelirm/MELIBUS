import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import RecargaCard from "../components/RecargaCard"
import PageHeader from "../components/PageHeader"
import { getRecargas } from "../services/melibusApi"

function Recargas() {
  const [recargas, setRecargas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getRecargas()
      .then(setRecargas)
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false))
  }, [])

  return (
    <Layout>
      <div className="simple-page">
        <PageHeader
          tag="Bonobús"
          titulo="Puntos de recarga"
          descripcion="Consulta los puntos donde se podrá recargar el bonobús. Esta información se completará con los datos reales durante la integración final del proyecto."
        />
        {cargando ? (
          <p className="empty-message">Cargando puntos de recarga...</p>
        ) : error ? (
          <p className="empty-message">{error}</p>
        ) : (
          <div className="info-grid">
            {recargas.map((punto) => (
              <RecargaCard key={punto.id} punto={punto} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Recargas
