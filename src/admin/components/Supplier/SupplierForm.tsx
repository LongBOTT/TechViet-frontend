import React from "react";
import { TextField, MenuItem, Grid } from "@mui/material";
import { Supplier } from "../../../types/supplier";

interface SupplierFormProps {
  data: Supplier;
  setData: (supplier: Supplier) => void;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ data, setData }) => {
  // Hàm để cập nhật dữ liệu từ các trường nhập liệu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Tên nhà cung cấp"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Số điện thoại"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Địa chỉ"
          name="address"
          value={data.address}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          select
          fullWidth
          label="Trạng thái"
          name="status"
          value={data.status}
          onChange={handleChange}
          required
        >
          <MenuItem value="Đang giao dịch">Đang giao dịch</MenuItem>
          <MenuItem value="Ngưng giao dịch">Ngưng giao dịch</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default SupplierForm;
