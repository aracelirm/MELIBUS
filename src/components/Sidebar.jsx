// Menú lateral de accesos rápidos. Se puede plegar y recuerda su estado en localStorage.
// Aquí se cambian los accesos laterales que aparecen junto al contenido.
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

function Sidebar() {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("melibusUser")
    return guardado ? JSON.parse(guardado) : null
  })
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

    const cargarUsuario = () => {
      const guardado = localStorage.getItem("melibusUser")
      setUsuario(guardado ? JSON.parse(guardado) : null)
    }

    window.addEventListener("toggle-sidebar", toggleSidebar)
    window.addEventListener("auth-change", cargarUsuario)

    return () => {
      window.removeEventListener("toggle-sidebar", toggleSidebar)
      window.removeEventListener("auth-change", cargarUsuario)
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
      {usuario?.rol === "admin" && (
        <NavLink to="/admin" onClick={closeSidebar}>Panel administrador</NavLink>
      )}
    </aside>
  )
}

export default Sidebar
