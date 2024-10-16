import axiosInstance from "./index";
import { Supplier } from "../types/supplier";

// Gọi API thêm nhà cung cấp
export const addSupplier = async (supplier: Supplier) => {
  return await axiosInstance.post("/suppliers", supplier);
};

// Gọi API sửa nhà cung cấp
export const updateSupplier = async (id: number, supplier: Supplier) => {
  return await axiosInstance.put(`/suppliers/${id}`, supplier);
};

// Gọi API xóa nhà cung cấp
export const deleteSupplier = async (id: number) => {
  return await axiosInstance.delete(`/suppliers/${id}`);
};

// Gọi API lấy danh sách nhà cung cấp
export const getSuppliers = async () => {
  const response = await axiosInstance.get<Supplier[]>("/suppliers"); 
  return response.data; 
};
