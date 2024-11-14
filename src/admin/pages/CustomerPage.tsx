import * as React from "react";
import Box from "@mui/material/Box";
import { Paper, TableContainer, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CustomButton from "../components/Util/CustomButton";
import EntityTable from "../components/Util/EntityTable";
import FilterDropdown from "../components/Util/FilterDropdown";
import SearchBox from "../components/Util/Search";
import { useEffect, useState } from "react";
import { getCustomerResponse } from "../../api/customerApi";

export default function Customer() {
  const [resetFilter, setResetFilter] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [transformedCustomer, setTransformedCustomer] = React.useState<any[]>(
    []
  );

  const handleReset = () => {
    setResetFilter(true);
    setTimeout(() => setResetFilter(false), 0);
    // fetchProductsWithVariants(); // Lấy lại dữ liệu sản phẩm
  };
  const searchCustomerByName = (name: string) => {
    // searchProductsWithVariantsByName(name);
  };

  const transformCustomerData = (customers: any[]) => {
    return customers.map((customer) => {
      // Lọc các đơn hàng hợp lệ (không có trạng thái "Hủy")
      const validOrders = customer.orders.filter(
        (order: any) => order.orderStatus !== "Đã hủy"
      );
      const totalOrders = validOrders.length;

      // Tính tổng số sản phẩm từ các đơn hàng hợp lệ
      const totalProducts = validOrders.reduce((total: number, order: any) => {
        return total + order.orderDetailResponseList.length;
      }, 0);

      // Tính tổng tiền từ các đơn hàng hợp lệ
      const totalAmount = validOrders.reduce((sum: number, order: any) => {
        return sum + order.total_amount;
      }, 0);

      // Trả về đối tượng mới với các trường đã tính toán
      return {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        totalOrders: totalOrders,
        totalProducts: totalProducts,
        total_amount: totalAmount,
      };
    });
  };

  // Gọi hàm khi lấy dữ liệu từ API
  const fetchCustomers = async () => {
    try {
      const response = await getCustomerResponse(); // Gọi API để lấy dữ liệu
      if (response && response.data) {
        const transformedData = transformCustomerData(response.data);
        setTransformedCustomer(transformedData); // Cập nhật state với dữ liệu đã xử lý
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phiếu nhập:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  const handleRowClick = (product: any) => {
    // navigate(`/EditProduct/${product.id}`); // Chuyển hướng đến trang chỉnh sửa sản phẩm
  };
  const CustomerColumns = [
    { label: "Mã khách hàng", key: "id" },
    { label: "Họ Tên", key: "name" },
    { label: "Số điện thoại", key: "phone" },
    { label: "Tổng số đơn hàng", key: "totalOrders" },
    { label: "Tổng số sản phẩm", key: "totalProducts" },
    { label: "Tổng tiền", key: "total_amount" },
  ];
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
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", padding: 2 }}
        >
          Danh sách khách hàng
        </Typography>
      </Box>
      <Box
        sx={{
          margin: "20px",
          padding: "10px",
          borderRadius: "10px",
          // boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          bgcolor: "rgb(255, 255, 255)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Thanh tìm kiếm sẽ chiếm toàn bộ không gian dư còn lại */}
          <Box sx={{ flexGrow: 1 }}>
            {" "}
            <SearchBox
              placeholder="Nhập tên, số điện thoại khách hàng"
              onSearch={searchCustomerByName} // Sử dụng hàm từ ProductContext
              resetSearch={resetFilter}
            />
          </Box>
          {/* Nút reset */}
          <Box>
            <CustomButton
              icon={<RefreshIcon />}
              text="Reset"
              onClick={handleReset}
            />
          </Box>
        </Box>

        {/* Table */}
        <Box sx={{ marginTop: "20px" }}>
          <TableContainer component={Paper}>
            <EntityTable
              entities={transformedCustomer} // Sử dụng mảng ProductDTOs đã chuyển đổi
              loading={false} // Sử dụng loading từ context
              columns={CustomerColumns}
              onRowClick={handleRowClick}
            />
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
