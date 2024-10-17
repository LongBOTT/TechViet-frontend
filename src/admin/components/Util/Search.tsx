import * as React from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

interface SearchBoxProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

// Tùy chỉnh style cho thanh tìm kiếm
const StyledSearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #ccc',
  borderRadius: '50px',
  width: '1600px',
  height: '40px',
  backgroundColor: '#f0f0f0', // Màu nền cho thanh tìm kiếm
  padding: '0px 10px',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Hiệu ứng đổ bóng nhẹ
  '&:hover': {
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  marginLeft: '10px',
  fontSize: '16px',
  padding: '0',
  '& input': {
    padding: '10px 0', // Padding cho input
  },
}));

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  const handleSearchClick = () => {
    onSearch(query); // Gọi hàm tìm kiếm khi nhấn vào nút search
  };

  return (
    <StyledSearchBox>
      <StyledInputBase
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        inputProps={{ 'aria-label': placeholder }}
      />
      <IconButton onClick={handleSearchClick}>
        <SearchIcon sx={{ color: '#555' }} />
      </IconButton>
    </StyledSearchBox>
  );
};

export default SearchBox;
