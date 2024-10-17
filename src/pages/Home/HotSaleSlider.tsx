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
    name: "OPPO Find X5 Pro 12GB 256GB",
    price: 15990000,
    originalPrice: 19990000,
    discount: 20,
    image: "src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    details: "Giá mới chỉ có tại CellphoneS",
  },
  {
    name: "Masstel izi T2 4G",
    price: 430000,
    originalPrice: 500000,
    discount: 14,
    image: "src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    details: "",
  },
  {
    name: "Samsung Galaxy M55 (12GB 256GB)",
    price: 10190000,
    originalPrice: 12690000,
    discount: 20,
    image: "src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "Samsung Galaxy A55 5G 128GB",
    price: 9490000,
    originalPrice: 9990000,
    discount: 5,
    rating: 5,
    image: "src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "TECNO POVA 5 8GB 128GB",
    price: 3790000,
    originalPrice: 4490000,
    discount: 16,
    rating: 5,
    image: "src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png",
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
