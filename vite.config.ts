import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'
import svgLoader from 'vite-svg-loader';
import dynamicImport from 'vite-plugin-dynamic-import';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  plugins: [
    vue(),
    vueDevTools(),
    svgLoader(),
    dynamicImport(),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/i18n/lang/**')]
    }),
    
    mockDevServerPlugin({
      log: 'debug',
    }),
    Components({
      dts: true,
      dirs: ['src/components']
    })
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables.scss" as *;
        `,
      },
    },
  },
   
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  },

  server: {
    cors: true,
    proxy: {
       '/api': {
        target: 'http://localhost:5173', // Локальный сервер для моков
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      },
    }
})
