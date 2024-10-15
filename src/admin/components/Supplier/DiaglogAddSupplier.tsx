import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Biểu tượng "X"

interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "Đang giao dịch" | "Ngưng giao dịch";
}

interface AddSupplierDialogProps {
  open: boolean;
  onClose: () => void;
  onAddSupplier: (newSupplier: Supplier) => void;
}

const AddSupplierDialog: React.FC<AddSupplierDialogProps> = ({
  open,
  onClose,
  onAddSupplier,
}) => {
  const [formData, setFormData] = useState<Supplier>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Đang giao dịch",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSupplier = () => {
    onAddSupplier(formData);
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>

      <DialogTitle>Thêm nhà cung cấp mới</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Tên nhà cung cấp"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="phone"
          label="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="address"
          label="Địa chỉ"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="status"
          label="Trạng thái"
          value={formData.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddSupplier} variant="contained" color="primary">
          Thêm nhà cung cấp
        </Button>
        <Button onClick={onClose} variant="outlined">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSupplierDialog;
