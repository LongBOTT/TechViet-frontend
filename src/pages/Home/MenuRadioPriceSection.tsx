import React, { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography, Box, Slider, TextField, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { debounce } from 'lodash';

interface MenuRadioPriceSectionProps {
  title: string;
  onChange: (value: number[]) => void;
  data: { id: string; label: string; value: number[] }[];
  resetRef: React.RefObject<{ resetSelection: () => void }>;
}

const MenuRadioPriceSection: React.FC<MenuRadioPriceSectionProps> = forwardRef(({ title, onChange, data, resetRef }, ref) => {
  const [priceRange, setPriceRange] = useState<number[]>(data.length > 0 ? data[0].value : [0, 200000000]);
  const [customPrice, setCustomPrice] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(data.length > 0 ? JSON.stringify(data[0].value) : '');
  const [expanded, setExpanded] = useState<boolean>(true);

  // Syncs reset functionality with the parent component's ref
  useImperativeHandle(resetRef, () => ({
    resetSelection: () => {
      setSelectedValue(JSON.stringify(data[0].value)); // Reset to the default selection
      onChange(data[0].value); // Notify parent of the reset
    }
  }));

  // Debounce the onChange handler to reduce performance lag
  const debouncedOnChange = useCallback(debounce((value: number[]) => {
    onChange(value);
  }, 300), [priceRange]);

  useEffect(() => {
    debouncedOnChange(priceRange);
  }, [priceRange]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    setCustomPrice(true);
    setSelectedValue('custom');
  };

  const handleTextFieldChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value.replace(/[,.₫]/g, ''));
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
    setCustomPrice(true);
    setSelectedValue('custom');
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    setCustomPrice(false);
    const selectedOption = data.find(item => JSON.stringify(item.value) === event.target.value);
    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', borderTop:'1px solid #d1d5db' }} onClick={toggleExpand}>
        <Typography variant="h6" fontSize="15px" gutterBottom width={"100%"}>
          {title}
        </Typography>
        <IconButton size="small">
          {expanded ? <ExpandLessIcon sx={{}} /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      {expanded && (
        <RadioGroup value={selectedValue} onChange={handleRadioChange}>
          {data.map(item => (
            <FormControlLabel
              key={item.id}
              value={JSON.stringify(item.value)}
              control={<Radio sx={{ color: 'red', '&.Mui-checked': { color: 'red' },
                                    '& .MuiSvgIcon-root': {
                                    fontSize: 15, // Adjust this size as needed
                                  },}} />}
              label={item.label}
            />
          ))}

          <FormControlLabel
            control={
              <Radio
                sx={{ color: 'red', '&.Mui-checked': { color: 'red' },
                                    '& .MuiSvgIcon-root': {
                                    fontSize: 15, // Adjust this size as needed
                                  },}}
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
                size='small'
                label="Từ"
                value={priceRange[0].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                onChange={handleTextFieldChange(0)}
              />
              <Typography>~</Typography>
              <TextField  
                size='small'
                label="Đến"
                value={priceRange[1].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                onChange={handleTextFieldChange(1)}
              />
            </Box>
          )}

          {selectedValue === 'custom' && (
            <Box sx={{ mt: 2 }}>
              <Slider
                sx={{
                  color: 'red',
                  '& .MuiSlider-thumb': {
                    height: 10,
                    width: 10,
                    backgroundColor: 'red',
                    border: '2px solid currentColor',
                  },
                  '& .MuiSlider-track': {
                    height: 2,
                  },
                  '& .MuiSlider-rail': {
                    height: 4,
                  },
                }}
                value={priceRange}
                onChange={handleSliderChange}
                min={0}
                max={200000000}
                valueLabelFormat={(value) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              />
            </Box>
          )}
        </RadioGroup>
      )}
    </div>
  );
});

export default MenuRadioPriceSection;
