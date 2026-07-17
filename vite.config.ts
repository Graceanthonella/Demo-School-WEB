import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Demo-School-WEB/',
  server: {
    allowedHosts: true,
    hmr: {
      clientPort: 443
    }
  },
});
