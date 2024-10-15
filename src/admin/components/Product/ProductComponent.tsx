import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Tab from "./TabComponent";
import Pagination from "../Util/PaginationComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddProductButton from "../Util/AddButton";
import FileButton from "../Util/FileButton";

export default function ProductComponent() {
  const handleExport = () => {
    console.log("Xuất file");
  };

  const handleImport = () => {
    console.log("Nhập file");
  };

  const handleAddProduct = () => {
    console.log("Thêm nhà cung cấp");
  };
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
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", padding: 2 }}
        >
          Danh sách sản phẩm
        </Typography>
        <Box sx={{ marginLeft: "auto", marginRight: "10px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
          <FileButton
              icon={<CloudUploadIcon />}
              text="Xuất file"
              onClick={handleExport}
            />
            <FileButton
              icon={<CloudDownloadIcon />}
              text="Nhập file"
              onClick={handleImport}
            />
            <AddProductButton
              icon={<AddCircleIcon />}
              text="Thêm sản phẩm"
              onClick={handleAddProduct}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "100%",
          margin: "20px",
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
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
