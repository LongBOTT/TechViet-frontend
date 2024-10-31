import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import EntityTabs from "../../components/Util/EntityTabs";
import EntityActions from "../../components/Util/EntityActions";
import ProductContent from "../../components/Product/ProductContent";
import CategoryContent from "../../components/Category/CategoryContent";
import BrandContent from "../../components/Brand/BrandContent";
import AddCategoryDialog from "../../components/Category/AddCategoryDialog";
import AddBrandDialog from "../../components/Brand/AddBrandDialog";

export default function ProductComponent() {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const [openAddCategoryDialog, setOpenAddCategoryDialog] = React.useState(false);
  const [openAddBrandDialog, setOpenAddBrandDialog] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState("Sản phẩm");

  const handleExport = () => {
    console.log(`Xuất file của ${currentTab}`);
  };

  const handleOpenAddDialog = () => {
    if (currentTab === "Sản phẩm") {
      navigate("/AddProduct"); // Chuyển hướng đến trang /add-product khi tab là "Sản phẩm"
    } else if (currentTab === "Thể loại") {
      setOpenAddCategoryDialog(true);
    } else if (currentTab === "Thương hiệu") {
      setOpenAddBrandDialog(true);
    }
  };

  const handleImport = () => {
    console.log(`Nhập file của ${currentTab}`);
  };

  const tabs = [
    {
      label: "Sản phẩm",
      content: <ProductContent />,
    },
    {
      label: "Thể loại",
      content: <CategoryContent />,
    },
    {
      label: "Thương hiệu",
      content: <BrandContent />,
    },
  ];

  const handleTabChange = (tabLabel: string) => {
    setCurrentTab(tabLabel);
  };

  const handleCloseAddCategoryDialog = () => {
    setOpenAddCategoryDialog(false);
  };

  const handleCloseAddBrandDialog = () => {
    setOpenAddBrandDialog(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
        borderRadius: 1,
        bgcolor: "rgb(249, 249, 249)",
        margin: 0,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: 64,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", padding: 2 }}
        >
          Danh sách {currentTab}
        </Typography>
        <Box sx={{ marginLeft: "auto", marginRight: "10px" }}>
          <EntityActions
            onExport={handleExport}
            onImport={handleImport}
            onOpenAddDialog={handleOpenAddDialog}
            entityName={currentTab}
          />
        </Box>
      </Box>
      <Box
        sx={{
          margin: "20px",
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
        }}
      >
        <EntityTabs tabs={tabs} onTabChange={handleTabChange} />
      </Box>

      <AddCategoryDialog
        open={openAddCategoryDialog}
        onClose={handleCloseAddCategoryDialog}
      />

      <AddBrandDialog
        open={openAddBrandDialog}
        onClose={handleCloseAddBrandDialog}
      />
    </Box>
  );
}
