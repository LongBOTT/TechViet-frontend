import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography, Box, Slider, TextField } from '@mui/material';

interface MenuRadioSectionProps {
  title: string;
  onChange: (value: number[]) => void;  // Nhận callback để truyền giá trị custom price lên component cha
  data: { id: string; label: string; value: number[] }[];
}

const MenuRadioSection: React.FC<MenuRadioSectionProps> = ({ title, onChange, data }) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 50000000]); // Thanh trượt giá trị mặc định
  const [customPrice, setCustomPrice] = useState(false); // State để theo dõi tùy chỉnh giá
  const [selectedValue, setSelectedValue] = useState<string>(''); // Theo dõi lựa chọn radio hiện tại

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    setCustomPrice(true); // Kích hoạt custom price
    setSelectedValue('custom'); // Chọn custom price, vô hiệu hóa các radio cố định
    onChange(newValue as number[]); // Truyền giá trị custom lên component cha
  };

  const handleTextFieldChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value.replace(/[,.₫]/g, ''));
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
    setCustomPrice(true);
    setSelectedValue('custom');
    onChange(newPriceRange); // Truyền giá trị custom lên component cha
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    setCustomPrice(false); // Vô hiệu hóa custom price nếu chọn radio cố định
    const selectedOption = data.find(item => JSON.stringify(item.value) === event.target.value);
    if (selectedOption) {
      onChange(selectedOption.value); // Truyền giá trị radio cố định lên component cha
    }
  };

  return (
    <div>
      <Typography variant="h6" fontSize="17px" gutterBottom >{title}</Typography>
      <RadioGroup value={selectedValue} onChange={handleRadioChange}>
        {data.map(item => (
          <FormControlLabel
            key={item.id}
            value={JSON.stringify(item.value)}
            control={<Radio size='small' sx={{ color: 'red', '&.Mui-checked': { color: 'red' } }} />}
            label={item.label}
          />
        ))}

        {/* Hiển thị thanh trượt và các trường nhập giá tùy chỉnh */}
        <FormControlLabel
          control={
            <Radio
              sx={{ color: 'red', '&.Mui-checked': { color: 'red' } }}
              size='small'
              checked={selectedValue === 'custom'}
              value="custom"
              onChange={() => setSelectedValue('custom')}
            />
          }
          label="Tùy chọn:"
        />
        
        {selectedValue === 'custom' && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
            <TextField
              label="Từ"
              value={priceRange[0].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              onChange={handleTextFieldChange(0)}
            />
            <Typography>~</Typography>
            <TextField
              label="Đến"
              value={priceRange[1].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              onChange={handleTextFieldChange(1)}
            />
          </Box>
        )}

        {selectedValue === 'custom' && (
          <Box sx={{ mt: 2 }}>
            <Slider
              sx={{color:'red',}}
              value={priceRange}
              onChange={handleSliderChange}
              min={0}
              max={50000000} // Tối đa có thể tùy chỉnh
              valueLabelFormat={(value) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} // Định dạng tiền tệ cho giá trị hiển thị trên thanh trượt
            />
          </Box>
        )}
      </RadioGroup>
    </div>
  );
};

export default MenuRadioSection;
