import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Pagination } from "@mui/material";
import { Supplier } from "../../../types/supplier";
import { getSuppliers } from "../../../api/supplierApi";

const SupplierTable: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [rowsPerPage] = useState(20); // Số dòng mỗi trang
  

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers();
        setSuppliers(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhà cung cấp:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // Thêm hiệu ứng cuộn khi trang thay đổi
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  }, [page]); // Kích hoạt mỗi khi `page` thay đổi

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage); // Cập nhật trang khi người dùng chuyển trang
  };

  // Chia danh sách nhà cung cấp theo trang
  const paginatedSuppliers = suppliers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Đang tải...
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã Nhà Cung Cấp</TableCell>
              <TableCell>Tên Nhà Cung Cấp</TableCell>
              <TableCell>Số Điện Thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Trạng Thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.id}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: 2,
        }}
      >
        <Pagination
          count={Math.ceil(suppliers.length / rowsPerPage)} // Tổng số trang
          page={page} // Trang hiện tại
          onChange={handleChangePage} 
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default SupplierTable;
