import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TimeFilterComponent from "../components/Util/TimeFilterComponent";
import Paper from "@mui/material/Paper";
import PaymentMethodChart from "../components/Dashboard/PaymentMethodChart";
import RevenueBarChart from "../components/Dashboard/RevenueBarChart";
import { TableContainer } from "@mui/material";
import EntityTable from "../components/Util/EntityTable";
import { getStatistics } from "../../api/orderApi";
import { currencyFormatter } from "../components/Util/Formatter";

export default function Dashboard() {
  const [statistics, setStatistics] = React.useState<any>(null);
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [orderData, setOrderData] = React.useState<any[]>([]);
  const [revenueData, setRevenueData] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any[]>([
    { label: "Tổng Đơn Hàng", value: 0, color: "red" },
    { label: "Doanh thu", value: "0 triệu đ", color: "black" },
    { label: "Giá vốn", value: "0 triệu đ", color: "black" },
    { label: "Lợi Nhuận", value: "0 triệu đ", color: "green" },
    { label: "Lượng Hàng Đã Bán", value: 0, color: "black" },
  ]);


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
  
// 2. Cập nhật API khi startDate và endDate thay đổi
React.useEffect(() => {
  if (startDate && endDate) {
    const fetchStatistics = async () => {
      try {
        const data = await getStatistics(startDate, endDate);
        console.log("API Data:", data);
        setStatistics(data);
        processStatisticsData(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchStatistics();
  }
}, [startDate, endDate]);  // Đảm bảo chỉ gọi khi startDate hoặc endDate thay đổi



  // Fetch statistics after startDate and endDate are set
  React.useEffect(() => {
    if (startDate && endDate) {
      const fetchStatistics = async () => {
        const data = await getStatistics(startDate, endDate);
        console.log("API Data:", data);
        setStatistics(data);
        processStatisticsData(data);
      };
      fetchStatistics();
    }
  }, [startDate, endDate]);

  // Process statistics data and update orderData and revenueData
  const processStatisticsData = (data: any) => {
    let totalOrders = 0;
    let totalRevenue = 0;
    let totalCost = 0;
    let totalProfit = 0;
    let totalItemsSold = 0;
    const revenueByDate: any[] = [];
    const processedOrderData = data.dailyStats.map((daily: any, index: number) => {
      totalOrders += daily.totalOrders;
      totalRevenue += daily.totalRevenue;
      totalCost += daily.totalCostPrice;
      totalProfit += daily.totalProfit;
      totalItemsSold += daily.totalQuantity;

      // Push revenue data for each date
      revenueByDate.push({
        date: daily.date,
        cashRevenue: daily.cashRevenue,
        transferRevenue: daily.transferRevenue,
      });

      return {
        id: index,
        date: daily.date,
        orderNumber: daily.totalOrders,
        orderNumberCash: daily.cashOrders,
        orderNumberTransfer: daily.bankTransferOrders,
        itemsSold: daily.totalQuantity,
        revenue: currencyFormatter.format(daily.totalRevenue),
        cost: currencyFormatter.format(daily.totalCostPrice),
        profit: currencyFormatter.format(daily.totalProfit),
      };
    });
    setOrderData(processedOrderData);

    // Update stats with aggregated values
    setStats([
      { label: "Tổng Đơn Hàng", value: totalOrders, color: "red" },
      { label: "Doanh thu", value: `${currencyFormatter.format(totalRevenue)} đ`, color: "black" },
      { label: "Giá vốn", value: `${(currencyFormatter.format(totalCost))} đ`, color: "black" },
      { label: "Lợi Nhuận", value: `${currencyFormatter.format(totalProfit)}  đ`, color: "green" },
      { label: "Lượng Hàng Đã Bán", value: totalItemsSold, color: "black" },
    ]);

    // Update revenue data for chart
    setRevenueData(revenueByDate);
  };
// Calculate the total revenue, cash revenue, and transfer revenue
const totalRevenue = revenueData.reduce((acc, item) => acc + item.cashRevenue + item.transferRevenue, 0);
const cashRevenue = revenueData.reduce((acc, item) => acc + item.cashRevenue, 0);
const transferRevenue = revenueData.reduce((acc, item) => acc + item.transferRevenue, 0);
  const orderColumns = [
    // { label: "id", key: "id" },
    { label: "Ngày", key: "date" },
    { label: "Tổng số đơn hàng", key: "orderNumber" },
    { label: "Số đơn tiền mặt", key: "orderNumberCash" },
    { label: "Số đơn chuyển khoản", key: "orderNumberTransfer" },
    { label: "Lượng hàng bán", key: "itemsSold" },
    { label: "Doanh thu", key: "revenue" },
    { label: "Giá vốn", key: "cost" },
    { label: "Lợi nhuận", key: "profit" },
  ];

  const handleRowClick = (order: any) => {};
  const handleTimeChange = (start: string | undefined, end: string | undefined) => {
    setStartDate(start || "");  // Cập nhật giá trị startDate mới
    setEndDate(end || "");      // Cập nhật giá trị endDate mới
  };
  return (
    <Box sx={{ flexGrow: 1, overflow: "auto", borderRadius: 1, margin: 0, padding: 0, backgroundColor: "#f5f5f5" }}>
      {/* Header Section */}
      <Box sx={{ height: 64, display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", borderBottom: "1px solid #ddd", padding: "0 16px" }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold", padding: 1 }}>Báo cáo kết quả kinh doanh</Typography>
      </Box>

      {/* Content Section */}
      <Box sx={{ padding: "8px", display: "flex", flexDirection: "column", margin: "16px" }}>
        <Typography variant="subtitle1" sx={{ marginBottom: "16px", color: "#333", fontWeight: "500" }}>Thời gian</Typography>
        <TimeFilterComponent onDateRangeSelect={handleTimeChange} />
      </Box>

      {/* Stats Section */}
      <Box sx={{ display: "flex", height: "130px", justifyContent: "space-between", padding: 2, width: "97%", marginLeft: "20px", marginBottom: "20px", bgcolor: "white", borderRadius: "10px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}>
        {stats.map((stat, index) => (
          <Box key={index} sx={{ textAlign: "center", padding: 2, borderRight: index !== stats.length - 1 ? "1px solid #e0e0e0" : "none" }}>
            <Typography variant="subtitle1" color="textSecondary">{stat.label}</Typography>
            <Typography variant="h5" sx={{ color: stat.color, fontWeight: "bold" }}>{stat.value}</Typography>
          </Box>
        ))}
      </Box>

      {/* Revenue and Payment Methods Section */}
      <Box sx={{ marginLeft: "20px", marginBottom: "20px", bgcolor: "white", borderRadius: "10px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff", width: "97%", display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "80%", height: "500px", textAlign: "center" }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>DOANH THU BÁN HÀNG</Typography>
          <RevenueBarChart data={revenueData} />
          <Typography variant="subtitle1">Tổng doanh thu: {revenueData.reduce((sum, item) => sum + item.cashRevenue + item.transferRevenue, 0).toLocaleString()} đ</Typography>
        </Box>
        <Box sx={{ width: "40%", padding: "20px", height: "400px", margin: "auto" }}>
        <PaymentMethodChart totalRevenue={totalRevenue} cashRevenue={cashRevenue} transferRevenue={transferRevenue} />
        </Box>
      </Box>

      {/* Order Data Table */}
      <Box sx={{ width: "97%", marginLeft: "20px", marginBottom: "20px", bgcolor: "white", borderRadius: "10px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}>
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
