import { Brand } from "./brand";
import { Category } from "./category";
import { Variant, Variants } from "./variant";
import { Warranty } from "./warranty";

export interface Product {
  id: number; // Khoá chính, được sinh tự động
  name: string; // Tên sản phẩm với độ dài 256 ký tự
  weight: string; // Khối lượng sản phẩm
  description: string; // Mô tả sản phẩm với độ dài 4096 ký tự
  category: Category; // Thể loại sản phẩm (liên kết với Category)
  brand: Brand; // Thương hiệu (liên kết với Brand)
  warranty: Warranty; // Bảo hành sản phẩm (liên kết với Warranty)
  image: string;
  status: string; // Trạng thái sản phẩm (đang giao dịch, ngưng giao dịch,đã xóa)
  unit: string; // Tên sản phẩm với độ dài 256 ký tự
}

export interface ProductRequest {
  id: number; // Khoá chính, được sinh tự động
  name: string; // Tên sản phẩm với độ dài 256 ký tự
  unit: string; // Đơn vị sản phẩm
  image: string; // Đường dẫn ảnh sản phẩm
  weight: string; // Khối lượng sản phẩm
  description: string; // Mô tả sản phẩm với độ dài 4096 ký tự
  categoryId: number; // Thể loại sản phẩm (liên kết với Category)
  brandId: number; // Thương hiệu (liên kết với Brand)
  warrantyId: number; // Bảo hành sản phẩm (liên kết với Warranty)
  status: string; // Trạng thái sản phẩm (đang giao dịch, ngưng giao dịch,đã xóa)
}

export interface ProductWithVariants extends Product {
  variants: Variants[]; // Danh sách phiên bản của sản phẩm
}
