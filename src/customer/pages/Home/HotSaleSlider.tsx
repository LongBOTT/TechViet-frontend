import React from 'react';
import { Grid, Box, Typography, Card, CardMedia, CardContent, Button, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const products = [
  {
    name: "OPPO Find X5 Pro 12GB 256GB",
    price: "15.990.000đ",
    originalPrice: "19.990.000đ",
    discount: 20,
    rating: 5,
    image: "src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    details: "Giá mới chỉ có tại CellphoneS",
    isInstallmentAvailable: true,
  },
  {
    name: "Masstel izi T2 4G",
    price: "430.000đ",
    originalPrice: "500.000đ",
    discount: 14,
    rating: 2,
    image: "src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    details: "",
    isInstallmentAvailable: false,
  },
  {
    name: "Samsung Galaxy M55 (12GB 256GB)",
    price: "10.190.000đ",
    originalPrice: "12.690.000đ",
    discount: 20,
    rating: 5,
    image: "src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    details: "Không phí chuyển đổi khi trả góp 0%",
    isInstallmentAvailable: true,
  },
  {
    name: "Samsung Galaxy A55 5G 128GB",
    price: "9.490.000đ",
    originalPrice: "9.990.000đ",
    discount: 5,
    rating: 5,
    image: "src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    details: "Không phí chuyển đổi khi trả góp 0%",
    isInstallmentAvailable: true,
  },
  {
    name: "TECNO POVA 5 8GB 128GB",
    price: "3.790.000đ",
    originalPrice: "4.490.000đ",
    discount: 16,
    rating: 5,
    image: "src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    details: "",
    isInstallmentAvailable: false,
  },
];


const HotSaleSlider = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
    <Box sx={{padding: '20px', borderRadius:'10px', backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundImage: `url("src/assets/hotsale-bg.png")`}}>
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#000000', textAlign: 'center' }}>HOT SALE CUỐI TUẦN</Typography>
      <Typography variant="subtitle1" sx={{ color: '#fff0bf', textAlign: 'center' }}>
        Kết thúc sau: <strong>02 : 07 : 12 : 38</strong>
      </Typography>
      <Slider {...settings}>
        {products.map((product, index) => (
          <Box key={index} sx={{ height:'420px'}}>
            <Card sx={{ position: 'relative', borderRadius:'10px', margin:'10px', alignItems: 'center',  height:'100%',}}>
              <Box sx={{ position: 'absolute', top: 0, left: 0, backgroundColor: '#f44336', color: '#fff', padding: '4px 8px', borderRadius: '0 0 8px 0' }}>
                Giảm {product.discount}%
              </Box>
              {product.isInstallmentAvailable && (
                <Box sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#4caf50', color: '#fff', padding: '4px 8px', borderRadius: '0 0 8px 0' }}>
                  Trả góp 0%
                </Box>
              )}
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{height:'144px', width:'144px'}}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{ height:'60px'}}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ height:'30px'}}>
                  {product.details}
                </Typography>
                <Box sx={{ marginTop: '10px', height:'50px' }}>
                  <Typography variant="body1" sx={{ color: '#f44336', fontWeight: 'bold' }}>{product.price}</Typography>
                  <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>{product.originalPrice}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  {Array.from({ length: product.rating }, (_, i) => (
                    <StarIcon key={i} sx={{ color: '#ffc107', fontSize: '20px' }} />
                  ))}
                </Box>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                  <FormControlLabel control={<Checkbox
                    
                    inputProps={{ 'aria-label': 'controlled' }}
                  />} label="So sánh" />  
                <IconButton aria-label="favorite" sx={{color:'red'}}>
                  <FavoriteIcon />
                </IconButton>
              </Box>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HotSaleSlider;
