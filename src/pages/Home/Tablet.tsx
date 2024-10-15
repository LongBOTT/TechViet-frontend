import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import TabletSlider from './TabletSlider'

export const Tablet = () => {
  return (
    <Box sx={{  display:'block',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:'20px'}}>
        <Container  sx={{ textAlign: 'center'}}>
            <TabletSlider/>
      </Container>
    </Box>
  )
}
