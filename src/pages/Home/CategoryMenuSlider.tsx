import { Box, Grid, Typography } from '@mui/material';
import Slider from "react-slick";

import React from 'react'
import { flushSync } from 'react-dom';


const categories = [
    { name: 'Điện thoại', imgSrc: 'src/assets/products/product1.png' },
    { name: 'Laptop', imgSrc: 'src/assets/products/product2.png' },
    { name: 'Máy tính bảng', imgSrc: 'src/assets/products/product3.jpg' },
    { name: 'Đồng hồ thông minh', imgSrc: 'src/assets/products/product4.png' },
    { name: 'Loa', imgSrc: 'src/assets/products/product5.jpg' },
    { name: 'Tai nghe', imgSrc: 'src/assets/products/product6.png' },
    { name: 'Sạc dự phòng', imgSrc: 'src/assets/products/product7.jpg' },
    { name: 'Cáp sạc', imgSrc: 'src/assets/products/product8.jpg' },
    { name: 'Ốp lưng điện thoại', imgSrc: 'src/assets/products/product9.jpg' },
    { name: 'Ốp lưng máy tính bảng', imgSrc: 'src/assets/products/product10.jpg' },
    { name: 'Chuột', imgSrc: 'src/assets/products/product11.jpg' },
    { name: 'Bàn phím', imgSrc: 'src/assets/products/product12.jpg' },
    { name: 'Tivi', imgSrc: 'src/assets/products/product13.png' },
    { name: 'Robot hút bụi', imgSrc: 'src/assets/products/product14.png' },
    { name: 'Màn hình', imgSrc: 'src/assets/products/product15.png' },
    { name: 'Linh kiện', imgSrc: 'src/assets/products/product16.png' },
    { name: 'PC lắp ráp', imgSrc: 'src/assets/products/product17.png' },
];

interface WatchSliderProps {
  sliderRef: React.RefObject<Slider>; // Định nghĩa kiểu prop là RefObject của Slider
}

const CategoryMenuSlider: React.FC<WatchSliderProps> = ({ sliderRef }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        rows: 2,
        arrows: false
    };

    return (
        <Box sx={{  background: '#f3f4f6', 
                    width: '100%', 
                    height: '100%'}}>
    <Slider ref={sliderRef} {...settings}>
                {categories.map((category, index) => (
                    <Grid item xs={2} key={index}>
                         <Box
                            sx={{
                                display:'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: '#ffffff',
                                margin: '10px',
                                borderRadius: '10px',
                                height:'100px',
                                 '&:hover img': {
                                    transform: 'scale(1.10)',
                                },
                                '&:hover': {
                                    cursor: 'pointer'
                                },
                                transition: 'transform 0.3s ease-in-out',
                            }}>
                                <Box sx={{
                                    display:'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width:'90px',
                                    height:'100px',
                                    margin:'5px',
                                }}>
                                    <Typography variant='body2' sx={{fontWeight:'lighter'}}>{category.name}</Typography>
                                </Box>
                               <Box sx={{
                                    display:'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width:'80px',
                                    height:'80px',
                                    margin:'5px',
                                }}>
                                    <img
                                    src={category.imgSrc}
                                    alt={category.name}
                                    style={{ width: '80px', height: '80px', objectFit: 'contain' }}/>
                                </Box>
                        </Box>
                    </Grid>
                ))}
            </Slider>
        </Box>
    );
};

export default CategoryMenuSlider

