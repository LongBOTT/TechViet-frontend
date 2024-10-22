import { BrandingWatermark } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import React, { useRef } from 'react'
import BannerSlider from './BannerSlider';
import PreviousButton from '../../assets/utils/PreviousButton';
import ForwardButton from '../../assets/utils/ForwardButton';

export const Banner = () => {
  // Tạo tham chiếu tới slider
  const sliderRef = useRef<any>(null);

return (
    <Box
      sx={{
        marginTop:'20px',
        backgroundImage: `url("src/assets/header-bg.png")`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        padding: '20px',
        color: 'white',
        minHeight: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
       {/* Nút Previous */}
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'right', alignItems: 'center', marginTop: '40px' }}>
        <PreviousButton onClick={() => sliderRef.current.slickPrev()} /> {/* Sự kiện onClick */}
      </Box>

      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <BannerSlider sliderRef={sliderRef}/>
      </Container>

      {/* Nút Next */}
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'left', alignItems: 'center', marginTop: '40px' }}>
        <ForwardButton onClick={() => sliderRef.current.slickNext()} /> {/* Sự kiện onClick */}
      </Box>
    </Box>
  );
};

export default Banner;
