import axiosInstance from "./index";
import { Product } from "../types/product";
import { handleApiError } from "./errorHandler"; // Hàm xử lý lỗi
import { Variant } from "../types/variant";

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

// Gọi API lấy danh sách thương hiệu theo thể loại sản phẩm
export const searchProductByVariants = async (variants: Variant[]) => {
  try {
    // Gửi request POST với danh sách variants trong body
    const response = await axiosInstance.post<Product[]>(
      `/products/search/variants`,
      variants  // Truyền variants vào body của request
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lọc sản phẩm theo variants");
  }
};