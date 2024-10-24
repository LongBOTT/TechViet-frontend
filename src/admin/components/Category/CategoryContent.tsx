import * as React from "react";
import Box from "@mui/material/Box";
import SearchBox from "../Util/Search";
import { Paper, TableContainer } from "@mui/material";
import EntityTable from "../Util/EntityTable";
import {
  useCategoryContext,
} from "../../../context/CategoryContext";
import EditCategoryDialog from "./EditCategoryDialog";
import { useState } from "react";
import AddCategoryDialog from "./AddCategoryDialog";

const CategoryContent: React.FC = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const {
    searchCategoriesByName,
    filterCategoriesByStatus,
    categories,
    loading,
    setSelectedCategory,
    setEditDialogOpen,
    editDialogOpen,
  } = useCategoryContext();

  const categoryColumns = [
    { label: "Mã thể loại", key: "id" },
    { label: "Tên thể loại", key: "name" },
  ];

  const handleRowClick = (category: any) => {
    setSelectedCategory(category); // Lưu nhà cung cấp đã chọn vào context
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
          placeholder={`Tìm kiếm thể loại`}
          onSearch={searchCategoriesByName}
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
            entities={categories}
            loading={loading}
            columns={categoryColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>
      <AddCategoryDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      />
      <EditCategoryDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      />
    </Box>
  );
};

export default CategoryContent;
