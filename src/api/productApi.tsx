import axiosInstance from "./index";
import { Product, ProductRequest } from "../types/product";
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

// Gọi API lấy danh sách sản phẩm và danh sách phiên bản của sản phẩm
export const getProductsWithVariants = async () => {
  try {
    const response = await axiosInstance.get("/products/getProductsAndVariants");
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách sản phẩm và phiên bản");
  }
};

// Gọi API tìm kiếm sản phẩm và variant theo tên sản phẩm 
export const getProductsWithVariantsByName = async (name: string) => {
  try {
    const response = await axiosInstance.get(
      `/products/search/name/searchProductWithVariantByName?name=${name}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm sản phẩm theo tên");
  }
};

// Gọi API tìm kiếm sản phẩm và variant theo categoryId 
export const getProductsWithVariantsByCategoryId= async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `/products/search/category/searchProductWithVariantByCategoryId/${id}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm sản phẩm theo tên");
  }
};

// Gọi API tìm kiếm sản phẩm và variant theo brandId
export const getProductsWithVariantsByBrandId= async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `/products/search/brand/searchProductWithVariantByBrandId/${id}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm sản phẩm theo tên");
  }
};

// Gọi API lấy thông tin sản phẩm theo id trả về danh sach sách phiên bản của sản phẩm và thuộc tính của phiên bản
export const getProductWithVariantsAndAttribute = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `/products/getProductAndVariantsAndAttributes/${id}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy thông tin sản phẩm");
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

// Gọi API thêm sản phẩm và trả về dữ liệu từ server
export const addProduct = async (product: ProductRequest): Promise<ProductRequest> => {
  try {
    const response = await axiosInstance.post("/products", product);
    return response.data; // Trả về dữ liệu sản phẩm đã được thêm từ server
  } catch (error: any) {
    handleApiError(error, "thêm sản phẩm");
    throw error; // Quăng lỗi để bên ngoài biết có lỗi xảy ra
  }
};

// Gọi API cập nhật sản phẩm
export const updateProduct = async (id: number, product: ProductRequest) => {
  try {
    const data = await axiosInstance.put(`/products/${id}`, product);
    console.log("data"+ data);
  } catch (error: any) {
    throw error;
  }
};

// Gọi API xóa sản phẩm
export const deleteProduct = async (id: number) => {
  try {
    await axiosInstance.delete(`/products/${id}`);
  } catch (error: any) {
    handleApiError(error, "xóa sản phẩm");
  }
};

// Gọi API tìm kiếm sản phẩm theo tên
export const searchProductByName = async (query: string) => {
  try {
    const response = await axiosInstance.get<Product[]>(
      `/products/search/name?query=${query}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm sản phẩm theo tên");
  }
}

// Gọi API tìm kiếm thể loại theo tên
export const searchProductBy_Id = async (id: number) => {
  try {
    const response = await axiosInstance.get<Product>(
      `/products/${id}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm san pham id");
  }
};

// src/api/productApi.ts
export const checkDuplicateProductName = async (
  name: string,
  id: number
): Promise<boolean> => {
  try {
    const response = await axiosInstance.get<Product>(
      `/products/search/name/exact?name=${name}`
    );

    // Nếu tồn tại sản phẩm với tên đó và id khác với id hiện tại, thì có trùng lặp
    if (response.data && response.data.id !== id) {
      return true;
    }

    return false; // Không có trùng lặp hoặc là chính sản phẩm hiện tại
  } catch (error: any) {
    console.log("Lỗi API kiểm tra trùng lặp tên sản phẩm:", error);
    handleApiError(error, "kiểm tra trùng lặp tên sản phẩm");
    return false;
  }
};

// API cập nhật trạng thái sản phẩm 
export const updateProductStatus = async (id: number) => {
  try {
    await axiosInstance.put(`/products/updateStatus/${id}`);
  } catch (error: any) {
    handleApiError(error, "Xóa sản phẩm bằng cập nhật trạng thái ");
  }
};

