import { AddLink } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Card, CardContent, CardMedia, Checkbox, FormControlLabel, Link, Typography } from '@mui/material'
import React, { FC, ReactElement, useState } from 'react'


type PropsType = {
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    details: string;
};

const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('vi-VN').format(number) + ' đ';
};


const ItemCard: FC<PropsType> = ({name, price, originalPrice, image, details}) : ReactElement => {
  
    const colors = ['#D5C2B5', '#C4C4C4', '#E8E8E8', '#4D4D4D']; // Các mã màu

    const variants = ["128 GB", "256 GB", "512 GB", "1 TB"]; // Các lựa chọn dung lượng

    const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

    const handleSelectVariant = (variant: string) => {
        setSelectedVariant(variant);
    };

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
      <Card
      sx={{
        position: 'relative',
        borderRadius: '10px',
        margin: '10px',
        height: 'fit-content',
        width: '249px',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Không căn giữa theo chiều ngang
        justifyContent: 'flex-start', // Không căn giữa theo chiều dọc
        borderStyle:'solid',
        borderWidth:'2px',
        borderColor:'#f3f4f6',
      }}
    >
      {/* Box chứa hình ảnh */}
      <Box
        sx={{
          display: 'flex',
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
          sx={{ height: '180px', width: '180px', objectFit: 'contain' }} // Đảm bảo hình ảnh chiếm toàn bộ Box
        />
      </Box>

      {/* Nội dung Card */}
      <CardContent>
        <Box sx={{ marginTop: '10px', height: '65px' }}>
          <Typography sx={{ color: '#868f9d', textDecoration: 'line-through', fontFamily: 'inter', fontSize: '12px' }}>
            {formatCurrency(originalPrice)}
          </Typography>
          <Typography sx={{ color: '#000000', fontWeight: 'bold', fontFamily: 'inter', fontSize: '16px' }}>
            {formatCurrency(price)}
          </Typography>
          <Typography sx={{ color: 'rgb(5, 150, 105)', fontFamily: 'inter', fontSize: '12px' }}>
            Giảm {formatCurrency(originalPrice - price)}
          </Typography>
        </Box>
        <Typography gutterBottom component="div" sx={{ height: '20px', fontFamily: 'inter', fontSize: '14px' }}>
          {name}
        </Typography>
      </CardContent>

      {/* Box chứa màu sắc */}
      <Box sx={{ display: 'flex', gap: '10px', paddingLeft: '10px', alignItems: 'flex-start' }}>
        {colors.map((color, index) => (
          <Box
            key={index}
            sx={{
              width: '13px',
              height: '13px',
              borderRadius: '50%', // Để tạo hình tròn
              backgroundColor: color,
              cursor: 'pointer',
              transition: 'transform 0.2s', // Hiệu ứng khi hover
              '&:hover': {
                transform: 'scale(1.2)', // Phóng to khi hover
              },
            }}
          />
        ))}
      </Box>

        {/* Box chứa variant buttons */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
          paddingLeft: '10px',
          paddingTop: '10px',
          width: '100%',
        }}
      >
          {variants.map((variant, index) => (
            <Button
              key={index}
              onClick={() => handleSelectVariant(variant)}
              size="small"
              variant="outlined"
              sx={{
                fontSize: '12px',
                borderColor: selectedVariant === variant ? 'red' : '#d1d5db',
                color: selectedVariant === variant ? 'red' : 'black',
                position: 'relative',
                '&::before': selectedVariant === variant ? {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '15px',
                  height: '15px',
                  backgroundColor: 'red',
                  clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                } : {},
                '&::after': selectedVariant === variant ? {
                  content: '"✓"',
                  position: 'absolute',
                  top: 0,
                  right: 1,
                  fontSize: '7px',
                  color: 'white',
                } : {},
              }}
            >
              {variant}
            </Button>
          ))}
      </Box>

      {/* Box chứa checkbox */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'left',
        borderTop: '1px solid #d1d5db', 
        padding: '5px', 
        marginTop: '10px', // Adds spacing between the divider line and the buttons above
        width: '100%'
    }}>
        <FormControlLabel
          control={<Checkbox size='small' inputProps={{ 'aria-label': 'controlled' }} />}
          label="So sánh"
        />
      </Box>
    </Card>
    </Link>
  )
}

export default ItemCard