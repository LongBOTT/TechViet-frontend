// src/api/errorHandler.ts
export const handleApiError = (error: any, action: string) => {
  if (error.response.status === 404) {
    console.error("Tài nguyên không tồn tại.");
    return false;
  }

  if (error.response && error.response.status) {
    const status = error.response.status;
    if (status >= 400 && status < 500) {
      throw new Error(`Lỗi phía người dùng khi ${action}`);
    } else if (status >= 500) {
      throw new Error(`Lỗi phía máy chủ khi ${action}`);
    }
  } else {
    throw new Error(`Lỗi không xác định khi ${action}`);
  }
};
