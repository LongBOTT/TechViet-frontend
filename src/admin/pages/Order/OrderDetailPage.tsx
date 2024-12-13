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
import LoadingSnackbar from "../../components/Util/LoadingSnackbar";

interface ImeiInfo {
  id: number;
  imeiCode: string;
}

const OrderDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [orderRequest, setOrderRequest] = useState<OrderRequest | null>(null);
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const stepStatusMap: { [key: string]: number } = {
    "Chờ duyệt": 0,
    "Đang giao": 1,
    "Hoàn thành": 2,
    "Đã hủy": 3,
    "Trả hàng": 4,
    
  };

  function transformOrderDataToRequests(orderData: any) {
    const transformedOrderRequest: OrderRequest = {
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
          imeiMap: [],
          imeis: detail.imeis,
        };
      }

      variantMap[variantId].quantity += detail.quantity;

      if (detail.imei) {
        variantMap[variantId].imeiMap.push({
          orderDetailId: detail.id,
          variantId: detail.variant.id,
          imeiId: detail.imei.id,
          imeiCode: detail.imei.imeiCode,
        });
      }
    });

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
          console.log("orderRequest", orderRequest);
          console.log("orderDetails", orderDetails);
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
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

  const activeStep = stepStatusMap[orderRequest.orderStatus] || 0;
  const isCancelled = orderRequest.orderStatus === "Đã hủy";
  const steps = [
    "Chờ duyệt",
    "Đang giao",
    isCancelled ? "Đã hủy" : "Hoàn thành",
    "Trả hàng"
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

  const handleUpdateOrderStatus = (newStatus: string) => {
    if (orderRequest) {
      setOrderRequest((prev) =>
        prev ? { ...prev, orderStatus: newStatus } : null
      );
    }
  };

  const handleUpdatePaymentStatus = (newPaymentStatus: string) => {
    if (orderRequest) {
      setOrderRequest((prev) =>
        prev ? { ...prev, payment_status: newPaymentStatus } : null
      );
    }
  };

  const handleImeiUpdate = (
    variantId: number,
    selectedImeis: Array<{ id: number; imei: string }>
  ) => {
    setOrderDetails((prevDetails) =>
      prevDetails.map((detail) => {
        if (detail.variantId === variantId) {
          // Tạo danh sách imeiCode đã chọn
          const selectedImeiCodes = selectedImeis.map((imei) => imei.imei);

          // Duyệt qua imeiMap để tìm phần tử đầu tiên có imeiCode là '0'
          for (let imeiMapItem of detail.imeiMap) {
            // Nếu imeiCode là '0' và chưa được cập nhật
            if (imeiMapItem.imeiCode === "0") {
              // Kiểm tra xem imeiCode hiện tại không có trong danh sách đã chọn
              if (!selectedImeiCodes.includes(imeiMapItem.imeiCode)) {
                // Lấy phần tử cuối cùng trong selectedImeis
                const lastSelectedImei =
                  selectedImeis[selectedImeis.length - 1];

                // Cập nhật imeiId và imeiCode từ phần tử cuối cùng trong selectedImeis
                imeiMapItem.imeiId = lastSelectedImei.id;
                imeiMapItem.imeiCode = lastSelectedImei.imei;
                break; // Dừng vòng lặp sau khi đã cập nhật phần tử đầu tiên có imeiCode = '0'
              }
            }
          }
        }
        return detail; // Trả về detail đã được cập nhật
      })
    );
  };

  const onGoBack = () => {
    navigate("/Admin/order");
  };

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
      // Cập nhật payment_method nếu có
      if (orderRequest) {
        try {
          orderRequest.payment_method = convertPaymentMethod(
            orderRequest.payment_method as unknown as string
          );
        } catch (error) {
          console.error(error instanceof Error ? error.message : error);
        }
      }

      // Duyệt qua orderDetails và imeiMap để gọi hàm updateOrderDetail
      for (const detail of orderDetails) {
        for (const imeiMapItem of detail.imeiMap) {
          // Kiểm tra imeiId và gọi hàm updateOrderDetail nếu có
          if (imeiMapItem.imeiId && imeiMapItem.imeiCode !== "0") {
            try {
              // Gọi updateOrderDetail với orderDetailId và imeiId
              await updateOrderDetail(imeiMapItem.orderDetailId, imeiMapItem.imeiId);
            } catch (error) {
              console.error("Lỗi khi cập nhật order detail:", error);
            }
          }
        }
      }

      // Cập nhật thông tin đơn hàng sau khi đã xử lý imei
      if (orderRequest && orderRequest.id !== undefined) {
        await updateOrder(orderRequest.id, orderRequest);
        showSnackbar("Cập nhật đơn hàng thành công!");
      } else {
        console.error("Order ID is undefined");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Box sx={{ width: "100%", bgcolor: "rgb(249, 249, 249)" }}>
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
          { value: "Đang giao", label: "Đang giao" },
          { value: "Hoàn thành", label: "Hoàn thành" },
          { value: "Đã hủy", label: "Hủy đơn" },
          { value: "Trả hàng", label: "Trả hàng" },
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
      <LoadingSnackbar
        loading={loading}
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default OrderDetailPage;
