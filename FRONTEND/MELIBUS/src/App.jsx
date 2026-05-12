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

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <div className="app-content">
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
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App