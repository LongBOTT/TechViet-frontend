// src/api/categoryApi.tsx
import axiosInstance from "./index";
import { Category } from "../types/category";

import { handleApiError } from "./errorHandler";

// Gọi API thêm thể loại
export const addCategory = async (category: Category) => {
  try {
    const response = await axiosInstance.post("/categories", category);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "thêm thể loại");
  }
};

// Gọi API sửa thể loại
export const updateCategory = async (id: number, category: Category) => {
  try {
    const response = await axiosInstance.put(`/categories/${id}`, category);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "cập nhật thể loại");
  }
};

// Gọi API xóa thể loại
export const deleteCategory = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "xóa thể loại");
  }
};

// Gọi API lấy danh sách thể loại
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get<Category[]>("/categories");
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách thể loại");
  }
};

// Gọi API tìm kiếm thể loại theo tên
export const searchCategoryBy_Id = async (id: number) => {
  try {
    const response = await axiosInstance.get<Category>(
      `/categories/${id}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm thể loại theo id");
  }
};

// Gọi API tìm kiếm thể loại theo tên
export const searchCategoryByName = async (query: string) => {
  try {
    const response = await axiosInstance.get<Category[]>(
      `/categories/search/name/containing?name=${query}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm thể loại theo tên");
  }
};

// Gọi API kiểm tra thể loại trùng lặp theo tên
export const checkDuplicateCategory = async (name: string) : Promise<Category | null> => {
  try {
    const response = await axiosInstance.get<Category>(
      `/categories/search/name/exact?name=${name}`
    );
    return response.data ? response.data : null;
  } catch (error: any) {
    handleApiError(error, "kiểm tra thể loại trùng lặp theo tên");
    return null;
  }
};

// Gọi API lọc thể loại theo trạng thái
export const filterCategoryByStatus = async (status: string) => {
  try {
    const response = await axiosInstance.get<Category[]>(
      `/categories/search/status?status=${status}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lọc thể loại theo trạng thái");
  }
};
