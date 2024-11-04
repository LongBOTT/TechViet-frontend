// components/Header.tsx
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

interface HeaderProps {
  onGoBack: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoBack, onSave, onCancel }) => (
  <Box
    sx={{
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "rgb(255, 255, 255)",
    }}
  >
    <Button startIcon={<ArrowBackIcon />} onClick={onGoBack} sx={{ color: "black", textTransform: "none" }}>
      <Typography sx={{ fontFamily: "Roboto", fontWeight: "bold", px: 2 }}>
        Quay lại Danh Sách Phiếu Nhập
      </Typography>
    </Button>
    <Box sx={{ ml: "auto", display: "flex" }}>
      <Button onClick={onSave} variant="contained" startIcon={<SaveIcon />} sx={{ textTransform: "none", mr: 1, height: 40, width: 100, bgcolor: "rgb(25, 118, 210)" }}>Lưu</Button>
      <Button onClick={onCancel} variant="outlined" startIcon={<CloseIcon />} sx={{ textTransform: "none", mr: 1, height: 40, width: 100, color: "rgb(255, 0, 0)", borderColor: "rgb(255, 0, 0)" }}>Hủy</Button>
    </Box>
  </Box>
);

export default Header;
