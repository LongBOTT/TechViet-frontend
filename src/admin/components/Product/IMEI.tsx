import * as React from "react";
import Box from "@mui/material/Box";
import SearchBox from "../Util/Search";
import { Paper, TableContainer } from "@mui/material";
import EntityTable from "../Util/EntityTable";
import FilterDropdown from "../Util/FilterDropdown";
import CustomButton from "../Util/CustomButton";
import RefreshIcon from '@mui/icons-material/Refresh';
import { getImeis } from "../../../api/imeiApi";
import { useEffect, useState } from "react";

const IMEIS: React.FC = () => {
    const [resetFilter, setResetFilter] = useState(false);
    const [transformedImeis, setTransformedImeis] = React.useState<any[]>([]);
  const searchProductsByName = (query: string) => {
    console.log("Searching for:", query);
  };

  const fetchImeis = async () => {
    try {
      const data = await getImeis();
  
      // Chuyển đổi dữ liệu từ API thành định dạng phù hợp cho bảng và lọc ra các mục có imeiCode khác "0"
      const transformedData = data
        .filter((item: any) => item.imeiCode !== "0") // Lọc các mục có imeiCode khác "0"
        .map((item: any) => ({
          id: item.id,
          imeiCode: item.imeiCode,
          name: item.stockReceiveDetail?.variant?.name || 'N/A',
          category: item.stockReceiveDetail?.variant?.products?.category?.name || 'N/A',
          brand: item.stockReceiveDetail?.variant?.products?.brand?.name || 'N/A',
          status: item.status,
        }));
  
      setTransformedImeis(transformedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu imeis:", error);
    }
  };
  
  
  useEffect(() => {
    fetchImeis(); // Gọi hàm khi component được tải
  }, []);
  const StatusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Chưa bán" },
    { value: "inactive", label: "Đã bán" },
  ];

  const imeiColumns = [
    { label: "id", key: "id" },
    { label: "Mã IMEI", key: "imeiCode" },
    { label: "Phiên bản", key: "name" },
    { label: "Thể loại", key: "category" },
    { label: "Thương hiệu", key: "brand" },
    { label: "Trạng thái", key: "status" },
  ];

  const handleRowClick = () => {};
  const handleFilterCategory = () => {
    console.log("Nhập file");
  };
 // Xử lý đặt lại bộ lọc
 const handleReset = () => {
  setResetFilter(true);
  setTimeout(() => setResetFilter(false), 0);
  // Lấy lại dữ liệu sản phẩm
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
            placeholder="Tìm kiếm theo mã imei, tên phiên bản"
            onSearch={searchProductsByName}
            resetSearch={resetFilter}
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
        {/* Trạng thái Dropdown */}
        <Box sx={{ minWidth: 200 }}>
          {/* <FilterDropdown
            label={`Trạng thái`}
            options={StatusOptions}
            onFilterChange={handleFilterCategory}
          /> */}
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
            entities={transformedImeis}
            loading={false}
            columns={imeiColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default IMEIS;
