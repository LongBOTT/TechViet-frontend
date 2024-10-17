import { Box, Container, Typography } from '@mui/material'
import React, { useRef } from 'react'
import ViewedSlider from './ViewedSlider'
import PreviousButton from '../../assets/utils/PreviousButton'
import ForwardButton from '../../assets/utils/ForwardButton'

export const Viewed = () => {
  // Tạo tham chiếu tới slider
  const sliderRef = useRef<any>(null);

  return (
    <Box sx={{ display: 'flex', marginTop: '20px',  marginBottom: '20px'}}>
      {/* Nút Previous */}
      <Box sx={{ display: 'flex', width: '10%', justifyContent: 'right', alignItems: 'center', marginTop: '40px' }}>
        <PreviousButton onClick={() => sliderRef.current.slickPrev()} /> {/* Sự kiện onClick */}
      </Box>

      {/* Container chứa Slider */}
      <Container sx={{ textAlign: 'center', width: '100%' }}>
        <ViewedSlider sliderRef={sliderRef} /> {/* Truyền ref vào slider */}
      </Container>

      {/* Nút Next */}
      <Box sx={{ display: 'flex', width: '10%', justifyContent: 'left', alignItems: 'center', marginTop: '40px' }}>
        <ForwardButton onClick={() => sliderRef.current.slickNext()} /> {/* Sự kiện onClick */}
      </Box>
    </Box>
  )
}

