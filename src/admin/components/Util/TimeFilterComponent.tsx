import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const predefinedRanges: { label: string; getDates: () => [Date, Date] }[] = [
  { label: 'Hôm nay', getDates: () => [new Date(), new Date()] },
  {
    label: 'Hôm qua',
    getDates: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return [yesterday, yesterday];
    },
  },
  {
    label: '7 ngày trước',
    getDates: () => {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      return [sevenDaysAgo, today];
    },
  },
  {
    label: '30 ngày trước',
    getDates: () => {
      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return [thirtyDaysAgo, today];
    },
  },
  {
    label: 'Tháng này',
    getDates: () => {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return [startOfMonth, today];
    },
  },
  {
    label: 'Tháng trước',
    getDates: () => {
      const today = new Date();
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      return [startOfLastMonth, endOfLastMonth];
    },
  },
];

const TimeFilterComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handlePredefinedRangeClick = (getDates: () => [Date, Date]) => {
    const [start, end] = getDates();
    setStartDate(start);
    setEndDate(end);
    handleClosePopover();
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <TextField
        label="Thời gian"
        value={startDate ? `Từ ${startDate.toLocaleDateString()} đến ${endDate?.toLocaleDateString()}` : 'Hôm nay'}
        onClick={handleOpenPopover}
        fullWidth
        InputProps={{ readOnly: true }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ display: 'flex', padding: 2 }}>
          {/* Sidebar for predefined ranges */}
          <List sx={{ width: '200px', borderRight: '1px solid #ddd', backgroundColor: '#f7f7f7' }}>
            {predefinedRanges.map((range) => (
              <ListItem key={range.label} disablePadding>
                <ListItemButton onClick={() => handlePredefinedRangeClick(range.getDates)}>
                  <ListItemText primary={range.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Date pickers for custom date range */}
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Chọn khoảng thời gian tùy chọn
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DatePicker
                selected={startDate || null}
                onChange={(date: Date | null) => setStartDate(date || undefined)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Từ ngày"
                dateFormat="dd/MM/yyyy"
                inline
              />
              <DatePicker
                selected={endDate || null}
                onChange={(date: Date | null) => setEndDate(date || undefined)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Đến ngày"
                dateFormat="dd/MM/yyyy"
                inline
              />
            </Box>

            {/* Confirm button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={handleClosePopover}>
                Xác nhận
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default TimeFilterComponent;
