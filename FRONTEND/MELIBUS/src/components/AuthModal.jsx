import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AuthModal({ onClose }) {
  const navigate = useNavigate()

  const [modo, setModo] = useState("login")
  const [error, setError] = useState("")

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  })

  const manejarCambio = (event) => {
    const { name, value } = event.target

    setFormulario({
      ...formulario,
      [name]: value,
    })
  }

  const manejarLogin = (event) => {
    event.preventDefault()

    if (!formulario.email || !formulario.password) {
      setError("Introduce el correo y la contraseña.")
      return
    }

    const usuario = {
      nombre: "Usuario MELIBUS",
      email: formulario.email,
      rol: "usuario",
    }

    localStorage.setItem("melibusUser", JSON.stringify(usuario))
    window.dispatchEvent(new Event("auth-change"))

    onClose()
    navigate("/perfil")
  }

  const manejarRegistro = (event) => {
    event.preventDefault()

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

    const usuario = {
      nombre: formulario.nombre,
      email: formulario.email,
      rol: "usuario",
    }

    localStorage.setItem("melibusUser", JSON.stringify(usuario))
    window.dispatchEvent(new Event("auth-change"))

    onClose()
    navigate("/perfil")
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

            <button type="submit" className="auth-button">
              Entrar
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

            <button type="submit" className="auth-button">
              Registrarme
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