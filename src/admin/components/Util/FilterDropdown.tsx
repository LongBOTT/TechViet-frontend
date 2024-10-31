import React, { useState, useEffect } from 'react';
import { Select, MenuItem, SelectChangeEvent, FormControl, SxProps } from '@mui/material';

interface FilterDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  onFilterChange?: (value: string) => void;
  resetFilter?: boolean;  // Add a prop to reset the dropdown
  sx?: SxProps;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, options, onFilterChange, resetFilter,sx}) => {
  const [selectedValue, setSelectedValue] = useState<string>(''); 

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setSelectedValue(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  useEffect(() => {
    if (resetFilter) {
      setSelectedValue('');  // Reset dropdown when resetFilter is triggered
    }
  }, [resetFilter]);

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
          const selectedOption = options.find(option => option.value === value);
          return selectedOption ? selectedOption.label : value;
        }}
        sx={{
          height: '40px',
          width: '200px',
          ...sx,
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
