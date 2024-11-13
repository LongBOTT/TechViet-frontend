// types/orderDetail.tsx

import { Imei } from "./imei";
import { Order } from "./order"; // Đảm bảo đã tạo type Order hoặc điều chỉnh đường dẫn phù hợp

export interface OrderDetail {
//   id: number; // Khóa chính của chi tiết đơn hàng
  order: Order; // Đối tượng Order chứa chi tiết đơn hàng
  imei: Imei; // Đối tượng IMEI của sản phẩm đặt
  quantity: number; // Số lượng sản phẩm được đặt
  price: number; // Giá trị của chi tiết đơn hàng
  total: number; // Tổng tiền
  variantId: number; // ID của biến thể sản phẩm
}
