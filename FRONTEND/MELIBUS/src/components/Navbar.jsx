import { Link, NavLink } from "react-router-dom"

function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="logo-box"></div>
        <span className="logo-text">MELIBUS</span>
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

        <Link to="#" className="nav-link">Avisos</Link>
        <Link to="#" className="nav-link">Perfil</Link>
      </nav>
    </header>
  )
}

export default Navbar