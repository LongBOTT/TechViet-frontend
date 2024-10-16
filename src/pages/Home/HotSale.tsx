import { Box, Container, Typography } from '@mui/material'
import React, { useRef } from 'react'
import HotSaleSlider from './HotSaleSlider'
import PreviousButton from '../../assets/utils/PreviousButton';
import ForwardButton from '../../assets/utils/ForwardButton';

export const HotSale = () => {
    // Tạo tham chiếu tới slider
  const sliderRef = useRef<any>(null);
  
  return (
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
        {/* Nút Previous */}
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'right', alignItems: 'center', marginTop: '40px' }}>
        <PreviousButton onClick={() => sliderRef.current.slickPrev()} /> {/* Sự kiện onClick */}
      </Box>
        <Container  sx={{ textAlign: 'center'}}>
            <HotSaleSlider sliderRef={sliderRef} /> {/* Truyền ref vào slider */}
      </Container>
            {/* Nút Next */}
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'left', alignItems: 'center', marginTop: '40px' }}>
        <ForwardButton onClick={() => sliderRef.current.slickNext()} /> {/* Sự kiện onClick */}
      </Box>

    </Box>
  )
}
