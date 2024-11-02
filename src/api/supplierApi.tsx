// src/api/supplierApi.tsx
import axiosInstance from "./index";
import { Supplier } from "../types/supplier";

import { handleApiError } from "./errorHandler"; // Import hàm xử lý lỗi

// Gọi API thêm nhà cung cấp
export const addSupplier = async (supplier: Supplier) => {
  try {
    const response = await axiosInstance.post("/suppliers", supplier);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "thêm nhà cung cấp");
  }
};

// Gọi API sửa nhà cung cấp
export const updateSupplier = async (id: number, supplier: Supplier) => {
  try {
    const response = await axiosInstance.put(`/suppliers/${id}`, supplier);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "cập nhật nhà cung cấp");
  }
};

// Gọi API xóa nhà cung cấp
export const deleteSupplier = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/suppliers/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "xóa nhà cung cấp");
  }
};

// Gọi API lấy danh sách nhà cung cấp
export const getSuppliers = async () => {
  try {
    const response = await axiosInstance.get<Supplier[]>("/suppliers");
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách nhà cung cấp");
  }
};

// Gọi API tìm kiếm nhà cung cấp theo tên gần đúng
export const searchSupplierByName = async (query: string) => {
  try {
    const response = await axiosInstance.get<Supplier[]>(
      `/suppliers/search/name/containing?name=${query}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm nhà cung cấp theo tên");
  }
};

// Gọi API kiểm tra nhà cung cấp trùng lặp theo tên
export const checkDuplicateSupplier = async (
  name: string
): Promise<Supplier | null> => {
  try {
    const response = await axiosInstance.get<Supplier>(
      `suppliers/search/name/exact?name=${name}`
    );

    console.log("Nhà cung cấp trùng:", response.data);
    return response.data ? response.data : null;
  } catch (error: any) {
    console.log("Lỗi API kiểm tra trùng lặp:", error);
    handleApiError(error, "kiểm tra trùng lặp nhà cung cấp");
    return null;
  }
};
// Gọi API kiểm tra nhà cung cấp trùng lặp theo email
export const checkDuplicateEmail = async (
  email: string
): Promise<Supplier | null> => {
  try {
    const response = await axiosInstance.get<Supplier>(
      `suppliers/search/email/exact?email=${email}`
    );
    return response.data ? response.data : null;
  } catch (error: any) {
    console.log("Lỗi API kiểm tra trùng lặp email:", error);
    handleApiError(error, "kiểm tra trùng lặp email nhà cung cấp");
    return null;
  }
};

// Gọi API kiểm tra nhà cung cấp trùng lặp theo số điện thoại
export const checkDuplicatePhone = async (
  phone: string
): Promise<Supplier | null> => {
  try {
    const response = await axiosInstance.get<Supplier>(
      `suppliers/search/phone/exact?phone=${phone}`
    );
    return response.data ? response.data : null;
  } catch (error: any) {
    console.log("Lỗi API kiểm tra trùng lặp số điện thoại:", error);
    handleApiError(error, "kiểm tra trùng lặp số điện thoại nhà cung cấp");
    return null;
  }
};
// Gọi API lọc nhà cung cấp theo trạng thái
export const filterSupplierByStatus = async (status: string) => {
  try {
    const response = await axiosInstance.get<Supplier[]>(
      `/suppliers/search/status?status=${status}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lọc nhà cung cấp theo trạng thái");
  }
};


