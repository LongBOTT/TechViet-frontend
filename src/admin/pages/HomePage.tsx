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
import DashboardIcon from "@mui/icons-material/Dashboard"; // Icon cho Tổng quan
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"; // Icon cho Đơn hàng
import CategoryIcon from "@mui/icons-material/Category"; // Icon cho Sản phẩm
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // Icon cho Nhà cung cấp
import GppGoodIcon from "@mui/icons-material/GppGood"; // Icon cho Bảo hành
import PeopleIcon from "@mui/icons-material/People"; // Icon cho Khách hàng
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; // Icon cho Giảm giá
import BarChartIcon from "@mui/icons-material/BarChart"; // Icon cho Báo cáo

import Customer from "./CustomerPage";
import Discount from "./DiscountPage";
import Dashboard from "./DashboardPage";
import Supplier from "./SupplierPage";
import Product from "./ProductPage";
import Guarantee from "./GuaranteePage";
import Order from "./OrderPage";
import Overview from "./OverviewPage";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const iconMap: any = {
    "Tổng quan": <DashboardIcon />,
    "Đơn hàng": <ReceiptLongIcon />,
    "Sản phẩm": <CategoryIcon />,
    "Nhà cung cấp": <LocalShippingIcon />,
    "Bảo hành": <GppGoodIcon />,
    "Khách hàng": <PeopleIcon />,
    "Giảm giá": <LocalOfferIcon />,
    "Báo cáo": <BarChartIcon />,
  };

  // Trạng thái lưu mục được chọn
  const [selectedMenu, setSelectedMenu] = React.useState("Tổng quan");
  // Hàm để render nội dung dựa trên menu được chọn
  const renderContent = () => {
    switch (selectedMenu) {
      case "Tổng quan":
        return <Overview />;
      case "Đơn hàng":
        return <Order />;
      case "Sản phẩm":
        return <Product />;
      case "Nhà cung cấp":
        return <Supplier />;
      case "Bảo hành":
        return <Guarantee />;
      case "Khách hàng":
        return <Customer />;
      case "Giảm giá":
        return <Discount />;
      case "Báo cáo":
        return <Dashboard/>;
      default:
        return <Overview />;
    }
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
        <Toolbar
          sx={{
            backgroundColor: "rgb(25, 118, 210)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 8,
              top: 10,
              display: "flex",
            }}
          >
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
                color: " rgb(255, 255, 255)",
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
          {[
            "Tổng quan",
            "Đơn hàng",
            "Sản phẩm",
            "Nhà cung cấp",
            "Bảo hành",
            "Khách hàng",
            "Giảm giá",
            "Báo cáo",
          ].map((text) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => setSelectedMenu(text)}
            >
              <ListItemButton>
                <ListItemIcon>
                  {/* Gắn icon từ iconMap */}
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
          overflow: "auto",
          flexDirection: "column",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}
