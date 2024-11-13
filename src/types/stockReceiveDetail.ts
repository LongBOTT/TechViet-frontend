// types/stockReceiveDetail.tsx

import { StockReceive } from "./stockReceive"; // Điều chỉnh đường dẫn phù hợp với cấu trúc dự án
import { Variant } from "./variant"; // Điều chỉnh đường dẫn phù hợp với cấu trúc dự án

export interface StockReceiveDetail {
  id: number; // Khóa chính của bảng
  stockReceive?: StockReceive | null; // Tham chiếu đến StockReceive, có thể là null hoặc không bắt buộc
  variant?: Variant | null; // Tham chiếu đến Variant, có thể là null hoặc không bắt buộc
  quantity: number; // Số lượng phiên bản đặt hàng
  price: number; // Giá của phiên bản đặt hàng
}
