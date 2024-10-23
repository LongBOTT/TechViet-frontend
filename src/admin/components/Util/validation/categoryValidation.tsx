import { Category } from "../../../../types/category";
import {
  isNotEmpty,
} from "./commonValidation";


export const validateBrand = (categry: Category): string | null => {
  if (!isNotEmpty(categry.name)) {
    return "Tên thương hiệu không được để trống";
  }
  return null; // Dữ liệu hợp lệ
};