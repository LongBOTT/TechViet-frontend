import { Order } from "./order";
import { Imei } from "./imei";

export interface OrderDetail {
  id?: number; // ID của chi tiết đơn đặt hàng, có thể không cần khi tạo mới
  order: Order; // Tham chiếu đến đơn đặt hàng
  imei?: Imei | null; // IMEI sản phẩm, có thể là null nếu không có
  quantity: number; // Số lượng sản phẩm được đặt
  price: number; // Giá sản phẩm
  total: number; // Tổng tiền cho chi tiết đơn hàng (price * quantity)
  variantId: number; // ID của phiên bản sản phẩm
}
