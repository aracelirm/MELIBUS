import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="logo-box"></div>
        <span className="logo-text">MELIBUS</span>
      </div>

      <nav className="topbar-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/lineas"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Líneas
        </NavLink>

        <NavLink
          to="/mapa"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Mapa
        </NavLink>

        <NavLink
          to="/avisos"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Avisos
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar