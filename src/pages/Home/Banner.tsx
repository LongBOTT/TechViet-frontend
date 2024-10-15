import { BrandingWatermark } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import BannerSlider from './BannerSlider';

export const Banner = () => {
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
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <BannerSlider/>
      </Container>
    </Box>
  );
};

export default Banner;
