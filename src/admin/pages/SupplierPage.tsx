// src/admin/pages/SupplierPage.tsx
import Box from "@mui/material/Box";
import { Paper, TableContainer, Typography } from "@mui/material";
import { useState } from "react";
import AddSupplierDialog from "../components/Supplier/AddSupplierDialog";
import EntityActions from "../components/Util/EntityActions"; // Component hành động chung
import EntityTable from "../components/Util/EntityTable"; // Dùng bảng tái sử dụng
import { useSupplierContext } from "../../context/SupplierContext";
import EditSupplierDialog from "../components/Supplier/EditSupplierDialog";
import SearchBox from "../components/Util/Search";
import FilterDropdown from "../components/Util/FilterDropdown";
import CustomButton from "../components/Util/CustomButton";
import RefreshIcon from "@mui/icons-material/Refresh";
export default function Supplier() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const {
    searchSuppliersByName,
    filterSuppliersByStatus,
    fetchSuppliers,
    suppliers,
    loading,
  } = useSupplierContext();
  const { setSelectedSupplier, setEditDialogOpen, editDialogOpen } =
    useSupplierContext();
  const [resetFilter, setResetFilter] = useState(false);
  const supplierStatusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Đang giao dịch" },
    { value: "inactive", label: "Ngưng giao dịch" },
  ];
  const handleReset = () => {
    setResetFilter(true);
    setTimeout(() => setResetFilter(false), 0);
    fetchSuppliers();
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

  const handleImport = () => {
    console.log("Nhập file");
  };

  const supplierColumns = [
    { label: "Mã Nhà Cung Cấp", key: "id" },
    { label: "Tên Nhà Cung Cấp", key: "name" },
    { label: "Số Điện Thoại", key: "phone" },
    { label: "Email", key: "email" },
    { label: "Trạng Thái", key: "status" },
  ];

  const handleRowClick = (supplier: any) => {
    setSelectedSupplier(supplier); // Lưu nhà cung cấp đã chọn vào context
    setEditDialogOpen(true);
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

        {/* Phần lọc và tìm kiếm */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "20px",
            marginTop: "10px",
            gap: 1,
            width: "50%", 
          }}
        >
          {/* Thanh tìm kiếm sẽ chiếm toàn bộ không gian còn lại */}
          <Box sx={{ flexGrow: 1 }}>
            <SearchBox
              placeholder={`Tìm kiếm nhà cung cấp`}
              onSearch={searchSuppliersByName}
              resetSearch={resetFilter}
            />
          </Box>

          {/* Dropdown lọc nhà cung cấp */}
          <Box sx={{ minWidth: "200px" }}>
            {" "}
            {/* Đặt chiều rộng tối thiểu */}
            <FilterDropdown
              label={`Lọc nhà cung cấp`}
              options={supplierStatusOptions}
              onFilterChange={filterSuppliersByStatus}
              resetFilter={resetFilter}
            />
          </Box>

          {/* Nút reset */}
          <Box>
            <CustomButton
              icon={<RefreshIcon />}
              text="Reset"
              onClick={handleReset}
            />
          </Box>
        </Box>

        {/* Phần action */}
        <Box sx={{ marginLeft: "auto", marginRight: "10px",marginTop:"10px" }}>
          <EntityActions
            onExport={handleExport}
            onImport={handleImport}
            onOpenAddDialog={handleOpenAddDialog}
            entityName="NCC"
          />
        </Box>
      </Box>

      <Box
        sx={{
          height: "100%",
          margin: "20px",
          boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
        }}
      >
        <TableContainer component={Paper}>
          <EntityTable
            entities={suppliers}
            loading={loading}
            columns={supplierColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>

      <AddSupplierDialog open={openAddDialog} onClose={handleCloseAddDialog} />
      <EditSupplierDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      />
    </Box>
  );
}
