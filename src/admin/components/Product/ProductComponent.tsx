import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Tab from "./TabComponent";
import Pagination from "./PaginationComponent";
import CustomButton from "./CustomButton";

export default function ProductComponent() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
        borderRadius: 1,
        bgcolor: "rgb(249, 249, 249)",
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        sx={{
          height: 64,
          display: "flex",
          width: "100%",
          justifyContent: "space-between", 
          alignItems: "center", // Căn giữa theo chiều dọc
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", padding: 2 }}
        >
          Danh sách sản phẩm
        </Typography>
        <Box sx={{ marginLeft: "auto",marginRight: '10px' }}> {/* Đẩy CustomButton sang bên phải */}
          <CustomButton />
        </Box>
      </Box>
      <Box
        sx={{
          height: "100%",
          margin: "20px",
          backgroundColor: "rgb(255, 255, 255)", 
          boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)", // Đổ bóng rất nhẹ
        }}
      >
        <Tab />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Pagination />
      </Box>
    </Box>
  );
}