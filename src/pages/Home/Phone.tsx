import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import PhoneSlider from './PhoneSlider'

export const Phone = () => {
  return (
    <Box sx={{  display:'block',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:'20px'}}>
        <Container  sx={{ textAlign: 'center'}}>
            <PhoneSlider/>
      </Container>
    </Box>
  )
}
