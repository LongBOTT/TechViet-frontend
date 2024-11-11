import axiosInstance from "./index";
import { Variant,VariantRequest } from "../types/variant";
import { handleApiError } from "./errorHandler"; // Hàm xử lý lỗi
import { Product } from "../types/product";

// Gọi API thêm phiên bản sản phẩm và trả về dữ liệu từ server
export const addVariant = async (variant: VariantRequest): Promise<VariantRequest> => {
  try {
    const response = await axiosInstance.post("/variants", variant);
    return response.data; 
  } catch (error: any) {
    handleApiError(error, "thêm phiên bản sản phẩm");
    throw error; 
  }
};

// Gọi API sửa phiên bản
export const updateVariant = async (id: number,variant: VariantRequest) => {
  try {
    const response = await axiosInstance.put(`/variants/${id}`, variant);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "cập nhật phiên bản");
  }
};

// Gọi API xóa phiên bản
export const deleteVariant = async (id: number) => {
  try {
    const response = await axiosInstance.put(`/variants/deleteVariantById/${id}`)
    return response.data;
  } catch (error: any) {
    handleApiError(error, "xóa phiên bản");
  }
};

// Gọi API xóa phiên bản sản phẩm theo id sản phẩm
export const deleteVariantByProduct = async (productID: number) => {
  try {
    const response = await axiosInstance.delete(`/variants/product/${productID}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "xóa phiên bản theo id sản phẩm");
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
export const searchVariantByProduct = async (productID: number) => {
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
export const searchVariantByPrice = async (minPrice: number, maxPrice: number, variants: Variant[]) => {
  try {
    const response = await axiosInstance.post<Variant[]>(
      `/variants/search/price`,
      variants,  // Truyền variants vào body của request
      {
        params: {
          minPrice: minPrice,
          maxPrice: maxPrice
        }
      },
    );
    
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lọc phiên bản theo khoảng giá");
  }
};

export const searchVariantByProductsAndPrice = async (
  products: Product[], 
  minPrice: number,   
  maxPrice: number     
) => {
  try {
    const response = await axiosInstance.post<Variant[]>(
      `/variants/search`,
      products,          
      {
        params: {
          minPrice: minPrice,
          maxPrice: maxPrice
        }
      }
    );
    
    return response.data; // Trả về danh sách phiên bản (Variant)
  } catch (error: any) {
    handleApiError(error, "tìm kiếm phiên bản theo mảng sản phẩm và khoảng giá");
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

// Gọi API lấy danh sách  phiên bản theo sản phẩm
export const searchVariantByCategory = async (categoryID: number) => {
  try {
    const response = await axiosInstance.get<Variant[]>(
      `/variants/search/category/categoryID?categoryID=${categoryID}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm phiên bản theo sản phẩm");
  }
};

export const searchVariantByBrand = async (brandID: number) => {
  try {
    const response = await axiosInstance.get<Variant[]>(
      `/variants/search/brand/brandID?brandID=${brandID}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm phiên bản theo sản phẩm");
  }
};
