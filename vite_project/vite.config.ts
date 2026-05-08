import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import pkg from './package.json'

const widgetName = 'usp';
export default defineConfig({
  plugins: [
    react()
  ],
  define: {
    'process.env': {}
  },
  build: {
    outDir: "../www",
    cssCodeSplit: true,
    emptyOutDir: false,
    lib: {
      entry: "src/widget.ts",
      name: `ReactEdge_${widgetName}`,
      fileName: () => `widget-${widgetName}@${pkg.version}.iife.js`,
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: `widget-${widgetName}.[ext]`,
      },
    },
    minify: true,
    sourcemap: false
  }
})