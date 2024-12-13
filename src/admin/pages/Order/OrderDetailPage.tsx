import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrderResponseById,
  updateOrder,
  updateReturnOrder,
} from "../../../api/orderApi";
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
  const [resetFilter, setResetFilter] = useState(false);
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

  const stepStatusMap: { [key: string]: number } = {
    "Chờ duyệt": 0,
    "Đang giao": 1,
    "Hoàn thành": 2, // Cả "Hoàn thành" và "Đã hủy" đều có chỉ số 2
    "Đã hủy": 2,
    "Trả hàng": 3, // Trạng thái "Trả hàng" có chỉ số 3
  };

  const activeStep = stepStatusMap[orderRequest.orderStatus] || 0;

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
    // Nếu đang chuyển từ "Chờ duyệt" sang "Đang giao"
    if (
      newStatus === "Đang giao" &&
      orderRequest?.orderStatus === "Chờ duyệt"
    ) {
      // Duyệt qua các chi tiết đơn hàng và kiểm tra xem có phần tử nào trong imeiMap có imeiCode là '0' không
      const incompleteImei = orderDetails.some((detail) =>
        detail.imeiMap.some(
          (imeiItem: { imeiCode: string }) => imeiItem.imeiCode === "0"
        )
      );

      if (incompleteImei) {
        showSnackbar(
          "Vui lòng nhập đầy đủ IMEI cho các sản phẩm trước khi chuyển sang trạng thái 'Đang giao'"
        );
        setResetFilter(true);
        return; // Không cho phép chuyển trạng thái nếu còn thiếu IMEI
      }
    }
    setResetFilter(false);
    // Cập nhật trạng thái nếu thỏa điều kiện
    setOrderRequest((prev) =>
      prev ? { ...prev, orderStatus: newStatus } : null
    );
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

      // Cập nhật thông tin đơn hàng
      if (orderRequest && orderRequest.id !== undefined) {
        await updateOrder(orderRequest.id, orderRequest);
        // Kiểm tra nếu trạng thái đơn hàng là "Trả hàng"
        if (orderRequest?.orderStatus === "Trả hàng") {
          try {
            // Duyệt qua từng orderDetail trong orderDetails
            for (const detail of orderDetails) {
              // Duyệt qua từng imeiMap của orderDetail
              for (const imeiMapItem of detail.imeiMap) {
                const { variantId, imeiId } = imeiMapItem; // Lấy variantId và imeiId từ imeiMap

                // Gọi API để cập nhật trạng thái của đơn hàng
                await updateReturnOrder(variantId, imeiId);
              }
            }
          } catch (error) {
            console.error("Lỗi khi cập nhật đơn trả hàng:", error);
            showSnackbar("Đã xảy ra lỗi khi cập nhật đơn trả hàng.");
          }
        }
        showSnackbar("Cập nhật đơn hàng thành công!");
      } else {
        console.error("Order ID is undefined");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }

    if (orderRequest?.orderStatus === "Đang giao") {
      // Duyệt qua orderDetails và imeiMap để gọi hàm updateOrderDetail
      for (const detail of orderDetails) {
        for (const imeiMapItem of detail.imeiMap) {
          // Kiểm tra imeiId và gọi hàm updateOrderDetail nếu có
          if (imeiMapItem.imeiId && imeiMapItem.imeiCode !== "0") {
            try {
              // Gọi updateOrderDetail với orderDetailId và imeiId
              await updateOrderDetail(
                imeiMapItem.orderDetailId,
                imeiMapItem.imeiId
              );
            } catch (error) {
              console.error("Lỗi khi cập nhật order detail:", error);
            }
          }
        }
      }
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
        orderStatus={orderRequest.orderStatus} // Truyền trạng thái đơn hàng
        formatOrderId={(id) => `ORD${id.toString().padStart(4, "0")}`}
      />

      <OrderInformation
        orderDetail={orderRequest}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
        StatusOptions={(() => {
          if (orderRequest.orderStatus === "Chờ duyệt") {
            // Nếu trạng thái là "Chờ duyệt", cho phép chọn "Đang giao", "Hoàn thành", "Hủy đơn"
            return [
              { value: "Đang giao", label: "Đang giao" },
              { value: "Hoàn thành", label: "Hoàn thành" },
              { value: "Đã hủy", label: "Hủy đơn" },
            ];
          } else if (orderRequest.orderStatus === "Đang giao") {
            // Nếu trạng thái là "Đang giao", chỉ cho phép chọn "Hoàn thành"
            return [{ value: "Hoàn thành", label: "Hoàn thành" }];
          } else if (orderRequest.orderStatus === "Hoàn thành") {
            // Nếu trạng thái là "Hoàn thành", chỉ cho phép chọn "Trả hàng"
            return [{ value: "Trả hàng", label: "Trả hàng" }];
          }
          return []; // Trả về mảng rỗng nếu không có trạng thái phù hợp
        })()}
        PaymentStatusOptions={[
          { value: "Chưa thanh toán", label: "Chưa thanh toán" },
          { value: "Đã thanh toán", label: "Đã thanh toán" },
        ]}
        handleFilterOrderStatus={handleUpdateOrderStatus}
        handleFilterPaymentStatus={handleUpdatePaymentStatus}
        currencyFormatter={currencyFormatter}
        resetFilter={resetFilter}
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
