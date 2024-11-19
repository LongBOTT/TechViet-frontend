// src/admin/pages/HomePage.tsx
import { Outlet, useNavigate } from "react-router-dom";
import * as React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GppGoodIcon from "@mui/icons-material/GppGood";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'
const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = React.useState("Tổng quan");

  const iconMap: any = {
    "Tổng quan": <DashboardIcon />,
    "Đơn hàng": <ReceiptLongIcon />,
    "Sản phẩm": <CategoryIcon />,
    "Nhập hàng": <MoveToInboxIcon />,
    "Nhà cung cấp": <LocalShippingIcon />,
    "Bảo hành": <GppGoodIcon />,
    "Khách hàng": <PeopleIcon />,
    // "Giảm giá": <LocalOfferIcon />,
    "Báo cáo": <BarChartIcon />,
  };

  const menuRoutes: { [key: string]: string } = {
    "Tổng quan": "/Admin/overview",
    "Đơn hàng": "/Admin/orders",
    "Sản phẩm": "/Admin/products",
    "Nhập hàng": "/Admin/import",
    "Nhà cung cấp": "/Admin/suppliers",
    "Bảo hành": "/Admin/warranty",
    "Khách hàng": "/Admin/customers",
    // "Giảm giá": "/Admin/discounts",
    "Báo cáo": "/Admin/reports",
    "BC Sản phẩm": "/Admin/productReport",
    "BC Thể loại": "/Admin/categoryReport",
  };

  const handleMenuClick = (text: string) => {
    setSelectedMenu(text);
    navigate(menuRoutes[text]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ backgroundColor: "rgb(25, 118, 210)" }}>
          <Box sx={{ position: "absolute", left: 8, top: 10, display: "flex" }}>
            <img
              src="/logo-icon.png"
              alt="Logo"
              style={{ width: 35, height: 40 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "rgb(255, 255, 255)",
                fontWeight: "bold",
                fontSize: 30,
                fontFamily: "Roboto",
                marginLeft: 3,
              }}
            >
              TECH VIET
            </Typography>
          </Box>
        </Toolbar>

        <List>
          {Object.keys(menuRoutes).map((text) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => handleMenuClick(text)}
            >
              <ListItemButton
                sx={{
                  backgroundColor:
                    selectedMenu === text ? "rgba(25, 118, 210, 0.2)" : "inherit",
                  color: selectedMenu === text ? "rgb(25, 118, 210)" : "inherit",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Border dưới
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.05)",
                  },
                }}
              >
                <ListItemIcon>
                  {/* Không áp dụng màu sắc đặc biệt cho icon */}
                  {iconMap[text]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          bgcolor: "background.default",
          height: "calc(100vh)",
          width: "100%",
          display: "flex",
        }}
      >
        <Outlet /> {/* Render nội dung của các route con tại đây */}
      </Box>
    </Box>
  );
}
