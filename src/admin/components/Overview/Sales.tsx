import * as React from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const SalesOverview: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState("7 ngày qua");

  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value as string);
  };

  const data = {
    labels: ["22/03", "23/03", "24/03", "25/03", "26/03", "27/03"],
    datasets: [
      {
        label: "Doanh thu",
        data: [5000000, 15000000, 70000000, 90000000, 45000000, 0],
        backgroundColor: "rgb(51, 160, 255)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        barThickness: 50, // Điều chỉnh độ dày của các cột
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Cho phép điều chỉnh chiều cao của biểu đồ
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, // Đặt trục Y bắt đầu từ 0
        grid: {
          drawBorder: false,
        } as any,
      },
      x: {
        grid: {
          display: false, // Ẩn các đường kẻ dọc
        } as any,
      },
    },
  };

  return (
    <Box
      sx={{
        width: "98%",
        bgcolor: "rgb(255, 255, 255)",
        margin: "10px",
        marginTop: "30px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        height: "530px", 
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          bgcolor: "rgb(255, 255, 255)",
          padding: 1,
          borderRadius: "10px",
        }}
      >
        {/* Tiêu đề */}
        <Typography
          component="div"
          sx={{
            fontFamily: "Roboto",
            padding: 1,
            fontWeight: "bold",
            marginLeft: 2,
          }}
        >
          DOANH THU BÁN HÀNG
        </Typography>

        {/* Dropdown Select thời gian */}
        <Box>
          <Select
            value={timeRange}
            onChange={handleTimeRangeChange}
            displayEmpty
            sx={{ width: "150px" }} // Giảm kích thước của Select
            size="small" // Giảm kích thước chung của Select
          >
            <MenuItem value="Hôm nay">Hôm nay</MenuItem>
            <MenuItem value="Hôm qua">Hôm qua</MenuItem>
            <MenuItem value="7 ngày qua">7 ngày qua</MenuItem>
            <MenuItem value="Tháng này">Tháng này</MenuItem>
            <MenuItem value="Tháng trước">Tháng trước</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Biểu đồ */}
      <Box
        sx={{
          height: "400px",
          margin: "20px",
          marginTop: "0px",
        }}
      >
        <Bar data={data} options={options} />
      </Box>

      {/* Tổng doanh thu */}
      <Box
        sx={{
          padding: "10px 0",
          textAlign: "center",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          margin: "0 20px",
        }}
      >
        <Typography>
          Tổng doanh thu: <strong>60,377,388</strong>
        </Typography>
      </Box>
    </Box>
  );
};

export default SalesOverview;
