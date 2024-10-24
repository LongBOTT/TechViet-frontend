// src/admin/components/Util/EntityFilter.tsx
import React from "react";
import SaveIcon from "@mui/icons-material/Save";

import { Box } from "@mui/material";
import SearchBox from "../Util/Search";
import FilterDropdown from "../Util/FilterDropdown";
import CustomButton from "./CustomButton";

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
  const onSave = () => {
    console.log(`Lưu ${entityName}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "50px",
        marginTop: "10px",
        gap: 1,
        width: "600px",
        // bgcolor: "white",
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
      <CustomButton
        icon={<SaveIcon />}
        text="Reset"
        onClick={onSave}
      ></CustomButton>
    </Box>
  );
};

export default EntityFilter;
