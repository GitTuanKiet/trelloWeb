import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    {
      name: 'markdown-loader',
      enforce: 'pre',
      transform (src, id) {
        if (id.endsWith('.md')) {
          return `export default ${JSON.stringify(src)}`
        }
      }
    }
  ],
  resolve: {
    alias: {
      '~': '/src'
    }
  } })
