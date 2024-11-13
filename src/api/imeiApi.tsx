import {imeiRequest } from "../types/import";
import { handleApiError } from "./errorHandler";
import axiosInstance from "./index";

export const createImei = async (imei: imeiRequest) => {
  try {
    const response = await axiosInstance.post("/imeis", imei);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "thêm imei");
    throw error; // Quăng lỗi để bên ngoài biết có lỗi xảy ra
  }
};
export const checkImeiExists = async (imei: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.get(`/imeis/check-existence/${imei}`);
    return response.data.exists; 
  } catch (error) {
    console.error("Lỗi khi kiểm tra IMEI:", error);
    return false;
  }
};

export const getImeis = async () => {
  try {
    const response = await axiosInstance.get("/imeis");
    return response.data;
  } catch (error) {
    handleApiError(error, "lấy danh sách imei");
    throw error;
  }
}
