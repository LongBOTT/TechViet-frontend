import { Box } from '@mui/material'
import React from 'react'
import Banner from './Banner'
import CategoryMenu from './CategoryMenu'
import { HotSale } from './HotSale'
import { Phone } from './Phone'
import { Laptop } from './Laptop'
import { Tablet } from './Tablet'
import { Watch } from './Watch'
import { Sound } from './Sound'
import { Other } from './Other'
import { Viewed } from './Viewed'
import HomePage from '../../admin/pages/HomePage'

export const Home = () => {
  return (
    <Box sx={{  display:'block',
                justifyContent: 'center',
                alignItems: 'center'}}>
        {/* Banner */}
        {/* <Banner/> */}
        
        {/* Category */}
        {/* <CategoryMenu/> */}

        {/* Hot sales */}
        {/* <HotSale/> */}
        
        {/* Phone */}
        {/* <Phone/> */}

        {/* Laptop */}
        {/* <Laptop/> */}

        {/* Tablet */}
        {/* <Tablet/> */}

        {/* Watch */}
        {/* <Watch/> */}

        {/* Sound */}
        {/* <Sound/> */}

        {/* Other */}
        {/* <Other/> */}

        {/* Viewed */}
        {/* <Viewed/> */}
        <HomePage/>
    </Box>
    
  )
}

export default Home
