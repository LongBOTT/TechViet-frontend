import axiosInstance from ".";
import { OrderDetail } from "../types/orderDetail"; // Đảm bảo rằng bạn đã định nghĩa kiểu OrderDetail trong types
import { handleApiError } from "./errorHandler";

// Hàm để tạo mới một chi tiết đơn đặt hàng
export const addOrderDetail = async (orderDetail: OrderDetail) => {
  try {
    const response = await axiosInstance.post<OrderDetail>(
      "/order-details",
      orderDetail
    );
    return response.data; // Trả về dữ liệu chi tiết đơn đặt hàng đã tạo
  } catch (error: any) {
    console.error("Error creating order detail:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm nếu cần
  }
};

// Gọi API tìm kiếm thể loại theo tên
export const searchOrderDetailBy_OrderId = async (id: number) => {
  try {
    const response = await axiosInstance.get<OrderDetail[]>(
      `/order-details/order/${id}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "tìm kiếm san pham id");
  }
};

export const updateOrderDetail = async (id: number, imeiId: number) => {
  try {
    const response = await axiosInstance.put(
      `/order-details/${id}`,
      { imeiId } // Gửi dưới dạng JSON object
    );
    return response.data;
  } catch (error: any) {
    console.error("Error updating order detail:", error);
    throw error;
  }
};

