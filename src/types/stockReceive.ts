import { Supplier } from "./supplier"; // Điều chỉnh đường dẫn phù hợp với cấu trúc dự án

export interface StockReceive {
  id: number; // Khóa chính của bảng
  total: number; // Tổng giá trị phiếu nhập
  receiveDate: string; // Ngày nhập kho, có thể cần chuyển đổi định dạng sang chuỗi
  note: string; // Ghi chú bổ sung
  supplier?: Supplier | null; // Nhà cung cấp sản phẩm, có thể là null hoặc không bắt buộc
}