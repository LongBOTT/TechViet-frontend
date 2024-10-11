import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import CategoryMenuSlider from './CategoryMenuSlider'

export const CategoryMenu = () => {
  return (
    <Box sx={{  display:'block',
                justifyContent: 'center',
                alignItems: 'center'}}>
        <Typography variant="h5" sx={{ textAlign: 'center'}}>Danh mục sản phẩm</Typography>
        <Container  sx={{ textAlign: 'center', 
                    height: '252px'}}>
            <CategoryMenuSlider/>
      </Container>
    </Box>
  )
}

export default CategoryMenu
