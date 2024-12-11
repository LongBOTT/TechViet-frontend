import { Box, Typography, List, ListItem, ListItemText, Avatar, Divider } from "@mui/material";

interface TopProductsProps {
  topSellingProductsToday: any[]; // Nhận dữ liệu từ props
}

const TopProducts: React.FC<TopProductsProps> = ({ topSellingProductsToday }) => {
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
      <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft: "10px" }}>
        TOP SẢN PHẨM
      </Typography>
      <Divider sx={{ marginTop: "10px" }} />
      <List>
        {topSellingProductsToday.map((product, index) => (
          <ProductItem
            key={index}
            product={{ name: product[0], quantity: product[1] }} // Chuyển dữ liệu về dạng object
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
