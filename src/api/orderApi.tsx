import axiosInstance from ".";
import { handleApiError } from "./errorHandler";

export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get("/orders");
        return response.data;
      } catch (error: any) {
        handleApiError(error, "lấy danh sách sản phẩm và phiên bản");
      }
}

export const getOrderByStatus = async (status: string) => {
    try {
        const response = await axiosInstance.get(`/orders/search/status?status=${status}`);
        return response.data;
      } catch (error: any) {
        handleApiError(error, "lấy danh sách sản phẩm và phiên bản");
      }
}

export const getOrderByPaymentMethod = async (paymentMethod: string) => {
    try {
        const response = await axiosInstance.get(`/orders/search/payment_method?paymentMethod=${paymentMethod}`);
        return response.data;
      } catch (error: any) {
        handleApiError(error, "lấy danh sách sản phẩm và phiên bản");
      }
}
