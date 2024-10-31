import axiosInstance from "./index";
import { Warranty } from "../types/warranty";
import { handleApiError } from "./errorHandler";

// Gọi API để thêm mới chính sách bảo hành
export const addWarranty = async (warranty: Warranty) => {
  try {
    const response = await axiosInstance.post("/warranties", warranty);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "thêm chính sách bảo hành");
  }
};

// Gọi API để cập nhật chính sách bảo hành
export const updateWarranty = async (id: number, warranty: Warranty) => {
  try {
    const response = await axiosInstance.put(`/warranties/${id}`, warranty);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "cập nhật chính sách bảo hành");
  }
};

// Gọi API để xóa chính sách bảo hành
export const deleteWarranty = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/warranties/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "xóa chính sách bảo hành");
  }
};

// Gọi API để lấy danh sách các chính sách bảo hành
export const getWarranties = async () => {
  try {
    const response = await axiosInstance.get<Warranty[]>("/warranties");
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách chính sách bảo hành");
  }
};

// Gọi API để tìm kiếm chính sách bảo hành theo tên
export const searchWarrantyByName = async (query: string) => {
  try {
    const response = await axiosInstance.get<Warranty[]>(
      `/warranties/search/name/containing?name=${query}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm chính sách bảo hành theo tên");
  }
};

// Gọi API để lọc chính sách bảo hành theo thời gian bảo hành
export const filterWarrantyByDuration = async (duration: number) => {
  try {
    const response = await axiosInstance.get<Warranty[]>(
      `/warranties/search/duration?value=${duration}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lọc chính sách bảo hành theo thời gian");
  }
};
