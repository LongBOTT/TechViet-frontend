import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; // Biểu tượng "X"
import { styled } from "@mui/material/styles";
import { DialogActions } from "@mui/material";

// Tạo một button tùy chỉnh
const CustomButton = styled(Button)({
  borderRadius: "8px", // Bo tròn góc
  padding: "10px 120px", // Thay đổi padding
  backgroundColor: "#FF0000", // Màu nền đỏ
  color: "#FFFFFF", // Màu chữ
  fontWeight: "bold", // Chữ in đậm
  "&:hover": {
    backgroundColor: "#CC0000", // Màu nền khi hover (đỏ đậm)
  },
});

// Định nghĩa props cho component Login
interface LoginProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: () => void; // Hàm callback cho đăng nhập thành công
}

export default function Login({ open, onClose, onLoginSuccess }: LoginProps) {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isValidPhone, setIsValidPhone] = React.useState(true); // Thêm trạng thái hợp lệ

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, ""); // Chỉ cho phép nhập số
    setPhoneNumber(numericValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const phonePattern = /^(0[3|5|7|8|9]\d{8})$/; // Biểu thức chính quy cho số điện thoại Việt Nam
    if (phonePattern.test(phoneNumber)) {
      console.log(phoneNumber);
      onLoginSuccess(); // Gọi hàm callback khi đăng nhập thành công
      onClose(); // Đóng form nếu số điện thoại hợp lệ
    } else {
      setIsValidPhone(false); // Đặt trạng thái hợp lệ thành false nếu không hợp lệ
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        sx: {
          width: '350px', // Thay đổi chiều rộng theo ý muốn
          maxWidth: '90%', // Đảm bảo không vượt quá chiều rộng màn hình
        },
        onSubmit: handleSubmit, // Sử dụng hàm handleSubmit
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }} // Đặt vị trí biểu tượng
      >
        <CloseIcon fontSize="large" /> {/* Đặt kích thước biểu tượng lớn */}
      </IconButton>
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: "bold", marginTop: "30px" }} // Căn giữa và in đậm
      >
        Đăng ký / Đăng nhập
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center", marginBottom: "20px" }}>
          Vui lòng đăng nhập để hưởng những đặc quyền dành cho thành viên.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Nhập số điện thoại" // Sử dụng placeholder
          value={phoneNumber} // Ràng buộc giá trị của TextField
          onChange={handleChange} // Thêm hàm xử lý sự kiện
          type="tel" // Chỉ cho phép nhập số
          fullWidth
          variant="outlined" // Đổi kiểu thành outlined
          InputLabelProps={{
            shrink: false, // Không hiển thị nhãn
          }}
          inputProps={{
            pattern: "[0-9]*", // Chỉ cho phép nhập số
            inputMode: "numeric", // Hiển thị bàn phím số trên điện thoại
          }}
          error={!isValidPhone} // Hiển thị lỗi nếu không hợp lệ
          helperText={!isValidPhone ? "Số điện thoại không hợp lệ!" : ""} // Hiển thị thông báo lỗi
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px", // Bo tròn góc
            },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
      >
        <CustomButton type="submit">
          Tiếp tục
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
