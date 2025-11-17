import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: [
      "fed5893a-048b-47e9-969c-854a5eba271a-00-jsvs1du173e6.janeway.replit.dev"
    ],
    watch: {
      ignored: ['**/.cache/**', '**/node_modules/**'],
    },
  },
  optimizeDeps: {
    exclude: [],
  },
});