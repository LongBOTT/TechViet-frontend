import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
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

interface SupplierFormProps {
  supplier: Supplier | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedSupplier: Supplier) => void;
  onDelete: (id: number) => void;
}

const SupplierDialog: React.FC<SupplierFormProps> = ({
  supplier,
  open,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Supplier | null>(null);

  useEffect(() => {
    if (supplier) {
      setFormData(supplier);
    }
  }, [supplier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdate = () => {
    if (formData) {
      onUpdate(formData);
      onClose();
    }
  };

  const handleDelete = () => {
    if (formData) {
      onDelete(formData.id);
      onClose(); 
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
        <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon fontSize="large" /> {/* Đặt kích thước biểu tượng lớn */}
      </IconButton>
     
      <DialogTitle>Thông tin nhà cung cấp</DialogTitle>
      <DialogContent>
        {formData ? (
          <>
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
          </>
        ) : (
          <Typography variant="body1">
            Vui lòng chọn một nhà cung cấp để xem thông tin.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        {formData && (
          <>
            <Button onClick={handleUpdate} variant="contained" color="primary"
            sx = {{
              textTransform: 'none',
              fontFamily: 'Roboto, sans-serif',
            }}>
              Cập nhật
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SupplierDialog;
;
