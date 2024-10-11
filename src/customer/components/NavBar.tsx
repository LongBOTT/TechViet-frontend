import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Button,
  Box,
  Typography,
  styled,
  Container,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  alpha,
  Link,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import {
  BorderBottom,
  BroadcastOnHome,
  Headphones,
  Laptop,
  PhoneAndroid,
  Tablet,
  Watch,
} from "@mui/icons-material";
import { useState } from "react";
import Login from "../pages/Login"; // Import component Login

const categories = [
  { name: "Điện thoại", icon: PhoneAndroid },
  { name: "Máy tính bảng", icon: Tablet },
  { name: "Laptop", icon: Laptop },
  { name: "Đồng hồ thông minh", icon: Watch },
  { name: "Phụ kiện", icon: Headphones },
  { name: "Điện máy", icon: BroadcastOnHome },
];
const settings = ["Thông tin", "Lịch sử mua hàng", "Đăng xuất"];
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 999,
  backgroundColor: "#ffffff",
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#1c232d",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#1c232d",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "500px",
    },
  },
}));

const ButtonCategory = styled(Button)(({ theme }) => ({
  my: 2,
  color: "white",
  display: "flex",
  marginRight: "5px",
  fontSize: "12px",
  borderRadius: "0px",
  "&:hover": {
    borderBottom: "2px solid white",
  },
}));

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );


  const [openLoginDialog, setOpenLoginDialog] = useState(false); // Trạng thái mở hộp thoại đăng nhập

  const [loggedIn, setLoggedIn] = useState(false); // Trạng thái đăng nhập

  // Mở menu navigation

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  
  // Hàm gọi khi đăng nhập thành công
  const handleLoginSuccess = () => {
    setLoggedIn(true); // Cập nhật trạng thái đăng nhập
    setOpenLoginDialog(false); // Đóng hộp thoại đăng nhập
  };

  // Mở menu user hoặc hộp thoại đăng nhập
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {

    if (!loggedIn) {
      setOpenLoginDialog(true); // Mở hộp thoại đăng nhập nếu chưa đăng nhập
    } else {
      setAnchorElUser(event.currentTarget); // Mở menu user nếu đã đăng nhập
    }
  };

  // Đóng hộp thoại đăng nhập
  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  // Đóng menu user
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#da031b", height: "100px" }}>
      <Container>
        <Toolbar sx={{ alignItems: "center", justifyContent: "center" }}>
          {/* Logo */}
          <Box
            component="img"
            src="src/assets/logo.png"
            alt="Logo"
            sx={{ height: "100px", marginRight: "5px" }}
          />

          {/* Ẩn trong md */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <category.icon sx={{ paddingRight:'5px'}}/>
                  <Typography sx={{ textAlign: 'center' }}>{category.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Ô tìm kiếm */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: { md: "2px" },
              marginRight: "5px",
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Nhập tên điện thoại, máy tính, phụ kiện... cần tìm"
                inputProps={{ "aria-label": "search" }}
                sx={{ fontSize: { xs: "10px", md: "15px" } }}
              />
            </Search>

            {/* Hiện danh sách thể loại trong md */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                marginTop: "10px",
                height: "40px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {categories.map((category, index) => (
                <ButtonCategory key={index} onClick={handleCloseNavMenu}>
                  <category.icon
                    sx={{ paddingRight: "5px", display: "inline-flex" }}
                  />
                  {category.name}
                </ButtonCategory>
              ))}
            </Box>
          </Box>
          {/* Icon profile */}
          <Box sx={{ marginRight: "5px", marginLeft: "15px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ background: "#7d161c", height: "30px", width: "30px" }}
                />
              </IconButton>
            </Tooltip>

            {/* Kiểm tra trạng thái đăng nhập */}
            {loggedIn ? (
              // Nếu đã đăng nhập, hiển thị menu
              <Menu
                sx={{ mt: "45px", ml: "120px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* Hiện menu khi click */}
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center", fontSize: "15px" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            ) : (
              // Nếu chưa đăng nhập, mở hộp thoại đăng nhập
              <Login 
              open={openLoginDialog} 
              onClose={handleCloseLoginDialog} 
              onLoginSuccess={handleLoginSuccess} // Truyền hàm callback
            />
            )}
          </Box>

          {/* Giỏ hàng */}
          <IconButton>
            <Badge badgeContent={2} color="secondary">
              <ShoppingCartIcon sx={{ height: "30px", width: "30px" }} />
            </Badge>
          </IconButton>
          <Typography sx={{ textAlign: "center", fontSize: "15px" }}>
            Giỏ hàng
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>


  );
}

export default NavBar;
