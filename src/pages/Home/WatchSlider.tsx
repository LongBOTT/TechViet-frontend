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
    image: "src/assets/products/2023_9_14_638303099284921160_800-anhchitiet-duongguilde.jpg",
    details: "Giá mới chỉ có tại CellphoneS",
  },
  {
    name: "Masstel izi T2 4G",
    price: 430000,
    originalPrice: 500000,
    discount: 14,
    image: "src/assets/products/2023_9_14_638303099284921160_800-anhchitiet-duongguilde.jpg",
    details: "",
  },
  {
    name: "Samsung Galaxy M55 (12GB 256GB)",
    price: 10190000,
    originalPrice: 12690000,
    discount: 20,
    image: "src/assets/products/2023_9_14_638303099284921160_800-anhchitiet-duongguilde.jpg",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "Samsung Galaxy A55 5G 128GB",
    price: 9490000,
    originalPrice: 9990000,
    discount: 5,
    rating: 5,
    image: "src/assets/products/2023_9_14_638303099284921160_800-anhchitiet-duongguilde.jpg",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "TECNO POVA 5 8GB 128GB",
    price: 3790000,
    originalPrice: 4490000,
    discount: 16,
    rating: 5,
    image: "src/assets/products/2023_9_14_638303099284921160_800-anhchitiet-duongguilde.jpg",
    details: "",
  },
  {
    name: "OPPO Find X5 Pro 12GB 256GB",
    price: 15990000,
    originalPrice: 19990000,
    discount: 20,
    image: "src/assets/products/2023_9_14_638303099284921160_800-anhchitiet-duongguilde.jpg",
    details: "Giá mới chỉ có tại CellphoneS",
  },
  {
    name: "Masstel izi T2 4G",
    price: 430000,
    originalPrice: 500000,
    discount: 14,
    image: "src/assets/products/2023_9_14_638303099284921160_800-anhchitiet-duongguilde.jpg",
    details: "",
  },
  {
    name: "Samsung Galaxy M55 (12GB 256GB)",
    price: 10190000,
    originalPrice: 12690000,
    discount: 20,
    image: "src/assets/products/2023_9_14_638303099284921160_800-anhchitiet-duongguilde.jpg",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "Samsung Galaxy A55 5G 128GB",
    price: 9490000,
    originalPrice: 9990000,
    discount: 5,
    rating: 5,
    image: "src/assets/products/2023_9_14_638303099284921160_800-anhchitiet-duongguilde.jpg",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "TECNO POVA 5 8GB 128GB",
    price: 3790000,
    originalPrice: 4490000,
    discount: 16,
    rating: 5,
    image: "src/assets/products/2023_9_14_638303099284921160_800-anhchitiet-duongguilde.jpg",
    details: "",
  },
];


const WatchSlider = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
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
    <Box sx={{padding: '30px', borderRadius:'10px', background:'white'}}>
      <Link sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer'}}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#000000', textAlign: 'center' }}>ĐỒNG HỒ</Typography>
      </Link>
      <Slider {...settings}>
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

export default WatchSlider;
