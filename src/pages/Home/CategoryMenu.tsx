import { Box, Container, Typography } from '@mui/material'
import React, { useRef } from 'react'
import CategoryMenuSlider from './CategoryMenuSlider'
import PreviousButton from '../../assets/utils/PreviousButton';
import ForwardButton from '../../assets/utils/ForwardButton';

export const CategoryMenu = () => {
  // Tạo tham chiếu tới slider
  const sliderRef = useRef<any>(null);
  return (
   <Box sx={{ display: 'flex', marginTop: '20px' }}>
      {/* Nút Previous */}
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'right', alignItems: 'center', marginTop: '40px' }}>
        <PreviousButton onClick={() => sliderRef.current.slickPrev()} /> {/* Sự kiện onClick */}
      </Box>

      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#000000', textAlign: 'center' }}>DANH MỤC SẢN PHẨM</Typography>
        <Container  sx={{ textAlign: 'center', 
                    height: '252px'}}>
            <CategoryMenuSlider sliderRef={sliderRef}/>
        </Container>
      </Box>

      {/* Nút Next */}
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'left', alignItems: 'center', marginTop: '40px' }}>
        <ForwardButton onClick={() => sliderRef.current.slickNext()} /> {/* Sự kiện onClick */}
      </Box>
    </Box>
  )
}

export default CategoryMenu
