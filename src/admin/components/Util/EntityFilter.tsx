// src/admin/components/Util/EntityFilter.tsx
import React from "react";
import { Box } from "@mui/material";
import SearchBox from "../Util/Search";
import FilterDropdown from "../Util/FilterDropdown";

interface EntityFilterProps {
  searchByName: (query: string) => void;
  filterByStatus: (status: string) => void;
  statusOptions: Array<{ value: string; label: string }>;
  entityName: string; // Tên của thực thể (vd: "Nhà cung cấp", "Sản phẩm")
}

const EntityFilter: React.FC<EntityFilterProps> = ({
  searchByName,
  filterByStatus,
  statusOptions,
  entityName,
}) => {
  return (
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
        placeholder={`Tìm kiếm ${entityName}`}
        onSearch={searchByName}
      />
      <FilterDropdown
        label={`Lọc ${entityName}`}
        options={statusOptions}
        onFilterChange={filterByStatus}
      />
    </Box>
  );
};

export default EntityFilter;
