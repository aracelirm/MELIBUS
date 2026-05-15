import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

import PageHeader from "../components/PageHeader"
import { getParadas } from "../services/melibusApi"

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function Mapa() {
  const [paradas, setParadas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const centroMelilla = [35.2923, -2.9381]

  useEffect(() => {
    getParadas()
      .then(setParadas)
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false))
  }, [])

  const paradasConCoordenadas = paradas.filter(
    (parada) => parada.latitud !== null && parada.longitud !== null
  )

  return (
    <Layout>
      <div className="simple-page">
        <PageHeader
          tag="Mapa"
          titulo="Mapa de paradas"
          descripcion="En el mapa de Melilla podrás encontrar todas las paradas."
        />

        {cargando ? (
          <p className="empty-message">Cargando mapa...</p>
        ) : error ? (
          <p className="empty-message">{error}</p>
        ) : (
          <div className="map-container">
            <MapContainer
              center={centroMelilla}
              zoom={14}
              scrollWheelZoom={true}
              className="leaflet-map"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {paradasConCoordenadas.map((parada) => (
                <Marker
                  key={parada.id}
                  position={[parada.latitud, parada.longitud]}
                >
                  <Popup>
                    <strong>{parada.nombre}</strong>
                    <br />
                    {parada.direccion}
                    <br />
                    Líneas: {parada.lineas.map((linea) => `Línea ${linea}`).join(", ")}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {!cargando && !error && paradasConCoordenadas.length === 0 && (
          <p className="map-warning">
            Todavía no hay coordenadas reales cargadas para mostrar marcadores de
            paradas.
          </p>
        )}
      </div>
    </Layout>
  )
}

export default Mapa