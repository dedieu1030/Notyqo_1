import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-manifest-and-background',
      closeBundle() {
        copyFileSync('public/manifest.json', 'dist/manifest.json')
        copyFileSync('public/background.js', 'dist/background.js')
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        'content-script': path.resolve(__dirname, 'src/content/quick-note.tsx'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'content-script' 
            ? 'content-script.js'
            : 'assets/[name]-[hash].js';
        },
        manualChunks: undefined,
      }
    }
  }
})
