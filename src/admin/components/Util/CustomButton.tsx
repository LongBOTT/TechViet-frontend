// AddSupplierButton.tsx
import React from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Import icon "AddCircle"
import { SxProps } from '@mui/system';

interface AddButtonProps {
  icon: React.ReactNode; 
  text: string;         
  onClick?: () => void; 
}

const addButtonStyles: SxProps = {
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

const CustomButton: React.FC<AddButtonProps> = ({ icon, text, onClick }) => {
  return (
    <Button
      startIcon={icon}
      sx={addButtonStyles}
      onClick={onClick}
      disableRipple
    >
      {text}
    </Button>
  );
};

export default CustomButton;
