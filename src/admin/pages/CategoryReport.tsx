import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TimeFilterComponent from "../components/Util/TimeFilterComponent";
import Paper from "@mui/material/Paper";
import { TableContainer } from "@mui/material";
import EntityTable from "../components/Util/EntityTable";

import { getCategorySalesStatisticsByDate } from "../../api/orderApi"; // Import API
import CategoryReportChart from "../components/Dashboard/BestSellingCategorysChart";

export default function CategoryReport() {
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [categoryData, setCategoryData] = React.useState<any[]>([]); // Data for categories

  const handleRowClick = (order: any) => {};

  const categoryColumns = [
    { label: "Ngày", key: "date" },
    { label: "Tên thể loại", key: "categoryName" },
    { label: "Số lượng sản phẩm đã bán", key: "quantitySold" },
    { label: "Doanh thu", key: "revenue" },
    { label: "Giá vốn", key: "costPrice" },
    { label: "Lợi nhuận", key: "profit" },
  ];

  // Fetch data from API when startDate and endDate are provided
  React.useEffect(() => {
    if (startDate && endDate) {
      const fetchStatistics = async () => {
        // Fetch data from API
        const data = await getCategorySalesStatisticsByDate(startDate, endDate);

        // Check if data exists and contains the required categoryStats
        if (data && data.categoryStats) {
          const formattedData = data.categoryStats.map((item: any) => ({
            date: item.orderDate,
            categoryName: item.categoryName || "Chưa có tên thể loại", // Ensure correct key
            quantitySold: item.totalQuantity,
            revenue: item.revenue,
            costPrice: item.costPrice,
            profit: item.profit,
          }));
          setCategoryData(formattedData); // Set category data to state
        }
      };
      fetchStatistics();
    }
  }, [startDate, endDate]);

  // Handle time range changes from TimeFilterComponent
  const handleTimeChange = (start: string | undefined, end: string | undefined) => {
    setStartDate(start || ""); // Set startDate
    setEndDate(end || "");     // Set endDate
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
        borderRadius: 1,
        margin: 0,
        padding: 0,
        backgroundColor: "#f5f5f5", // Background color for dashboard
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
          backgroundColor: "#ffffff", // Header background color
          borderBottom: "1px solid #ddd",
          padding: "0 16px",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", padding: 1 }}
        >
          Báo cáo thể loại
        </Typography>
      </Box>

      {/* Time Filter Section */}
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

      {/* Best Selling Categories Chart Section */}
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
        <CategoryReportChart categoryData={categoryData} />
      </Box>

      {/* Category Data Table Section */}
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
            entities={categoryData} // Display category data from API
            loading={false}
            columns={categoryColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}
