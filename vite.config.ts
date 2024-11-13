import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'myapp.local', // Tên miền ảo mà bạn đã thiết lập trong file hosts và httpd-vhosts.conf
    port: 5173, // Cổng bạn muốn mở
  },
});
