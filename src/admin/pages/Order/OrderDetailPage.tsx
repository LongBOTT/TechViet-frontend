// pages/OrderDetailPage.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderResponseById, updateOrder } from "../../../api/orderApi";
import { currencyFormatter } from "../../components/Util/Formatter";
import OrderStatus from "../../components/Order/OrderStatusData";
import { OrderRequest, PaymentMethod } from "../../../types/order";
import { OrderDetailRequest } from "../../../types/orderDetail";
import OrderItemsTable from "../../components/Order/OrderItemsTable";
import OrderInformation from "../../components/Order/OrderInformation";
import { updateOrderDetail } from "../../../api/orderDetailApi";
import { updateImeiStatus } from "../../../api/imeiApi";
interface ImeiInfo {
  id: number;
  imeiCode: string;
}

const OrderDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [orderRequest, setOrderRequest] = useState<OrderRequest | null>(null);
  const [orderDetails, setOrderDetails] = useState<any[]>([]);

  // Bản đồ trạng thái đơn hàng thành bước
  const stepStatusMap: { [key: string]: number } = {
    "Chờ duyệt": 0,
    "Chuẩn bị hàng": 1,
    "Đang giao": 2,
    "Hoàn thành": 3,
    "Hủy đơn": 4,
  };
  function transformOrderDataToRequests(orderData: any) {
    const transformedOrderRequest: OrderRequest = {
      // Thông tin tổng quan của đơn hàng
      id: orderData.id,
      customer: orderData.customer,
      orderDate: orderData.orderDate,
      total_amount: orderData.total_amount,
      orderStatus: orderData.orderStatus,
      payment_status: orderData.payment_status,
      payment_method: orderData.payment_method,
      note: orderData.note,
      address: orderData.address,
      phone: orderData.phone || orderData.customer.phone,
    };

    // Tạo transformedOrderDetail
    const variantMap: { [key: number]: any } = {};

    orderData.orderDetailResponseList.forEach((detail: any) => {
      const variantId = detail.variant.id;

      if (!variantMap[variantId]) {
        variantMap[variantId] = {
          variantId: variantId,
          variantName: detail.variant.name,
          quantity: 0,
          price: detail.price,
          total: detail.total_amount,
          imeiMap: {},
          imeis: detail.imeis, // Lấy danh sách imeis của phần tử đầu tiên có cùng variantId
        };
      }

      // Cộng dồn quantity
      variantMap[variantId].quantity += detail.quantity;

      // Thêm imei vào imeiMap, lấy id và imeiCode tương ứng
      variantMap[variantId].imeiMap[detail.id] = detail.imei
        ? { id: detail.imei.id, imeiCode: detail.imei.imeiCode }
        : null;
    });

    // Chuyển đổi đối tượng variantMap thành mảng
    const transformedOrderDetails = Object.values(variantMap);

    return {
      orderRequest: transformedOrderRequest,
      orderDetails: transformedOrderDetails,
    };
  }

  useEffect(() => {
    if (id) {
      const fetchOrderDetail = async () => {
        try {
          const data = await getOrderResponseById(Number(id));
          const { orderRequest, orderDetails } =
            transformOrderDataToRequests(data);

          setOrderRequest(orderRequest);
          setOrderDetails(orderDetails);
          console.log("orderRequest:", orderRequest);
          console.log("orderDetails:", orderDetails);
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết phiếu nhập:", error);
        }
      };

      fetchOrderDetail();
    }
  }, [id]);

  if (!orderRequest) {
    return (
      <Box sx={{ textAlign: "center", p: 2 }}>
        <Typography>Đang tải dữ liệu...</Typography>
      </Box>
    );
  }

  // Xác định chỉ số bước hiện tại từ trạng thái đơn hàng
  const activeStep = stepStatusMap[orderRequest.orderStatus] || 0;
  const isCancelled = orderRequest.orderStatus === "Hủy đơn";

  // Các bước trạng thái đơn hàng
  const steps = [
    "Chờ duyệt",
    "Chuẩn bị hàng",
    "Đang giao",
    isCancelled ? "Hủy đơn" : "Hoàn thành",
  ];

  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(orderRequest.orderDate));

  const formattedTime = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(orderRequest.orderDate));

  // Hàm cập nhật trạng thái đơn hàng
  const handleUpdateOrderStatus = (newStatus: string) => {
    if (orderRequest) {
      setOrderRequest((prev) =>
        prev ? { ...prev, orderStatus: newStatus } : null
      );
    }
  };

  // Hàm cập nhật trạng thái thanh toán
  const handleUpdatePaymentStatus = (newPaymentStatus: string) => {
    if (orderRequest) {
      setOrderRequest((prev) =>
        prev ? { ...prev, payment_status: newPaymentStatus } : null
      );
    }
  };

  // Thêm hàm cập nhật IMEI vào OrderDetailPage
  const handleImeiUpdate = (
    orderDetailId: number,
    selectedImeis: Array<{ id: number; imei: string }>
  ) => {
    setOrderDetails((prevDetails) =>
      prevDetails.map((detail) => {
        if (detail.variantId === orderDetailId) {
          // Cập nhật imeiMap với các IMEI được chọn
          detail.imeiMap = selectedImeis.reduce((map, imei) => {
            map[orderDetailId] = { id: imei.id, imeiCode: imei.imei };
            return map;
          }, {} as { [key: number]: { id: number; imeiCode: string } | null });
        }
        return detail;
      })
    );
  };
  const onGoBack = () => {
    navigate("/order");
  };
  // Hàm chuyển đổi chuỗi tiếng Việt thành enum PaymentMethod
  const convertPaymentMethod = (method: string): PaymentMethod => {
    switch (method) {
      case "Tiền mặt":
        return PaymentMethod.Cash;
      case "Chuyển khoản":
        return PaymentMethod.BankTransfer;
      default:
        throw new Error("Phương thức thanh toán không hợp lệ");
    }
  };
  const onSave = async () => {
    console.log("Lưu đơn hàng với chi tiết cập nhật:", orderRequest);
    console.log("Chi tiết đơn hàng cập nhật:", orderDetails);

    try {
      // const updatePromises = [];

      // for (const detail of orderDetails) {
      //   for (const [orderDetailId, imeiInfo] of Object.entries(detail.imeiMap)) {
      //     const imei = imeiInfo as { id: number; imeiCode: string } | null;

      //     if (imei && imei.id) {
      //       // Tạo promise cho từng yêu cầu updateOrderDetail và updateImeiStatus
      //       updatePromises.push(updateOrderDetail(Number(orderDetailId), imei.id));
      //       updatePromises.push(updateImeiStatus(imei.id));
      //     }
      //   }
      // }

      // // Thực hiện tất cả các API call đồng thời
      // await Promise.all(updatePromises);
      // console.log("Cập nhật chi tiết đơn hàng và trạng thái IMEI thành công");
      // Chuyển đổi payment_method thành enum hợp lệ trước khi gửi
      // Gọi hàm chuyển đổi trước khi cập nhật payment_method
      if (orderRequest) {
        try {
          orderRequest.payment_method = convertPaymentMethod(
            orderRequest.payment_method as unknown as string
          );
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error("Unknown error", error);
          }
        }
      }
      if (orderRequest && orderRequest.id !== undefined) {
        await updateOrder(orderRequest.id, orderRequest);
      } else {
        console.error("Order ID is undefined");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "rgb(249, 249, 249)" }}>
      {/* Header */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgb(255, 255, 255)",
          overflowY: "auto",
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onGoBack}
          sx={{ color: "black", textTransform: "none" }}
        >
          <Typography sx={{ fontFamily: "Roboto", fontWeight: "bold" }}>
            Quay lại Danh Sách Đơn hàng
          </Typography>
        </Button>

        <Box sx={{ ml: "auto", display: "flex" }}>
          <Button
            onClick={onSave}
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              textTransform: "none",
              mr: 1,
              height: 40,
              width: 100,
              bgcolor: "rgb(25, 118, 210)",
            }}
          >
            Lưu
          </Button>
        </Box>
      </Box>
      <OrderStatus
        orderId={orderRequest.id || 0}
        activeStep={activeStep}
        isCancelled={isCancelled}
        steps={steps}
        formatOrderId={(id) => `ORD${id.toString().padStart(4, "0")}`}
      />
      <OrderInformation
        orderDetail={orderRequest}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
        StatusOptions={[
          { value: "Chờ duyệt", label: "Chờ duyệt" },
          { value: "Chuẩn bị hàng", label: "Chuẩn bị hàng" },
          { value: "Đang giao", label: "Đang giao" },
          { value: "Hoàn thành", label: "Hoàn thành" },
        ]}
        PaymentStatusOptions={[
          { value: "Chưa thanh toán", label: "Chưa thanh toán" },
          { value: "Đã thanh toán", label: "Đã thanh toán" },
        ]}
        handleFilterOrderStatus={handleUpdateOrderStatus}
        handleFilterPaymentStatus={handleUpdatePaymentStatus}
        currencyFormatter={currencyFormatter}
      />
      <OrderItemsTable
        orderDetails={orderDetails}
        onImeiUpdate={handleImeiUpdate}
      />
    </Box>
  );
};

export default OrderDetailPage;
