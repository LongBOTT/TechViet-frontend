import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TimeFilterComponent from "../components/Util/TimeFilterComponent";
import Paper from "@mui/material/Paper";
import PaymentMethodChart from "../components/Dashboard/PaymentMethodChart";
import RevenueBarChart from "../components/Dashboard/RevenueBarChart";
import { TableContainer } from "@mui/material";
import EntityTable from "../components/Util/EntityTable";

export default function Dashboard() {
  const orderColumns = [
    { label: "Ngày", key: "date" },
    { label: "Tổng số đơn hàng", key: "orderNumber" },
    { label: "Số đơn tiền mặt", key: "orderNumberCash" },
    { label: "Số đơn chuyển khoản", key: "orderNumberTransfer" },
    { label: "Lượng hàng bán", key: "itemsSold" },
    { label: "Doanh thu", key: "revenue" },
    { label: "Giá vốn", key: "cost" },
    { label: "Lợi nhuận", key: "profit" },
  ];
  const orderData = [
    {
      date: "2024-03-22",
      orderNumber: "1",
      orderNumberCash: 1, // Số đơn thanh toán bằng tiền mặt
      orderNumberTransfer: 0, // Số đơn thanh toán bằng chuyển khoản
      itemsSold: 10,
      revenue: 16670000, // ~16.67 triệu
      cost: 8670000, // ~8.67 triệu
      profit: 8000000, // ~8 triệu
    },
    {
      date: "2024-03-23",
      orderNumber: "2",
      orderNumberCash: 1, // Số đơn thanh toán bằng tiền mặt
      orderNumberTransfer: 1, // Số đơn thanh toán bằng chuyển khoản
      itemsSold: 10,
      revenue: 16670000, // ~16.67 triệu
      cost: 8670000, // ~8.67 triệu
      profit: 8000000, // ~8 triệu
    },
    {
      date: "2024-03-24",
      orderNumber: "1",
      orderNumberCash: 0, // Số đơn thanh toán bằng tiền mặt
      orderNumberTransfer: 1, // Số đơn thanh toán bằng chuyển khoản
      itemsSold: 10,
      revenue: 16670000, // ~16.67 triệu
      cost: 8670000, // ~8.67 triệu
      profit: 8000000, // ~8 triệu
    },
    {
      date: "2024-03-25",
      orderNumber: "2",
      orderNumberCash: 1, // Số đơn thanh toán bằng tiền mặt
      orderNumberTransfer: 1, // Số đơn thanh toán bằng chuyển khoản
      itemsSold: 10,
      revenue: 16670000, // ~16.67 triệu
      cost: 8670000, // ~8.67 triệu
      profit: 8000000, // ~8 triệu
    },
    {
      date: "2024-03-26",
      orderNumber: "1",
      orderNumberCash: 1, // Số đơn thanh toán bằng tiền mặt
      orderNumberTransfer: 0, // Số đơn thanh toán bằng chuyển khoản
      itemsSold: 10,
      revenue: 16670000, // ~16.67 triệu
      cost: 8670000, // ~8.67 triệu
      profit: 8000000, // ~8 triệu
    },
    {
      date: "2024-03-27",
      orderNumber: "1",
      orderNumberCash: 0, // Số đơn thanh toán bằng tiền mặt
      orderNumberTransfer: 1, // Số đơn thanh toán bằng chuyển khoản
      itemsSold: 10,
      revenue: 16670000, // ~16.67 triệu
      cost: 8670000, // ~8.67 triệu
      profit: 8000000, // ~8 triệu
    },
  ];
  
  
  const handleRowClick = (order: any) => {};

  const stats = [
    { label: "Tổng Đơn Hàng", value: 8, color: "red" },
    { label: "Doanh thu", value: "100 triệu đ", color: "black" },
    { label: "Giá vốn", value: "52 triệu đ", color: "black" },
    { label: "Lợi Nhuận", value: "48 triệu đ", color: "green" },
    { label: "Lượng Hàng Đã Bán", value: 8, color: "black" },
  ];
  const revenueData = [
    { date: "22/03", cashRevenue: 10000000, transferRevenue: 5000000 },
    { date: "23/03", cashRevenue: 15000000, transferRevenue: 5000000 },
    { date: "24/03", cashRevenue: 15000000, transferRevenue: 5000000 },
    { date: "25/03", cashRevenue: 10000000, transferRevenue: 5000000 },
    { date: "26/03", cashRevenue: 10000000, transferRevenue: 5000000 },
    { date: "27/03", cashRevenue: 10000000, transferRevenue: 5000000 },
  ];
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
        borderRadius: 1,
        margin: 0,
        padding: 0,
        backgroundColor: "#f5f5f5", // Màu nền cho bảng điều khiển
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff", // Màu nền cho header
          borderBottom: "1px solid #ddd",
          padding: "0 16px",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", padding: 1 }}
        >
          Báo cáo kết quả kinh doanh
        </Typography>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          margin: "16px",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ marginBottom: "16px", color: "#333", fontWeight: "500" }}
        >
          Thời gian
        </Typography>
        <TimeFilterComponent />
      </Box>

      <Box
        sx={{
          display: "flex",
          height: "130px",
          justifyContent: "space-between",
          padding: 2,
          width: "97%",
          marginLeft: "20px",
          marginBottom: "20px",
          bgcolor: "white",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        {stats.map((stat, index) => (
          <Box
            key={index}
            sx={{
              textAlign: "center",
              padding: 2,
              borderRight:
                index !== stats.length - 1 ? "1px solid #e0e0e0" : "none",
            }}
          >
            <Typography variant="subtitle1" color="textSecondary">
              {stat.label}
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: stat.color, fontWeight: "bold" }}
            >
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* <RevenueStatisticsComponent /> */}
      <Box
        sx={{
          marginLeft: "20px",
          marginBottom: "20px",
          bgcolor: "white",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          // backgroundColor: "red",
          width: "97%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "80%", height: "500px", textAlign: "center" }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            DOANH THU BÁN HÀNG
          </Typography>
          <RevenueBarChart data={revenueData} />
          <Typography variant="subtitle1">
            Tổng doanh thu:{" "}
            {revenueData
              .reduce(
                (sum, item) => sum + item.cashRevenue + item.transferRevenue,
                0
              )
              .toLocaleString()}{" "}
            đ
          </Typography>
        </Box>
        <Box
          sx={{
            width: "40%",
            padding: "20px",
            height: "400px",
            margin: "auto",
          }}
        >
          <PaymentMethodChart />
        </Box>
      </Box>

      <Box
        sx={{
          width: "97%",
          marginLeft: "20px",
          marginBottom: "20px",
          bgcolor: "white",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TableContainer component={Paper}>
          <EntityTable
            entities={orderData}
            loading={false}
            columns={orderColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}
