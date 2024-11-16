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
import BestSellingCategorysChart from "../components/Dashboard/BestSellingCategorysChart";
export default function CategoryReport() {
    const handleRowClick = (order: any) => {};
    const categoryColumns = [
        { label: "Tên thể loại", key: "categoryName" },
        { label: "Số lượng sản phẩm đã bán", key: "productSold" },
        { label: "Doanh thu", key: "revenue" },
        { label: "Giá vốn", key: "cost" },
        { label: "Lợi nhuận", key: "profit" },
      ];
      
      const categoryData = [
        {
          categoryName: "Điện thoại",
          productSold: 150,
          revenue: 500000000, // 500 triệu
          cost: 400000000, // 400 triệu
          profit: 100000000, // 100 triệu
        },
        {
          categoryName: "Máy tính bảng",
          productSold: 80,
          revenue: 250000000, // 250 triệu
          cost: 200000000, // 200 triệu
          profit: 50000000, // 50 triệu
        },
        {
          categoryName: "Laptop",
          productSold: 60,
          revenue: 300000000, // 300 triệu
          cost: 250000000, // 250 triệu
          profit: 50000000, // 50 triệu
        },
        {
          categoryName: "Phụ kiện",
          productSold: 120,
          revenue: 120000000, // 120 triệu
          cost: 90000000, // 90 triệu
          profit: 30000000, // 30 triệu
        },
        {
          categoryName: "Âm thanh",
          productSold: 90,
          revenue: 180000000, // 180 triệu
          cost: 150000000, // 150 triệu
          profit: 30000000, // 30 triệu
        },
        {
          categoryName: "Đồng hồ thông minh",
          productSold: 50,
          revenue: 100000000, // 100 triệu
          cost: 80000000, // 80 triệu
          profit: 20000000, // 20 triệu
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
        <BestSellingCategorysChart/>
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
            entities={categoryData}
            loading={false}
            columns={categoryColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}
