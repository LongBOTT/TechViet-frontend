import {stockReceiveRequest } from "../types/import";
import { handleApiError } from "./errorHandler";
import axiosInstance from "./index";

export const createStockReceive = async (stockReceive: stockReceiveRequest) => {
  try {
    const response = await axiosInstance.post("/stock-receives", stockReceive);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "thêm phiếu nhập");
    throw error; // Quăng lỗi để bên ngoài biết có lỗi xảy ra
  }
};

export const getStockReceives = async () => {
  try {
    const response = await axiosInstance.get("/stock-receives/getAllStockReceives");
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách phiếu nhập");
    throw error;
  }
}

export const getStockReceiveById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/stock-receives/getStockReceiveByIdContaining/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy thông tin phiếu nhập");
    throw error;
  }
}

export const getStockReceivesBySupplierId = async (supplierId: number) => {
  try {
    const response = await axiosInstance.get(`/stock-receives/getStockReceiveBySupplierId/${supplierId}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách phiếu nhập theo nhà cung cấp");
    throw error;
  }
}

export const getStockReceiveAndStockReceiveDetailById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/stock-receives/getStockReceiveAndStockReceiveDetailById/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy thông tin phiếu nhập và chi tiết phiếu nhập");
    throw error;
  }
}

