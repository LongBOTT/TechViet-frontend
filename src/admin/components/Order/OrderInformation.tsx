// components/OrderInformation.tsx
import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import FilterDropdown from "../../components/Util/FilterDropdown";

interface OrderInformationProps {
  orderDetail: any;
  formattedDate: string;
  formattedTime: string;
  StatusOptions: { value: string; label: string }[];
  PaymentStatusOptions: { value: string; label: string }[];
  handleFilterOrderStatus: (value: string) => void;
  handleFilterPaymentStatus: (value: string) => void;
  currencyFormatter: any;
  resetFilter: boolean;
}

const OrderInformation: React.FC<OrderInformationProps> = ({
  orderDetail,
  formattedDate,
  formattedTime,
  StatusOptions,
  PaymentStatusOptions,
  handleFilterOrderStatus,
  handleFilterPaymentStatus,
  currencyFormatter,
  resetFilter,
}) => {

  return (
    <Box
      sx={{
        marginLeft: "50px",
        marginTop: "20px",
        width: "90%",
        height: "40%",
        borderRadius: "10px",
        bgcolor: "white",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
     <Box
          sx={{
            p: 2,
            borderBottom: "1px solid rgb(224, 224, 224)",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Thông tin đơn hàng
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Ngày đặt hàng
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>
                  <span>{formattedDate}</span>
                  <span style={{ marginLeft: "10px" }}>{formattedTime}</span>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Người đặt hàng:
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{orderDetail.customer.name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Số điện thoại:
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{orderDetail.phone}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: "bold" }}>Địa chỉ:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{orderDetail.address}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: "bold" }}>Ghi chú:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{orderDetail.note}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: "60%", marginTop: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>
                  <strong>Trạng thái đơn hàng:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ minWidth: "200px" }}>
                  <FilterDropdown
                    label="Trạng thái đơn"
                    options={StatusOptions}
                    onFilterChange={handleFilterOrderStatus}
                    selectedValue={orderDetail.orderStatus}  
                    resetFilter={resetFilter}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}> 
                <Typography>
                  <strong>Trạng thái thanh toán:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ minWidth: "200px" }}>
                  <FilterDropdown
                    label="Thanh toán"
                    options={PaymentStatusOptions}
                    onFilterChange={handleFilterPaymentStatus}
                    selectedValue={orderDetail.payment_status}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <strong>Phương thức thanh toán:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{orderDetail.payment_method}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <strong>Tổng tiền:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {currencyFormatter.format(orderDetail.total_amount)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
   
  );
};

export default OrderInformation;
