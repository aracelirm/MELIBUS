import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ParadaCard from "../components/ParadaCard";
import {
  eliminarParadaFavorita,
  getParadasFavoritas,
} from "../services/melibusApi";

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
  const [favoritas, setFavoritas] = useState([]);
  const [cargandoFavoritas, setCargandoFavoritas] = useState(
    usuario?.rol === "usuario"
  );
  const [errorFavoritas, setErrorFavoritas] = useState("");

  // Sincronizo si hay cambios en otras pestañas
  useEffect(() => {
    const sincronizarUsuario = () => {
      const guardado = localStorage.getItem("melibusUser");
      setUsuario(guardado ? JSON.parse(guardado) : null);
    };

    window.addEventListener("auth-change", sincronizarUsuario);
    return () => window.removeEventListener("auth-change", sincronizarUsuario);
  }, []);

  useEffect(() => {
    if (!usuario?.id || usuario.rol !== "usuario") {
      return;
    }

    let activo = true;

    getParadasFavoritas(usuario.id)
      .then((paradas) => {
        if (activo) {
          setFavoritas(paradas);
        }
      })
      .catch((error) => {
        if (activo) {
          setErrorFavoritas(error.message);
        }
      })
      .finally(() => {
        if (activo) {
          setCargandoFavoritas(false);
        }
      });

    return () => {
      activo = false;
    };
  }, [usuario]);

  const cerrarSesion = () => {
    localStorage.removeItem("melibusUser");
    // Notifico al Navbar para que también se actualice
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  const quitarFavorita = async (parada) => {
    try {
      await eliminarParadaFavorita(usuario.id, parada.id);
      setFavoritas((actuales) =>
        actuales.filter((favorita) => favorita.id !== parada.id)
      );
    } catch (error) {
      setErrorFavoritas(error.message);
    }
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

        {usuario.rol === "usuario" && (
          <section className="profile-section">
            <h3>Paradas favoritas</h3>

            {cargandoFavoritas ? (
              <p className="empty-message">Cargando paradas favoritas...</p>
            ) : errorFavoritas ? (
              <p className="empty-message">{errorFavoritas}</p>
            ) : favoritas.length > 0 ? (
              <div className="info-grid">
                {favoritas.map((parada) => (
                  <ParadaCard
                    key={parada.id}
                    parada={parada}
                    favorita={true}
                    onToggleFavorita={quitarFavorita}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-message">
                Todavía no has añadido ninguna parada a favoritos.
              </p>
            )}
          </section>
        )}
      </div>
    </Layout>
  );
}

export default Perfil;
