import axiosInstance from ".";
import { Review } from "../types/review";
import { handleApiError } from "./errorHandler";

// Hàm lấy đánh giá theo ID phiên bản
export const getReviewsByProductId = async (productID: number) => {
  try {
    const response = await axiosInstance.get(`/reviews/search/productID`, {
      params: { productID },
    });
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy đánh giá theo ID phiên bản");
    throw error;
  }
};

// Hàm tạo mới đánh giá
export const createReview = async (review: Review) => {
  try {
    const response = await axiosInstance.post("/reviews", review);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tạo mới đánh giá");
    throw error;
  }
};

// Hàm cập nhật đánh giá
export const updateReview = async (id: number, review: Review) => {
  try {
    const response = await axiosInstance.put(`/reviews/${id}`, review);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "cập nhật đánh giá");
    throw error;
  }
};

// Hàm xóa đánh giá
export const deleteReview = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/reviews/${id}`);
    return response.status === 200;
  } catch (error: any) {
    handleApiError(error, "xóa đánh giá");
    throw error;
  }
};
