import * as React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { getOrderResponseById } from "../../../api/orderApi";
import FilterDropdown from "../../components/Util/FilterDropdown";
import { currencyFormatter } from "../../components/Util/Formatter";

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [orderDetail, setOrderDetail] = useState<any>(null);

  // Xác định chỉ số bước hiện tại
  const stepStatusMap: { [key: string]: number } = {
    "Chờ duyệt": 0,
    "Chuẩn bị hàng": 1,
    "Đang giao": 2,
    "Hoàn thành": 3,
    "Hủy đơn": 4,
  };

  // Kiểm tra nếu orderDetail tồn tại trước khi lấy orderStatus
  const activeStep = orderDetail
    ? stepStatusMap[orderDetail.orderStatus] || 0
    : 0;
  const isCancelled = orderDetail
    ? orderDetail.orderStatus === "Hủy đơn"
    : false;

  const steps = [
    "Chờ duyệt",
    "Chuẩn bị hàng",
    "Đang giao",
    isCancelled ? "Hủy đơn" : "Hoàn thành",
  ];
  // Hàm format ID thành dạng ORD0001
  const formatOrderId = (orderId: number) => {
    return `ORD${orderId.toString().padStart(4, "0")}`;
  };
  const onSave = async () => {
    console.log("Lưu đơn hàng");
  };

  const onCancel = () => {
    console.log("Hủy");
  };

  const onGoBack = () => {
    navigate("/order");
  };

  React.useEffect(() => {
    if (id) {
      const fetchOrderDetail = async () => {
        try {
          const data = await getOrderResponseById(Number(id));
          setOrderDetail(data);
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết phiếu nhập:", error);
        }
      };

      fetchOrderDetail();
    }
  }, [id]);
  const StatusOptions = [
    { value: "Chờ duyệt", label: "Chờ duyệt" },
    { value: "Chuẩn bị hàng", label: "Chuẩn bị hàng" },
    { value: "Đang giao", label: "Đang giao" },
    { value: "Hoàn thành", label: "Hoàn thành" },
  ];
  const PaymentStatusOptions = [
    { value: "Chưa thanh toán", label: "Chưa thanh toán" },
    { value: "Đã thanh toán", label: "Đã thanh toán" },
  ];
  const handleFilterOrderStatus = async (value: string) => {};
  // Hiển thị loading nếu orderDetail chưa được tải lên
  if (!orderDetail) {
    return (
      <Box sx={{ textAlign: "center", p: 2 }}>
        <Typography>Đang tải dữ liệu...</Typography>
      </Box>
    );
  }
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(orderDetail.orderDate));

  const formattedTime = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(orderDetail.orderDate));
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
          {/* <Button
            onClick={onCancel}
            variant="outlined"
            startIcon={<CloseIcon />}
            sx={{
              textTransform: "none",
              mr: 1,
              height: 40,
              width: 100,
              color: "rgb(255, 0, 0)",
              borderColor: "rgb(255, 0, 0)",
            }}
          >
            Hủy
          </Button> */}
        </Box>
      </Box>

      {/* Order status */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box
          alignItems="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            width: "200px",
            marginLeft: "10px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            {formatOrderId(orderDetail.id)}
          </Typography>
          <Button variant="outlined" startIcon={<PrintIcon />}>
            In đơn hàng
          </Button>
        </Box>
        <Box sx={{ width: "50%", marginTop: 2, marginRight: "20px" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index} completed={activeStep > index}>
                <StepLabel
                  icon={
                    index === activeStep && isCancelled ? (
                      <CancelIcon color="error" />
                    ) : (
                      index === activeStep &&
                      !isCancelled && <CheckCircleIcon color="primary" />
                    )
                  }
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>

      {/* Order Information */}
      <Box
        sx={{
          marginLeft: "50px",
          marginTop: "20px",
          width: "90%",
          height: "40%",
          borderRadius: "10px",
          bgcolor: "white",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid rgb(224, 224, 224)",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Thông tin đơn hàng
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {/* Ngày đặt hàng */}
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Ngày đặt hàng
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>
                  <span>{formattedDate}</span>
                  <span style={{ marginLeft: "10px" }}>{formattedTime}</span>
                </Typography>
              </Grid>

              {/* Người đặt hàng */}
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Người đặt hàng:
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{orderDetail.customer.name}</Typography>
              </Grid>

              {/* Số điện thoại */}
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Số điện thoại:
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{orderDetail.phone}</Typography>
              </Grid>

              {/* Địa chỉ */}
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: "bold" }}>Địa chỉ:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{orderDetail.address}</Typography>
              </Grid>

              {/* Ghi chú */}
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: "bold" }}>Ghi chú:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{orderDetail.note}</Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ width: "60%", marginTop: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>
                  <strong>Trạng thái đơn hàng:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ minWidth: "200px" }}>
                  <FilterDropdown
                    label="Trạng thái đơn"
                    options={StatusOptions}
                    onFilterChange={handleFilterOrderStatus}
                    selectedValue={orderDetail.orderStatus}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <strong>Trạng thái thanh toán:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ minWidth: "200px" }}>
                  <FilterDropdown
                    label="Thanh toán"
                    options={PaymentStatusOptions}
                    onFilterChange={handleFilterOrderStatus}
                    selectedValue={orderDetail.payment_status}
                  />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <strong>Phương thức thanh toán:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{orderDetail.payment_method}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>
                  <strong>Tổng tiền:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {currencyFormatter.format(orderDetail.total_amount)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          marginLeft: "50px",
          marginTop: "20px",
          width: "90%",
          height: "40%",
          borderRadius: "10px",
          bgcolor: "white",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid rgb(224, 224, 224)",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Chi tiết đơn hàng</Typography>
        </Box>

        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ tableLayout: "fixed", width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "30%" }}>Tên sản phẩm</TableCell>
                  <TableCell sx={{ width: "15%", textAlign: "center" }}>
                    Số lượng
                  </TableCell>
                  <TableCell sx={{ width: "20%", textAlign: "center" }}>
                    Thành tiền
                  </TableCell>
                  <TableCell sx={{ width: "15%", textAlign: "center" }}>
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
