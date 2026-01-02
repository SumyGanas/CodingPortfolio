import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', 
  },
  server: {
    historyApiFallback: true,
    host: true,
    port: 5173,
  },
  preview: {
    historyApiFallback: true,
    port: 8080,
    host: true,
    allowedHosts: true
  },  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
  },
});