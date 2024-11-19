import { Customer } from "./customer";
import { Product } from "./product";
import { Variant } from "./variant"; // Import type Variant từ thư mục types

export interface Review {
  id?: number;
  product: Product; // Khóa ngoại đến bảng Variants
  customer: Customer; // Khóa ngoại đến bảng Accounts
  rating: number; // Đánh giá sản phẩm (từ 1 đến 5)
  comment: string; // Bình luận của khách hàng về sản phẩm
  created_at: string; // Thời gian tạo đánh giá (định dạng chuỗi để lưu trữ thời gian)
}