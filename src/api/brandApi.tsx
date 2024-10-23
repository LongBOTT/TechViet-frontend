import axiosInstance from "./index";
import { Brand } from "../types/brand";
import { handleApiError } from "./errorHandler"; // Hàm xử lý lỗi

// Gọi API thêm thương hiệu
export const addBrand = async (brand: Brand) => {
  try {
    const response = await axiosInstance.post("/brands", brand);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "thêm thương hiệu");
  }
};

// Gọi API sửa thương hiệu
export const updateBrand = async (id: number, brand: Brand) => {
  try {
    const response = await axiosInstance.put(`/brands/${id}`, brand);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "cập nhật thương hiệu");
  }
};

// Gọi API xóa thương hiệu
export const deleteBrand = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/brands/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "xóa thương hiệu");
  }
};

// Gọi API lấy danh sách thương hiệu
export const getBrands = async () => {
  try {
    const response = await axiosInstance.get<Brand[]>("/brands");
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách thương hiệu");
  }
};

// Gọi API tìm kiếm thương hiệu theo tên
export const searchBrandByName = async (query: string) => {
  try {
    const response = await axiosInstance.get<Brand[]>(
      `/brands/search/name/containing?name=${query}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm thương hiệu theo tên");
  }
};

// Gọi API kiểm tra thương hiệu trùng lặp theo tên
export const checkDuplicateBrand = async (name: string) : Promise<Brand | null> => {
  try {
    const response = await axiosInstance.get<Brand>(
      `/brands/search/name/exact?name=${name}`
    );
    return response.data ? response.data : null;
  } catch (error: any) {
    handleApiError(error, "kiểm tra thương hiệu trùng lặp theo tên");
    return null;
  }
};

// Gọi API lọc thương hiệu theo trạng thái
export const filterBrandByStatus = async (status: string) => {
  try {
    const response = await axiosInstance.get<Brand[]>(
      `/brands/search/status?status=${status}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lọc thương hiệu theo trạng thái");
  }
};

// Gọi API lấy danh sách thương hiệu theo thể loại sản phẩm
export const searchBrandByCategoryName = async (name: string) => {
  try {
    const response = await axiosInstance.get<Brand[]>(
      `/brands/search/category/exact?name=${name}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lọc thương hiệu theo thể loại");
  }
};
