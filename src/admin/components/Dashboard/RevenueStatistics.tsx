import React from "react";
import { Box, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const RevenueStatisticsComponent: React.FC = () => {
  const revenueData = {
    totalRevenue: "100,000,000 VND",
    totalOrders: 500,
    cash: {
      value: "60,000,000 VND",
      orders: 300,
      percentage: 60, // Added percentage
    },
    bankTransfer: {
      value: "40,000,000 VND",
      orders: 200,
      percentage: 40, // Added percentage
    },
  };

  const chartData = {
    labels: [
      `Tiền mặt (${revenueData.cash.percentage}%)`,
      `Chuyển khoản (${revenueData.bankTransfer.percentage}%)`,
    ],
    datasets: [
      {
        label: "Phần trăm doanh thu",
        data: [revenueData.cash.percentage, revenueData.bankTransfer.percentage],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      className="revenueInfoContainer"
      sx={{
        marginLeft: "20px",
        marginBottom: "20px",
        bgcolor: "white",
        borderRadius: "10px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        width: "97%",
        height: "400px",
        display: "flex",
        padding: "20px",
      }}
    >
      {/* Left box for financial information */}
      <Box
        className="summaryInfo"
        sx={{
          flex: 1,
          padding: "20px",
          borderRight: "1px solid #ddd",
          width:"60%"
        }}
      >
        <Typography variant="h6" gutterBottom>
          Tổng doanh thu: {revenueData.totalRevenue}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Tổng số đơn hàng: {revenueData.totalOrders}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Tiền mặt: {revenueData.cash.value} ({revenueData.cash.percentage}%)
        </Typography>
        <Typography variant="body1" gutterBottom>
          Số đơn hàng: {revenueData.cash.orders}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Chuyển khoản: {revenueData.bankTransfer.value} (
          {revenueData.bankTransfer.percentage}%)
        </Typography>
        <Typography variant="body1" gutterBottom>
          Số đơn hàng: {revenueData.bankTransfer.orders}
        </Typography>
      </Box>

      {/* Right box for pie chart */}
      <Box
        className="revenueChart"
        sx={{
          flex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width:"40%"
        }}
      >
        <Pie data={chartData} />
      </Box>
    </Box>
  );
};

export default RevenueStatisticsComponent;
