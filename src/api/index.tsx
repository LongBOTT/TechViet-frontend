// src/api/index.tsx
import axios from "axios";

// Cấu hình Axios với base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:8088/api", 
  timeout: 10000,  // Giới hạn thời gian request
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;