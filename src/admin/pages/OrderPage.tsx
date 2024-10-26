import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Paper, TableContainer, Typography } from "@mui/material";
import FileButton from "../components/Util/FileButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import OrderProcessing from "../components/Order/OrderProcessing";
import EntityTable from "../components/Util/EntityTable";
import FilterDropdown from "../components/Util/FilterDropdown";
import SearchBox from "../components/Util/Search";
import CustomButton from "../components/Util/CustomButton";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Order() {
  const orderColumns = [
    { label: "Mã đơn", key: "id" },
    { label: "Ngày tạo đơn", key: "name" },
    { label: "Trạng thái thanh toán", key: "status" },
    { label: "Khách hàng", key: "customer" },
    { label: "Phương thức thanh toán", key: "method" },
    { label: "Tổng tiền", key: "total" },
  ];

  const mockOrderData = [
    {
      id: "ORD001",
      name: "2024-10-01",
      status: "Chưa thanh toán",
      customer: "Nguyễn Văn A",
      method: "COD",
      total: "1,500,000 VND",
    },
    {
      id: "ORD002",
      name: "2024-10-02",
      status: "Đã thanh toán",
      customer: "Trần Thị B",
      method: "Chuyển khoản",
      total: "3,200,000 VND",
    },
    {
      id: "ORD003",
      name: "2024-10-03",
      status: "Đã thanh toán",
      customer: "Lê Minh C",
      method: "Thanh toán qua ví điện tử",
      total: "2,850,000 VND",
    },
    {
      id: "ORD004",
      name: "2024-10-04",
      status: "Chưa thanh toán",
      customer: "Phạm Quang D",
      method: "COD",
      total: "900,000 VND",
    },
    {
      id: "ORD005",
      name: "2024-10-05",
      status: "Đã thanh toán",
      customer: "Đặng Văn E",
      method: "Chuyển khoản",
      total: "5,700,000 VND",
    },
    {
      id: "ORD006",
      name: "2024-10-06",
      status: "Chưa thanh toán",
      customer: "Ngô Thị F",
      method: "COD",
      total: "1,100,000 VND",
    },
  ];

  const [resetFilter, setResetFilter] = useState(false);

  const handleExport = () => console.log("Xuất file");
  const handleImport = () => console.log("Nhập file");
  const handleReset = () => {
    setResetFilter(true);
    setTimeout(() => setResetFilter(false), 0);
  };

  const searchProductsByName = (query: string) => {
    console.log("Search:", query);
  };

  const handleFilterChange = (value: string) => {
    console.log("Filter:", value);
  };

  const PaymentStatusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "pending", label: "Chờ duyệt" },
    { value: "preparing", label: "Chuẩn bị hàng" },
    { value: "shipping", label: "Đang giao" },
    { value: "completed", label: "Hoàn thành" },
    { value: "cancelled", label: "Đã hủy" },
  ];
  

  const PaymentMethodOptions = [
    { value: "all", label: "Tất cả" },
    { value: "bank_transfer", label: "Chuyển khoản" }, 
    { value: "cash", label: "Tiền mặt" }, 
  ];
  
  return (
    <Box
      sx={{
        flexGrow: 1,
        borderRadius: 1,
        bgcolor: "rgb(249, 249, 249)",
        margin: 0,
        padding: 0,
        height: "100vh",
        overflowY: "auto", // Toàn trang sẽ cuộn nếu nội dung vượt quá chiều cao khung nhìn
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", padding: 2 }}
        >
          Danh sách đơn hàng
        </Typography>
        <Box sx={{ display: "flex", marginRight: "10px" }}>
          <FileButton
            icon={<CloudUploadIcon />}
            text="Xuất file"
            onClick={handleExport}
          />
          <FileButton
            icon={<CloudDownloadIcon />}
            text="Nhập File"
            onClick={handleImport}
          />
        </Box>
      </Box>

      {/* Order Processing Section */}
      <Box sx={{ margin: "20px" }}>
        <OrderProcessing />
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
              placeholder="Tìm theo mã đơn hàng, tên khách hàng"
              onSearch={searchProductsByName}
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
              label="Phương thức TT"
              options={PaymentMethodOptions}
              onFilterChange={handleFilterChange}
              resetFilter={resetFilter}
            />
          </Box>
          <Box sx={{ minWidth: "200px" }}>
            <FilterDropdown
              label="Trạng thái đơn"
              options={PaymentStatusOptions}
              onFilterChange={handleFilterChange}
              resetFilter={resetFilter}
            />
          </Box>
          <Box sx={{ minWidth: "200px" }}>
            <FilterDropdown
              label="Ngày tạo"
              options={PaymentStatusOptions}
              onFilterChange={handleFilterChange}
              resetFilter={resetFilter}
            />
          </Box>
        </Box>

        {/* Table Section */}
        <Box sx={{ marginTop: "20px" }}>
          <TableContainer component={Paper}>
            <EntityTable
              entities={mockOrderData}
              loading={false}
              columns={orderColumns}
              onRowClick={() => {}}
            />
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
