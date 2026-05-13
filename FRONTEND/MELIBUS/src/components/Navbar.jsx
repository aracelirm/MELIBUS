import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import logo from "../img/LOGO.png"
import AuthModal from "./AuthModal"

function Navbar() {
  const [usuario, setUsuario] = useState(null)
  const [mostrarAuth, setMostrarAuth] = useState(false)

  const toggleSidebar = () => {
    window.dispatchEvent(new Event("toggle-sidebar"))
  }
  
  useEffect(() => {
  const cargarUsuario = () => {
    const usuarioGuardado = localStorage.getItem("melibusUser");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      setUsuario(null);
    }
  };

  cargarUsuario(); 

  window.addEventListener("auth-change", cargarUsuario);
  return () => {
    window.removeEventListener("auth-change", cargarUsuario);
  };
}, []);

  return (
    <>
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

          {usuario ? (
            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Perfil
            </NavLink>
          ) : (
            <button
              type="button"
              className="nav-link nav-button"
              onClick={() => setMostrarAuth(true)}
            >
              Acceder
            </button>
          )}
        </nav>
      </header>

      {mostrarAuth && (
        <AuthModal onClose={() => setMostrarAuth(false)} />
      )}
    </>
  )
}

export default Navbar