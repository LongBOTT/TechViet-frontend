import { Supplier } from "../../../../types/supplier";
import {
  isValidEmail,
  isValidPhoneNumber,
  isNotEmpty,
} from "./commonValidation";

// Kiểm tra thông tin nhà cung cấp có hợp lệ hay không
export const validateSupplier = (supplier: Supplier): string | null => {
  if (!isNotEmpty(supplier.name)) {
    return "Tên nhà cung cấp không được để trống";
  }

  if (!isNotEmpty(supplier.phone)) {
    return "Số điện thoại không được để trống";
  } else if (!isValidPhoneNumber(supplier.phone)) {
    return "Số điện thoại không hợp lệ";
  }

  if (!isNotEmpty(supplier.email)) {
    return "Email không được để trống";
  } else if (!isValidEmail(supplier.email)) {
    return "Email không hợp lệ";
  }
  if (!isNotEmpty(supplier.address)) {
    return "Địa chỉ không được để trống";
  }
  return null; // Dữ liệu hợp lệ
};
