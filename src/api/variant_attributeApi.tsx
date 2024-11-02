import axiosInstance from "./index";
import { handleApiError } from "./errorHandler"; // Hàm xử lý lỗi
import { Variant_Attribute, VariantAttributeRequest } from "../types/variant_attribute";

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
// Goij API thêm variant_attribute và trả về dữ liệu từ server
export const addVariantAttribute = async (variant_attribute: VariantAttributeRequest): Promise<VariantAttributeRequest> => {
  try {
    const response = await axiosInstance.post("/variant_attributes", variant_attribute);
    return response.data; // Trả về dữ liệu variant_attribute đã thêm từ server
  
  } catch (error: any) {
    handleApiError(error, "thêm variant_attribute");
    throw error;
  }
};
