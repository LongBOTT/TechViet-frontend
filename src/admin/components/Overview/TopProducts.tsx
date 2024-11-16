import * as React from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  SelectChangeEvent,
} from "@mui/material";

const TopProducts: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState("7 ngày qua");

  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value as string);
  };

  const products = [
    { id: 1, name: "Iphone 15", quantity: 18 },
    { id: 2, name: "Samsung Galaxy s23", quantity: 11 },
    { id: 3, name: "LapTop ASUS",  quantity: 5 },
    { id: 4, name: "Chuột mickey", quantity: 5 },
    { id: 5, name: "Redmi note 13T Pro",  quantity: 4 },
  ];

  const productColors = ["#01A0F6", "#02C7A1", "#FFB236", "#FF6961", "#5D5FEF"];

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
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft: "10px" }}>
          TOP SẢN PHẨM
        </Typography>
        {/* <Select
          value={timeRange}
          onChange={handleTimeRangeChange}
          size="small"
          sx={{ width: "150px", marginRight: "10px" }}
        >
          <MenuItem value="Hôm nay">Hôm nay</MenuItem>
          <MenuItem value="Hôm qua">Hôm qua</MenuItem>
          <MenuItem value="7 ngày qua">7 ngày qua</MenuItem>
          <MenuItem value="Tháng này">Tháng này</MenuItem>
        </Select> */}
      </Box>
      <Divider sx={{ marginTop: "10px" }} />

      {/* Product List */}
      <List>
        {products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            index={index}
            color={productColors[index]}
          />
        ))}
      </List>
    </Box>
  );
};

interface ProductItemProps {
  product: {
    id: number;
    name: string;
    quantity: number;
  };
  index: number;
  color: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, index, color }) => (
  <ListItem sx={{ borderBottom: "1px solid #f0f0f0" }}>
    <Avatar sx={{ bgcolor: color, marginRight: "10px" }}>{index + 1}</Avatar>
    <ListItemText
      primary={product.name}
      primaryTypographyProps={{ fontWeight: "bold" }}
    />
    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
      {product.quantity}
    </Typography>
  </ListItem>
);

export default TopProducts;
