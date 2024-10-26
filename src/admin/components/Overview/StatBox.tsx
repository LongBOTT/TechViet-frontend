import React from "react";
import { Box, Typography, Divider, SxProps } from "@mui/material";

interface StatBoxProps {
  label: string;
  value: number | string;
  color: string;
  icon: React.ReactNode;
  sx?: SxProps;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, color, icon, sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        gap: 2,
        background: "rgb(255, 255, 255)",
        padding: 1,
        marginLeft: 1,
        transition: "background-color 0.3s ease", // Để sự kiện hover chuyển màu mượt mà
        cursor: "pointer", 
        "&:hover": {
          backgroundColor: "rgb(242, 249, 255)", 
        },
        ...sx,
      }}
    >
      {/* Icon Section */}
      <Box
        sx={{
          backgroundColor: color,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
        }}
      >
        {icon}
      </Box>

      {/* Label and Value Section */}
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {label}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
