import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  SxProps,
} from "@mui/material";

interface FilterDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  onFilterChange?: (value: string) => void;
  resetFilter?: boolean;
  selectedValue?: string; // Add selectedValue here
  sx?: SxProps;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  onFilterChange,
  resetFilter,
  selectedValue, // Accept selectedValue as a prop
  sx,
}) => {
  const [currentValue, setCurrentValue] = useState<string>(selectedValue || "");
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setCurrentValue(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  useEffect(() => {
    if (resetFilter) {
      setCurrentValue("");
    }
  }, [resetFilter]);

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <Select
        value={currentValue}
        onChange={handleChange}
        displayEmpty
        renderValue={(value) => {
          if (!value) return <em>{label}</em>;
          const selectedOption = options.find(option => option.value.toString() === String(value));

          return selectedOption ? selectedOption.label : label;
        }}
        sx={{
          height: "40px",
          width: "200px",
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
