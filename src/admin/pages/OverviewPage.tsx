
import { Box, Typography, Divider } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import StatBox from "../components/Overview/StatBox";
import SalesOverview from "../components/Overview/Sales";
import TopProducts from "../components/Overview/TopProducts";
import TopCategories from "../components/Overview/TopCategories";
import { reportOverview } from "../../api/orderApi"; 
import { useState, useEffect } from "react";
import { currencyFormatter } from "../components/Util/Formatter";

export default function Overview() {
  const [stats, setStats] = useState<any>(null); // Để lưu dữ liệu từ API

  useEffect(() => {
    const fetchStats = async () => {
      const data = await reportOverview();
      setStats(data); // Lưu dữ liệu vào state
    };

    fetchStats();
  }, []); // Gọi API khi component mount

  if (!stats) {
    return <div>Loading...</div>; // Hiển thị khi dữ liệu chưa được tải xong
  }

  return (
    <Box
      sx={{
        flex: 1,
        borderRadius: 1,
        bgcolor: "rgb(240, 241, 241)",
        margin: 0,
        padding: 0,
        height: "100vh",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          height: 130,
          width: "98%",
          bgcolor: "rgb(255, 255, 255)",
          margin: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            height: 50,
            width: "100%",
            margin: 1,
          }}
        >
          <Typography
            component="div"
            sx={{ fontFamily: "Roboto", fontWeight: "bold", padding: 2 }}
          >
            KẾT QUẢ KINH DOANH TRONG NGÀY
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          {/* StatBoxes */}
          <StatBox
            label="Doanh thu"
            value={currencyFormatter.format(stats.revenue)}
            color="blue"
            icon={<MonetizationOnIcon sx={{ color: "white", fontSize: 30 }} />}
            sx={{ borderBottomLeftRadius: "10px" }}
          />

          <StatBox
            label="Đơn hàng mới"
            value={stats.newOrders}
            color="green"
            icon={<AddShoppingCartIcon sx={{ color: "white", fontSize: 30 }} />}
          />

          <StatBox
            label="Đơn trả hàng"
            value={stats.returnedOrders}
            color="orange"
            icon={<LocalShippingIcon sx={{ color: "white", fontSize: 30 }} />}
          />

          <StatBox
            label="Đơn hủy"
            value={stats.canceledOrders}
            color="red"
            icon={<CancelIcon sx={{ color: "white", fontSize: 30 }} />}
            sx={{ borderBottomRightRadius: "10px" }}
          />
        </Box>
      </Box>

      <SalesOverview data={stats.revenueLast7Days} />

      <Box sx={{ width: "100%", padding: "20px", display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <TopProducts topSellingProductsToday={stats.topSellingProductsToday} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TopCategories topSellingCategoriesToday={stats.topSellingCategoriesToday} />
        </Box>
      </Box>
    </Box>
  );
}
