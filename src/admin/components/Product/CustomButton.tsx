import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { grey } from '@mui/material/colors'; 

export default function CustomButton() {
  const buttonStyles = {
    color: 'black',
    backgroundColor: 'rgb(249, 249, 249)',
    border: 'none',
    borderRadius: '5px', // Thêm border radius
    margin: '0 5px', // Khoảng cách giữa các nút
    '&:hover': {
      backgroundColor: 'rgb(241, 242, 243)',
      boxShadow: 'none',
    },
    fontFamily: 'Roboto, sans-serif',
    textTransform: 'none',
  };

  const addProductButtonStyles = {
    ...buttonStyles,
    backgroundColor: 'rgb(0, 136, 255)', 
    border: '1px solid transparent',
    color: 'white', 
    '&:hover': {
      backgroundColor: 'rgb(51, 160, 255)', 
      boxShadow: 'none',
      
    },
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        startIcon={<CloudUploadIcon sx={{ color: grey[600] }} />}
        sx={buttonStyles}
        disableRipple
      >
        Xuất file
      </Button>
      <Button
        startIcon={<CloudDownloadIcon sx={{ color: grey[600] }} />}
        sx={buttonStyles}
        disableRipple
      >
        Nhập file
      </Button>
      <Button
        startIcon={<AddCircleIcon />}
        sx={addProductButtonStyles}
        disableRipple
      >
        Thêm sản phẩm
      </Button>
    </Box>
  );
}