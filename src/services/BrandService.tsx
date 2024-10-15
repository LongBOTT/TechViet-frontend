import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8088/api/brands";
export const listBrands = () => axios.get(REST_API_BASE_URL); 