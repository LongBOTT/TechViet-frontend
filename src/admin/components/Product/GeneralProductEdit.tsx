import React from "react";
import { Box, Divider, TextField, Typography } from "@mui/material";
import ImageUploader from "./ImageUploader"; // Component để upload hình ảnh
import { ProductRequest } from "../../../types/product";

interface GeneralProductEditProps {
  isEditMode: boolean;
  product: ProductRequest; // Dữ liệu sản phẩm
  onProductChange: (updatedProduct: any) => void; // Hàm để cập nhật dữ liệu sản phẩm
}

const GeneralProductEdit: React.FC<GeneralProductEditProps> = ({
  isEditMode,
  product,
  onProductChange,
}) => {
  // Hàm xử lý khi có thay đổi trong các trường dữ liệu
  const handleInputChange = (field: string, value: string) => {
    onProductChange({
      ...product,
      [field]: value,
    });
  };

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
      <Box sx={{ m: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: "Roboto", fontWeight: "bold" }}
        >
          Thông tin sản phẩm
        </Typography>
        <Divider />
      </Box>

      <Box sx={{ m: 2 }}>
        <Typography sx={{ fontFamily: "Roboto", mb: 1 }}>
          Tên sản phẩm *
        </Typography>
        <TextField
          fullWidth
          placeholder="Nhập tên sản phẩm"
          variant="outlined"
          size="small"
          value={product.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
          disabled={!isEditMode}
        />
      </Box>

      <Box sx={{ width: "100%", display: "flex" }}>
        <Box sx={{ width: "60%" }}>
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
                value={product.unit || ""}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                disabled={!isEditMode}
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
                value={product.weight || ""}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                disabled={!isEditMode}
              />
            </Box>
          </Box>

          <Box sx={{ margin: "20px" }}>
            <Typography sx={{ fontFamily: "Roboto", marginBottom: "10px" }}>
              Mô tả sản phẩm
            </Typography>
            <TextField
              fullWidth
              placeholder="Nhập mô tả sản phẩm"
              variant="outlined"
              size="small"
              multiline
              rows={4}
              value={product.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              disabled={!isEditMode}
            />
          </Box>
        </Box>

        <Box sx={{ width: "40%", margin: "auto" }}>
          <ImageUploader
            imageUrl={product.image || ""}
            onImageChange={(imageUrl) => handleInputChange("image", imageUrl)}
            disabled={!isEditMode}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default GeneralProductEdit;
