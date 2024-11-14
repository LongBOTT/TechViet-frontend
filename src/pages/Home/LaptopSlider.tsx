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
    name: "Laptop ASUS Vivobook 14 OLED A14",
    price: 19290000,
    originalPrice: 17990000,
    discount: 20,
    image: "src/assets/products/00908887_asus_vivobook_14_oled_a1405za_km263w_a82772e430.png",
    details: "Giá mới chỉ có tại CellphoneS",
  },
  {
    name: "Laptop Asus TUF Gaming",
    price: 21900000,
    originalPrice: 24000000,
    discount: 14,
    image: "src/assets/products/2022_asus_tuf_gaming_f15_fx507_jaeger_gray_c8fc1c350e.png",
    details: "",
  },
  {
    name: "Laptop Acer Nitro 5 Tiger Gaming",
    price: 19190000,
    originalPrice: 26690000,
    discount: 20,
    image: "src/assets/products/acer_nitro_5_tiger_an515_58_2a10078adb.png",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "Laptop Acer Aspire 7 Gaming",
    price: 17990000,
    originalPrice: 25990000,
    discount: 5,
    rating: 5,
    image: "src/assets/products/acer_aspire_7_a715_76_a36e765844.png",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "MacBook Air 13 inch",
    price: 18790000,
    originalPrice: 22490000,
    discount: 16,
    rating: 5,
    image: "src/assets/products/image_2024-11-14_114206915.jpg",
    details: "",
  },
  {
    name: "MacBook Air 13 inch M2 2022 8CPU 8GPU 8GB/256GB",
    price: 25990000,
    originalPrice: 29990000,
    discount: 20,
    image: "src/assets/products/macbook.jpg",
    details: "Giá mới chỉ có tại CellphoneS",
  },
  {
    name: "Laptop Dell Inspiron",
    price: 16000000,
    originalPrice: 17000000,
    discount: 14,
    image: "src/assets/products/dell_inspiron_15_3520_black_d3c2a2c3c6.png",
    details: "",
  },
  {
    name: "Samsung Galaxy M55 (12GB 256GB)",
    price: 10190000,
    originalPrice: 12690000,
    discount: 20,
    image: "src/assets/products/gigabyte_g5_2023_f201031d46.png",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "Samsung Galaxy A55 5G 128GB",
    price: 9490000,
    originalPrice: 9990000,
    discount: 5,
    rating: 5,
    image: "src/assets/products/gigabyte_g5_2023_f201031d46.png",
    details: "Không phí chuyển đổi khi trả góp 0%",
  },
  {
    name: "TECNO POVA 5 8GB 128GB",
    price: 3790000,
    originalPrice: 4490000,
    discount: 16,
    rating: 5,
    image: "src/assets/products/gigabyte_g5_2023_f201031d46.png",
    details: "",
  },
];

interface LaptopSliderProps {
  sliderRef: React.RefObject<Slider>; // Định nghĩa kiểu prop là RefObject của Slider
}


const LaptopSlider: React.FC<LaptopSliderProps> = ({ sliderRef }) => {
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
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#000000', textAlign: 'center' }}>LAPTOP</Typography>
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

export default LaptopSlider;
