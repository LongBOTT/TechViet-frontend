import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography, Box, Slider, TextField, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface MenuRadioSectionProps {
  title: string;
  onChange: (value: string) => void;  // Nhận callback để truyền giá trị custom price lên component cha
  data: { id: string; label: string; value: string }[];
}

const MenuRadioSection: React.FC<MenuRadioSectionProps> = ({ title, onChange, data }) => {
  const [selectedValue, setSelectedValue] = useState<string>(data.length > 0 ? JSON.stringify(data[0].value) : '');
  const [expanded, setExpanded] = useState<boolean>(true); // Trạng thái thu gọn/mở rộng

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
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpand}>
        <Typography variant="h6" fontSize="17px" gutterBottom width={"100%"}>
          {title}
        </Typography>
        <IconButton size="small">
          {expanded ? <ExpandLessIcon sx={{}}/> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      {expanded && (
        <RadioGroup value={selectedValue} onChange={handleRadioChange}>
          {data.map(item => (
            <FormControlLabel
              key={item.id}
              value={JSON.stringify(item.value)}
              control={<Radio size='small' sx={{ color: 'red', '&.Mui-checked': { color: 'red' } }} />}
              label={item.label}
            />
          ))}
        </RadioGroup>
      )}
    </div>
  );
};

export default MenuRadioSection;
