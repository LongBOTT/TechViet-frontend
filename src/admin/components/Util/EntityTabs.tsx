import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface EntityTabsProps {
  tabs: Array<{ label: string; content: React.ReactNode }>;
  onTabChange?: (tabLabel: string) => void; // Đặt ? để tùy chọn
}

const EntityTabs: React.FC<EntityTabsProps> = ({ tabs, onTabChange }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (onTabChange) {
      onTabChange(tabs[newValue].label); // Gọi hàm nếu onTabChange tồn tại
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="entity tabs">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              sx={{ textTransform: "none", fontWeight: "bold", fontSize: "16px" }}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ p: 3, padding: "5px" }}>{tabs[value].content}</Box>
    </Box>
  );
};

export default EntityTabs;
