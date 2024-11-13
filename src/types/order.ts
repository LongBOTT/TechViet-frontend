import { Customer } from "./customer"; // Đảm bảo đã tạo type Customer hoặc điều chỉnh đường dẫn phù hợp
import { OrderDetail } from "./orderDetail";

export enum PaymentMethod {
  CASH = "CASH",
  TRANSFER = "TRANSFER"
}

export interface Order {
  customer: Customer; // Tham chiếu đến đối tượng Customer
  orderDate: string; // Định dạng ISO string, có thể chuyển đổi từ LocalDateTime
  total_amount: number; // Tổng tiền của đơn đặt hàng
  orderStatus: string; // Trạng thái đơn đặt hàng
  payment_status: string; // Trạng thái thanh toán
  order_details: OrderDetail[]; // Danh sách chi tiết đơn đặt hàng
  payment_method: PaymentMethod; // Phương thức thanh toán (Tiền mặt hoặc Chuyển khoản)
  note?: string; // Ghi chú, tùy chọn có thể không cần truyền
  address: string; // Địa chỉ giao hàng
  phone: string; // Số điện thoại liên hệ
}