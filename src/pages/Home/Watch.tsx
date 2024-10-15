import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import WatchSlider from './WatchSlider'
import PreviousButton from '../../assets/utils/PreviousButton'
import ForwardButton from '../../assets/utils/ForwardButton'

export const Watch = () => {
  return (
    <Box sx={{  display:'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                marginTop:'20px',
                background:'red'}}>
        <Box>
          <PreviousButton/>
        </Box>
        <Container  sx={{ textAlign: 'center',background:'yellow'

          
        }}>
            <PreviousButton/>
            <WatchSlider/>
        </Container>
        <Box sx={{display:'block', alignItems:'center', background:'pink'}}>
          <ForwardButton/>
        </Box>
    </Box>
  )
}
