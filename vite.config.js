import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', 
  },
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
    port: 8080,
    host: true,
    allowedHosts: [
      't-2261040980---portfolio-web-app-dy3kdkbuyq-uc.a.run.app'
    ]
  },  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});