import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import FileButton from "../components/Util/FileButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GuaranteeContent from "../components/Warranty/WarrantyCard";
import Warranty from "../components/Warranty/WarrantyPolicy";
import EntityTabs from "../components/Util/EntityTabs";
import AddButton from "../../admin/components/Util/CustomButton";
import AddWarrantyPolicyDialog from "../components/Warranty/AddWarrantyPolicyDialog";
export default function WarrantyPage() {
  const handleExport = () => {
    console.log("Xuất file");
  };

  const handleImport = () => {
    console.log("Nhập file");
  };
  const tabs = [
    {
      label: "Phiếu bảo hành",
      content: <GuaranteeContent />,
    },
    {
      label: "Chính sách bảo hành",
      content: <Warranty />,
    },
  ];
  const [currentTab, setCurrentTab] = React.useState("Phiếu bảo hành"); // Trạng thái tab hiện tại
  const [openAddWarrantyPolicyDialog, setOpenAddWarrantyPolicyDialog] = React.useState(false);
  const handleTabChange = (tabLabel: string) => {
    setCurrentTab(tabLabel);
  };
  const handleOpenAddDialog = () => {
      setOpenAddWarrantyPolicyDialog(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAddWarrantyPolicyDialog(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        borderRadius: 1,
        bgcolor: "rgb(249, 249, 249)",
        margin: 0,
        padding: 0,
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
          bgcolor: "rgb(255, 255, 255)",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", padding: 2 }}
        >
          Bảo hành
        </Typography>

        <Box
          sx={{ marginLeft: "auto", marginRight: "10px", marginTop: "10px" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AddButton
              icon={<AddCircleIcon />}
              text={`Thêm Chính sách bảo hành`}
              onClick={handleOpenAddDialog}
            />
          </Box>
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
      <AddWarrantyPolicyDialog open={openAddWarrantyPolicyDialog} onClose={handleCloseAddDialog} />
    </Box>
  );
}
