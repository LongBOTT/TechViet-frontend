import axiosInstance from "./index";
import { Customer } from "../types/customer";
import { handleApiError } from "./errorHandler"; // Hàm xử lý lỗi

// Gọi API thêm khách hàng
export const addCustomer = async (customer: Customer) => {
  try {
    const response = await axiosInstance.post("/customers", customer);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "thêm khách hàng");
  }
};

// Gọi API sửa khách hàng
export const updateCustomer = async (id: number, customer: Customer) => {
  try {
    const response = await axiosInstance.put(`/customers/${id}`, customer);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "cập nhật khách hàng");
  }
};

// Gọi API xóa khách hàng
export const deleteCustomer = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/customers/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "xóa khách hàng");
  }
};

// Gọi API lấy danh sách khách hàng
export const getCustomers = async () => {
  try {
    const response = await axiosInstance.get<Customer[]>("/customers");
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách khách hàng");
  }
};

export const getCustomerResponse = async () => {
  try {
    const response = await axiosInstance.get("/customers/getAll");
    return response;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách khách hàng");
  }
}

// Gọi API tìm kiếm khách hàng theo tên
export const searchCustomerByName = async (query: string) => {
  try {
    const response = await axiosInstance.get<Customer[]>(
      `/customers/search/name/containing?name=${query}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm khách hàng theo tên");
  }
};

// Gọi API lọc khách hàng theo thành phố
export const filterCustomerByCity = async (city: string) => {
  try {
    const response = await axiosInstance.get<Customer[]>(
      `/customers/search/city?city=${city}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lọc khách hàng theo thành phố");
  }
};
