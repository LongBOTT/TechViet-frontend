import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import HotSaleSlider from './HotSaleSlider'

export const HotSale = () => {
  return (
    <Box sx={{  display:'block',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:'20px'}}>
        <Container  sx={{ textAlign: 'center'}}>
            <HotSaleSlider/>
      </Container>
    </Box>
  )
}
