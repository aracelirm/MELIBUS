// Pie de página de la web. Se muestra al final de todas las pantallas.
// Contiene texto básico y enlaces informativos.
import { useState } from "react"

function Footer() {
  const [modalActivo, setModalActivo] = useState(null)

  const cerrarModal = () => {
    setModalActivo(null)
  }

  return (
    <>
      <footer className="footer">
        <div className="footer-left">
          Sistema MELIBUS - Información del transporte urbano de Melilla
        </div>

        <div className="footer-right">
          <button onClick={() => setModalActivo("contacto")}>
            Contacto
          </button>

          <button onClick={() => setModalActivo("ayuda")}>
            Ayuda
          </button>

          <button onClick={() => setModalActivo("accesibilidad")}>
            Accesibilidad
          </button>
        </div>
      </footer>

      {modalActivo && (
        <div className="footer-modal-overlay" onClick={cerrarModal}>
          <div
            className="footer-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="footer-modal-close" onClick={cerrarModal}>
              ×
            </button>

            {modalActivo === "contacto" && (
              <>
                <h2>Contacto</h2>
                <p>
                  MeliBus es un proyecto educativo desarrollado para facilitar la
                  consulta de información del transporte urbano de Melilla.
                </p>
                <p>
                  En esta fase, la aplicación no es un servicio oficial de la COA.
                  Para información oficial, el usuario deberá consultar los canales
                  oficiales correspondientes.
                </p>
              </>
            )}

            {modalActivo === "ayuda" && (
              <>
                <h2>Ayuda</h2>
                <p>
                  Desde MeliBus puedes consultar las líneas disponibles, ver las
                  paradas asociadas a cada línea, buscar paradas concretas,
                  consultar horarios aproximados y acceder al mapa interactivo.
                </p>
                <p>
                  Usa el menú superior o el panel de accesos rápidos para moverte
                  entre las distintas secciones de la aplicación.
                </p>
              </>
            )}

            {modalActivo === "accesibilidad" && (
              <>
                <h2>Accesibilidad</h2>
                <p>
                  La interfaz de MeliBus se ha diseñado intentando mantener textos
                  claros, buen contraste de color, navegación sencilla y campos de
                  búsqueda con etiquetas visibles.
                </p>
                <p>
                  El objetivo es que la aplicación pueda utilizarse cómodamente
                  desde móvil, tablet u ordenador.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Footer
