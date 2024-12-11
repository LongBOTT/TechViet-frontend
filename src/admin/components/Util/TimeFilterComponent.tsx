import React, { useState } from "react";
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
  IconButton,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Add time icon
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const predefinedRanges: { label: string; getDates: () => [Date, Date] }[] = [
  { label: "Hôm nay", getDates: () => [new Date(), new Date()] },
  {
    label: "Hôm qua",
    getDates: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return [yesterday, yesterday];
    },
  },
  {
    label: "7 ngày trước",
    getDates: () => {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      return [sevenDaysAgo, today];
    },
  },
  {
    label: "30 ngày trước",
    getDates: () => {
      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return [thirtyDaysAgo, today];
    },
  },
  {
    label: "Tháng này",
    getDates: () => {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return [startOfMonth, today];
    },
  },
  {
    label: "Tháng trước",
    getDates: () => {
      const today = new Date();
      const startOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      return [startOfLastMonth, endOfLastMonth];
    },
  },
];
interface TimeFilterProps {
  onDateRangeSelect: (startDate: string, endDate: string) => void; // Callback function
}

const TimeFilterComponent: React.FC<TimeFilterProps> = ({ onDateRangeSelect }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedLabel, setSelectedLabel] = useState<string>("Hôm nay"); // New state for the label
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handlePredefinedRangeClick = (
    label: string,
    getDates: () => [Date, Date]
  ) => {
    const [start, end] = getDates();
    setStartDate(start);
    setEndDate(end);
    setSelectedLabel(label); // Set the label for the predefined range
    handleClosePopover();
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 1,
          // padding: "0.5rem",
          width: "350px",
        }}
      >
        <TextField
          value={
            selectedLabel !== "Tùy chọn"
              ? selectedLabel
              : startDate && endDate
              ? `Từ ${startDate.toLocaleDateString()} đến ${endDate.toLocaleDateString()}`
              : "Hôm nay"
          }
          onClick={handleOpenPopover}
          fullWidth
          InputProps={{
            disableUnderline: true, // Removes the underline
          }}
          sx={{
            "& .MuiInputBase-root": {
              border: "none", // Removes the default border
              "&:hover": {
                border: "none", // Ensures no border on hover
              },
              "&.Mui-focused": {
                border: "none", // Ensures no border on focus
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Removes the border outline for the outlined variant
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none", // Ensures no border on the fieldset
              },
              "&:hover fieldset": {
                border: "none", // Ensures no border on hover
              },
              "&.Mui-focused fieldset": {
                border: "none", // Ensures no border on focus
              },
            },
            backgroundColor: "transparent", // Makes sure the background is transparent
          }}
        />

        <IconButton>
          <AccessTimeIcon />
        </IconButton>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ display: "flex", padding: 2 }}>
          {/* Sidebar for predefined ranges */}
          <List
            sx={{
              width: "200px",
              borderRight: "1px solid #ddd",
              backgroundColor: "#f7f7f7",
            }}
          >
            {predefinedRanges.map((range) => (
              <ListItem key={range.label} disablePadding>
                <ListItemButton
                  onClick={() =>
                    handlePredefinedRangeClick(range.label, range.getDates)
                  }
                >
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
            <Box sx={{ display: "flex", gap: 2 }}>
              <DatePicker
                selected={startDate || null}
                onChange={(date: Date | null) =>
                  setStartDate(date || undefined)
                }
                selectsStart
                startDate={startDate}
                endDate={endDate}
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
                dateFormat="dd/MM/yyyy"
                inline
              />
            </Box>

            {/* Confirm button */}
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setSelectedLabel("Tùy chọn"); // Update label to indicate custom selection
                  handleClosePopover();
                  // Kiểm tra và chuyển đổi ngày sang định dạng yyyy-mm-dd
                  if (startDate && endDate) {
                    if (startDate > endDate) {
                      console.log(
                        "Lỗi: Ngày bắt đầu không thể lớn hơn ngày kết thúc."
                      );
                    } else {
                      const startDateStr = startDate
                        .toISOString()
                        .split("T")[0]; // Chuyển đổi ngày sang định dạng yyyy-mm-dd
                      const endDateStr = endDate.toISOString().split("T")[0]; // Chuyển đổi ngày sang định dạng yyyy-mm-dd

                      // Gọi callback function và truyền ngày đã chuyển đổi vào component cha
                      console.log("Ngày bắt đầu:", startDateStr);
                      console.log("Ngày kết thúc:", endDateStr);
                      onDateRangeSelect(startDateStr, endDateStr);
                    }
                  } else {
                    console.log("Chưa chọn đủ ngày bắt đầu và ngày kết thúc.");
                  }
                }}
              >
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
