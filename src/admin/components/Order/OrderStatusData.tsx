// components/OrderStatusData.tsx
import React from "react";
import { Box, Button, Stepper, Step, StepLabel, Typography } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface OrderStatusDataProps {
  orderId: number;
  activeStep: number;
  isCancelled: boolean;
  steps: string[];
  formatOrderId: (orderId: number) => string;
}

const OrderStatusData: React.FC<OrderStatusDataProps> = ({ orderId, activeStep, isCancelled, steps, formatOrderId }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
      <Box alignItems="center" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", width: "200px", marginLeft: "10px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
          {formatOrderId(orderId)}
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
                    index === activeStep && !isCancelled && <CheckCircleIcon color="primary" />
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
  );
};

export default OrderStatusData;
