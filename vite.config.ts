import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { patchCssModules } from 'vite-css-modules';

export default defineConfig({
  plugins: [
    react(),
    patchCssModules({
      generateSourceTypes: true,
    }),
  ],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/test/setup.ts'],
  },
});