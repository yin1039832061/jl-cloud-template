import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import externalGlobals from 'rollup-plugin-external-globals';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        tags: [
          {
            injectTo: 'body',
            tag: 'script',
            attrs: {
              src: 'https://ux-assest.jlpay.com/emp/react/react.production.min.js',
              defer: true
            }
          }, {
            injectTo: 'body',
            tag: 'script',
            attrs: {
              src: 'https://ux-assest.jlpay.com/emp/react-dom/react-dom.production.min.js',
              defer: true
            }
          }
        ]
      }
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@cloud-primary-color': '#1890ff'
        }
      }
    }
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'],
      plugins: [
        externalGlobals({
          react: 'React',
          'react-dom': 'ReactDOM'
        })
      ]
    }
  },
  resolve:{
    alias:{
      '@': '/src',
      '@/utils':'/src/utils'
    }
  },
  define: {
    'process.env': process.env
  }
})
