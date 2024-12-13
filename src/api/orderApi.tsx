import axiosInstance from ".";
import { Order } from "../types/order";
import { handleApiError } from "./errorHandler";

export const addOrder = async (order: Order) => {
  try {
    const response = await axiosInstance.post("/orders", order);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating order:",
      error.response?.data || error.message
    );
    handleApiError(error, "thêm đơn hàng mới");

  }
};

// Hàm lấy thông tin một đơn hàng theo ID
export const getOrderById = async (id: number): Promise<Order | null> => {
  try {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return null;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders");
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách đơn hàng");
  }
};

export const getOrdersByKeyword = async (keyword: string) => {
  try {
    const response = await axiosInstance.get(
      `/orders/search/findOrdersByKeyword?search=${keyword}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách đơn hàng");
  }
};
export const getOrderResponseById = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `/orders/getOrderResponseById/${id}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách đơn hàng");
  }
};
export const getOrderByStatus = async (status: string) => {
  try {
    const response = await axiosInstance.get(
      `/orders/search/status?status=${status}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách đơn hàng");
  }
};

export const getOrderByPaymentMethod = async (paymentMethod: string) => {
  try {
    const response = await axiosInstance.get(
      `/orders/search/payment_method?paymentMethod=${paymentMethod}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy danh sách đơn hàng");
  }
};

export const updateOrder = async (id: number, order: Order) => {
  try {
    const response = await axiosInstance.put(`/orders/${id}`, order);
    return response.data;
  } catch (error: any) {
    handleApiError(error, "cập nhật đơn hàng");
    throw error; // Quăng lỗi để xử lý ở phía gọi hàm
  }
}

export const reportOverview = async () => {
  try {
    const response = await axiosInstance.get("/orders/statistics");
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy báo cáo tổng quan");
  }
}

export const getStatistics = async (start: string, end: string) => {
  try {
    const response = await axiosInstance.get("/orders/statistics-revenue", {
      params: {
        startDate: start,  
        endDate: end,      
      },
    });
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy báo cáo kết quả kinh doanh");
  }
};



export const getProductSalesStatisticsByDate = async (start: String, end:String) => {
  try {
    const response = await axiosInstance.get("/orders/statistics-product-sales",{
      params: {
        startDate: start,  
        endDate: end,      
      },
    });
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy báo cáo kết quả kinh doanh sản phẩm");
  }
}

export const getCategorySalesStatisticsByDate = async (start: String, end:String) => {
  try {
    const response = await axiosInstance.get("/orders/statistics-category-sales",{
    params: {
      startDate: start,  
      endDate: end,      
    },
  });
    return response.data;
  } catch (error: any) {
    handleApiError(error, "lấy báo cáo kết quả kinh doanh thể loại");
  }
}
