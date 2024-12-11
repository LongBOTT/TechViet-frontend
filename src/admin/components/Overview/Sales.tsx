import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { currencyFormatter } from "../Util/Formatter";

interface SalesOverviewProps {
  data: any; // Receive data from Overview
}

const SalesOverview: React.FC<SalesOverviewProps> = ({ data }) => {
  const chartData = {
    labels: data ? data.map((item: any) => item[0]) : [], // Safely map if data exists
    datasets: [
      {
        label: "Doanh thu",
        data: data ? data.map((item: any) => item[1]) : [], // Safely map if data exists
        backgroundColor: "rgb(51, 160, 255)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        } as any,
      },
      x: {
        grid: {
          display: false,
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
      </Box>

      {/* Chart */}
      <Box
        sx={{
          height: "400px",
          margin: "20px",
          marginTop: "0px",
        }}
      >
        <Bar data={chartData} options={options} />
      </Box>

      {/* Total revenue */}
      <Box
        sx={{
          padding: "10px 0",
          textAlign: "center",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          margin: "0 20px",
        }}
      >
        <Typography>
          Tổng doanh thu: <strong>{data ? currencyFormatter.format(data[0][1]) : 0}</strong> {/* Display first value as total */}
        </Typography>
      </Box>
    </Box>
  );
};

export default SalesOverview;
