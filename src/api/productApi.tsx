import axiosInstance from "./index";
import { Product } from "../types/product";
import { handleApiError } from "./errorHandler"; // Hàm xử lý lỗi

// Gọi API lấy danh sách thương hiệu
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get<Product[]>("/products");
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách sản phẩm");
  }
};

// Gọi API lấy danh sách thương hiệu theo thể loại sản phẩm
export const searchProductsByBrand_Id = async (id: number) => {
  try {
    const response = await axiosInstance.get<Product[]>(
      `/products/search/brand/exact?id=${id}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lọc sản phẩm theo thương hiệu");
  }
};

// Gọi API lấy danh sách thương hiệu theo thể loại sản phẩm
export const searchProductByCategory_Id = async (id: number) => {
  try {
    const response = await axiosInstance.get<Product[]>(
      `/products/search/category/exact?id=${id}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lọc sản phẩm theo thể loại");
  }
};