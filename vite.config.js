import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  VantResolver,
  ElementPlusResolver,
} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, './env')

  return defineConfig({
    envDir: resolve(__dirname, 'env'),
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver(), ElementPlusResolver()],
      }),
      Components({
        resolvers: [VantResolver(), ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@comp': resolve(__dirname, 'src/components'),
        '@store': resolve(__dirname, 'src/store'),
        '@services': resolve(__dirname, 'src/services'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@odoo': resolve(__dirname, 'src/assets/odoo'),
      },
    },
    css: {
      preprocessorOptions: {
        stylus: {
          imports: [resolve(__dirname, 'src/assets/styles/index.styl')],
        },
      },
    },
    server: {
      proxy: {
        '/web': {
          // target: 'https://hkbackend.azurewebsites.net/',
          target: env.VITE_API_BASE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/\/web/, ''),
        },
        '/api': {
          target: 'http://4.155.25.158:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/\/api/, ''),
        }
      },
    },
    build: {
      terserOptions: {
        compress: {
          // drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            // 静态资源分拆打包
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          },
        },
      },
    },
  })
}
