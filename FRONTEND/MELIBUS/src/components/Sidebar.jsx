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

  useEffect(() => {
    const toggleSidebar = () => {
      setIsCollapsed((prev) => !prev)
    }

    window.addEventListener("toggle-sidebar", toggleSidebar)

    return () => {
      window.removeEventListener("toggle-sidebar", toggleSidebar)
    }
  }, [])

  const closeSidebar = () => {
    setIsCollapsed(true)
  }

  return (
    <aside className={`Sidebar ${isCollapsed ? "collapsed" : ""}`}>

      <h3>ACCESOS RÁPIDOS</h3>

      <NavLink to="/lineas" onClick={closeSidebar}>Líneas de autobús</NavLink>
      <NavLink to="/paradas" onClick={closeSidebar}>Paradas</NavLink>
      <NavLink to="/mapa" onClick={closeSidebar}>Mapa de paradas</NavLink>
      <NavLink to="/horarios" onClick={closeSidebar}>Horarios</NavLink>
      <NavLink to="/avisos" onClick={closeSidebar}>Avisos / Incidencias</NavLink>
      <NavLink to="/recargas" onClick={closeSidebar}>Puntos de recarga</NavLink>
    </aside>
  )
}

export default Sidebar