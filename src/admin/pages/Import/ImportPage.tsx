import * as React from "react";
import Box from "@mui/material/Box";
import { Paper, TableContainer, Typography } from "@mui/material";
import AddButton from "../../components/Util/CustomButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterDropdown from "../../components/Util/FilterDropdown";
import CustomButton from "../../components/Util/CustomButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import EntityTable from "../../components/Util/EntityTable";
import SearchBox from "../../components/Util/Search";
import { useSupplierContext } from "../../../context/SupplierContext";
import { useNavigate } from "react-router-dom";
export default function Import() {
  const navigate = useNavigate();
 
  const {suppliers} = useSupplierContext();
  const [resetFilter, setResetFilter] = React.useState(false);
  const [transformedImport, setTransformedImport] = React.useState<any[]>([]);
  const SuppliersOptions = suppliers.map((supplier: any) => ({
    value: supplier.id,
    label: supplier.name,
  }));
    // Xử lý khi người dùng bấm vào hàng sản phẩm
    const handleRowClick = (import_note: any) => {
      navigate(`/detailImport/${import_note.id}`); // Chuyển hướng đến trang chỉnh sửa sản phẩm
    };
  const handleReset = () => {
    setResetFilter(true);
    setTimeout(() => setResetFilter(false), 0);
    
  };
  const onOpenAddDialog = () => {
    navigate("/addImport");  
  }
  const searchProductsById = (id: string) => {
    console.log(`Tìm phiếu nhập có mã: ${id}`);
  }
  
  // Hàm lọc theo danh mục
  const handleFilterSupplier = (value: string) => {
    console.log(`Lọc theo nhà cung cấp: ${value}`);
  };
  const importColumns = [
    { label: "Mã phiếu nhập", key: "import_id" }, 
    { label: "Ngày tạo", key: "created_at" }, 
    { label: "Tổng tiền", key: "total_amount" }, 
    { label: "Nhà cung cấp", key: "supplier_name" }, 
    { label: "Ghi chú", key: "note" }, 
  ];
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
        borderRadius: 1,
        bgcolor: "rgb(255, 255, 255)",
        margin: 0,
        padding: 0,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: 64,
          display: "flex",
          justifyContent: "space-between",
          borderRadius: 1,
          alignItems: "center",
          // backgroundColor: "rgb(255, 25, 123)",
          bgcolor: "rgb(249, 249, 249)",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", padding: 2 }}
        >
          Danh sách phiếu nhập
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center",marginRight:'20px' }}>
          {" "}
          <AddButton
            icon={<AddCircleIcon />}
            text= "Tạo phiếu nhập"
            onClick={onOpenAddDialog}
          />
        </Box>
      </Box>
            {/* Main Content */}
            <Box
        sx={{
          margin: "20px",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          bgcolor: "rgb(255, 255, 255)",
        }}
      >
        {/* Search and Filter Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Thanh tìm kiếm sẽ chiếm toàn bộ không gian dư còn lại */}
          <Box sx={{ flexGrow: 1 }}>
            {" "}
            <SearchBox
              placeholder="Tìm theo mã phiếu nhập"
              onSearch={searchProductsById}
              resetSearch={resetFilter}
            />
          </Box>
          <Box sx={{ minWidth: "200px" }}>
            <CustomButton
              icon={<RefreshIcon />}
              text="Reset"
              onClick={handleReset}
            />
          </Box>
          <Box sx={{ minWidth: "200px" }}>
            <FilterDropdown
              label="Nhà cung cấp"
              options={SuppliersOptions}
              onFilterChange={handleFilterSupplier}
              resetFilter={resetFilter}
            />
          </Box>
        </Box>

        {/* Table Section */}
        <Box sx={{ marginTop: "20px" }}>
          <TableContainer component={Paper}>
            <EntityTable
              entities={transformedImport}
              loading={false}
              columns={importColumns}
              onRowClick={() => {}}
            />
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
