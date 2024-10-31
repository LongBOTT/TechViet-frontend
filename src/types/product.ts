import { Brand } from "./brand";
import { Category } from "./category";
import { Variant } from "./variant";
import { Warranty } from "./warranty";

export interface Product {
  id: number;        // Khoá chính, được sinh tự động
  name: string;   
  unit: string;   // Tên sản phẩm với độ dài 256 ký tự
  image: string;     // Đường dẫn ảnh sản phẩm
  weight: number;    // Khối lượng sản phẩm
  description: string; // Mô tả sản phẩm với độ dài 4096 ký tự
  category: Category;  // Thể loại sản phẩm (liên kết với Category)
  brand: Brand;        // Thương hiệu (liên kết với Brand)
  warranty: Warranty;  // Bảo hành sản phẩm (liên kết với Warranty)
  status: string;      // Trạng thái sản phẩm (đang giao dịch, ngưng giao dịch,đã xóa)
}

export interface ProductWithVariants extends Product {
  variants: Variant[]; // Danh sách phiên bản của sản phẩm
}