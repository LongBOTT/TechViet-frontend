import axiosInstance from "./index";
import { Variant } from "../types/variant";
import { handleApiError } from "./errorHandler"; // Hàm xử lý lỗi

// Gọi API thêm phiên bản
export const addVariant = async (variant: Variant) => {
  try {
    const response = await axiosInstance.post("/variants", variant);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "thêm phiên bản");
  }
};

// Gọi API sửa phiên bản
export const updateBrand = async (id: number, variant: Variant) => {
  try {
    const response = await axiosInstance.put(`/Variants/${id}`, variant);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "cập nhật phiên bản");
  }
};

// Gọi API xóa phiên bản
export const deleteVariant = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/Variants/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "xóa phiên bản");
  }
};

// Gọi API lấy tất cả danh sách phiên bản
export const getVariants = async () => {
  try {
    const response = await axiosInstance.get<Variant[]>("/Variants");
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách phiên bản");
  }
};

// Gọi API lấy danh sách  phiên bản theo sản phẩm
export const searchVariantByProduct = async (productID: string) => {
  try {
    const response = await axiosInstance.get<Variant[]>(
      `/variants/search/product/productID?productID=${productID}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm phiên bản theo sản phẩm");
  }
};

// Gọi API lấy danh sách phiên bản theo khoảng giá
export const filterVariantByPrice = async (minPrice: number, maxPrice: number) => {
  try {
    const response = await axiosInstance.get<Variant[]>(
      `/variants/search/price?minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lọc phiên bản theo khoảng giá");
  }
};


// Gọi API lọc phiên bản theo trạng thái
export const filterBrandByStatus = async (status: string) => {
  try {
    const response = await axiosInstance.get<Variant[]>(
      `/variants/search/status?status=${status}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lọc phiên bản theo trạng thái");
  }
};


