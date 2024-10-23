import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Tab from "../components/Product/TabComponent";
import EntityTabs from "../components/Util/EntityTabs";
import EntityActions from "../components/Util/EntityActions";

export default function ProductComponent() {
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const handleExport = () => {
    console.log("Xuất file");
  };
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };
  const handleImport = () => {
    console.log("Nhập file");
  };

  const handleAddProduct = () => {
    
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
        borderRadius: 1,
        bgcolor: "rgb(249, 249, 249)",
        margin: 0,
        padding: 0,
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
          Danh sách sản phẩm
        </Typography>
        <Box sx={{ marginLeft: "auto", marginRight: "10px" }}>
        <EntityActions
            onExport={handleExport}
            onImport={handleImport}
            onOpenAddDialog={handleOpenAddDialog}
            entityName="sản phẩm"
          />
        </Box>
      </Box>
      <Box
        sx={{
          height: "100%",
          margin: "20px",
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* <Tab /> */}
        <EntityTabs tabs={[{ label: "Sản phẩm", content: <></> },{label:"Thể loại",content: <></> },{label:"Thương hiệu",content: <></> }]}  />
      </Box>
     
    </Box>
  );
}
