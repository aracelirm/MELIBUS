import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Perfil() {
  const navigate = useNavigate();

  // Cargo el usuario directamente al crear el estado para evitar el 'null' inicial
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("melibusUser");
    try {
      return guardado ? JSON.parse(guardado) : null;
    } catch (error) {
      console.error("Error al leer localStorage:", error);
      return null;
    }
  });

  // Sincronizo si hay cambios en otras pestañas
  useEffect(() => {
    const sincronizarUsuario = () => {
      const guardado = localStorage.getItem("melibusUser");
      setUsuario(guardado ? JSON.parse(guardado) : null);
    };

    window.addEventListener("auth-change", sincronizarUsuario);
    return () => window.removeEventListener("auth-change", sincronizarUsuario);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("melibusUser");
    // Notifico al Navbar para que también se actualice
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  // Verificación de seguridad
  if (!usuario) {
    return (
      <Layout>
        <div className="simple-page">
          <div className="auth-card">
            <h2>No has iniciado sesión</h2>
            <p>Para acceder al perfil debes iniciar sesión o crear una cuenta.</p>
            <Link to="/" className="card-button">Volver al inicio</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="simple-page">
        <div className="profile-header">
          <div>
            <span className="page-header-tag">Área de usuario</span>
            <h2>Mi perfil</h2>
            <p>Información básica de tu cuenta.</p>
          </div>
          <button className="logout-button" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Datos del usuario</h3>
            {/* Usamos el operador opcional ?. por seguridad adicional */}
            <p><strong>Nombre:</strong> {usuario?.nombre || "No disponible"}</p>
            <p><strong>Email:</strong> {usuario?.email || "No disponible"}</p>
            <p><strong>Rol:</strong> {usuario?.rol || "Usuario"}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Perfil;