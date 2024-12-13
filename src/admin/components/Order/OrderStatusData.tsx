import React from "react";
import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay"; // Icon cho "Trả hàng"

interface OrderStatusDataProps {
  orderId: number;
  activeStep: number;
  orderStatus: string;  // Sử dụng orderStatus để xác định trạng thái đơn hàng
  formatOrderId: (orderId: number) => string;
}

const OrderStatusData: React.FC<OrderStatusDataProps> = ({ orderId, activeStep, orderStatus, formatOrderId }) => {
  console.log("orderStatus:", orderStatus);
  console.log("activeStep:", activeStep);

  // Xác định các bước thanh trạng thái động dựa vào trạng thái đơn hàng
  const dynamicSteps = [
    "Chờ duyệt", // Bước đầu tiên cố định
    "Đang giao",  // Bước thứ hai cố định
    orderStatus === "Hoàn thành" ? "Hoàn thành" : orderStatus === "Đã hủy" ? "Đã hủy" : "Hoàn thành", // Bước thứ ba thay đổi theo trạng thái đơn hàng
    orderStatus === "Trả hàng" ? "Trả hàng" : "", // Thêm bước "Trả hàng" nếu trạng thái là "Trả hàng"
  ].filter(step => step !== ""); // Lọc bỏ các bước rỗng nếu trạng thái không phải "Trả hàng"

  console.log("dynamicSteps:", dynamicSteps); // Kiểm tra các bước đã lọc

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
      <Box alignItems="center" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", width: "200px", marginLeft: "10px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
          {formatOrderId(orderId)}
        </Typography>
      </Box>
      <Box sx={{ width: "50%", marginTop: 2, marginRight: "20px" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {dynamicSteps.map((label, index) => (
            <Step key={index} completed={activeStep > index}>
              <StepLabel
                icon={
                  index === activeStep && orderStatus === "Đã hủy" ? (
                    <CancelIcon color="error" /> // Icon hủy đơn
                  ) : index === activeStep && orderStatus === "Hoàn thành" ? (
                    <CheckCircleIcon color="primary" /> // Icon hoàn thành
                  ) : index === activeStep && orderStatus === "Trả hàng" ? (
                    <ReplayIcon color="secondary" /> // Icon trả hàng
                  ) : null
                }
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};

export default OrderStatusData;
