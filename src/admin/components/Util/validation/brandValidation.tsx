import { Brand } from "../../../../types/brand";
import {
  isNotEmpty,
} from "./commonValidation";

// Kiểm tra thông tin nhà cung cấp có hợp lệ hay không
export const validateBrand = (brand: Brand): string | null => {
  if (!isNotEmpty(brand.name)) {
    return "Tên thương hiệu không được để trống";
  }
  return null; // Dữ liệu hợp lệ
};
