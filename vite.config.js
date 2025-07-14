import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', 
  },
  server: {
    historyApiFallback: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});