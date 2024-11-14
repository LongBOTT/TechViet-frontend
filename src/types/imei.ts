// types/imei.tsx

import { StockReceiveDetail } from "./stockReceiveDetail";


export interface Imei {
  id: number; // Khóa chính của bảng
  imeiCode: string; // Mã IMEI của sản phẩm
  stockReceiveDetail?: StockReceiveDetail | null; // Chi tiết nhận hàng liên quan (có thể là null)
  status: string; // Trạng thái của IMEI
}

export interface ImeiRequest  {
  id: number; // Khóa chính của bảng
  imeiCode: string; // Mã IMEI của sản phẩm
  stockReceiveDetailId?: number; // Chi tiết nhận hàng liên quan (có thể là null)
  status: string; // Trạng thái của IMEI
}