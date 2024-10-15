import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTable from './CustomTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index} 
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Hàm trả về các thuộc tính để liên kết tab với panel
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0); // Quản lý trạng thái tab hiện tại

  // Hàm xử lý khi chọn tab mới
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Tabs chứa các tab */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab
            label="Sản phẩm"
            {...a11yProps(0)}
            sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '16px' }}
          />
          <Tab
            label="Thể loại"
            {...a11yProps(1)}
            sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '16px' }}
          />
          <Tab
            label="Thương hiệu"
            {...a11yProps(2)}
            sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '16px'}}
          />
        </Tabs>
      </Box>


      <CustomTabPanel value={value} index={0}>
        <CustomTable /> 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CustomTable /> 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
     
      </CustomTabPanel>
    </Box>
  );
}
