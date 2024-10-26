import React from "react";
import { Box, Typography } from "@mui/material";

interface OrderStatusProps {
  label: string;
  count: number;
  value: string;
  countColor: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ label, count, value, countColor }) => {
  return (
    <Box sx={{ textAlign: "center", marginX: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Hiển thị label và count trên cùng hàng */}
        <Typography sx={{ color: "gray", marginRight: 1 }}>{label}</Typography>
        <Typography variant="h6" sx={{ color: countColor, fontWeight: "bold" }}>
          {count}
        </Typography>
      </Box>
      <Typography  sx={{ fontWeight:'bold' }}>{value}</Typography>
    </Box>
  );
};

export default OrderStatus;
