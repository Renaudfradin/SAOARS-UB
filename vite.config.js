import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src'),
      '@assets': path.resolve(__dirname,'./src/assets'),
      '@components': path.resolve(__dirname,'./src/components'),
      '@pages': path.resolve(__dirname,'./src/pages'),
      '@hook': path.resolve(__dirname,'./src/hook'),
    }
  },
  plugins: [react()]
})
