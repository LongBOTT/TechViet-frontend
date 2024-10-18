import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useSupplierContext } from "../../../context/SupplierContext";
import { Supplier } from "../../../types/supplier";
import EditSupplierDialog from "./EditSupplierDialog";

export default function SupplierTable() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 12;
  const { suppliers, loading, setSelectedSupplier, setEditDialogOpen,editDialogOpen } =
    useSupplierContext();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleRowClick = (supplier: React.SetStateAction<Supplier | null>) => {
    setSelectedSupplier(supplier); // Lưu nhà cung cấp đã chọn vào context
    setEditDialogOpen(true);
  };

  // Handle page change
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Calculate paginated suppliers
  const paginatedSuppliers = suppliers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                  <Typography variant="body2">Đang tải dữ liệu...</Typography>
                </TableCell>
              </TableRow>
            ) : paginatedSuppliers.length > 0 ? (
              paginatedSuppliers.map((supplier) => (
                <TableRow
                  key={supplier.id}
                  onClick={() => handleRowClick(supplier)}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f0f0f0', // Màu sắc khi hover
                      cursor: 'pointer', // Hiệu ứng con trỏ khi hover
                    },
                  }}
                >
                  <TableCell>{supplier.id}</TableCell>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2">
                    Không có dữ liệu để hiển thị.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <EditSupplierDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        />
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
          <Pagination
            count={Math.ceil(suppliers.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </TableContainer>
    </Box>
  );
}
