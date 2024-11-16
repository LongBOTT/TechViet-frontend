import * as React from "react";
import Box from "@mui/material/Box";
import SearchBox from "../Util/Search";
import { Paper, TableContainer } from "@mui/material";
import EntityTable from "../Util/EntityTable";
import FilterDropdown from "../Util/FilterDropdown";
import { useState } from "react";
import CustomButton from "../Util/CustomButton";
import RefreshIcon from "@mui/icons-material/Refresh";
const WarrantyCard: React.FC = () => {
  const searchProductsByName = (query: string) => {
    console.log("Searching for:", query);
  };
  const [resetFilter, setResetFilter] = useState(false);
  const handleReset = () => {
    setResetFilter(true);
    setTimeout(() => setResetFilter(false), 0);
  };
  const WarrantyStatusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "pending", label: "Chưa sử dụng" },
    { value: "in_process", label: "Đã sử dụng" },
    { value: "completed", label: "Hết hạn" },
 
  ];

  const mockGuaranteeData = [
    {
      voucherCode: "BH001",
      status: "Đang xử lý",
      product: "iPhone 15 Pro Max",
      imei: "123456789012345",
      orderCode: "ORD001",
      customer: "Nguyễn Văn A",
      warrantyPeriod: "12 tháng",
    },
    {
      voucherCode: "BH002",
      status: "Hoàn thành",
      product: "Samsung Galaxy S23",
      imei: "987654321098765",
      orderCode: "ORD002",
      customer: "Trần Thị B",
      warrantyPeriod: "24 tháng",
    },
    {
      voucherCode: "BH003",
      status: "Đang xử lý",
      product: "MacBook Air M2",
      imei: "456789012345678",
      orderCode: "ORD003",
      customer: "Lê Minh C",
      warrantyPeriod: "18 tháng",
    },
    {
      voucherCode: "BH004",
      status: "Đã hủy",
      product: "Dell XPS 13",
      imei: "321654987321654",
      orderCode: "ORD004",
      customer: "Phạm Quang D",
      warrantyPeriod: "12 tháng",
    },
    {
      voucherCode: "BH005",
      status: "Hoàn thành",
      product: "Sony WH-1000XM5",
      imei: "654987321654987",
      orderCode: "ORD005",
      customer: "Đặng Văn E",
      warrantyPeriod: "24 tháng",
    },
  ];

  const GuaranteeColumns = [
    { label: "Mã phiếu", key: "voucherCode" },
    { label: "Sản phẩm", key: "product" },
    { label: "IMEI", key: "imei" },
    { label: "Mã đơn hàng", key: "orderCode" },
    { label: "Khách hàng", key: "customer" },
    { label: "Thời hạn bảo hành", key: "warrantyPeriod" },
    { label: "Trạng thái", key: "status" },
  ];

  const handleRowClick = () => {};
  const handleFilterCategory = () => {
    console.log("Nhập file");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "auto",
      }}
    >
      {/* Search Bar */}
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Search Box */}
        <Box sx={{ flexGrow: 1 }}>
          <SearchBox
            placeholder="Tìm kiếm theo mã phiếu, imei, tên khách hàng"
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
        {/* Trạng thái Dropdown */}
        <Box sx={{ minWidth: 200 }}>
          <FilterDropdown
            label={`Trạng thái`}
            options={WarrantyStatusOptions}
            onFilterChange={handleFilterCategory}
            resetFilter={resetFilter}
          />
        </Box>
      </Box>

      {/* Table */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          marginTop: "20px",
          boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
          height: "100%",
        }}
      >
        <TableContainer component={Paper}>
          <EntityTable
            entities={mockGuaranteeData}
            loading={false}
            columns={GuaranteeColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default WarrantyCard;
