import { Customer } from "./customer"; // Đảm bảo đã tạo type Customer hoặc điều chỉnh đường dẫn phù hợp
import { OrderDetail } from "./orderDetail";

export interface Order {
  id?: number; // ID của đơn hàng, có thể không cần khi tạo mới
  customer: Customer; // Tham chiếu đến đối tượng Customer
  orderDate: string; // Định dạng ISO string để tương thích với LocalDateTime
  total_amount: number; // Tổng tiền của đơn đặt hàng
  orderStatus: string; // Trạng thái đơn đặt hàng
  payment_status: string; // Trạng thái thanh toán
  payment_method: PaymentMethod; // Phương thức thanh toán (Tiền mặt hoặc Chuyển khoản)
  note?: string; // Ghi chú, tùy chọn có thể không cần truyền
  address: string; // Địa chỉ giao hàng
  phone: string; // Số điện thoại liên hệ
}

// Định nghĩa enum PaymentMethod
export enum PaymentMethod {
  Cash = "Cash", // Tiền mặt
  BankTransfer = "BankTransfer" // Chuyển khoản
}