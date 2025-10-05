import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'https://exo-ml-production.up.railway.app/',
        changeOrigin: true,
        secure: false
      }
    }
  }
})