import * as React from "react";
import Box from "@mui/material/Box";
import SearchBox from "../Util/Search";
import { Paper, TableContainer } from "@mui/material";
import EntityTable from "../Util/EntityTable";
import FilterDropdown from "../Util/FilterDropdown";
import { useEffect, useState } from "react";
import { getWarranties } from "../../../api/warrantyApi";
import type { Warranty } from "../../../types/warranty";

const Warranty: React.FC = () => {
  const searchProductsByName = (query: string) => {
    console.log("Searching for:", query);
  };
  const [Warranties, setWarranties] = useState<Warranty[]>([]);
  const fetchWarranties = async () => {
    try {
      const data = await getWarranties(); // Gọi API để lấy dữ liệu
      if (data) {
        setWarranties(data); // Cập nhật state
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phiếu nhập:", error);
    }
  };

  useEffect(() => {
    fetchWarranties(); // Gọi hàm khi component được tải
  }, []);
  const WarrantyPolicyColumns = [
    { label: "Mã ", key: "id" },
    { label: "Tên chính sách", key: "name" },
    { label: "Giá trị", key: "value" },
    { label: "Đơn vị", key: "unit" },
    { label: "Ghi chú", key: "note" },
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
        {/* Search Box
        <Box sx={{ flexGrow: 1 }}>
          <SearchBox
            placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm"
            onSearch={searchProductsByName} resetSearch={false}          />
        </Box> */}

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
            entities={Warranties}
            loading={false}
            columns={WarrantyPolicyColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Warranty;
