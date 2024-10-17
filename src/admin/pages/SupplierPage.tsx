import * as React from "react";
import Box from "@mui/material/Box";
import { Paper, TableContainer, Typography } from "@mui/material";
import FileButton from "../components/Util/FileButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddSupplierButton from "../components/Util/CustomButton";
import { useState } from "react";
import AddSupplierDialog from "../components/Supplier/AddSupplierDialog";
import type { Supplier } from "../../types/supplier";
import SearchBox from "../components/Util/Search";
import SupplierTable from "../components/Supplier/SupplierTable";
import FilterDropdown from "../components/Util/FilterDropdown";

export default function Supplier() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]); // Danh sách nhà cung cấp

  const supplierStatusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Đang giao dịch" },
    { value: "inactive", label: "Ngưng giao dịch" },
  ];

  const handleFilterChange = (status: string) => {
    console.log("Lọc nhà cung cấp theo trạng thái:", status);
  };

  const handleExport = () => {
    console.log("Xuất file");
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleSaveSupplier = (data: Supplier) => {
    setSuppliers((prevSuppliers) => [...prevSuppliers, data]); // Thêm nhà cung cấp mới vào danh sách
    setOpenAddDialog(false); // Đóng dialog
  };

  const handleImport = () => {
    console.log("Nhập file");
  };
  const handleSearch = (query: string) => {
    console.log("Tìm kiếm nhà cung cấp:", query);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        // overflow: "auto",
        borderRadius: 1,
        bgcolor: "rgb(249, 249, 249)",
        margin: 0,
        padding: 0,
        height: "100vh",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "100px",
            marginTop: "10px",
            gap: 2,
            width: "700px",
          }}
        >
          <SearchBox
            placeholder="Tìm kiếm nhà cung cấp"
            onSearch={handleSearch}
          />
          <FilterDropdown
            label="Lọc nhà cung cấp"
            options={supplierStatusOptions}
            onFilterChange={handleFilterChange}
          />
        </Box>
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
          boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            Height: "80vh",
          }}
        >
          <SupplierTable />
        </TableContainer>
      </Box>
    </Box>
  );
}
