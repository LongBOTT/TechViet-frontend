// src/components/GeneralProduct.tsx
import React from "react";
import { Box, Divider, TextField, Typography } from "@mui/material";
import ImageUploader from "./ImageUploader";
import { useProductContext } from "../../../context/ProductContext";
const GeneralProduct: React.FC = () => {
  const { handleProductChange } = useProductContext();
  return (
    <Box
      sx={{
        bgcolor: "rgb(255, 255, 255)",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        height: "100%",
        width: "60%",
        marginRight: "30px",
      }}
    >
      {/* Tiêu đề */}
      <Box sx={{ m: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: "Roboto", fontWeight: "bold" }}
        >
          Thông tin sản phẩm
        </Typography>
        <Divider />
      </Box>

      {/* Tên sản phẩm */}
      <Box sx={{ m: 2 }}>
        <Typography sx={{ fontFamily: "Roboto", mb: 1 }}>
          Tên sản phẩm *
        </Typography>
        <TextField
          fullWidth
          placeholder="Nhập tên sản phẩm"
          variant="outlined"
          size="small"
          onChange={(e) => handleProductChange("name", e.target.value)}
        />
      </Box>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box sx={{ width: "60%" }}>
          {/* Đơn vị và Khối lượng */}
          <Box sx={{ m: 2, display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: "Roboto", mb: 1 }}>
                Đơn vị *
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập đơn vị"
                variant="outlined"
                size="small"
                onChange={(e) => handleProductChange("unit", e.target.value)}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: "Roboto", mb: 1 }}>
                Khối lượng *
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập khối lượng"
                variant="outlined"
                size="small"
                onChange={(e) => handleProductChange("weight", parseFloat(e.target.value))}
              />
            </Box>
          </Box>

          {/* Giá vốn và Giá bán */}
          <Box sx={{ m: 2, display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: "Roboto", mb: 1 }}>
                Giá vốn *
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập giá vốn"
                variant="outlined"
                size="small"
                type="number"
                defaultValue={0}
                inputProps={{ min: 0 }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: "Roboto", mb: 1 }}>
                Giá bán *
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập giá bán"
                variant="outlined"
                size="small"
                type="number"
                defaultValue={0}
                inputProps={{ min: 0 }}
              />
            </Box>
          </Box>

          {/* Tồn kho và Định mức tối thiểu */}
          <Box sx={{ m: 2, display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: "Roboto", mb: 1 }}>
                Tồn kho *
              </Typography>
              <TextField
                fullWidth
                placeholder="Số lượng tồn kho"
                variant="outlined"
                size="small"
                type="number"
                defaultValue={0}
                inputProps={{ min: 0 }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: "Roboto", mb: 1 }}>
                Định mức tối thiểu *
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập định mức tối thiểu"
                variant="outlined"
                size="small"
                type="number"
                defaultValue={0}
                inputProps={{ min: 0 }}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "40%", margin: "auto" }}>
          <ImageUploader  onImageChange={(imageUrl) => handleProductChange("image", imageUrl)} />
        </Box>
      </Box>
      {/* Mô tả sản phẩm */}
      <Box sx={{ margin: "20px" }}>
        <Typography
          sx={{
            fontFamily: "Roboto",
            marginBottom: "10px",
          }}
        >
          Mô tả sản phẩm
        </Typography>
        <TextField
          fullWidth
          placeholder="Nhập mô tả sản phẩm"
          variant="outlined"
          size="small"
          multiline
          rows={4} // Đặt số hàng để tạo khung nhập văn bản cao hơn
        />
      </Box>
    </Box>
  );
};

export default GeneralProduct;
