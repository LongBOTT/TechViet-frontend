import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { Order } from "../../types/order";
import { updateOrder } from "../../api/orderApi";

interface ReasonDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const ReasonDialog: React.FC<ReasonDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [reason, setReason] = useState("");

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason.trim());
      setReason("");
      onClose();
    } else {
      alert("Vui lòng nhập lý do.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nhập lý do</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Lý do"
          type="text"
          fullWidth
          variant="outlined"
          value={reason}
          onChange={handleReasonChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="error" variant="contained">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReasonDialog