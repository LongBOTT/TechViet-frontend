import * as React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import FilterDropdown from "../../components/Util/FilterDropdown";
import { currencyFormatter } from "../../components/Util/Formatter";
import { getStockReceiveAndStockReceiveDetailById } from "../../../api/stock_receiveApi";
import { useState } from "react";

export default function DetailImportPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate("/Admin/import");
  };
  const [stockReceiveDetail, setStockReceiveDetail] = useState<any>(null);
  React.useEffect(() => {
    const fetchStockReceiveDetail = async () => {
      try {
        const data = await getStockReceiveAndStockReceiveDetailById(Number(id));
        setStockReceiveDetail(data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết phiếu nhập:", error);
      }
    };

    if (id && !stockReceiveDetail) {
      fetchStockReceiveDetail();
    }
  }, [id, stockReceiveDetail]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
        borderRadius: 1,
        bgcolor: "rgb(255, 255, 255)",
        margin: 0,
        padding: 0,
        height: "100%",
      }}
    >
      <Box
        sx={{
          height: 64,
          display: "flex",
          backgroundColor: "rgb(255, 255, 255)",
          width: "100%",
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onGoBack}
          sx={{ color: "black", textTransform: "none" }}
        >
          <Typography sx={{ fontFamily: "Roboto", fontWeight: "bold", px: 2 }}>
            Quay lại Danh Sách Phiếu Nhập
          </Typography>
        </Button>
      </Box>
      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ width: "80%",height:"100%",marginLeft:'20px' }}>
          <TableContainer component={Paper}>
            <Table sx={{ tableLayout: "fixed", width: "100%",height:"100%"}}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "30%" }}>Tên phiên bản</TableCell>
                  <TableCell sx={{ width: "15%", textAlign: "center" }}>
                    Số lượng
                  </TableCell>
                  <TableCell sx={{ width: "20%", textAlign: "center" }}>
                    Giá nhập
                  </TableCell>
                  <TableCell sx={{ width: "20%", textAlign: "center" }}>
                    Thành tiền
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockReceiveDetail?.stockReciveDetailResponseList?.map(
                  (detail: any, index: number) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell>{detail.variantResponse.name}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {detail.quantity}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {currencyFormatter.format(detail.price)}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {currencyFormatter.format(
                            detail.quantity * detail.price
                          )}
                        </TableCell>
                      </TableRow>
                      {detail.imeiResponses &&
                        detail.imeiResponses.length > 0 && (
                          <TableRow>
                            <TableCell colSpan={4}>
                              <Box
                                sx={{
                                  p: 1,
                                  bgcolor: "rgb(245, 245, 245)",
                                  borderRadius: 1,
                                }}
                              >
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  Danh sách IMEI:
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                  }}
                                >
                                  {detail.imeiResponses.map(
                                    (imei: any, imeiIndex: number) => (
                                      <Chip
                                        key={imeiIndex}
                                        label={imei.imei}
                                        color="primary"
                                      />
                                    )
                                  )}
                                </Box>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )}
                    </React.Fragment>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* Right - Form Information */}
        <Box sx={{ width: "40%" }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Thông tin phiếu nhập
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Ngày nhập</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={
                  stockReceiveDetail
                    ? new Date(
                        stockReceiveDetail.receive_date
                      ).toLocaleDateString("vi-VN")
                    : "Loading..." // hoặc để trống nếu bạn muốn
                }
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Nhà cung cấp</Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={stockReceiveDetail?.supplier?.name || ""}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Ghi chú</Typography>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={stockReceiveDetail?.note || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body1">Tổng số lượng:</Typography>
                <Typography variant="body1">
                  <strong>
                    {stockReceiveDetail?.stockReciveDetailResponseList
                      ? stockReceiveDetail.stockReciveDetailResponseList.reduce(
                          (total: number, detail: any) =>
                            total + detail.quantity,
                          0
                        )
                      : 0}
                  </strong>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body1">Tổng số mặt hàng:</Typography>
                <Typography variant="body1">
                  <strong>
                    {" "}
                    {stockReceiveDetail?.stockReciveDetailResponseList
                      ? stockReceiveDetail.stockReciveDetailResponseList.length
                      : 0}
                  </strong>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body1">Tổng tiền hàng:</Typography>
                <Typography variant="body1">
                  <strong>
                    {stockReceiveDetail?.total
                      ? stockReceiveDetail.total.toLocaleString("vi-VN")
                      : 0}
                  </strong>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
