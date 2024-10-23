import { Product } from "../../../../types/product";
import {
  isNotEmpty,
} from "./commonValidation";


export const validateProduct = (product: Product): string | null => {
  if (!isNotEmpty(product.name)) {
    return "Tên sản phẩm không được để trống";
  }
  return null; // Dữ liệu hợp lệ
};