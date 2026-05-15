// Componente principal de la app. Aquí están las rutas y la estructura general.
// Sirve para decidir qué página se muestra según la URL.
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Lineas from "./pages/Lineas"
import Mapa from "./pages/Mapa"
import Avisos from "./pages/Avisos"
import Paradas from "./pages/Paradas"
import Horarios from "./pages/Horarios"
import Recargas from "./pages/Recargas"
import DetalleLinea from "./pages/DetalleLinea"
import DetalleParada from "./pages/DetalleParada"
import Perfil from "./pages/Perfil"
import AdminPanel from "./pages/AdminPanel"

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <div className="app-content">
        {/* Rutas principales de la web. Si quiero añadir una página nueva, la registro aquí. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lineas" element={<Lineas />} />
          <Route path="/linea/:id" element={<DetalleLinea />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/avisos" element={<Avisos />} />
          <Route path="/paradas" element={<Paradas />} />
          <Route path="/horarios" element={<Horarios />} />
          <Route path="/recargas" element={<Recargas />} />
          <Route path="/parada/:id" element={<DetalleParada />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
