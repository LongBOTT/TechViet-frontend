import { Box, Breadcrumbs, Link, Typography, Grid, Chip, Button, Avatar, Divider, Grid2, Paper, Table, TableBody, TableCell, TableRow, Tab, Tabs, Modal, Alert, IconButton } from '@mui/material';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CART, CATEGORY } from '../../constants/routeConstants';
import PreviousButton from '../../assets/utils/PreviousButton';
import ForwardButton from '../../assets/utils/ForwardButton';
import ProductReviews from './ProductReview';
import { Product } from '../../types/product';
import { Variant } from '../../types/variant';
import { Variant_Attribute } from '../../types/variant_attribute';
import { searchProductBy_Id } from '../../api/productApi';
import { searchVariantByProduct } from '../../api/variantApi';
import { searchVariant_AttributeByVariant } from '../../api/variant_attributeApi';
import { Category } from '../../types/category';
import ProductDescription from './ProductDescription';
import SpecificationsTable from './SpecificationsTable';
import { useCart } from '../../context/CartContex';
import { CartItem } from '../../types/cartItem';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { set } from 'lodash';

interface Product_Variant {
  product: Product;
  variants: Variant[];
  variants_attributes: Variant_Attribute[];
}

const ProductDetail: FC = (): ReactElement => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const safeProductId = parseInt(params.id?.replace(":", "") || "0", 10);
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);
  const [isSpecificationsExpanded, setIsSpecificationsExpanded] = useState(false);
  const [item, setItem] = useState<Product_Variant | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0); // Tracks the current color index for image
  const [tabIndex, setTabIndex] = useState(0);
  const [price, setPrice] = useState<number>();
  const [name, setName] = useState<string>();
  const [colors, setColors] = useState<Variant_Attribute[]>([]);
  const [storedList, setStoredList] = useState<Variant_Attribute[]>([]);
  const [image, setImage] = useState<Variant_Attribute[]>([]);
  const [colorList, setColorList] = useState<Variant_Attribute[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const { addToCart } = useCart();
  const [cartItem, setCartItem] = useState<CartItem>();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  // Clear the alert after 3 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleAddToCart = () => {
    if (selectedVariant) {
      const selectCartItem: CartItem = {
        id: selectedVariant.id,
        products: selectedVariant.products,
        name: selectedVariant.name,
        costPrice: selectedVariant.costPrice,
        price: selectedVariant.price,
        quantity: selectedVariant.quantity,
        status: selectedVariant.status,
        image: selectedVariant.image,
        buyQuantity: 1,
        color: selectedColor,
      };
      addToCart(selectCartItem);
      setAlertMessage("Thêm sản phẩm thành công.")
    }
    
  };

  const handleBuyNow = () => {
    if (selectedVariant) {
      const selectCartItem: CartItem = {
        id: selectedVariant.id,
        products: selectedVariant.products,
        name: selectedVariant.name,
        costPrice: selectedVariant.costPrice,
        price: selectedVariant.price,
        quantity: selectedVariant.quantity,
        status: selectedVariant.status,
        image: selectedVariant.image,
        buyQuantity: 1,
        color: selectedColor,
      };
      addToCart(selectCartItem);
      navigate(CART)
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch product details by ID
        const product = await searchProductBy_Id(safeProductId);

        // Check if product is found
        if (!product) {
          console.error("Product not found");
          return;
        }

        // Fetch variants related to the product
        const variants = await searchVariantByProduct(product.id);

        // Convert data and update the state
        const itemData = await convertToProduct_Variant(
          variants ?? [],
          product
        );
        console.log(itemData);
        setItem(itemData);
        setCategory(itemData.product.category);
        setSelectedVariant(itemData.variants[0] ?? null);
        const romVariants: Variant_Attribute[] = Array.from(
          new Map(
            itemData.variants_attributes
              ?.filter(
                (x: Variant_Attribute) =>
                  x?.attribute?.name === "Dung lượng (Rom)" && x.value // Ensure value exists
              )
              ?.map((x: Variant_Attribute) => [x.value, x])
          ).values()
        );

        setStoredList(
          romVariants ?? []
        );
        console.log(romVariants);

        if (romVariants.length > 0) {
          setSelectedStorage(romVariants[0].value);
        } else {
          setImage(
            itemData.variants_attributes.filter(
              (x) => x.attribute.name === "Màu sắc"
            ) ?? []
          );
          setSelectedColor(
            itemData.variants_attributes.filter(
              (x) => x.attribute.name === "Màu sắc"
            )[0].value ?? ""
          );
        }

        setColorList(
          itemData.variants_attributes.filter(
            (x) => x.attribute.name === "Màu sắc"
          ) ?? []
        );
        setColors(
          itemData.variants_attributes.filter(
            (x) => x.attribute.name === "Màu sắc"
          ) ?? []
        );
        setSelectedColorIndex(0);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };
    fetchProductData();
  }, [safeProductId]);

  useEffect(() => {
    // setPrice(selectedVariant?.price);
    
    if (storedList.length > 0) {
      // Lọc ra các biến thể phù hợp với dung lượng (Rom) đã chọn
      const romVariants = item?.variants_attributes.filter(
        (x) => x.attribute.name === "Dung lượng (Rom)" && x.value === selectedStorage) ?? [];
      console.log(romVariants)
      // Lọc danh sách màu dựa trên các Rom Variant đã chọn
      const filteredColors =
        item?.variants_attributes.filter(
          (x) =>
            x.attribute.name === "Màu sắc" &&
            romVariants.some((selected) => selected.variant.id === x.variant.id)
        ) ?? [];
      setImage(romVariants);
      setColors(filteredColors);
      setSelectedColorIndex(0)
      setSelectedColor(filteredColors[0].value);
    }

    
    setName(selectedVariant?.name);
    // console.log(category)
    // if (category?.id === 1) {
    //   setName(item?.product.name + " " + selectedStorage);
    // }
    // else {
    // }

  }, [selectedStorage]);

  useEffect(() => {
    const romVariants =
      item?.variants_attributes.filter(
        (x) =>
          x.attribute.name === "Dung lượng (Rom)" && x.value === selectedStorage
      ) ?? [];
    console.log(romVariants);
    // Lọc danh sách màu dựa trên các Rom Variant đã chọn
    const variant =
      colors.filter(
        (x) =>
          x.attribute.name === "Màu sắc" &&
          x.value === selectedColor
      );
      console.log(variant)
      if (variant.length > 0)  {
        setSelectedVariant(variant[0].variant);
        setPrice(variant[0].variant.price);
        setName(variant[0].variant.name);
      }

  }, [selectedColor]);

  const convertToProduct_Variant = async (  variantList: Variant[],  product: Product) => {
    const item: Product_Variant = {
      product,
      variants: [],
      variants_attributes: [],
    };
    // Filter variants by product ID
    item.variants = [...variantList];
    for (const variant of item.variants) {
      const attributes = await searchVariant_AttributeByVariant(variant.id);
      item.variants_attributes.push(...(attributes ?? [])); // Add attributes to variants_attributes
    }
    return item;
  };

  // Carousel navigation functions
  const handlePreviousImage = () => {
    if (storedList.length > 0) {
      setSelectedColorIndex((prevIndex) =>
        prevIndex === 0 ? image.length - 1 : prevIndex - 1
      );
    } else {
      setSelectedColorIndex((prevIndex) =>
        prevIndex === 0 ? colorList.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
     if (storedList.length > 0) {
      setSelectedColorIndex((prevIndex) =>
        prevIndex === image.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setSelectedColorIndex((prevIndex) =>
        prevIndex === colorList.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box p={4} sx={{ backgroundColor: "#FFFFFF" }}>
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
        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography id="alert-message">{alertMessage}</Typography>
        </Alert>
      </Modal>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`${CATEGORY}/:${category?.id}`}
        >
          {category?.name}
        </Link>
        <Typography color="text.primary">{name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Left Section: Image and Thumbnails */}
        <Grid item xs={12} md={7}>
          <Box display="flex">
            {/* Previous Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PreviousButton onClick={handlePreviousImage} />
            </Box>

            <Box>
              <Box textAlign="center" mt={2}>
                <img
                  src={image[selectedColorIndex]?.variant.image}
                  alt={image[selectedColorIndex]?.variant.name}
                  style={{ width: "60%", height: "60%" }}
                />
              </Box>

              {/* Color Thumbnails */}
              <Box display="flex" justifyContent="center" gap={1} mt={2}>
                {image?.map((vaiant_att, index) => (
                  <Avatar
                    key={vaiant_att.variant.id}
                    src={vaiant_att.variant.image}
                    variant="square"
                    sx={{
                      borderRadius: "8px",
                      padding: "5px",
                      width: 60,
                      height: 60,
                      border: "1px solid white",
                      borderColor:
                        selectedColorIndex === index ? "#f50057" : "none",
                    }}
                    onClick={() => setSelectedColorIndex(index)}
                  />
                ))}
              </Box>
            </Box>

            {/* Next Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ForwardButton onClick={handleNextImage} />
            </Box>
          </Box>
        </Grid>

        {/* Right Section: Product Details */}
        <Grid item xs={12} md={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Mã sản phẩm: {item?.product.id} • Đánh giá: 5⭐
          </Typography>

          {storedList.length > 0 && (
            <>
              {/* Storage Options */}
              <Typography variant="h6" mt={3} mb={1}>
                Dung lượng
              </Typography>
              <Box display="flex" gap={1}>
                {storedList.map((option) => (
                  <Chip
                    sx={{
                      borderRadius: "8px",
                      borderColor:
                        selectedStorage === option.value ? "red" : "default",
                      "&::before":
                        selectedStorage === option.value
                          ? {
                              content: '""',
                              position: "absolute",
                              top: -1,
                              right: -1,
                              width: "15px",
                              height: "15px",
                              backgroundColor: "red",
                              clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                            }
                          : {},
                      "&::after":
                        selectedStorage === option.value
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
                    key={option.value}
                    label={option.value}
                    variant={"outlined"}
                    onClick={() => {
                      setSelectedStorage(option.value);
                      // setSelectedVariant(option.variant);
                    }}
                  />
                ))}
              </Box>
            </>
          )}

          {/* Color Options */}
          <Typography variant="h6" mt={3} mb={1}>
            Màu sắc
          </Typography>
          <Box display="flex" gap={1}>
            {colorList
              .filter((color) =>
                colors.some((selected) => selected.value === color.value)
              ) // Lọc ra các màu thoả điều kiện
              .map((color, index) => (
                <Chip
                  sx={{
                    borderRadius: "8px",
                    borderColor:
                      selectedColorIndex === index ? "red" : "default",
                    "&::before":
                      selectedColorIndex === index
                        ? {
                            content: '""',
                            position: "absolute",
                            top: -1,
                            right: -1,
                            width: "15px",
                            height: "15px",
                            backgroundColor: "red",
                            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                          }
                        : {},
                    "&::after":
                      selectedColorIndex === index
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
                  key={color.value}
                  label={color.value}
                  variant={"outlined"}
                  onClick={() => {
                    setSelectedColorIndex(index), setSelectedColor(color.value);
                  }}
                />
              ))}
          </Box>

          {/* Price and Installment */}
          <Box mt={3} mb={2}>
            <Typography variant="h4" fontWeight="bold">
              {selectedVariant?.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Hoặc trả góp {product.installmentPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/tháng
            </Typography> */}
          </Box>

          {/* Purchase and Installment Buttons */}
          <Box mt={2} mb={2} sx={{ display: "flex", gap: 2 }}>
            <IconButton
              onClick={handleAddToCart}
              sx={{
                border: "1px solid #e01516",
                color: "#e01516",
                borderRadius: "8px",
                padding: "10px",
                "&:hover": {
                  backgroundColor: "#fff5f5",
                },
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
            <Button
              onClick={handleBuyNow}
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#e01516",
                color: "white",
                borderRadius: "20px",
                mr: 2,
              }}
            >
              Mua ngay
            </Button>
            {/* <Button variant="outlined" color="primary" size="large" sx={{ borderRadius: '20px' }}>
              Trả góp
            </Button> */}
          </Box>

          {/* Promotions */}
          {/* <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Khuyến mãi thanh toán
          </Typography> */}
          {/* {product.promotions.map((promo, index) => (
            <Typography
              key={index}
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              - {promo}
            </Typography>
          ))} */}
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", margin: "50px" }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Mô tả sản phẩm" />
          <Tab label="Thông số kỹ thuật" />
        </Tabs>
      </Box>

      <Box mt={3}>
        {tabIndex === 0 && (
          <Paper elevation={3} sx={{ p: 3, margin: "50px" }}>
            <ProductDescription
              images={[
                {
                  src: "/src/assets/products/iphone-16-1.jpg",
                  alt: "Thiết kế đầy màu sắc",
                },
                {
                  src: "/src/assets/products/iphone-16-2.jpg",
                  alt: "Nhiếp ảnh với nút Điều Khiển Camera",
                },
                {
                  src: "/src/assets/products/iphone-16-3.jpg",
                  alt: "Chụp ảnh sắc nét",
                },
                {
                  src: "/src/assets/products/iphone-16-4.jpg",
                  alt: "Biến tấu với Phong Cách Nhiếp Ảnh",
                },
                {
                  src: "/src/assets/products/iphone-16-5.jpg",
                  alt: "Chip A18 thế hệ mới",
                },
                {
                  src: "/src/assets/products/iphone-16-6.jpg",
                  alt: "Trải nghiệm pin vượt trội",
                },
                {
                  src: "/src/assets/products/iphone-16-7.jpg",
                  alt: "Nút Tác Vụ đa năng",
                },
              ]}
            />
            {/* <Button
              variant="text"
              color="primary"
              onClick={() => setIsReviewExpanded(!isReviewExpanded)}
            >
              {isReviewExpanded ? "Rút gọn" : "Đọc thêm"}
            </Button> */}
          </Paper>
        )}

        {tabIndex === 1 && (
          <Paper elevation={3} sx={{ p: 3, margin: "50px" }}>
            <SpecificationsTable variant={selectedVariant} />
          </Paper>
        )}
      </Box>

      <ProductReviews />
    </Box>
  );
};

export default ProductDetail;
