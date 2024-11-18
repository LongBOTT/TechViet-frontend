import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; // Biểu tượng "X"
import EditIcon from "@mui/icons-material/Edit"; // Import icon chỉnh sửa
import { styled } from "@mui/material/styles";
import { DialogActions, Typography } from "@mui/material";
import smsImage from "../../assets/receive_authentication.png";

// Tạo một button tùy chỉnh
const CustomButton = styled(Button)(() => ({
  borderRadius: "8px", // Bo tròn góc
  padding: "10px 120px", // Thay đổi padding
  backgroundColor: "#FF0000", // Màu nền đỏ
  color: "#FFFFFF", // Màu chữ
  fontWeight: "bold", // Chữ in đậm
  "&:hover": {
    backgroundColor: "#CC0000", // Màu nền khi hover (đỏ đậm)
  },
}));

// Định nghĩa props cho component Login
interface LoginProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: () => void; // Hàm callback cho đăng nhập thành công
}

export default function Login({ open, onClose, onLoginSuccess }: LoginProps) {
  const [step, setStep] = React.useState(1); // Quản lý bước của quy trình
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isValidPhone, setIsValidPhone] = React.useState(true); // Trạng thái hợp lệ số điện thoại
  const [smsCode, setSmsCode] = React.useState(""); // Mã SMS người dùng nhập
  const [generatedCode, setGeneratedCode] = React.useState(""); // Mã SMS sinh ra

  // Hàm xử lý khi nhập số điện thoại
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, ""); // Chỉ cho phép nhập số
    setPhoneNumber(numericValue);
  };

  // Kiểm tra số điện thoại và sinh mã SMS
  const handleSendSms = () => {
    const phonePattern = /^(0[3|5|7|8|9]\d{8})$/; // Kiểm tra số điện thoại hợp lệ
    if (phonePattern.test(phoneNumber)) {
      // Sinh mã SMS 4 chữ số
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedCode(code); // Lưu mã để so sánh
      alert(`Mã SMS của bạn là: ${code}`); // Giả lập mã SMS gửi đi
      setStep(2); // Chuyển sang bước nhập mã SMS
    } else {
      setIsValidPhone(false); // Nếu không hợp lệ
    }
  };

  // Xử lý khi nhập mã SMS
  const handleSmsCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSmsCode(event.target.value);
  };

  // Xác thực mã SMS
  const handleVerifySmsCode = () => {
    if (smsCode === generatedCode) {
      localStorage.setItem("phone", phoneNumber);
      onLoginSuccess(); // Gọi hàm callback khi đăng nhập thành công
      onClose(); // Đóng dialog
    } else {
      alert("Mã SMS không chính xác!");
    }
  };

  // Đặt lại trạng thái khi đóng hộp thoại
  const handleClose = () => {
    onClose();
    resetLoginProcess(); // Đặt lại quy trình đăng nhập
  };

  // Đặt lại quy trình đăng nhập
  const resetLoginProcess = () => {
    setStep(1);
    setPhoneNumber("");
    setSmsCode("");
    setGeneratedCode("");
    setIsValidPhone(true);
  };

  const handleEditPhoneNumber = () => {
    resetLoginProcess();
    onClose(); // Đóng hộp thoại
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "350px", // Thay đổi chiều rộng
          maxWidth: "90%", // Đảm bảo không vượt quá chiều rộng màn hình
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon fontSize="large" /> {/* Đặt kích thước biểu tượng lớn */}
      </IconButton>

      {/* Hiển thị form đăng nhập */}
      {step === 1 && (
        <>
          <DialogTitle
            sx={{ textAlign: "center", fontWeight: "bold", marginTop: "30px" }}
          >
            Đăng ký / Đăng nhập
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ textAlign: "center", marginBottom: "20px" }}
            >
              Vui lòng đăng nhập để hưởng những đặc quyền dành cho thành viên.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Nhập số điện thoại"
              value={phoneNumber}
              onChange={handleChange}
              type="tel"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: false,
              }}
              inputProps={{
                pattern: "[0-9]*",
                inputMode: "numeric", // Hiển thị bàn phím số
              }}
              error={!isValidPhone}
              helperText={!isValidPhone ? "Số điện thoại không hợp lệ!" : ""}
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
            <CustomButton onClick={handleSendSms}>Tiếp tục</CustomButton>
          </DialogActions>
        </>
      )}

      {/* Bước gửi mã SMS */}
      {step === 2 && (
        <>
          <DialogTitle
            sx={{ textAlign: "center", fontWeight: "bold", marginTop: "30px" }}
          >
            Nhận mã xác thực
          </DialogTitle>
          <DialogContent>
            <img
              src={smsImage}
              alt="Mã xác thực"
              style={{
                width: "100%",
                height: "auto",
                padding: "10px",
              }}
            />
            <Typography textAlign="center">
              Mã xác thực được gửi đến số điện thoại
              <strong> {phoneNumber} </strong>
              <IconButton
                onClick={handleEditPhoneNumber}
                sx={{ padding: 0, marginLeft: 1 }}
              >
                <EditIcon />
              </IconButton>
              <span
                style={{
                  marginLeft: 5,
                  cursor: "pointer",
                  color: "blue",
                  fontSize: "18px",
                }}
                onClick={handleEditPhoneNumber}
              >
                Đổi số điện thoại
              </span>
            </Typography>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <Button
              sx={{
                borderRadius: "8px", // Bo tròn góc
                padding: "10px 100px", // Thay đổi padding
                backgroundColor: "#FF0000", // Màu nền đỏ
                color: "#FFFFFF", // Màu chữ
                fontWeight: "bold", // Chữ in đậm
                "&:hover": {
                  backgroundColor: "#CC0000", // Màu nền khi hover (đỏ đậm)
                },
              }}
              onClick={() => setStep(3)}
            >
              Nhận qua SMS
            </Button>
          </DialogActions>
        </>
      )}

      {/* Bước nhập mã SMS */}
      {step === 3 && (
        <>
          <DialogTitle
            sx={{ textAlign: "center", fontWeight: "bold", marginTop: "30px" }}
          >
            Nhập mã SMS
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="smsCode"
              name="smsCode"
              placeholder="Nhập mã SMS"
              value={smsCode}
              onChange={handleSmsCodeChange}
              type="tel"
              fullWidth
              variant="outlined"
              inputProps={{
                pattern: "[0-9]*",
                inputMode: "numeric", // Hiển thị bàn phím số
              }}
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
            <CustomButton onClick={handleVerifySmsCode}>Xác nhận</CustomButton>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
