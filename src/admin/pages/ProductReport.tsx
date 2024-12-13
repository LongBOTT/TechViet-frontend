import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TimeFilterComponent from "../components/Util/TimeFilterComponent";
import Paper from "@mui/material/Paper";
import { TableContainer } from "@mui/material";
import EntityTable from "../components/Util/EntityTable";
import BestSellingProductsChart from "../components/Dashboard/BestSellingProductsChart";
import { getProductSalesStatisticsByDate } from "../../api/orderApi"; // Import API

export default function ProductReport() {
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [productData, setProductData] = React.useState<any[]>([]); // Product data

  const handleRowClick = (order: any) => {};

   React.useEffect(() => {
      const today = new Date();
      
      // Tạo ngày hôm nay với giờ là 00:00 theo múi giờ Việt Nam (UTC+7)
      const localDate = new Date(today.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
    
      // Đặt thời gian là 00:00:00 cho start
      const start = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate());
      
      // Cộng thêm một ngày vào startDate
      start.setDate(start.getDate() + 1); // Cộng một ngày
      
      const end = new Date(start); // Kết thúc ngày là ngày cộng thêm một ngày
    
      // Cập nhật state
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
    
    }, []);
    
  React.useEffect(() => {
    if (startDate && endDate) {
      const fetchStatistics = async () => {
        // Lấy dữ liệu từ API
        const data = await getProductSalesStatisticsByDate(startDate, endDate);
        
        // Nếu API trả dữ liệu thành công, xử lý và cập nhật state
        if (data && data.productStats) {
          const formattedData = data.productStats.map((item: any) => ({
            date: item.orderDate,
            name: item.productName || "Chưa có tên sản phẩm",
            totalQuantity: item.totalQuantity,
            revenue: item.revenue,
            cost: item.costPrice,
            profit: item.profit,
          }));
          setProductData(formattedData); // Cập nhật dữ liệu
        }
      };
      fetchStatistics();
    }
  }, [startDate, endDate]);

  const productColumns = [
    { label: "Ngày", key: "date" },
    { label: "Tên sản phẩm", key: "name" },
    { label: "Số lượng sản phẩm", key: "totalQuantity" },
    { label: "Doanh thu", key: "revenue" },
    { label: "Giá vốn", key: "cost" },
    { label: "Lợi nhuận", key: "profit" },
  ];

  const handleTimeChange = (start: string | undefined, end: string | undefined) => {
    setStartDate(start || "");  // Cập nhật giá trị startDate mới
    setEndDate(end || "");      // Cập nhật giá trị endDate mới
  };

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
        <TimeFilterComponent onDateRangeSelect={handleTimeChange} />
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
        {/* Truyền dữ liệu sản phẩm từ state vào biểu đồ */}
        <BestSellingProductsChart productData={productData} />
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
            entities={productData} // Hiển thị dữ liệu sản phẩm từ API
            loading={false}
            columns={productColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}
