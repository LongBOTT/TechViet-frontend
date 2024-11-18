import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Paper,
  Divider,
  Button,
  Grid,
  CircularProgress,
  Modal,
  Alert,
  AlertColor,
} from "@mui/material";
import { Order } from "../../types/order";
import { getAllOrders, getOrderById, updateOrder } from "../../api/orderApi";
import { OrderDetail } from "../../types/orderDetail";
import {
  searchOrderDetailBy_OrderId,
} from "../../api/orderDetailApi";
import { searchVariantBy_Id } from "../../api/variantApi";
import ReasonDialog from "../../assets/utils/ReasonDialog";

const OrdersPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [sampleOrders, setSampleOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [orderDetailsWithVariant, setOrderDetailsWithVariant] = useState<{
    [key: number]: {
      details: OrderDetail[];
      variantNames: { [key: number]: string };
      variantImages: { [key: number]: string };
    };
  }>({});
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const LoadingIndicator = () => (
    <Box
      marginTop={"20px"}
      width={"100%"}
      height={"100%"}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );

  const loadOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("phone");
      if (!token) return;

      const orderList = await getAllOrders();
      if (orderList && orderList.length > 0) {
        const orderListByCustomer = orderList.filter((order: Order) => {
          return order.customer.phone === token;
        });

        if (orderListByCustomer.length > 0) {
          setSampleOrders(orderListByCustomer);
          setFilteredOrders(orderListByCustomer);

          // Load order details and variant names
          const orderDetailsMap: {
            [key: number]: {
              details: OrderDetail[];
              variantNames: { [key: number]: string };
              variantImages: { [key: number]: string };
            };
          } = {};

          for (const order of orderListByCustomer) {
            const orderDetails = await searchOrderDetailBy_OrderId(order.id);
            const variantNames: { [key: number]: string } = {};
            const variantImages: { [key: number]: string } = {};
            if (orderDetails && orderDetails.length > 0) {
              for (const detail of orderDetails) {
                const variant = await searchVariantBy_Id(detail.variantId);
                if (variant) {
                  variantNames[detail.variantId] = variant.name;
                  variantImages[detail.variantId] = variant.image;
                }
              }
              orderDetailsMap[order.id] = {
                details: orderDetails,
                variantNames,
                variantImages,
              };
            }
          }
          console.log(orderDetailsMap);
          setOrderDetailsWithVariant(orderDetailsMap);
        }
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    const filtered = sampleOrders.filter((order) => {
      switch (tabIndex) {
        case 1:
          return order.orderStatus === "Chờ duyệt";
        case 2:
          return order.orderStatus === "Đang giao";
        case 3:
          return order.orderStatus === "Hoàn tất";
        case 4:
          return order.orderStatus === "Đã huỷ";
        case 5:
          return order.orderStatus === "Trả hàng";
        default:
          return true;
      }
    });
    setFilteredOrders(filtered);
  }, [tabIndex, sampleOrders]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  };

  // Hàm xử lý hủy đơn hàng
  const handleCancelOrder = (
    order: Order,
    setOpenReasonDialog: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>
  ) => {
    setNote("Đã huỷ")
    setSelectedOrder(order);
    setOpenReasonDialog(true);
  };

  // Hàm xử lý gửi lý do và cập nhật đơn hàng
  const submitReason = async (order: Order, reason: string) => {
    try {
      if (order.id) {
        const selectedOrder = await getOrderById(order.id);
        if (selectedOrder) {
          selectedOrder.orderStatus = note;
          selectedOrder.note = reason; // Cập nhật ghi chú với lý do đã nhập
          await updateOrder(order.id, selectedOrder); // Gọi API để cập nhật đơn hàng
          await loadOrders();
          setSeverity("success");
          setAlertMessage("Cập nhật đơn hàng thành công.");
        }

      }
      // Cập nhật trạng thái nếu cần
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn hàng:", error);
      setSeverity("error");
      setAlertMessage("Cập nhật đơn hàng không thành công.");
    }
  };

  const handleReturnOrder = (
    order: Order,
    setOpenReasonDialog: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>
  ) => {
    setNote("Trả hàng")
    setSelectedOrder(order);
    setOpenReasonDialog(true);
  };

  // Hàm phụ trợ để hiện popup nhập lý do
  const promptForReason = (title: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const input = window.prompt(title, ""); // Sử dụng window.prompt để nhập lý do
      resolve(input ? input.trim() : null);
    });
  };
  const [openReasonDialog, setOpenReasonDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
   const [alertMessage, setAlertMessage] = useState<string | null>(null);
   // Clear the alert after 3 seconds
   // Clear the alert and navigate after 5 seconds
   useEffect(() => {
     if (alertMessage) {
       const timer = setTimeout(() => setAlertMessage(null), 2500);
       return () => clearTimeout(timer);
     }
   }, [alertMessage]);
  return (
    <Box sx={{ p: 3 }}>
      {/* Centered Modal Alert */}
      <Modal
        open={Boolean(alertMessage)}
        onClose={() => setAlertMessage(null)}
        aria-labelledby="alert-message"
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(3px)", // Optional: blur background
        }}
      >
        <Alert severity={severity} sx={{ mb: 2 }}>
          <Typography id="alert-message">{alertMessage}</Typography>
        </Alert>
      </Modal>
      {selectedOrder && (
        <ReasonDialog
          open={openReasonDialog}
          onClose={() => setOpenReasonDialog(false)}
          onSubmit={(reason) => {
            if (selectedOrder) {
              submitReason(selectedOrder, reason);
            }
          }}
        />
      )}
      <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
        Đơn hàng của tôi
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        sx={{
          "& .Mui-selected": {
            color: "red",
            fontWeight: "bold",
          },
          "& .MuiTabs-indicator": {
            color: "red",
            backgroundColor: "red",
          },
        }}
      >
        <Tab label="Tất cả" />
        <Tab label="Chờ duyệt" />
        <Tab label="Đang giao" />
        <Tab label="Hoàn tất" />
        <Tab label="Đã huỷ" />
        <Tab label="Trả hàng" />
      </Tabs>
      <Divider sx={{ my: 2 }} />

      {loading ? (
        <LoadingIndicator />
      ) : filteredOrders.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h6">Bạn chưa có đơn hàng nào</Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 3 }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Khám phá ngay
          </Button>
        </Box>
      ) : (
        filteredOrders.map((order: Order) => (
          <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary">
                  {formatDateTime(order.orderDate)} &bull;{" "}
                  {orderDetailsWithVariant[order.id ?? 0]?.details.length || 0}{" "}
                  sản phẩm
                </Typography>
                <Typography
                  variant="body2"
                  color="green"
                  sx={{ textAlign: "right" }}
                >
                  {order.orderStatus}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                {orderDetailsWithVariant[order.id ?? 0]?.details.map(
                  (item: OrderDetail) => (
                    <Box
                      key={item.id}
                      sx={{
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        padding: 2,
                        marginBottom: 2,
                      }}
                    >
                      <img
                        src={
                          orderDetailsWithVariant[order.id ?? 0]?.variantImages[
                            item.variantId
                          ] || "Tên sản phẩm không có sẵn"
                        }
                        alt={
                          orderDetailsWithVariant[order.id ?? 0]?.variantNames[
                            item.variantId
                          ] || "Tên sản phẩm không có sẵn"
                        }
                        width={80}
                      />
                      <Box sx={{ ml: 2, flex: 1 }}>
                        <Typography variant="h6">
                          {orderDetailsWithVariant[order.id ?? 0]?.variantNames[
                            item.variantId
                          ] || "Tên sản phẩm không có sẵn"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Số lượng: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography variant="h6" color="error">
                        {item.price
                          ? item.price.toLocaleString("vi-VN")
                          : "N/A"}{" "}
                      </Typography>
                    </Box>
                  )
                )}
              </Grid>

              <Grid item xs={12}>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Typography variant="h6" color="error" fontWeight="bold">
                    Thành tiền: {order.total_amount.toLocaleString("vi-VN")} đ
                  </Typography>
                  {order.orderStatus === "Chờ duyệt" && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleCancelOrder(
                          order,
                          setOpenReasonDialog,
                          setSelectedOrder
                        )
                      }
                    >
                      Hủy đơn hàng
                    </Button>
                  )}
                  {order.orderStatus === "Hoàn tất" && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleReturnOrder(
                          order,
                          setOpenReasonDialog,
                          setSelectedOrder
                        )
                      }
                    >
                      Trả hàng
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default OrdersPage;
