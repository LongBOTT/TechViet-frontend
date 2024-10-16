import React from 'react';
import Slider from "react-slick";
import { Box, IconButton } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const banners = [
    { src: "src/assets/banners/banner1.png", alt: "Banner 1" },
    { src: "src/assets/banners/banner2.png", alt: "Banner 2" },
    { src: "src/assets/banners/banner3.png", alt: "Banner 3" },
    { src: "src/assets/banners/banner4.png", alt: "Banner 4" }
];

interface WatchSliderProps {
  sliderRef: React.RefObject<Slider>; // Định nghĩa kiểu prop là RefObject của Slider
}

const BannerSlider: React.FC<WatchSliderProps> = ({ sliderRef }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false
    };

    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '45px' }}>
    <Slider ref={sliderRef} {...settings}>
                {banners.map((banner, index) => (
                    <Box key={index} sx={{ position: 'relative' }}>
                        <img src={banner.src} alt={banner.alt} style={{ width: '100%', borderRadius: '10px' }} />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default BannerSlider;