// src/admin/components/Util/CustomDialog.tsx
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Biểu tượng "X"
import SaveButton from "./CustomButton";
import SaveIcon from "@mui/icons-material/Save";

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave: () => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  children,
  onSave,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: "bold", marginTop: "30px", marginBottom: "20px" }}
      >
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions  sx={{ justifyContent: "center"}}> 
        <SaveButton icon={<SaveIcon />} text="Lưu" onClick={onSave} />
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
