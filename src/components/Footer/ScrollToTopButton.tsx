import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // Icon từ Material-UI

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Hiển thị nút khi người dùng cuộn xuống một khoảng cách nhất định
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Cuộn lên đầu trang khi người dùng nhấp vào nút
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn mượt mà
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <IconButton
          style={styles.scrollBtn}
          onClick={scrollToTop}
          sx={{
            backgroundColor: 'white',
            color: '#000',
            '&:hover': {
              backgroundColor: '#bdbdbd',
            },
            transition: 'opacity 0.3s ease', // Thêm hiệu ứng chuyển tiếp
            opacity: isVisible ? 1 : 0,
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
    </>
  );
};

// Style cho nút
const styles = {
  scrollBtn: {
    position: 'fixed',
    bottom: '50px',
    right: '50px',
    zIndex: 1000,
  } as React.CSSProperties, // Định nghĩa kiểu cho CSS
};

export default ScrollToTopButton;
