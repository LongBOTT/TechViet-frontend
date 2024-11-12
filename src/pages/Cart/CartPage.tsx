import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  FormControlLabel,
  Divider,
  IconButton,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  Modal,
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { BASE } from "../../constants/routeConstants";
import { useCart } from "../../context/CartContex";
import { Delete, DeleteOutline } from "@mui/icons-material";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, updateWarranty, clearCart } =
    useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigate = useNavigate();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<string>("cash_on_delivery"); // Biến trạng thái để quản lý lựa chọn phương thức thanh toán

  // State for form fields
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

  // State for form errors
  const [errors, setErrors] = useState({
    customerName: false,
    phoneNumber: false,
    email: false,
    address: false,
  });

  const handleShopNowClick = () => {
    navigate(BASE);
  };

  const handleSelectItem = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  const isSelected = (itemId: number) => selectedItems.includes(itemId);

  const totalPrice = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);
  
    // Validate form fields
  const validateForm = () => {
    const newErrors = {
      customerName: !customerName.trim(),
      phoneNumber: !phoneNumber.trim(),
      email: !email.trim(),
      address: !address.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error === true);
  };

  const handleConfirmOrder = () => {
    if (validateForm()) {
      setSeverity("success")
      setAlertMessage("Đặt hàng thành công.");
    } else {
      setSeverity("error")
      setAlertMessage("Vui lòng điền đầy đủ thông tin cần thiết.");
    }
  };
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  // Clear the alert after 3 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);
  if (cart.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          p: 4,
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: 80, color: "grey.500" }} />
        <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
          Chưa có sản phẩm nào trong giỏ hàng
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          Cùng mua sắm hàng ngàn sản phẩm tại cửa hàng của chúng tôi!
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleShopNowClick}
          sx={{ mt: 3, px: 4 }}
        >
          Mua hàng
        </Button>
      </Box>
    );
  }

  if (orderConfirmed) {
    return (
      <Grid container spacing={3} sx={{ padding: 4 }}>
        {/* Centered Modal Alert */}
        <Modal
          open={Boolean(alertMessage)}
          onClose={() => setAlertMessage(null)}
          aria-labelledby="alert-message"
          closeAfterTransition
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(3px)", // Optional: blur background
          }}
        >
          <Alert severity={severity} sx={{ mb: 2 }}>
            <Typography id="alert-message">{alertMessage}</Typography>
          </Alert>
        </Modal>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" fontWeight="bold">
            Sản phẩm trong đơn ({selectedItems.length})
          </Typography>
          {cart
            .filter((item) => selectedItems.includes(item.id))
            .map((item) => (
              <Box
                key={item.id}
                sx={{
                  background: "white",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: 2,
                  marginBottom: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img src={item.image} alt={item.name} width={80} />
                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography variant="h6">Tên sản phẩm</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Màu: {"xanh"} - Số lượng: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="error">
                    {item.price.toLocaleString("vi-VN")} đ
                  </Typography>
                </Box>
              </Box>
            ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Thông tin đơn hàng
            </Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Tổng tiền</TableCell>
                  <TableCell align="right">
                    {totalPrice.toLocaleString("vi-VN")} đ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tổng khuyến mãi</TableCell>
                  <TableCell align="right">0 đ</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phí vận chuyển</TableCell>
                  <TableCell align="right">Miễn phí</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Cần thanh toán</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="error" fontWeight="bold">
                      {totalPrice.toLocaleString("vi-VN")} đ
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ py: 1.5 }}
              onClick={() => handleConfirmOrder()}
            >
              Đặt hàng
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 4 }}>
            Người đặt hàng
          </Typography>
          <TextField
            label="Họ và tên"
            fullWidth
            sx={{ mb: 2, backgroundColor: "white", marginTop: "10px" }}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <TextField
            label="Số điện thoại"
            fullWidth
            sx={{ mb: 2, backgroundColor: "white", marginTop: "10px" }}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2, backgroundColor: "white", marginTop: "10px" }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            Thông tin giao hàng
          </Typography>

          <TextField
            label="Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã"
            fullWidth
            sx={{ mb: 2, backgroundColor: "white", marginTop: "10px" }}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Ghi chú (Ví dụ: Hãy gọi tôi khi chuẩn bị hàng xong)"
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2, backgroundColor: "white", marginTop: "10px" }}
            onChange={(e) => setNote(e.target.value)}
          />
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            Phương thức thanh toán
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="payment-method"
              name="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="cash_on_delivery"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="/src/assets/icons/cash.svg"
                      alt="Thanh toán khi nhận hàng"
                      style={{ width: "30px", marginRight: "8px" }} // Chỉnh kích thước và khoảng cách
                    />
                    <Typography variant="body1">
                      Thanh toán khi nhận hàng
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="atm_card"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="/src/assets/icons/vnpay_icon.svg"
                      alt="Thanh toán qua VNPay"
                      style={{ width: "30px", marginRight: "8px" }} // Chỉnh kích thước và khoảng cách
                    />
                    <Typography variant="body1">
                      Thanh toán bằng thẻ ATM nội địa (Qua VNPay)
                    </Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container spacing={3} sx={{ padding: 4 }}>
      {/* Danh sách sản phẩm */}
      <Grid item xs={12} md={8}>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: "GrayText", "&.Mui-checked": { color: "red" } }}
                checked={selectedItems.length === cart.length}
                onChange={handleSelectAll}
              />
            }
            label={`Chọn tất cả (${selectedItems.length})`}
          />
          <IconButton
            color="error"
            onClick={handleClearCart}
            sx={{ ml: "auto" }}
          >
            <DeleteOutline />
          </IconButton>
          {cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                background: "white",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: 2,
                marginBottom: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  sx={{ color: "GrayText", "&.Mui-checked": { color: "red" } }}
                  checked={isSelected(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
                <img src={item.image} alt={item.name} width={80} />
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography variant="h6">Tên sản phẩm</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Màu: {"xanh"}
                  </Typography>
                  <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                    <Button
                      color="inherit"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <Typography variant="body1" sx={{ mx: 2 }}>
                      {item.quantity}
                    </Typography>
                    <Button
                      color="inherit"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="h6" color="error">
                  {item.price.toLocaleString("vi-VN")} đ
                </Typography>
              </Box>
              {/* Gói bảo hành */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" fontWeight="bold" color="error">
                  Chọn gói bảo hành
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => updateWarranty(item.id, "2 năm", 700000)}
                    />
                  }
                  label="Đặc quyền bảo hành 2 năm +700.000 đ"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() =>
                        updateWarranty(item.id, "12 tháng 1 đổi 1", 900000)
                      }
                    />
                  }
                  label="Đặc quyền 12 tháng 1 đổi 1 +900.000 đ"
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Grid>

      {/* Thông tin đơn hàng */}
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            backgroundColor: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Thông tin đơn hàng
          </Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Tổng tiền</TableCell>
                <TableCell align="right">
                  {totalPrice.toLocaleString("vi-VN")} đ
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phí vận chuyển</TableCell>
                <TableCell align="right">Miễn phí</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Cần thanh toán</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="error" fontWeight="bold">
                    {totalPrice.toLocaleString("vi-VN")} đ
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ py: 1.5 }}
            disabled={selectedItems.length === 0}
            onClick={() => setOrderConfirmed(true)}
          >
            Xác nhận đơn
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CartPage;
