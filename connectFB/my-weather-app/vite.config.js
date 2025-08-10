import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'  // <-- ต้อง import path ด้วย

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // <-- กำหนด alias @ ให้ชี้ไป src
    },
  },
})
