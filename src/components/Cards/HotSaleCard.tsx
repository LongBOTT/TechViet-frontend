import { AddLink } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Checkbox, FormControlLabel, Link, Typography } from '@mui/material'
import React, { FC, ReactElement } from 'react'


type PropsType = {
    name: string;
    price: number;
    originalPrice: number;
    discount: number;
    image: string;
    details: string;
};

const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('vi-VN').format(number) + ' đ';
};


const HotSaleCard: FC<PropsType> = ({name, price, originalPrice, discount, image, details}) : ReactElement => {
  return (
    <Link sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer',
      '&:hover img': {
          transform: 'scale(1.02)',
          transition: 'transform 0.3s ease-in-out'
      },
      '&:hover': {
          cursor: 'pointer'
      },
    }}>
      <Card sx={{ position: 'relative', borderRadius:'10px', margin:'10px', alignItems: 'center',  height:'fit-content',}}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, backgroundColor: '#f44336', color: '#fff', padding: '4px 8px', borderRadius: '0 0 8px 0' }}>
          Giảm {discount}%
        </Box>
        {/* Box chứa hình ảnh */}
      <Box
        sx={{
          display: 'flex',
          marginTop:'30px',
          justifyContent: 'center', // Căn giữa hình ảnh theo chiều ngang
          alignItems: 'center', // Căn giữa hình ảnh theo chiều dọc
          height: '200px', // Chiều cao của Box chứa hình ảnh
          width: '100%', // Chiều rộng của Box chứa hình ảnh để phủ toàn bộ Card
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{ height: '100%', width: '100%', objectFit: 'contain' }} // Đảm bảo hình ảnh chiếm toàn bộ Box
        />
      </Box>
        <CardContent>
          <Box sx={{ marginTop: '10px', height:'65px'}}>
            <Typography sx={{ color: '#868f9d', textDecoration: 'line-through', fontFamily:'inter', fontSize:'12px' }}>{formatCurrency(originalPrice)}</Typography>
            <Typography sx={{ color: '#000000', fontWeight: 'bold', fontFamily:'inter', fontSize:'16px' }}>{formatCurrency(price)}</Typography>
            <Typography sx={{ color: 'rgb(5, 150, 105)', fontFamily:'inter', fontSize:'12px' }}>Giảm {formatCurrency(originalPrice-price)}</Typography>
          </Box>
          <Typography gutterBottom component="div" sx={{ height:'20px', fontFamily:'inter', fontSize:'14px'}}>
            {name}
          </Typography>
        </CardContent>
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', padding:'10px'}}>
            <FormControlLabel control={<Checkbox
              inputProps={{ 'aria-label': 'controlled' }}
            />} label="So sánh" />  
        </Box> */}
      </Card>
    </Link>
  )
}

export default HotSaleCard