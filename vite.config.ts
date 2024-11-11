import { defineConfig } from 'vite'
import path from 'node:path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    })
  ],
  define: {
    'process.env': process.env
  },
  esbuild: {
    charset: 'ascii'
  },
  build: {
    // sourcemap: true,
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MemoIframeIpc',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
  },
})
