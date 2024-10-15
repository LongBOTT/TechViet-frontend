import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from "@mui/material";
import DialogUpdateSupplier from "./DialogUpdateSupplier"; 

interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "Đang giao dịch" | "Ngưng giao dịch";
}

const rows: Supplier[] = [
  {
    id: 1,
    name: "Nhà cung cấp 1",
    email: "supplier1@example.com",
    phone: "123456789",
    address: "Địa chỉ 1",
    status: "Đang giao dịch",
  },
  {
    id: 2,
    name: "Nhà cung cấp 2",
    email: "supplier2@example.com",
    phone: "987654321",
    address: "Địa chỉ 2",
    status: "Ngưng giao dịch",
  },
];

const CustomTable: React.FC = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false); // State để mở dialog

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedRow = rows.find((row) => row.id === id);
    setSelectedSupplier(selectedRow || null);
    setOpenDialog(true); // Mở dialog khi nhấp vào hàng
  };

  const handleClose = () => {
    setOpenDialog(false); // Đóng dialog
    setSelectedSupplier(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold" fontSize="16px">
                    Mã nhà cung cấp
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold" fontSize="16px">
                    Tên nhà cung cấp
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold" fontSize="16px">
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold" fontSize="16px">
                    Số điện thoại
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold" fontSize="16px">
                    Địa chỉ
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold" fontSize="16px">
                    Trạng thái
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

  
      <DialogUpdateSupplier
        supplier={selectedSupplier}
        open={openDialog}
        onClose={handleClose}
        onUpdate={(updatedSupplier) => {
          console.log("Cập nhật nhà cung cấp:", updatedSupplier);
        }}
        onDelete={(id) => {
          console.log("Xóa nhà cung cấp với ID:", id);
        }}
      />
    </Box>
  );
};

export default CustomTable;
