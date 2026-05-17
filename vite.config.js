import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base 用相对路径：同时兼容 GitHub Pages 子路径部署
// 和后续 Tauri 的 file:// 协议加载
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true
  }
})
