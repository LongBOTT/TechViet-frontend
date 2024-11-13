import axiosInstance from ".";
import { Order } from "../types/order";
import { handleApiError } from "./errorHandler";

export const addOrder = async (order: Order) => {
  try {
    console.log(order);
    const response = await axiosInstance.post("/orders", order);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "thêm đơn hàng mới");
    throw error; // Ném lỗi để có thể bắt lại nếu cần trong React component
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders");
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách sản phẩm và phiên bản");
  }
};

export const getOrdersByKeyword = async (keyword: string) => {
  try {
    const response = await axiosInstance.get(
      `/orders/search/findOrdersByKeyword?search=${keyword}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách sản phẩm và phiên bản");
  }
};
export const getOrderResponseById = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `/orders/getOrderResponseById/${id}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách sản phẩm và phiên bản");
  }
};
export const getOrderByStatus = async (status: string) => {
  try {
    const response = await axiosInstance.get(
      `/orders/search/status?status=${status}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách sản phẩm và phiên bản");
  }
};

export const getOrderByPaymentMethod = async (paymentMethod: string) => {
  try {
    const response = await axiosInstance.get(
      `/orders/search/payment_method?paymentMethod=${paymentMethod}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách sản phẩm và phiên bản");
  }
};
