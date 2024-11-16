import * as React from "react";
import { Box, Typography, Divider } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import StatBox from "../components/Overview/StatBox";
import SalesOverview from "../components/Overview/Sales";
import TopProducts from "../components/Overview/TopProducts";
import WarehouseInfo from "../components/Overview/WarehouseInfo";
import TopCategories from "../components/Overview/TopCategories";

export default function Overview() {
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
          boxShadow: "0px 2px 5px  rgba(0, 0, 0, 0.1)",
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
            boxShadow: "0px 2px 5px  rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          {/* StatBoxes */}
          <StatBox
            label="Doanh thu"
            value={0}
            color="blue"
            icon={<MonetizationOnIcon sx={{ color: "white", fontSize: 30 }} />}
            sx={{ borderBottomLeftRadius: "10px" }}
          />

          <StatBox
            label="Đơn hàng mới"
            value={2}
            color="green"
            icon={<AddShoppingCartIcon sx={{ color: "white", fontSize: 30 }} />}
          />

          <StatBox
            label="Đơn trả hàng"
            value={0}
            color="orange"
            icon={<LocalShippingIcon sx={{ color: "white", fontSize: 30 }} />}
          />

          <StatBox
            label="Đơn hủy"
            value={1}
            color="red"
            icon={<CancelIcon sx={{ color: "white", fontSize: 30 }} />}
            sx={{ borderBottomRightRadius: "10px" }}
          />
        </Box>
      </Box>

      <SalesOverview />

      <Box sx={{ width: "100%", padding: "20px", display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <TopProducts />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TopCategories />
        </Box>
      </Box>
    </Box>
  );
}
