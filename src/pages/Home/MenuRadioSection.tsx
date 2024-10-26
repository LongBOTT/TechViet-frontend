import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography, Box, Slider, TextField, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface MenuRadioSectionProps {
  title: string;
  onChange: (value: string) => void;  // Nhận callback để truyền giá trị custom price lên component cha
  data: { id: string; label: string; value: string }[];
  resetRef: React.RefObject<{ resetSelection: () => void }>;
}

const MenuRadioSection: React.FC<MenuRadioSectionProps> = forwardRef(({ title, onChange, data, resetRef }, ref) => {
  const [selectedValue, setSelectedValue] = useState<string>(data.length > 0 ? JSON.stringify(data[0].value) : '');
  const [expanded, setExpanded] = useState<boolean>(true); // Trạng thái thu gọn/mở rộng
  
  // Syncs reset functionality with the parent component's ref
  useImperativeHandle(resetRef, () => ({
    resetSelection: () => {
      setSelectedValue(JSON.stringify(data[0].value)); // Reset to the default selection
      onChange(data[0].value); // Notify parent of the reset
    }
  }));

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    const selectedOption = data.find(item => JSON.stringify(item.value) === event.target.value);
    if (selectedOption) {
      onChange(selectedOption.value); // Truyền giá trị radio cố định lên component cha
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', borderTop:'2px solid #f3f4f6' }} onClick={toggleExpand}>
        <Typography variant="h6" fontSize="15px" gutterBottom width={"100%"}>
          {title}
        </Typography>
        <IconButton size="small">
          {expanded ? <ExpandLessIcon sx={{}}/> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      {expanded && (
        <RadioGroup value={selectedValue} onChange={handleRadioChange} ref={resetRef}>
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
        </RadioGroup>
      )}
    </div>
  );
});

export default MenuRadioSection;
