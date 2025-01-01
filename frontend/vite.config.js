import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve : {
    alias: [{ find: "@", replacement: "/src" }],
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers', '@mui/x-date-pickers-pro'],
  },
  build: {
    sourcemap: true, // Génère les sourcemaps pour le mode production aussi
  },
});
