import * as React from "react";
import { Box, Typography, Divider } from "@mui/material";
import ErrorIcon from "@mui/icons-material/ErrorOutline";

const WarehouseInfo = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px",
        bgcolor: "white",
        height: '450px',
        borderRadius: "10px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", padding: "5px" }}>
        THÔNG TIN KHO
      </Typography>

      <Divider sx={{ marginTop: "10px" }} />

      <Box sx={{ padding: "10px", marginTop: "10px" }}>
        <InfoItem
          label="Sản phẩm dưới định mức"
          value="5"
          icon={<ErrorIcon color="error" />}
        />
        <InfoItem label="Số tồn kho" value="300" />
        <InfoItem label="Giá trị tồn kho chi nhánh" value="183,479,289" />
      </Box>
    </Box>
  );
};

interface InfoItemProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, icon }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      bgcolor: "#F0F4FF",
      padding: "10px",
      borderRadius: "5px",
    }}
  >
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
      {label} {icon}
    </Typography>
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      {value}
    </Typography>
  </Box>
);

export default WarehouseInfo;
