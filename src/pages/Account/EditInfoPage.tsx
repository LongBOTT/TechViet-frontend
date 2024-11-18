import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_INFO } from "../../constants/routeConstants";

const EditInfoPage: React.FC = () => {
  // Giả lập dữ liệu người dùng ban đầu (thay thế bằng dữ liệu thực tế từ API)
  const initialUserInfo = {
    name: "LONG",
    phone: "0963333946",
    gender: "Nam",
  };

  // State để lưu trữ thông tin người dùng trong quá trình chỉnh sửa
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const navigate = useNavigate();

  // Hàm xử lý thay đổi thông tin trong các trường nhập liệu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm xử lý khi người dùng nhấn nút "Lưu thay đổi"
  const handleSaveChanges = () => {
    // Thực hiện lưu thông tin cập nhật (gửi dữ liệu đến API hoặc cập nhật state)
    alert("Thông tin đã được cập nhật!");
    navigate(ACCOUNT_INFO); // Điều hướng quay lại trang thông tin cá nhân
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
        Chỉnh sửa thông tin cá nhân
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            Họ và tên
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            Số điện thoại
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            Giới tính
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            name="gender"
            value={userInfo.gender}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Button
        variant="contained"
        color="error"
        onClick={handleSaveChanges}
        sx={{
          borderRadius: "8px",
          px: 3,
          fontWeight: "bold",
        }}
      >
        Lưu thay đổi
      </Button>
    </Box>
  );
};

export default EditInfoPage;
