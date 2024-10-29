import { Brand } from "./brand";
import { Category } from "./category";
import { Warranty } from "./warranty";

export interface Product {
  id: number;        // Khoá chính, được sinh tự động
  name: string;      // Tên sản phẩm với độ dài 256 ký tự
  weight: number;    // Khối lượng sản phẩm
  description: string; // Mô tả sản phẩm với độ dài 4096 ký tự
  category: Category;  // Thể loại sản phẩm (liên kết với Category)
  brand: Brand;        // Thương hiệu (liên kết với Brand)
  warranty: Warranty;  // Bảo hành sản phẩm (liên kết với Warranty)
  image: string
}