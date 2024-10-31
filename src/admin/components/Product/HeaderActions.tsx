// src/admin/components/Util/HeaderActions.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

interface HeaderActionsProps {
  isEditing: boolean;
  mode: "add" | "edit"; // Chế độ 'add' hoặc 'edit'
  onGoBack: () => void;
  onSave: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  onExit: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  isEditing,
  mode,
  onGoBack,
  onSave,
  onEdit,
  onCancel,
  onDelete,
  onExit,
}) => {
  return (
    <Box
      sx={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgb(255, 255, 255)",
        px: 2,
      }}
    >
      <Button startIcon={<ArrowBackIcon />} onClick={onGoBack} sx={{ color: "black", textTransform: "none" }}>
        <Typography sx={{ fontFamily: "Roboto", fontWeight: "bold", px: 2 }}>
         Quay lại danh sách sản phẩm
        </Typography>
      </Button>

      <Box>
        {mode === "add" ? (
          // Chế độ thêm
          <>
            <Button
              onClick={onSave}
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                textTransform: "none",
                mr: 1,
                height: 40,
                width: 100,
                bgcolor: "rgb(25, 118, 210)",
              }}
            >
              Lưu
            </Button>
            <Button
              onClick={onExit}
              variant="outlined"
              sx={{ textTransform: "none", height: 40, width: 100 }}
            >
              Thoát
            </Button>
          </>
        ) : (
          // Chế độ sửa
          <>
            {isEditing ? (
              <>
                <Button
                  onClick={onSave}
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{
                    textTransform: "none",
                    mr: 1,
                    height: 40,
                    width: 100,
                    bgcolor: "rgb(25, 118, 210)",
                  }}
                >
                  Lưu
                </Button>
                <Button
                  onClick={onCancel}
                  variant="outlined"
                  startIcon={<CloseIcon />}
                  sx={{
                    textTransform: "none",
                    mr: 1,
                    height: 40,
                    width: 100,
                    color: "rgb(255, 0, 0)",
                    borderColor: "rgb(255, 0, 0)",
                  }}
                >
                  Hủy
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onExit} variant="outlined" sx={{ textTransform: "none", mr: 1, height: 40, width: 100 }}>
                  Thoát
                </Button>
                <Button
                  onClick={onDelete}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  sx={{ textTransform: "none", mr: 1, height: 40, width: 100 }}
                >
                  Xóa
                </Button>
                <Button
                  onClick={onEdit}
                  variant="contained"
                  startIcon={<EditIcon />}
                  sx={{ textTransform: "none", height: 40, width: 100, bgcolor: "rgb(25, 118, 210)" }}
                >
                  Sửa
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default HeaderActions;
