import axiosInstance from ".";
import { Attribute } from "../types/attribute";
import { handleApiError } from "./errorHandler";

// Gọi API thêm thuộc tính và trả về dữ liệu từ server
export const addAttribute = async (attribute: Attribute): Promise<Attribute> => {
  try {
    const response = await axiosInstance.post("/attributes", attribute);
    return response.data; // Trả về dữ liệu thuộc tính đã thêm từ server
  } catch (error: any) {
    handleApiError(error, "thêm thuộc tính");
    throw error; 
  }
};
