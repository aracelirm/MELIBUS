import Layout from "../components/Layout"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import paradas from "../data/paradas"
import PageHeader from "../components/PageHeader"

function Mapa() {
  const centroMelilla = [35.2923, -2.9381]

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

        {paradasConCoordenadas.length === 0 && (
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