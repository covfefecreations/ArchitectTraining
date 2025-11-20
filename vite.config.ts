import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: [
      "b8ae669d-abd4-40a3-9a3f-c7a9bed88ac4-00-79mhdmsu1yhh.riker.replit.dev"
    ],
    watch: {
      ignored: ['**/.cache/**', '**/node_modules/**'],
    },
  },
  optimizeDeps: {
    exclude: [],