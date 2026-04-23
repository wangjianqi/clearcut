import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // @imgly/background-removal uses WASM and must not be pre-bundled
    exclude: ['@imgly/background-removal'],
  },
})
