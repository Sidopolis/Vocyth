import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  optimizeDeps: {
    include: ['@heroicons/react/24/outline'],
  },
  resolve: {
    dedupe: ['react', 'react-dom', '@babel/polyfill']
  }
}) 