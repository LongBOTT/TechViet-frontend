import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Autocomplete,
  TextField,
  Chip,
} from "@mui/material";

import { currencyFormatter } from "../Util/Formatter";

interface OrderItemsTableProps {
  orderDetails: Array<{
    variantId: number;
    variantName: string;
    quantity: number;
    price: number;
    total: number;
    imeiMap: { [key: number]: { id: number; imeiCode: string } | null };
    imeis: Array<{
      id: number;
      imei: string;
      status: string;
      stockReceiveDetailId: number;
    }>;
  }>;
  onImeiUpdate: (
    orderDetailId: number,
    selectedImeis: Array<{ id: number; imei: string }>
  ) => void;
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({
  orderDetails,
  onImeiUpdate,
}) => {
  const [selectedImeis, setSelectedImeis] = useState<{
    [key: number]: Array<{ id: number; imei: string }>;
  }>({});

  const handleImeiChange = (
    orderDetailId: number,
    newValue: Array<{ id: number; imei: string }>
  ) => {
    setSelectedImeis((prev) => ({
      ...prev,
      [orderDetailId]: newValue,
    }));

    // Gọi hàm onImeiUpdate để cập nhật state trong component cha
    onImeiUpdate(orderDetailId, newValue);
  };

  return (
    <Box
      sx={{
        marginLeft: "50px",
        marginTop: "20px",
        width: "90%",
        borderRadius: "10px",
        bgcolor: "white",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid rgb(224, 224, 224)" }}>
        <Typography sx={{ fontWeight: "bold" }}>Chi tiết đơn hàng</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "25%", textAlign: "center" }}>
                Tên sản phẩm
              </TableCell>
              <TableCell sx={{ width: "25%", textAlign: "center" }}>
                Số lượng
              </TableCell>
              <TableCell sx={{ width: "25%", textAlign: "center" }}>
                Đơn giá
              </TableCell>
              <TableCell sx={{ width: "25%", textAlign: "center" }}>
                Thành tiền
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>
                    {detail.variantName}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {detail.quantity}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {currencyFormatter.format(detail.price)}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {currencyFormatter.format(detail.total)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Autocomplete
                      multiple
                      options={detail.imeis || []} // Sử dụng [] nếu detail.imeis là null hoặc undefined
                      getOptionLabel={(option) => option.imei}
                      value={selectedImeis[detail.variantId] || []}
                      onChange={(event, newValue) =>
                        handleImeiChange(detail.variantId, newValue)
                      }
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Nhập số IMEI" />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            label={option.imei}
                            {...getTagProps({ index })}
                            key={option.id}
                          />
                        ))
                      }
                    />
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderItemsTable;
