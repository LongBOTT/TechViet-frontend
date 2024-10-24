import { Category } from "../../../../types/category";
import { isNotEmpty } from "./commonValidation";

const validateCategory = (categry: Category): string | null => {
  if (!isNotEmpty(categry.name)) {
    return "Tên thể loại không được để trống";
  }
  return null; // Dữ liệu hợp lệ
};
export default validateCategory;
