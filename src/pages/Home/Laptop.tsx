import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import LaptopSlider from './LaptopSlider'

export const Laptop = () => {
  return (
    <Box sx={{  display:'block',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:'20px'}}>
        <Container  sx={{ textAlign: 'center'}}>
            <LaptopSlider/>
      </Container>
    </Box>
  )
}
