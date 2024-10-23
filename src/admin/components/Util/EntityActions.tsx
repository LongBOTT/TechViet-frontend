// src/admin/components/Util/EntityActions.tsx
import React from "react";
import { Box } from "@mui/material";
import FileButton from "../Util/FileButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddButton from "../Util/CustomButton";

interface EntityActionsProps {
  onExport: () => void;
  onImport: () => void;
  onOpenAddDialog: () => void;
  entityName: string; // Tên của thực thể (vd: "Nhà cung cấp", "Sản phẩm")
}

const EntityActions: React.FC<EntityActionsProps> = ({
  onExport,
  onImport,
  onOpenAddDialog,
  entityName,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <FileButton
        icon={<CloudUploadIcon />}
        text={`Xuất file`}
        onClick={onExport}
      />
      <FileButton
        icon={<CloudDownloadIcon />}
        text={`Nhập File`}
        onClick={onImport}
      />
      <AddButton
        icon={<AddCircleIcon />}
        text={`Thêm ${entityName}`}
        onClick={onOpenAddDialog}
      />
    </Box>
  );
};

export default EntityActions;
