import axiosInstance from ".";
import { OrderDetail } from "../types/orderDetail"; // Đảm bảo rằng bạn đã định nghĩa kiểu OrderDetail trong types

// Hàm để tạo mới một chi tiết đơn đặt hàng
export const addOrderDetail = async (orderDetail: OrderDetail) => {
  try {
    const response = await axiosInstance.post<OrderDetail>(
      "/order-details",
      orderDetail
    );
    console.log(orderDetail)
    return response.data; // Trả về dữ liệu chi tiết đơn đặt hàng đã tạo
  } catch (error: any) {
    console.error("Error creating order detail:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm nếu cần
  }
};
