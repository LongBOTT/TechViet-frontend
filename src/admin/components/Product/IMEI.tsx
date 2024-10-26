import * as React from "react";
import Box from "@mui/material/Box";
import SearchBox from "../Util/Search";
import { Paper, TableContainer } from "@mui/material";
import EntityTable from "../Util/EntityTable";
import FilterDropdown from "../Util/FilterDropdown";

const IMEIS: React.FC = () => {
  const searchProductsByName = (query: string) => {
    console.log("Searching for:", query);
  };


  const StatusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Chưa bán" },
    { value: "inactive", label: "Đã bán" },
  ];

  const imeis = [
    {
      id: "3121410482",
      name: "Iphone 15 Pro Max",
      category: "Điện thoại",
      brand: "Apple",
      status: "Chưa bán",
    },
    {
        id: "3121410483",
        name: "Iphone 15 Pro Max",
        category: "Điện thoại",
        brand: "Apple",
        status: "Đã bán",
    },
   
   
    
  ];

  const imeiColumns = [
    { label: "Mã IMEI", key: "image" },
    { label: "Sản phẩm", key: "name" },
    { label: "Trạng thái", key: "stock" },
    { label: "Thể loại", key: "category" },
    { label: "Thương hiệu", key: "brand" },
  ];

  const handleRowClick = ( )=> {
   
  };
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
          {/* <SearchBox
            placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm"
            onSearch={searchProductsByName}
          /> */}
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
            entities={imeis}
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
