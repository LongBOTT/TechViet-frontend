import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography, Box, Slider, TextField } from '@mui/material';

interface MenuRadioSectionProps {
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data: { id: string; label: string; value: number[] }[];
}

const MenuRadioSection: React.FC<MenuRadioSectionProps> = ({ title, onChange, data }) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 50000000]); // Thanh trượt giá trị mặc định
  const [customPrice, setCustomPrice] = useState(false); // State để theo dõi tùy chỉnh giá

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    setCustomPrice(true);
  };

  const handleTextFieldChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
    setCustomPrice(true);
  };

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>{title}</Typography>
      <RadioGroup onChange={onChange}>
        {data.map(item => (
          <FormControlLabel
            key={item.id}
            value={JSON.stringify(item.value)}
            control={<Radio />}
            label={item.label}
          />
        ))}

        {/* Hiển thị thanh trượt và các trường nhập giá tùy chỉnh */}
        <FormControlLabel
          control={
            <Radio
              checked={customPrice}
              onChange={() => setCustomPrice(true)}
            />
          }
          label="Hoặc nhập khoảng giá phù hợp với bạn:"
        />
        {customPrice && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
            <TextField
              label="Từ"
              value={priceRange[0]}
              onChange={handleTextFieldChange(0)}
              InputProps={{ inputProps: { min: 0, max: priceRange[1] } }}
              type="number"
              sx={{height:'10px'}}
            />
            <Typography>~</Typography>
            <TextField
              label="Đến"
              value={priceRange[1]}
              onChange={handleTextFieldChange(1)}
              InputProps={{ inputProps: { min: priceRange[0] } }}
              type="number"
            />
          </Box>
        )}
        {customPrice && (
          <Box sx={{ mt: 2 }}>
            <Slider
              value={priceRange}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              min={0}
              max={50000000} // Tối đa có thể tùy chỉnh
            />
          </Box>
        )}
      </RadioGroup>
    </div>
  );
};

export default MenuRadioSection;
