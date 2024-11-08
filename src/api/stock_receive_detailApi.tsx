import { stockReceiveDetailRequest } from "../types/import";
import { handleApiError } from "./errorHandler";
import axiosInstance from "./index";

export const createStockReceiveDetail = async (stockReceiveDetail: stockReceiveDetailRequest) => {
  try {
    const response = await axiosInstance.post("/stock-receive-details", stockReceiveDetail);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "thêm chi tiết phiếu nhập");
    throw error; // Quăng lỗi để bên ngoài biết có lỗi xảy ra
  }
};