import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';

interface MenuCheckboxSectionProps {
  title: string;
  onChange: (checkedValues: string[]) => void;
  data: { id: string; label: string }[];
  selectedValues: string[];
}

const MenuCheckboxSection: React.FC<MenuCheckboxSectionProps> = ({ title, onChange, data, selectedValues }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newChecked = event.target.checked
      ? [...selectedValues, value]
      : selectedValues.filter(item => item !== value);
    onChange(newChecked);
  };

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>{title}</Typography>
      <FormGroup>
        {data.map(item => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={selectedValues.includes(item.id)}
                onChange={handleChange}
                value={item.id}
              />
            }
            label={item.label}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default MenuCheckboxSection;
