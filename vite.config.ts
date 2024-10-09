import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Cho phép truy cập từ mạng LAN
    port: 5173, // Cổng mà bạn muốn mở, mặc định là 5173
  }
})
