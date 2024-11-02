import React, { useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem, Divider, IconButton, Link, SelectChangeEvent } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import OrderStatus from "./OrderStatus";


const OrderProcessing: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>("90 ngày gần nhất");
  const [orderStatuses, setOrderStatuses] = useState<any[]>([]);


  const fetchOrderStatuses = async (timeRange: string) => {

    
    const mockData = [
      { label: "Chờ duyệt", count: 27, value: "17.015.250", countColor: "blue" },
      { label: "Chờ thanh toán", count: 328, value: "12.801.139.616", countColor: "blue" },
      { label: "Chuẩn bị hàng", count: 67, value: "146.201.895", countColor: "blue" },
      { label: "Đang giao hàng", count: 13, value: "7.336.079.504", countColor: "blue" },
    ];
    setOrderStatuses(mockData);
  };

  useEffect(() => {
    fetchOrderStatuses(timeRange);
  }, [timeRange]);

  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value as string);
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "white",
        borderRadius: "10px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",margin:"10px" }}>
        <Typography  sx={{fontFamily:'roboto', fontWeight: "bold" }}>
          ĐƠN HÀNG CẦN XỬ LÝ
        </Typography>
        <Select
          value={timeRange}
          onChange={handleTimeRangeChange}
          size="small"
          sx={{ width: "200px", marginRight: "10px",marginTop:"10px" }}
        >
          <MenuItem value="30 ngày gần nhất">30 ngày gần nhất</MenuItem>
          <MenuItem value="60 ngày gần nhất">60 ngày gần nhất</MenuItem>
          <MenuItem value="90 ngày gần nhất">90 ngày gần nhất</MenuItem>
        </Select>
      </Box>

      <Divider sx={{ marginY: 2 }} />

      {/* Order Statuses */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,padding: "5px"}}>
        {orderStatuses.map((status, index) => (
          <OrderStatus
            key={index}
            label={status.label}
            count={status.count}
            value={status.value}
            countColor={status.countColor}
          />
        ))}
      </Box>
    </Box>
  );
};

export default OrderProcessing;
