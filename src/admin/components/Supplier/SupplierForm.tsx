import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface SupplierFormProps {
  data: {
    id?: string;
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    status?: string;
  };
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ data, setData }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form>
      <TextField
        label="Mã nhà cung cấp"
        name="id"
        value={data.id || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Tên nhà cung cấp"
        name="name"
        value={data.name || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Số điện thoại"
        name="phone"
        value={data.phone || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={data.email || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Địa chỉ"
        name="address"
        value={data.address || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Trạng thái"
        name="status"
        value={data.status || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Đang giao dịch">Đang giao dịch</MenuItem>
        <MenuItem value="Ngưng giao dịch">Ngưng giao dịch</MenuItem>
      </TextField>
    </form>
  );
};

export default SupplierForm;
