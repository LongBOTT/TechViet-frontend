import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TimeFilterComponent from "../components/Util/TimeFilterComponent";
import Paper from "@mui/material/Paper";
import RevenueStatisticsComponent from "../components/Dashboard/RevenueStatistics";

export default function Dashboard() {
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
          Báo cáo doanh thu
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
      {/* <Box
        sx={{
          marginLeft: "20px",
          marginBottom: "20px",
          bgcolor: "white",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          width:"97%",
          height: 'calc(100vh - 200px)',
        }}
      ></Box> */}
      <RevenueStatisticsComponent />
    </Box>
  );
}
