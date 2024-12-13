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
    imeiMap: { orderDetailId: number; imeiId: number; imeiCode: string }[];
    imeis: Array<{
      id: number;
      imei: string;
      status: string;
      stockReceiveDetailId: number;
    }>;
  }>;
  onImeiUpdate: (
    variantId: number,
    selectedImeis: Array<{ id: number; imei: string }>
  ) => void;
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({
  orderDetails,
  onImeiUpdate,
}) => {
  const [selectedImeis, setSelectedImeis] = useState<{
    [variantId: number]: Array<{ id: number; imei: string }>;
  }>({});

  const handleImeiChange = (
    variantId: number,
    newValue: Array<{ id: number; imei: string }>
  ) => {
    // Cập nhật selectedImeis với các IMEI đã chọn
    setSelectedImeis((prev) => ({
      ...prev,
      [variantId]: newValue, // Cập nhật danh sách IMEI cho variantId này
    }));

    // Gọi hàm onImeiUpdate để cập nhật imeiMap trong component cha
    onImeiUpdate(variantId, newValue);

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
            {orderDetails.map((detail, index) => {
              // Kiểm tra trong imeiMap có imeiCode = '0' không
              const hasEmptyImeiCode = detail.imeiMap.some(
                (item) => item.imeiCode === "0"
              );

              return (
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
                      {!hasEmptyImeiCode ? (
                        // Nếu có imeiCode = '0', chỉ hiển thị IMEI dưới dạng Chip
                        <Box>
                          {detail.imeiMap
                            .filter((item) => item.imeiCode !== "0")
                            .map((item) => (
                              <Chip
                                label={item.imeiCode}
                                key={item.imeiId}
                                sx={{ margin: "0.2rem" }}
                              />
                            ))}
                        </Box>
                      ) : (
                        // Nếu không có imeiCode = '0', hiển thị Autocomplete để chọn IMEI mới
                        <Autocomplete
                          multiple
                          options={detail.imeis || []}
                          getOptionLabel={(option) => option.imei}
                          value={selectedImeis[detail.variantId] || []} // Hiển thị tất cả các IMEI đã chọn cho variantId này
                          onChange={(event, newValue) =>
                            handleImeiChange(detail.variantId, newValue)
                          } // Cập nhật khi chọn hoặc bỏ chọn IMEI
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
                      )}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderItemsTable;
