import { Link, NavLink } from "react-router-dom"
import logo from "../img/LOGO.png"

function Navbar() {
  const toggleSidebar = () => {
    window.dispatchEvent(new Event("toggle-sidebar"))
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="navbar-sidebar-btn"
          onClick={toggleSidebar}
          title="Abrir accesos rápidos"
        >
          ☰
        </button>

      <Link to="/" className="brand-link">
        <img src={logo} alt="Logo MELIBUS" className="navbar-logo" />
      </Link>
      </div>

      <nav className="topbar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Inicio
        </NavLink>

        <NavLink to="/lineas" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Líneas
        </NavLink>

        <NavLink to="/mapa" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Mapa
        </NavLink>

        <NavLink to="/avisos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Avisos
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar