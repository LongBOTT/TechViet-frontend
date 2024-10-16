import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Tab from "../components/Supplier/TabComponent";
import Pagination from "../components/Util/PaginationComponent";
import FileButton from "../components/Util/FileButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddSupplierButton from "../components/Util/CustomButton";
import { useState } from "react";
import AddSupplierDialog from "../components/Supplier/AddSupplierDialog";


export default function Supplier() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null); // Nhà cung cấp đang sửa
  const handleExport = () => {
    console.log("Xuất file");
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (supplier: any) => {
    setCurrentSupplier(supplier);
    setOpenEditDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveSupplier = (data: any) => {
    console.log("Thêm/Cập nhật nhà cung cấp:", data);
    setOpenAddDialog(false);
    setOpenEditDialog(false);
  };

  const handleImport = () => {
    console.log("Nhập file");
  };

  const handleAddSupplier = () => {
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
          alignItems: "center", // Căn giữa theo chiều dọc
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", padding: 2 }}
        >
          Nhà cung cấp
        </Typography>
        <Box sx={{ marginLeft: "auto", marginRight: "10px" }}>
          {" "}
          {/* Đẩy CustomButton sang bên phải */}
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
            <AddSupplierButton
              icon={<AddCircleIcon />}
              text="Thêm nhà cung cấp"
              onClick={handleOpenAddDialog}
            />
            <AddSupplierDialog
              open={openAddDialog}
              onClose={handleCloseAddDialog}
              onSave={handleSaveSupplier}
            />

          </Box>
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
