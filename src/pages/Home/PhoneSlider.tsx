import React from 'react';
import { Grid, Box, Typography, Card, CardMedia, CardContent, Button, IconButton, Checkbox, FormControlLabel, Link } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductCard from '../../components/Cards/ProductCard';
import { Padding } from '@mui/icons-material';

const products = [
  {
    name: "iPhone 11 64GB",
    price: 15990000,
    originalPrice: 19990000,
    discount: 20,
    image: "src/assets/products/2022_12_6_638059306728859551_iphone-11-den-1.jpg",
    details: "Giá mới chỉ có tại CellphoneS",
  },
  {
    name: "Masstel izi T2 4G",
    price: 430000,
    originalPrice: 500000,
    discount: 14,
    image: "src/assets/products/Masstel-izi-T2-4G.jpg",
    details: "",
  },
  {
    name: "Samsung Galaxy M55 (12GB 256GB)",
    price: 10190000,
    originalPrice: 12690000,
    discount: 20,
    image: "src/assets/products/SamsungGalaxyA55 5G128GB.jpg",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "Samsung Galaxy Z Flip5 5G 256GB",
    price: 15900000,
    originalPrice: 24900000,
    discount: 5,
    rating: 5,
    image: "src/assets/products/2024_3_28_638472353992099331_samsung-galaxy-zflip-5-xanh-ai.jpg",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "TECNO POVA 5 8GB 128GB",
    price: 3790000,
    originalPrice: 4490000,
    discount: 16,
    rating: 5,
    image: "src/assets/products/TECNOPOVA58GB128GB.jpg",
    details: "",
  },
  {
    name: "Xiaomi POCO X6 5G 12GB-256GB",
    price: 15990000,
    originalPrice: 19990000,
    discount: 20,
    image: "src/assets/products/00909922_poco_x6_black_1205e4d2ba.png",
    details: "Giá mới chỉ có tại CellphoneS",
  },
  {
    name: "Honor X7c 8GB 256GB",
    price: 4800000,
    originalPrice: 5000000,
    discount: 14,
    image: "src/assets/products/Honor_X7c_8GB_256GB.jpg",
    details: "",
  },
  {
    name: "Benco V91 Plus 6GB 128GB",
    price: 2190000,
    originalPrice: 3290000,
    discount: 20,
    image: "src/assets/products/benco_v91_plus_xam_3_8241448b3c.jpg",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "OPPO A18 4GB 64GB",
    price: 3090000,
    originalPrice: 3200000,
    discount: 5,
    rating: 5,
    image: "src/assets/products/OPPO_A18_4GB_64GB.jpg",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "Xiaomi Redmi 14C 4GB 128GB",
    price: 3000000,
    originalPrice: 3190000,
    discount: 16,
    rating: 5,
    image: "src/assets/products/xiaomi_redmi_14c_4GB_128GB.jpg",
    details: "",
  },
];

interface PhoneSliderProps {
  sliderRef: React.RefObject<Slider>; // Định nghĩa kiểu prop là RefObject của Slider
}

const PhoneSlider: React.FC<PhoneSliderProps> = ({ sliderRef }) => {
  // Lấy số lượng sản phẩm
  const productCount = products.length;
  
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: productCount < 4 ? productCount : 4,  // Hiển thị tối đa số lượng sản phẩm
    slidesToScroll: 1,
    rows: 2,
    arrows: false,  // Ẩn nút điều hướng mặc định của slider
    // nextArrow: <CustomNextArrow />,   // Thay nút forward
    // prevArrow: <CustomPrevArrow />,   // Thay nút back
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  

  return (
    <Box sx={{padding: '30px', borderRadius:'10px', background:'white'}}>
      <Link sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer'}}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#000000', textAlign: 'center' }}>ĐIỆN THOẠI DI ĐỘNG</Typography>
      </Link>
    <Slider ref={sliderRef} {...settings}>
        {products.map((product, index) => (
          <ProductCard
            key={index} 
            name={product.name} 
            price={product.price} 
            originalPrice={product.originalPrice}
            image={product.image}
            details={product.details}            
            />
        ))}
      </Slider>
    </Box>
  );
};

export default PhoneSlider;
