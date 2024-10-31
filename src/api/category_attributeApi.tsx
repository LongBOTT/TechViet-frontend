//src/api/category_attributeApi.tsx
import axiosInstance from "./index";
import { category_attribute } from "../types/category_attribute";
import { handleApiError } from "./errorHandler"; // Hàm xử lý lỗi

// Gọi API lấy danh sách theo category_id
export const getCategoryAttributesByCategoryId = async (category_id: number) => {
  try {
    const response = await axiosInstance.get<category_attribute[]>(`/category-attributes/by-category/${category_id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách theo category_id");
  }
};

