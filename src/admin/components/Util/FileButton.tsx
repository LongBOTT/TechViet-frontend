// FileButton.tsx
import React from 'react';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/system';
import { grey } from '@mui/material/colors'; // Màu cho icon

interface FileButtonProps {
  icon: React.ReactNode; // Biểu tượng truyền vào
  text: string;          // Chuỗi tiêu đề truyền vào
  onClick?: () => void;  // Hàm khi click (không bắt buộc)
}

const fileButtonStyles: SxProps = {
  color: 'black',
  backgroundColor: 'rgb(249, 249, 249)',
  border: 'none',
  borderRadius: '5px',
  margin: '0 5px',
  '&:hover': {
    backgroundColor: 'rgb(241, 242, 243)',
    boxShadow: 'none',
  },
  fontFamily: 'Roboto, sans-serif',
  textTransform: 'none',
};

const FileButton: React.FC<FileButtonProps> = ({ icon, text, onClick }) => {
  return (
    <Button
      startIcon={icon}
      sx={fileButtonStyles}
      onClick={onClick}
      disableRipple
    >
      {text}
    </Button>
  );
};

export default FileButton;
