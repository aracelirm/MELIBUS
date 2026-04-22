import { useState, useEffect } from "react"

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("SidebarCollapsed")
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem("SidebarCollapsed", JSON.stringify(isCollapsed))
  }, [isCollapsed])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    setIsOpen(false)
  }

  return (
    <>
      {!isCollapsed && (
        <button className="Sidebar-toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      {isOpen && (
        <div 
          className="Sidebar-overlay"
          onClick={closeSidebar}
          style={{
            position: "fixed",
            top: 72,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 997,
          }}
        ></div>
      )}

      <aside className={`Sidebar ${isOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}>
        <button 
          className="Sidebar-collapse-btn"
          onClick={toggleCollapse}
          title={isCollapsed ? "Expandir" : "Colapsar"}
        >
          {isCollapsed ? "›" : "‹"}
        </button>

        <h3>ACCESOS RÁPIDOS</h3>

        <button onClick={closeSidebar}>Líneas de autobús</button>
        <button onClick={closeSidebar}>Paradas</button>
        <button onClick={closeSidebar}>Mapa de paradas</button>
        <button onClick={closeSidebar}>Horarios</button>
        <button onClick={closeSidebar}>Avisos / Incidencias</button>
        <button onClick={closeSidebar}>Puntos de recarga</button>
      </aside>
    </>
  )
}

export default Sidebar