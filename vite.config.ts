import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': new URL('./src/', import.meta.url).pathname
    }
  },

  //todo: this is a temp fix for cors
  //http://localhost:8080/api
  //https://falcons-erp-api-dev.sd.iafl.net/api/
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
