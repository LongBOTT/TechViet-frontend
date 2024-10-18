// src/admin/pages/SupplierPage.tsx
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

import { useSupplierContext } from "../../context/SupplierContext";

export default function Supplier() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const { searchSuppliersByName } = useSupplierContext();
  const { filterSuppliersByStatus } = useSupplierContext();

  const supplierStatusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Đang giao dịch" },
    { value: "inactive", label: "Ngưng giao dịch" },
  ];

  const handleExport = () => {
    console.log("Xuất file");
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleImport = () => {
    console.log("Nhập file");
  };

 

  return (
    <Box
      sx={{
        flexGrow: 1,
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
          alignItems: "center",
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
            onSearch={searchSuppliersByName}
          />
          <FilterDropdown
            label="Lọc nhà cung cấp"
            options={supplierStatusOptions}
            onFilterChange={filterSuppliersByStatus}
          />
        </Box>
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
            <AddSupplierButton
              icon={<AddCircleIcon />}
              text="Thêm nhà cung cấp"
              onClick={handleOpenAddDialog}
            />
            <AddSupplierDialog
              open={openAddDialog}
              onClose={handleCloseAddDialog}
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
