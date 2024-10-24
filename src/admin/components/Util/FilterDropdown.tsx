import React, { useState } from 'react';
import { Select, MenuItem, SelectChangeEvent, FormControl } from '@mui/material';

interface FilterDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  onFilterChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, options, onFilterChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(''); // Giá trị ban đầu là rỗng

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setSelectedValue(value);
    onFilterChange(value);
  };

  return (
    <FormControl fullWidth variant="outlined" size="small"> 
      <Select
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        renderValue={(value) => {
            if (!value) {
              return <em>{label}</em>; 
            }
            // Tìm nhãn tương ứng với giá trị đã chọn
            const selectedOption = options.find(option => option.value === value);
            return selectedOption ? selectedOption.label : value; 
          }}
          
        sx={{
          height: '40px',
          width: '200px', 
          // '& .MuiSelect-select': {
          //   display: 'flex', 
          //   alignItems: 'center', 
          // },
        }}
      >
        <MenuItem disabled value="">
          <em>{label}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterDropdown;
