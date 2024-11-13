import React, { useRef, useState } from "react";
import { Menu, MenuItem, Box, Button, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { links } from "./MyLinks"; // Đảm bảo đường dẫn đúng với tệp liên quan
import { searchBrandByCategory_Id } from "../../api/brandApi";
import { searchProductsByBrand_Id } from "../../api/productApi";
import { Brand } from "../../types/brand";
import { Apple } from "@mui/icons-material";
import { CATEGORY, PRODUCT } from "../../constants/routeConstants";
import "../../App.css"; // Import CSS để hỗ trợ styling
import { Category } from "../../types/category";

const ButtonCategory = styled(Button)(({ theme }) => ({
  my: 2,
  color: "white",
  display: "flex",
  marginRight: "5px",
  fontSize: "12px",
  borderRadius: "0px",
  borderBottom: "2px solid #da031b",
  "&:hover": {
    borderColor: "white",
  },
}));

const NavLinks = () => {
  const firstButtonRef = useRef<HTMLButtonElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentSubmenu, setCurrentSubmenu] = useState<Brand[]>([]);
  const [selectedSubmenu, setSelectedSubmenu] = useState<any[]>([]);
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

  const handleOnClickCategory = async (link: any) => {
    if (firstButtonRef.current) {
      setAnchorEl(firstButtonRef.current);
    }

    try {
      setSelectedCategoryId(link.id);
      const brands = await searchBrandByCategory_Id(link.id);
      setCurrentSubmenu(brands ?? []);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setCurrentSubmenu([]);
    }

    setSelectedSubmenu([]);
  };

  const handleMenuItemHover = async (brandId: number) => {
    try {
      const products = await searchProductsByBrand_Id(brandId);
      if (products && Array.isArray(products)) {
        setSelectedSubmenu(products.slice(0, 12));
      } else {
        setSelectedSubmenu([]); // Đảm bảo rằng selectedSubmenu được gán giá trị mảng rỗng nếu không có sản phẩm
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setSelectedSubmenu([]);
    }
  };

  const handleMenuItemNavigate = (itemId: number) => {
    navigate(`${PRODUCT}/${itemId}`);
    handleClose();
  };

  const handleNavigateBrandPage = async (brandName: string) => {
    navigate(`${CATEGORY}/${selectedCategoryId}?brand=${brandName}`);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentSubmenu([]);
    setSelectedSubmenu([]);
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          marginTop: "10px",
          height: "40px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {links.map((link, index) => (
          <ButtonCategory
            key={index}
            onClick={() => handleOnClickCategory(link)}
            ref={index === 0 ? firstButtonRef : null}
          >
            <link.icon sx={{ paddingRight: "5px", display: "inline-flex" }} />
            {link.name}
          </ButtonCategory>
        ))}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            display: "flex",
            height: "500px",
            width: "51%",
            marginTop: "8px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "250px",
              height: "100%",
              borderRight: "solid 4px #f3f4f6",
            }}
          >
            {currentSubmenu.map((submenu) => (
              <MenuItem
                key={submenu.id}
                onMouseEnter={() => handleMenuItemHover(submenu.id)} // Hover để hiển thị sản phẩm liên quan
                onClick={() => handleNavigateBrandPage(submenu.name)} // Click để điều hướng đến trang brand
                sx={{
                  height: "50px",
                  "&:hover": {
                    transform: "scale(1.02)",
                    fontWeight: "bold",
                    transition: "transform 0.1s ease-in-out",
                  },
                }}
              >
                {submenu.name}
              </MenuItem>
            ))}
          </Box>
          <Box
            sx={{
              width: "480px",
              display: "flex", // Sử dụng flex layout
              flexWrap: "wrap", // Cho phép các mục xuống dòng khi không đủ không gian
              gap: "10px", // Khoảng cách giữa các mục
              padding: "10px",
              overflowY: "auto", // Cho phép cuộn dọc nếu vượt quá chiều cao
            }}
          >
            {selectedSubmenu.map((subitem) => (
              <MenuItem
                key={subitem.id}
                onClick={() => handleMenuItemNavigate(subitem.id)}
                sx={{
                  margin: "0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  height: "180px", // Đảm bảo chiều cao cố định
                  width: "110px", // Cố định chiều rộng cho mỗi sản phẩm
                  "&:hover": {
                    backgroundColor: "white",
                    transform: "scale(1.02)",
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              >
                <img
                  src={subitem.image || "/path/to/default/image.jpg"}
                  alt={subitem.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    marginBottom: "10px",
                    borderRadius: "4px",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "0.8rem",
                    display: "block",
                    overflow: "hidden",
                    wordBreak: "break-word", // Cho phép xuống dòng khi cần
                    whiteSpace: "normal", // Đảm bảo nội dung có thể xuống dòng
                    width: "100%", // Đảm bảo chiều rộng đầy đủ trong MenuItem
                  }}
                >
                  {subitem.name}
                </Typography>
              </MenuItem>
            ))}
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default NavLinks;
