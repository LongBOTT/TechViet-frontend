import { AddLink } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Card, CardContent, CardMedia, Checkbox, FormControlLabel, Typography } from '@mui/material'
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { Product } from '../../types/product';
import { Variant } from '../../types/variant';
import { Variant_Attribute } from '../../types/variant_attribute';
import { Link } from 'react-router-dom';
import { PRODUCT } from '../../constants/routeConstants';
import '../../App.css'; // Import file CSS

const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('vi-VN').format(number) + ' đ';
};

interface ItemCardProps {
    productVariant: {
        product: Product,
        variants: Variant[],
        variants_attributes: Variant_Attribute[]
    };
    onCompareToggle: (productVariant: { product: Product, variants: Variant[], variants_attributes: Variant_Attribute[] }, selectedVariant: Variant_Attribute, isAdding: boolean) => void;
    isInComparison: boolean;
}

const ItemCard: FC<ItemCardProps> = ({ productVariant, onCompareToggle, isInComparison }) : ReactElement => {
  
    const variantList = productVariant.variants_attributes.filter(x => (x.attribute.name === "Dung lượng (Rom)")); // Các lựa chọn dung lượng

    const cheapestVariant = productVariant.variants_attributes.sort((a, b) => (a.variant.price ?? 0) - (b.variant.price ?? 0)).filter(x => (x.attribute.name === "Dung lượng (Rom)"))[0];

    const [selectedVariant, setSelectedVariant] = useState<Variant_Attribute>(cheapestVariant);
    const [oldPrice, setOldPrice] = useState<number>();
    const [price, setPrice] = useState<number>();
    const [name, setName] = useState<string>();
    const [colors, setColors] = useState<string[]>([]);

    const handleSelectVariant = (value: string) => {
      const variant = productVariant.variants_attributes.filter(x => (x.attribute.name === "Dung lượng (Rom)") && (x.value === value))[0];
      setSelectedVariant(variant);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onCompareToggle(productVariant, selectedVariant, event.target.checked);
    };

    useEffect(() => {
      setOldPrice(selectedVariant.variant.price)
      setPrice(selectedVariant.variant.price)
      setName(productVariant.product.name + " " + selectedVariant.value)

      const attributeColorList = productVariant.variants_attributes.filter(x => (x.attribute.name === "Màu sắc" && x.variant.id == selectedVariant.variant.id)); // Các lựa chọn dung lượng
      if (attributeColorList.length > 1) {
        setColors([]);
        const colorList: string[] = [];

        // Thêm các mã màu cho từng giá trị màu sắc
        attributeColorList.forEach((attribute_color: Variant_Attribute) => {
          switch (attribute_color.value) {
            case "Đen":
              colorList.push("#000000");
              break;
            case "Trắng":
              colorList.push("#f3f4f6");
              break;
            case "Đỏ":
              colorList.push("#FF0000");
              break;
            case "Xanh":
              colorList.push("#5cc7e4");
              break;
            case "Xanh lá":
              colorList.push("#5eb8b3");
              break;
            case "Vàng":
              colorList.push("#fff0bf");
              break;
            case "Hồng":
              colorList.push("#eca2d2");
              break;
            case "Tím":
              colorList.push("#b7abce");
              break;
            case "Cam":
              colorList.push("#FFA500");
              break;
            case "Xám":
              colorList.push("#808080");
              break;
            case "Bạc":
              colorList.push("#C0C0C0");
              break;
            case "Xanh ngọc":
              colorList.push("#00CED1");
              break;
            case "Xanh navy":
              colorList.push("#000080");
              break;
            case "Vàng chanh":
              colorList.push("#9ACD32");
              break;
            // Thêm màu mới vào đây nếu cần
            default:
              colorList.push("#CCCCCC"); // Màu mặc định nếu không khớp với màu nào
              break;
          }
        });
        setColors(colorList);
      }
    }, [selectedVariant]);
    

    return (
      <Card
        sx={{
          position: "relative",
          borderRadius: "10px",
          margin: "10px",
          height: "470px",
          width: "249px",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          // alignItems: "flex-start", // Không căn giữa theo chiều ngang
          // justifyContent: "flex-start", // Không căn giữa theo chiều dọc
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#f3f4f6",
        }}
      >
        <Link
          to={`${PRODUCT}/:${productVariant.product.id}`}
          key={productVariant.product.id}
          className="no-underline"
        >
          {/* Box chứa hình ảnh */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Căn giữa hình ảnh theo chiều ngang
              alignItems: "center", // Căn giữa hình ảnh theo chiều dọc
              height: "200px", // Chiều cao của Box chứa hình ảnh
              width: "100%", // Chiều rộng của Box chứa hình ảnh để phủ toàn bộ Card
            }}
          >
            <CardMedia
              component="img"
              image={productVariant.product.image}
              alt={productVariant.product.name}
              sx={{ height: "180px", width: "180px", objectFit: "contain" }} // Đảm bảo hình ảnh chiếm toàn bộ Box
              />
          </Box>

          {/* Nội dung Card */}
          <CardContent>
            <Box sx={{ marginTop: "10px", height: "65px" }}>
              <Typography
                sx={{
                  color: "#868f9d",
                  textDecoration: "line-through",
                  fontFamily: "inter",
                  fontSize: "12px",
                }}
              >
                {formatCurrency(oldPrice ?? 0)}
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "bold",
                  fontFamily: "inter",
                  fontSize: "16px",
                }}
              >
                {formatCurrency(price ?? 0)}
              </Typography>
              <Typography
                sx={{
                  color: "rgb(5, 150, 105)",
                  fontFamily: "inter",
                  fontSize: "12px",
                }}
                >
                Giảm {formatCurrency(0)}
              </Typography>
            </Box>
            <Typography
              gutterBottom
              component="div"
              sx={{ height: "20px", fontFamily: "inter", fontSize: "14px" }}
              >
              {name}
            </Typography>
          </CardContent>

          {/* Box chứa màu sắc */}
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              paddingLeft: "10px",
              alignItems: "flex-start",
            }}
          >
            {colors.map((color, index) => (
              <Box
                key={index}
                sx={{
                  width: "13px",
                  height: "13px",
                  borderRadius: "50%", // Để tạo hình tròn
                  backgroundColor: color,
                  cursor: "pointer",
                  transition: "transform 0.2s", // Hiệu ứng khi hover
                  "&:hover": {
                    transform: "scale(1.2)", // Phóng to khi hover
                  },
                }}
                />
            ))}
          </Box>
        
        </Link>
          {/* Box chứa variant buttons */}
          {productVariant.product.category.name === "ĐIỆN THOẠI" ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
                paddingLeft: "10px",
                paddingTop: "10px",
                width: "100%",
                height: "fit-content",
              }}
            >
              {variantList.map((variant, index) => (
                <Button
                  key={index}
                  onClick={() => handleSelectVariant(variant.value)}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "12px",
                    borderColor:
                      selectedVariant.value === variant.value
                        ? "red"
                        : "#d1d5db",
                    color:
                      selectedVariant.value === variant.value ? "red" : "black",
                    position: "relative",
                    "&::before":
                      selectedVariant.value === variant.value
                        ? {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "15px",
                            height: "15px",
                            backgroundColor: "red",
                            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                          }
                        : {},
                    "&::after":
                      selectedVariant.value === variant.value
                        ? {
                            content: '"✓"',
                            position: "absolute",
                            top: 0,
                            right: 1,
                            fontSize: "7px",
                            color: "white",
                          }
                        : {},
                  }}
                >
                  {variant.value}
                </Button>
              ))}
            </Box>
          ) : null}

        {/* Box chứa checkbox */}
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            borderTop: "1px solid #d1d5db",
            padding: "5px",
            marginTop: "10px",
            width: "100%",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={isInComparison}
                onChange={handleCheckboxChange}
                sx={{ color: "#1976d2" }}
                size="small"
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={
              <Typography sx={{ color: "#1976d2", fontSize: "14px" }}>
                So sánh
              </Typography>
            }
          />
        </Box>
      </Card>
    );
}

export default ItemCard