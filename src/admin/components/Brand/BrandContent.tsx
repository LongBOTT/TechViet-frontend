import * as React from "react";
import Box from "@mui/material/Box";
import SearchBox from "../Util/Search";
import { Paper, TableContainer } from "@mui/material";
import EntityTable from "../Util/EntityTable";

import EditBrandDialog from "./EditBrandDialog";
import { useState } from "react";
import AddBrandDialog from "./AddBrandDialog";
import { useBrandContext } from "../../../context/BrandContex";

const BrandContent: React.FC = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const {
    searchBrandsByName,
    brands,
    loading,
    setSelectedBrand,
    setEditDialogOpen,
    editDialogOpen,
  } = useBrandContext();

  const brandColumns = [
    { label: "Mã thương hiệu", key: "id" },
    { label: "Tên thương hiệu", key: "name" },
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
      {/* Nội dung dành cho thể loại */}

      <Box
        sx={{
          marginTop: "20px",
        }}
      >
        <SearchBox
          placeholder={`Tìm kiếm thương hiệu`}
          onSearch={searchBrandsByName}
        />
      </Box>
      <Box
        sx={{
          flex: 1, // Dùng flex để bảng chiếm toàn bộ chiều cao còn lại
          overflow: "auto", // Đảm bảo thanh cuộn hoạt động khi nội dung vượt quá
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
