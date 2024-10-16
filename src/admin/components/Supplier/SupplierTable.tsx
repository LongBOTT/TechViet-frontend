// src/components/Supplier/SupplierTable.tsx
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from "@mui/material"; // Thêm CircularProgress và Box
import { Supplier } from "../../../types/supplier";
import { getSuppliers } from "../../../api/supplierApi"; // Giả sử bạn có API để lấy danh sách nhà cung cấp

const SupplierTable: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers(); // Gọi API để lấy danh sách nhà cung cấp
        setSuppliers(response); // Truyền dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhà cung cấp:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Chiều cao của Box để căn giữa
        }}
      >
        <CircularProgress /> {/* Hiển thị hiệu ứng loading */}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mã Nhà Cung Cấp</TableCell>
            <TableCell>Tên Nhà Cung Cấp</TableCell>
            <TableCell>Số Điện Thoại</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Địa Chỉ</TableCell>
            <TableCell>Trạng Thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.id}</TableCell>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.address}</TableCell>
              <TableCell>{supplier.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SupplierTable;
