import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Divider,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TableContainer,
  Typography,
} from "@mui/material";
import FileButton from "../../components/Util/FileButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import EntityTable from "../../components/Util/EntityTable";
import FilterDropdown from "../../components/Util/FilterDropdown";
import SearchBox from "../../components/Util/Search";
import CustomButton from "../../components/Util/CustomButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  getAllOrders,
  getOrderByPaymentMethod,
  getOrderByStatus,
  getOrdersByKeyword,
} from "../../../api/orderApi";
import { currencyFormatter } from "../../components/Util/Formatter";
import OrderStatus from "../../components/Order/OrderStatus";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const navigate = useNavigate();
  const [transformedOrder, setTransformedOrder] = React.useState<any[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<any[]>([]);
  const [resetFilter, setResetFilter] = useState(false);

  const orderColumns = [
    { label: "Mã đơn", key: "id" },
    { label: "Ngày tạo đơn", key: "orderDate" },
    { label: "Khách hàng", key: "customer" },
    { label: "Phương thức thanh toán", key: "payment_method" },
    { label: "Trạng thái thanh toán", key: "payment_status" },
    { label: "Trạng thái đơn hàng", key: "orderStatus" },
    { label: "Tổng tiền", key: "total_amount" },
  ];
  const transformOrderData = (data: any[]) => {
    return data.map((item) => {
      const formattedDate = new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(item.orderDate));

      const formattedTime = new Intl.DateTimeFormat("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date(item.orderDate));

      return {
        id: item.id,
        orderDate: `${formattedDate} ${formattedTime}`,
        payment_status: item.payment_status,
        customer: item.customer.name,
        payment_method: item.payment_method,
        orderStatus: item.orderStatus,
        total_amount: currencyFormatter.format(item.total_amount),
      };
    });
  };
  const transformOrderProcessingData = (orders: any[]) => {
    const statusMap = {
      "Chờ duyệt": {
        label: "Chờ duyệt",
        count: 0,
        value: 0,
        countColor: "blue",
      },
      "Chờ thanh toán": {
        label: "Chờ thanh toán",
        count: 0,
        value: 0,
        countColor: "blue",
      },
      "Chuẩn bị hàng": {
        label: "Chuẩn bị hàng",
        count: 0,
        value: 0,
        countColor: "blue",
      },
      "Đang giao hàng": {
        label: "Đang giao hàng",
        count: 0,
        value: 0,
        countColor: "blue",
      },
    };

    orders.forEach((order) => {
      const status = order.orderStatus as keyof typeof statusMap;
      if (statusMap[status]) {
        statusMap[status].count += 1;
        statusMap[status].value += order.total_amount;
      }
    });

    // Chuyển đổi giá trị tiền thành chuỗi có định dạng
    return Object.values(statusMap).map((status) => ({
      ...status,
      value: currencyFormatter.format(status.value),
    }));
  };
  const fetchOrders = async () => {
    try {
      const data = await getAllOrders(); // Gọi API để lấy dữ liệu
      const transformedData = transformOrderData(data);
      setTransformedOrder(transformedData); // Cập nhật state
      const statusData = transformOrderProcessingData(data);
      setOrderStatuses(statusData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phiếu nhập:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Gọi hàm khi component được tải
  }, []);

  const handleExport = () => console.log("Xuất file");
  const handleImport = () => console.log("Nhập file");
  const handleReset = () => {
    setResetFilter(true);
    setTimeout(() => setResetFilter(false), 0);
    fetchOrders();
  };

  const searchOrdersByKeyword = async (query: string) => {
    try {
      const data = await getOrdersByKeyword(query);
      const transformedData = transformOrderData(data);
      setTransformedOrder(transformedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phiếu nhập:", error);
    }
  };

  const handleFilterOrderStatus = async (value: string) => {
    try {
      const data = await getOrderByStatus(value);
      const transformedData = transformOrderData(data);
      setTransformedOrder(transformedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phiếu nhập:", error);
    }
  };
  const handleFilterPaymentMethod = async (value: string) => {
    try {
      const data = await getOrderByPaymentMethod(value);
      const transformedData = transformOrderData(data);
      setTransformedOrder(transformedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phiếu nhập:", error);
    }
  };
  const StatusOptions = [
    { value: "Chờ duyệt", label: "Chờ duyệt" },
    { value: "Chuẩn bị hàng", label: "Chuẩn bị hàng" },
    { value: "Đang giao", label: "Đang giao" },
    { value: "Hoàn thành", label: "Hoàn thành" },
    { value: "Đã hủy", label: "Đã hủy" },
  ];

  const PaymentMethodOptions = [
    { value: "BankTransfer", label: "Chuyển khoản" },
    { value: "Cash", label: "Tiền mặt" },
  ];
  const handleRowClick = (order: any) => {
    navigate(`/Admin/orderDetail/${order.id}`);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        borderRadius: 1,
        bgcolor: "rgb(249, 249, 249)",
        margin: 0,
        padding: 0,
        height: "100vh",
        overflowY: "auto", // Toàn trang sẽ cuộn nếu nội dung vượt quá chiều cao khung nhìn
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", padding: 2 }}
        >
          Danh sách đơn hàng
        </Typography>
        <Box sx={{ display: "flex", marginRight: "10px" }}>
          <FileButton
            icon={<CloudUploadIcon />}
            text="Xuất file"
            onClick={handleExport}
          />
          <FileButton
            icon={<CloudDownloadIcon />}
            text="Nhập File"
            onClick={handleImport}
          />
        </Box>
      </Box>

      {/* Order Processing Section */}
      <Box
        sx={{
          margin: "20px",
          bgcolor: "white",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <Typography
            sx={{ fontFamily: "roboto", fontWeight: "bold", marginTop: "20px" }}
          >
            ĐƠN HÀNG CẦN XỬ LÝ
          </Typography>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {/* Order Statuses */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px",
          }}
        >
          {orderStatuses.map((status, index) => (
            <OrderStatus
              key={index}
              label={status.label}
              count={status.count}
              value={status.value}
              countColor={status.countColor}
            />
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          margin: "20px",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          bgcolor: "rgb(255, 255, 255)",
        }}
      >
        {/* Search and Filter Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Thanh tìm kiếm sẽ chiếm toàn bộ không gian dư còn lại */}
          <Box sx={{ flexGrow: 1 }}>
            {" "}
            <SearchBox
              placeholder="Tìm theo mã đơn hàng, tên khách hàng"
              onSearch={searchOrdersByKeyword}
              resetSearch={resetFilter}
            />
          </Box>
          <Box sx={{ minWidth: "200px" }}>
            <CustomButton
              icon={<RefreshIcon />}
              text="Reset"
              onClick={handleReset}
            />
          </Box>
          <Box sx={{ minWidth: "200px" }}>
            <FilterDropdown
              label="Phương thức TT"
              options={PaymentMethodOptions}
              onFilterChange={handleFilterPaymentMethod}
              resetFilter={resetFilter}
            />
          </Box>
          <Box sx={{ minWidth: "200px"           }}>
            <FilterDropdown
              label="Trạng thái đơn"
              options={StatusOptions}
              onFilterChange={handleFilterOrderStatus}
              resetFilter={resetFilter}
            />
          </Box>
          {/* <Box sx={{ minWidth: "200px" }}>
            <FilterDropdown
              label="Ngày tạo"
              options={PaymentStatusOptions}
              onFilterChange={handleFilterOrderStatus}
              resetFilter={resetFilter}
            />
          </Box> */}
        </Box>

        {/* Table Section */}
        <Box sx={{ marginTop: "20px" }}>
          <TableContainer component={Paper}>
            <EntityTable
              entities={transformedOrder}
              loading={false}
              columns={orderColumns}
              onRowClick={handleRowClick}
            />
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
