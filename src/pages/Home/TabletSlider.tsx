import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Card, CardMedia, CardContent, Button, IconButton, Checkbox, FormControlLabel, Link } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductCard from '../../components/Cards/ProductCard';
import { Padding } from '@mui/icons-material';

import { Product } from "../../types/product";
import {
  searchProductBy_Id,
  searchProductByVariants,
} from "../../api/productApi";
import { Variant } from "../../types/variant";
import { Variant_Attribute } from "../../types/variant_attribute";
import { searchVariant_AttributeByVariant } from "../../api/variant_attributeApi";
import {
  searchVariantByCategory,
  searchVariantByProduct,
} from "../../api/variantApi";

interface Product_Variant {
  product: Product;
  variants: Variant[];
  variants_attributes: Variant_Attribute[];
}


interface TabletSliderProps {
  sliderRef: React.RefObject<Slider>; // Định nghĩa kiểu prop là RefObject của Slider
}

const TabletSlider: React.FC<TabletSliderProps> = ({ sliderRef }) => {
const [items, setItems] = useState<Product_Variant[]>([]);

// Lấy danh sách từ localStorage khi component được mount
useEffect(() => {
  const loadProducts = async () => {
    const variantList = await searchVariantByCategory(3);
    const productList = await searchProductByVariants(variantList ?? []);

    let itemList = await convertToProduct_Variant(
      variantList ?? [],
      productList ?? []
    );
    setItems(itemList);
  };

  loadProducts();
}, []);

const convertToProduct_Variant = async (
  variantList: Variant[],
  productList: Product[]
) => {
  const itemList: Product_Variant[] = [];
  for (const product of productList) {
    const item: Product_Variant = {
      product,
      variants: [],
      variants_attributes: [],
    };
    // Filter variants by product ID
    item.variants.push(
      ...variantList.filter((variant) => variant.products.id === product.id)
    );
    for (const variant of item.variants) {
      const attributes = await searchVariant_AttributeByVariant(variant.id);
      item.variants_attributes.push(...(attributes ?? [])); // Add attributes to variants_attributes
    }
    itemList.push(item);
  }
  return itemList;
};

// Lấy số lượng sản phẩm
const productCount = items.length;

  
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: productCount < 4 ? productCount : 4, // Hiển thị tối đa số lượng sản phẩm
    slidesToScroll: 1,
    rows: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false, // Ẩn nút điều hướng mặc định của slider

    // nextArrow: <CustomNextArrow />,   // Thay nút forward
    // prevArrow: <CustomPrevArrow />,   // Thay nút back
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },  
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  

  return (
    <Box sx={{ padding: "30px", borderRadius: "10px", background: "white" }}>
      <Link
        sx={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#000000", textAlign: "center" }}
        >
          MÁY TÍNH BẢNG
        </Typography>
      </Link>
      <Slider ref={sliderRef} {...settings}>
        {items.slice(0, Math.min(items.length, 20)).map((item) => (
          <ProductCard key={item.product.id} productVariant={item} />
        ))}
      </Slider>
    </Box>
  );
};

export default TabletSlider;
