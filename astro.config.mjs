import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  scopedStyleStrategy: 'where',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "sass:math";
          @use '@/styles/global/' as *;
          `
        }
      }
    }
  }
});
