import * as React from "react";
import Box from "@mui/material/Box";
import SearchBox from "../Util/Search";
import { Paper, TableContainer } from "@mui/material";
import EntityTable from "../Util/EntityTable";

import EditBrandDialog from "./EditBrandDialog";
import { useState } from "react";
import AddBrandDialog from "./AddBrandDialog";
import { useBrandContext } from "../../../context/BrandContex";
import CustomButton from "../Util/CustomButton";
import RefreshIcon from "@mui/icons-material/Refresh";
const BrandContent: React.FC = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const {
    searchBrandsByName,
    fetchBrands,
    brands,
    loading,
    setSelectedBrand,
    setEditDialogOpen,
    editDialogOpen,
  } = useBrandContext();

  const [resetFilter, setResetFilter] = useState(false);
  const handleReset = () => {
    setResetFilter(true);
    setTimeout(() => setResetFilter(false), 0);
    fetchBrands();
  };
  const brandColumns = [
    { label: "Mã thương hiệu", key: "id" },
    { label: "Tên thương hiệu", key: "name" },
    { label: "Mô tả", key: "description " },
  ];

  const handleRowClick = (brand: any) => {
    setSelectedBrand(brand); // Lưu thể loại đã chọn vào context
    setEditDialogOpen(true);
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
     

      <Box
        sx={{
          display: "flex", 
          alignItems: "center", 
          marginTop: "20px",
          gap: 2,
        }}
      >
        <SearchBox
          placeholder={`Tìm kiếm thương hiệu`}
          onSearch={searchBrandsByName}
          resetSearch={resetFilter}
        />
        {/* Nút reset */}
        <Box>
          <CustomButton
            icon={<RefreshIcon />}
            text="Reset"
            onClick={handleReset}
          />
        </Box>
      </Box>

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
            entities={brands}
            loading={loading}
            columns={brandColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>
      <AddBrandDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      />
      <EditBrandDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      />
    </Box>
  );
};

export default BrandContent;
