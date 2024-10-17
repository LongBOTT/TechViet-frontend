import React from 'react';
import { Grid, Box, Typography, Card, CardMedia, CardContent, Button, IconButton, Checkbox, FormControlLabel, Link } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductCard from '../../components/Cards/ProductCard';
import { Padding } from '@mui/icons-material';
import ForwardButton from '../../assets/utils/ForwardButton';
import PreviousButton from '../../assets/utils/PreviousButton';

const products = [
  {
    name: "OPPO Find X5 Pro 12GB 256GB",
    price: 15990000,
    originalPrice: 19990000,
    discount: 20,
    image: "src/assets/products/00910470_robot_hut_bui_lau_nha_ecovacs_deebot_x5_pro_omni_den_01205a0d7b.png",
    details: "Giá mới chỉ có tại CellphoneS",
  },
];


interface ViewedSliderProps {
  sliderRef: React.RefObject<Slider>; // Định nghĩa kiểu prop là RefObject của Slider
}

const ViewedSlider: React.FC<ViewedSliderProps> = ({ sliderRef }) => {

  // Lấy số lượng sản phẩm
  const productCount = products.length;
  
  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: productCount < 4 ? productCount : 4,  // Hiển thị tối đa số lượng sản phẩm
    slidesToScroll: 1,
    rows: 1,
    arrows: false,  // Ẩn nút điều hướng mặc định của slider
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
    <Box sx={{padding: '30px', borderRadius:'10px',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundImage: `url("src/assets/GoRec.webp")`}}>
    <Typography variant="h4" fontWeight="bold" sx={{ color: '#000000', textAlign: 'center' }}>SẢN PHẨM ĐÃ XEM</Typography>

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

export default ViewedSlider;
