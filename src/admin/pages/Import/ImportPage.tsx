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
import {
  getStockReceiveById,
  getStockReceives,
  getStockReceivesBySupplierId,
} from "../../../api/stock_receiveApi";
import { useEffect } from "react";
import { currencyFormatter } from "../../components/Util/Formatter";
export default function Import() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const { suppliers } = useSupplierContext();
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
    fetchStockReceives();
   
  };
  const fetchStockReceives = async () => {
    try {
      const data = await getStockReceives(); // Gọi API để lấy dữ liệu
      const transformedData = data.map((item: any) => ({
        id: item.id,
        created_at: new Date(item.receive_date).toLocaleDateString("vi-VN"),
        total_amount: currencyFormatter.format(item.total),
        supplier_name: item.supplier.name,
        note: item.note,
      }));
      setTransformedImport(transformedData); // Cập nhật state
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phiếu nhập:", error);
    }
  };

  // Hàm lấy dữ liệu từ API khi component được tải
  useEffect(() => {
   
    fetchStockReceives(); // Gọi hàm khi component được tải
  }, []);
  const onOpenAddDialog = () => {
    navigate("/addImport");
  };
  const searchProductsById = async (id: string) => {
    setLoading(true);
    try {
      const data = await getStockReceiveById(parseInt(id));
      const transformedData = data.map((item: any) => ({
        id: item.id,
        created_at: new Date(item.receive_date).toLocaleDateString("vi-VN"),
        total_amount: currencyFormatter.format(item.total),
        supplier_name: item.supplier.name,
        note: item.note,
      }));
      setTransformedImport(transformedData); // Cập nhật state
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm lọc theo danh mục
  const handleFilterSupplier = async (value: string) => {
    setLoading(true);
    try {
      const data = await getStockReceivesBySupplierId(parseInt(value));
      const transformedData = data.map((item: any) => ({
        id: item.id,
        created_at: new Date(item.receive_date).toLocaleDateString("vi-VN"),
        total_amount: currencyFormatter.format(item.total),
        supplier_name: item.supplier.name,
        note: item.note,
      }));
      setTransformedImport(transformedData); // Cập nhật state
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };
  const importColumns = [
    { label: "Mã phiếu nhập", key: "id" },
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
        <Box
          sx={{ display: "flex", alignItems: "center", marginRight: "20px" }}
        >
          {" "}
          <AddButton
            icon={<AddCircleIcon />}
            text="Tạo phiếu nhập"
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
              onRowClick={handleRowClick}
            />
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
