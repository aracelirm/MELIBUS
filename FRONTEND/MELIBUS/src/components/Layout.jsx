import Sidebar from "./Sidebar"

function Layout({ children, background = false }) {
  return (
    <div className={`page-layout ${background ? "home-background" : ""}`}>
      <Sidebar />

      <main className="main-content">
        <div className="home-inner">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout