import axiosInstance from "./index";
import { handleApiError } from "./errorHandler"; // Hàm xử lý lỗi
import { Variant_Attribute } from "../types/variant_attribute";

// Gọi API lấy danh sách Tìm kiếm theo ID biến thể
export const searchVariant_AttributeByVariant = async (variantID: number) => {
  try {
    const response = await axiosInstance.get<Variant_Attribute[]>(
      `/variant_attributes/search/variant/variantID?variantID=${variantID}`  // Đúng với định nghĩa trong Backend
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "Tìm kiếm theo ID biến thể");
  }
};
