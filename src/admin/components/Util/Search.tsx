import * as React from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';

// Component SearchBox
export default function SearchBox() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgb(214, 214, 214)',
        borderRadius: '4px',
        width: '100%',
        // maxWidth: '400px',
        padding: '2px 4px',
        marginBottom: '20px',
      }}
    >

      <SearchIcon sx={{ color: 'rgb(214, 214, 214)' }} />
      
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Tìm kiếm nhà cung cấp"
        inputProps={{ 'aria-label': 'tìm kiếm nhà cung cấp' }}
      />
    </Box>
  );
}
