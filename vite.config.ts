import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      // input: {
      //   main: 'src/main.tsx',
      // },
      output: {
        entryFileNames: 'plugin.js',
        manualChunks: {
          plugin: ['src/main.tsx'],
        },
      },
    },
  },
})

