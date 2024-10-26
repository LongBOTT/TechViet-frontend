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
import CustomButton from "../Util/CustomButton";
import RefreshIcon from "@mui/icons-material/Refresh";
const CategoryContent: React.FC = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const {
    searchCategoriesByName,
    filterCategoriesByStatus,
    fetchCategories,
    categories,
    loading,
    setSelectedCategory,
    setEditDialogOpen,
    editDialogOpen,
  } = useCategoryContext();

  const [resetFilter, setResetFilter] = useState(false);
  const handleReset = () => {
    setResetFilter(true);
    setTimeout(() => setResetFilter(false), 0);
    fetchCategories();
  };
  const categoryColumns = [
    { label: "Mã thể loại", key: "id" },
    { label: "Tên thể loại", key: "name" },
    { label: "Mô tả", key: "description" },
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
          display: "flex", 
          alignItems: "center", 
          marginTop: "20px",
          gap: 2,
        }}
      >
        <SearchBox
          placeholder={`Tìm kiếm thể loại`}
          onSearch={searchCategoriesByName}
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
      {/* <AddCategoryDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      /> */}
    
      <EditCategoryDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}

      />
    </Box>
  );
};

export default CategoryContent;
