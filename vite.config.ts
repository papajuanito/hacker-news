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
      includeAssets: ['/sfns-ttf/*', 'vite.svg', 'hn.svg'],
      manifest: {
        theme_color: '#292c2d',
        background_color: '#292c2d',
        name: 'Hacker News',
        short_name: 'Hacker News',
        description: 'Hacker News PWA client',
        icons: [
          {
            src: '/hn.svg',
            sizes: 'any',
          },
        ],
      },
    }),
  ],
});
