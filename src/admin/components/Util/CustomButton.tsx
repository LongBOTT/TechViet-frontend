// AddSupplierButton.tsx
import React from 'react';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/system';

interface ButtonProps {
  icon: React.ReactNode; 
  text: string;         
  onClick?: () => void; 
}

const ButtonStyles: SxProps = {
  color: 'white',
  backgroundColor: 'rgb(0, 136, 255)',
  border: '1px solid transparent',
  borderRadius: '5px',
  margin: '0 5px',
  '&:hover': {
    backgroundColor: 'rgb(51, 160, 255)',
    boxShadow: 'none',
  },
  fontFamily: 'Roboto, sans-serif',
  textTransform: 'none',
  padding: '5px 20px',
};

const CustomButton: React.FC<ButtonProps> = ({ icon, text, onClick }) => {
  return (
    <Button
      startIcon={icon}
      sx={ButtonStyles}
      onClick={onClick}
      disableRipple
    >
      {text}
    </Button>
  );
};

export default CustomButton;
