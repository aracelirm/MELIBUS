// Configuración de Vite para levantar y compilar la parte de React.
// El base '/melibus/' sirve para que la app funcione bien al publicarla en esa ruta.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/melibus/'
})
