import React from "react";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_EDIT_INFO } from "../../constants/routeConstants";

const InfoPage: React.FC = () => {
  // Giả lập dữ liệu người dùng (thay thế bằng dữ liệu thực tế từ API)
  const userInfo = {
    name: "LONG",
    phone: "0963333946",
    gender: "Nam",
  };

  // Sử dụng hook useNavigate để điều hướng
  const navigate = useNavigate();

  const handleEditInfo = () => {
    // Logic để chuyển đến trang chỉnh sửa thông tin
    navigate(ACCOUNT_EDIT_INFO); // Thay ACCOUNT_EDIT_INFO bằng đường dẫn trang chỉnh sửa thực tế của bạn
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        p: 4,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Thông tin cá nhân
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            Họ và tên
          </Typography>
          <Typography variant="body2">{userInfo.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            Số điện thoại
          </Typography>
          <Typography variant="body2">{userInfo.phone}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            Giới tính
          </Typography>
          <Typography variant="body2">{userInfo.gender}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Button
        variant="contained"
        color="error"
        onClick={handleEditInfo}
        sx={{
          borderRadius: "8px",
          px: 3,
          fontWeight: "bold",
        }}
      >
        Chỉnh sửa thông tin
      </Button>
    </Box>
  );
};

export default InfoPage;

