import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import svgLoader from 'vite-svg-loader';
import dynamicImport from 'vite-plugin-dynamic-import';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import path from 'node:path';

export default defineConfig(({ command }) => ({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    vue(),
    ...(command === 'serve' ? [vueDevTools()] : []),
    svgLoader(),
    dynamicImport(),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/i18n/lang/**')],
    }),
    Components({
      dts: true,
      dirs: ['src/components'],
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },

  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vue: ['vue'],
          'vue-i18n': ['vue-i18n'],
          pinia: ['pinia'],
        },
      },
    },
  },
}));
