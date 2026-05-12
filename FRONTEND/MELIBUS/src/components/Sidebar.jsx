import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("SidebarCollapsed")
    return saved ? JSON.parse(saved) : true
  })

  useEffect(() => {
    localStorage.setItem("SidebarCollapsed", JSON.stringify(isCollapsed))
  }, [isCollapsed])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {isCollapsed && (
        <button
          className="sidebar-floating-btn"
          onClick={toggleCollapse}
          title="Abrir accesos rápidos"
        >
          ☰
        </button>
      )}

      <aside className={`Sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <button
          className="Sidebar-collapse-btn"
          onClick={toggleCollapse}
          title="Cerrar accesos rápidos"
        >
          ‹
        </button>

        <h3>ACCESOS RÁPIDOS</h3>

        <NavLink to="/lineas">Líneas de autobús</NavLink>
        <NavLink to="/paradas">Paradas</NavLink>
        <NavLink to="/mapa">Mapa de paradas</NavLink>
        <NavLink to="/horarios">Horarios</NavLink>
        <NavLink to="/avisos">Avisos / Incidencias</NavLink>
        <NavLink to="/recargas">Puntos de recarga</NavLink>
      </aside>
    </>
  )
}

export default Sidebar