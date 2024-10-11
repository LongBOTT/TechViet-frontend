import { Box } from '@mui/material'
import React from 'react'
import Banner from './Banner'
import CategoryMenu from './CategoryMenu'
import { HotSale } from './HotSale'

export const Home = () => {
  return (
    <Box sx={{  display:'block',
                justifyContent: 'center',
                alignItems: 'center'}}>
        {/* Banner */}
        <Banner/>
        
        {/* Category */}
        <CategoryMenu/>

        {/* Hot sales */}
        <HotSale/>
        
        {/* <Box sx={{height:'1000px'}}> */}
        {/* </Box> */}
    </Box>
  )
}

export default Home
