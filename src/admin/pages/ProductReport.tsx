import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TimeFilterComponent from "../components/Util/TimeFilterComponent";
import Paper from "@mui/material/Paper";
import PaymentMethodChart from "../components/Dashboard/PaymentMethodChart";
import RevenueBarChart from "../components/Dashboard/RevenueBarChart";
import { TableContainer } from "@mui/material";
import EntityTable from "../components/Util/EntityTable";
import BestSellingProductsChart from "../components/Dashboard/BestSellingProductsChart";
export default function ProductReport() {
    const handleRowClick = (order: any) => {};
    const productColumns = [
        { label: "Tên sản phẩm", key: "name" },
        { label: "Số lượng sản phẩm", key: "productNumber" },
        { label: "Doanh thu", key: "revenue" },
        { label: "Giá vốn", key: "cost" },
        { label: "Lợi nhuận", key: "profit" },
      ];
      const productDataArray = [
        {
          name: "Iphone15-xanh-64GB",
          productNumber: 6,
          revenue: 30000000, // 6 * 5 triệu
          cost: 18000000, // 6 * 3 triệu
          profit: 12000000, // Doanh thu - Giá vốn
        },
        {
          name: "SamSung Galaxy S24 FE-Vàng-128GB",
          productNumber: 5,
          revenue: 25000000, // 5 * 5 triệu
          cost: 15000000, // 5 * 3 triệu
          profit: 10000000, // Doanh thu - Giá vốn
        },
        {
          name: "Redmi Note 12T Pro-Vàng-128GB",
          productNumber: 3,
          revenue: 15000000, // 3 * 5 triệu
          cost: 9000000, // 3 * 3 triệu
          profit: 6000000, // Doanh thu - Giá vốn
        },
        {
          name: "Sony Xperia Z5",
          productNumber: 2,
          revenue: 10000000, // 2 * 5 triệu
          cost: 6000000, // 2 * 3 triệu
          profit: 4000000, // Doanh thu - Giá vốn
        },
        {
          name: "OnePlus Nord 2T",
          productNumber: 2,
          revenue: 10000000, // 2 * 5 triệu
          cost: 6000000, // 2 * 3 triệu
          profit: 4000000, // Doanh thu - Giá vốn
        },
        {
          name: "Pixel 7 Pro",
          productNumber: 2,
          revenue: 10000000, // 2 * 5 triệu
          cost: 6000000, // 2 * 3 triệu
          profit: 4000000, // Doanh thu - Giá vốn
        },
        {
          name: "Nokia G50",
          productNumber: 1,
          revenue: 5000000, // 1 * 5 triệu
          cost: 3000000, // 1 * 3 triệu
          profit: 2000000, // Doanh thu - Giá vốn
        },
        {
          name: "Motorola Edge 20",
          productNumber: 1,
          revenue: 5000000, // 1 * 5 triệu
          cost: 3000000, // 1 * 3 triệu
          profit: 2000000, // Doanh thu - Giá vốn
        },
        {
          name: "Asus ROG Phone 6",
          productNumber: 1,
          revenue: 5000000, // 1 * 5 triệu
          cost: 3000000, // 1 * 3 triệu
          profit: 2000000, // Doanh thu - Giá vốn
        },
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
          Báo cáo sản phẩm
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
        <BestSellingProductsChart />
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
            entities={productDataArray}
            loading={false}
            columns={productColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}
