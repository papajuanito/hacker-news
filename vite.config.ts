import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import Mix from 'vite-plugin-mix';

// @ts-ignore
const { default: mix } = Mix;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mix({
      handler: './src/server.ts',
    }),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['/sfns-ttf/*', 'vite.svg'],
    }),
  ],
});
