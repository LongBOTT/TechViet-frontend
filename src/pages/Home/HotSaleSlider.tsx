import React from 'react';
import { Grid, Box, Typography, Card, CardMedia, CardContent, Button, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HotSaleCard from '../../components/Cards/HotSaleCard';

const products = [
  {
    name: "iPad Air 11 inch M2 2024 Wifi 128GB",
    price: 27990000,
    originalPrice: 2990000,
    discount: 20,
    image: "src/assets/products/iPad_Air_11_inch_M2_2024_Wifi_128GB.jpg",
    details: "Giá mới chỉ có tại CellphoneS",
  },
  {
    name: "iPhone 16 Pro Max 256GB",
    price: 40000000,
    originalPrice: 38000000,
    discount: 14,
    image: "src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    details: "",
  },
  {
    name: "Samsung Galaxy M55 (12GB 256GB)",
    price: 10190000,
    originalPrice: 12690000,
    discount: 20,
    image: "src/assets/products/SamsungGalaxyM55(12GB256GB).jpg",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "Samsung Galaxy Z Fold6 5G 256GB",
    price: 9490000,
    originalPrice: 9990000,
    discount: 5,
    rating: 5,
    image: "src/assets/products/Samsung_Galaxy_Z_Fold6_5G_256GB.png",
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
];


interface HotSaleSliderProps {
  sliderRef: React.RefObject<Slider>; // Định nghĩa kiểu prop là RefObject của Slider
}

const HotSaleSlider: React.FC<HotSaleSliderProps> = ({ sliderRef }) => {
  // Lấy số lượng sản phẩm
  const productCount = products.length;
  
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: productCount < 4 ? productCount : 4,  // Hiển thị tối đa số lượng sản phẩm
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
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
    <Box sx={{padding: '30px', borderRadius:'10px', backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundImage: `url("src/assets/hotsale-bg.png")`}}>
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#000000', textAlign: 'center' }}>HOT SALE CUỐI TUẦN</Typography>
      <Typography variant="subtitle1" sx={{ color: '#fff0bf', textAlign: 'center' }}>
        Kết thúc sau: <strong>02 : 07 : 12 : 38</strong>
      </Typography>
      <Slider ref={sliderRef} {...settings}>
        {products.map((product, index) => (
          <HotSaleCard
            key={index} 
            name={product.name} 
            price={product.price} 
            originalPrice={product.originalPrice}
            discount={product.discount}
            image={product.image}
            details={product.details}            
            />
        ))}
      </Slider>
    </Box>
  );
};

export default HotSaleSlider;
