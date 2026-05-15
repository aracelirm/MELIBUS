// Modal de acceso de usuarios. Contiene login y registro en la misma ventana.
// Sirve para iniciar sesión, crear cuenta y guardar el usuario en localStorage.
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUsuario, registrarUsuario } from "../services/melibusApi"

function AuthModal({ onClose }) {
  const navigate = useNavigate()

  const [modo, setModo] = useState("login")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  // Datos de los dos formularios. Los name de los inputs tienen que coincidir con estas claves.
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  })

  const manejarCambio = (event) => {
    const { name, value } = event.target

    // Actualiza solo el campo que se está escribiendo sin perder el resto del formulario.
    setFormulario({
      ...formulario,
      [name]: value,
    })
  }

  const manejarLogin = async (event) => {
    event.preventDefault()

    // Validación sencilla antes de llamar al backend.
    if (!formulario.email || !formulario.password) {
      setError("Introduce el correo y la contraseña.")
      return
    }

    setCargando(true)
    setError("")

    try {
      const respuesta = await loginUsuario({
        email: formulario.email,
        password: formulario.password,
      })

      localStorage.setItem("melibusUser", JSON.stringify(respuesta.user))
      window.dispatchEvent(new Event("auth-change"))

      onClose()
      navigate("/perfil")
    } catch (error) {
      setError(error.message)
    } finally {
      setCargando(false)
    }
  }

  const manejarRegistro = async (event) => {
    event.preventDefault()

    // Si en el futuro añado más campos obligatorios, los reviso en esta condición.
    if (
      !formulario.nombre ||
      !formulario.email ||
      !formulario.password ||
      !formulario.confirmarPassword
    ) {
      setError("Todos los campos son obligatorios.")
      return
    }

    if (formulario.password !== formulario.confirmarPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }

    setCargando(true)
    setError("")

    try {
      const respuesta = await registrarUsuario({
        nombre: formulario.nombre,
        email: formulario.email,
        password: formulario.password,
      })

      localStorage.setItem("melibusUser", JSON.stringify(respuesta.user))
      window.dispatchEvent(new Event("auth-change"))

      onClose()
      navigate("/perfil")
    } catch (error) {
      setError(error.message)
    } finally {
      setCargando(false)
    }
  }

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo)
    setError("")
    setFormulario({
      nombre: "",
      email: "",
      password: "",
      confirmarPassword: "",
    })
  }

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div
        className="auth-modal glass-auth-card"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>

        <span className="auth-modal-tag">
          {modo === "login" ? "Área de usuario" : "Nuevo usuario"}
        </span>

        <h2>{modo === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>

        <p className="auth-modal-description">
          {modo === "login"
            ? "Accede para consultar tu perfil y futuras paradas favoritas."
            : "Regístrate para acceder a funciones de usuario como las paradas favoritas."}
        </p>

        {error && <p className="form-error">{error}</p>}

        {modo === "login" ? (
          <form onSubmit={manejarLogin} className="auth-form">
            {/* Formulario de inicio de sesión */}
            <div className="auth-field">
              <label htmlFor="email-login">Correo electrónico</label>
              <input
                id="email-login"
                name="email"
                type="email"
                value={formulario.email}
                onChange={manejarCambio}
                placeholder="ejemplo@email.com"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password-login">Contraseña</label>
              <input
                id="password-login"
                name="password"
                type="password"
                value={formulario.password}
                onChange={manejarCambio}
                placeholder="Introduce tu contraseña"
              />
            </div>

            <button type="submit" className="auth-button" disabled={cargando}>
              {cargando ? "Entrando..." : "Entrar"}
            </button>

            <div className="auth-secondary-action">
                <p>¿No tienes cuenta?</p>

                <button type="button" className="auth-secondary-button" onClick={() => cambiarModo("registro")} >
                Crear cuenta
                </button>
            </div>
          </form>
        ) : (
          <form onSubmit={manejarRegistro} className="auth-form">
            {/* Formulario de registro */}
            <div className="auth-field">
              <label htmlFor="nombre-registro">Nombre</label>
              <input
                id="nombre-registro"
                name="nombre"
                type="text"
                value={formulario.nombre}
                onChange={manejarCambio}
                placeholder="Introduce tu nombre"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="email-registro">Correo electrónico</label>
              <input
                id="email-registro"
                name="email"
                type="email"
                value={formulario.email}
                onChange={manejarCambio}
                placeholder="ejemplo@email.com"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password-registro">Contraseña</label>
              <input
                id="password-registro"
                name="password"
                type="password"
                value={formulario.password}
                onChange={manejarCambio}
                placeholder="Introduce una contraseña"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="confirmarPassword">Confirmar contraseña</label>
              <input
                id="confirmarPassword"
                name="confirmarPassword"
                type="password"
                value={formulario.confirmarPassword}
                onChange={manejarCambio}
                placeholder="Repite la contraseña"
              />
            </div>

            <button type="submit" className="auth-button" disabled={cargando}>
              {cargando ? "Registrando..." : "Registrarme"}
            </button>

            <div className="auth-secondary-action">
                <p>¿Ya tienes cuenta?</p>

                <button type="button" className="auth-secondary-button" onClick={() => cambiarModo("login")} >
                Iniciar sesión
                </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default AuthModal
