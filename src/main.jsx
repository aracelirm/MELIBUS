// Punto de entrada del frontend. Aquí React se engancha al div root del index.html.
// También se carga BrowserRouter para que funcionen las rutas de la aplicación.
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/melibus">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
