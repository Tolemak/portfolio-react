import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // pozwala na dostęp z sieci lokalnej
    port: 5173
  },
  build: {
    // The three.js/GLTF chunk (~930kB) and the shared vendor chunk (motion + react-three-fiber
    // + tsparticles, used on nearly every route) are expected to sit above Vite's 500kB default;
    // both are already lazy-loaded per-route rather than blocking the initial paint.
    chunkSizeWarningLimit: 1000
  }
})
