import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const page = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// base relativo: el mismo build funciona en tim.saavedracbr.com y en saavedracbr.com/charla-tim/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        kit: page('./kit/index.html'),
      },
    },
  },
});
