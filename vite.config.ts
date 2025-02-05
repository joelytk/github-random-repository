import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/reducers': path.resolve(__dirname, './src/reducers'),
      '@/types': path.resolve(__dirname, './src/types')
    }
  },
  server: {
    open: true,
    port: 3000
  }
});
