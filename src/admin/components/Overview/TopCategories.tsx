import { Box, Typography, List, ListItem, ListItemText, Avatar, Divider } from "@mui/material";

interface TopCategoriesProps {
  topSellingCategoriesToday: any[]; // Nhận dữ liệu từ props
}

const TopCategories: React.FC<TopCategoriesProps> = ({ topSellingCategoriesToday }) => {
  const categoryColors = ["#01A0F6", "#02C7A1", "#FFB236", "#FF6961", "#5D5FEF"];

  return (
    <Box
      sx={{
        width: "100%",
        height: '450px',
        padding: "10px",
        bgcolor: "white",
        borderRadius: "10px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft: "10px" }}>
        TOP THỂ LOẠI
      </Typography>
      <Divider sx={{ marginTop: "10px" }} />
      <List>
        {topSellingCategoriesToday.map((category, index) => (
          <CategoryItem
            key={index}
            category={{ name: category[0], quantity: category[1] }} // Chuyển dữ liệu về dạng object
            index={index}
            color={categoryColors[index]}
          />
        ))}
      </List>
    </Box>
  );
};

interface CategoryItemProps {
  category: {
    name: string;
    quantity: number;
  };
  index: number;
  color: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, index, color }) => (
  <ListItem sx={{ borderBottom: "1px solid #f0f0f0" }}>
    <Avatar sx={{ bgcolor: color, marginRight: "10px" }}>{index + 1}</Avatar>
    <ListItemText
      primary={category.name}
      primaryTypographyProps={{ fontWeight: "bold" }}
    />
    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
      {category.quantity}
    </Typography>
  </ListItem>
);

export default TopCategories;
