// src/components/GeneralProduct.tsx
import React, { useEffect } from "react";
import { Box, Divider, TextField, Typography } from "@mui/material";
import ImageUploader from "./ImageUploader";
import { useProductContext } from "../../../context/ProductContext";
import { ProductRequest } from "../../../types/product";
interface GeneralProductProps {
  productData?: {
    name: string;
    unit: string;
    weight: number;
    description: string;
    image: string;
  };
  isEditMode: boolean;
}
const GeneralProduct: React.FC<GeneralProductProps> = ({
  productData,
  isEditMode,
}) => {
  const { handleProductChange } = useProductContext();

  useEffect(() => {
    // Khi load dữ liệu từ database, cập nhật các giá trị trong context
    if (isEditMode && productData) {
      Object.entries(productData).forEach(([key, value]) => {
        handleProductChange(key as keyof ProductRequest, value); // Ép kiểu key
      });
    }
  }, [isEditMode, productData, handleProductChange]);

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
          value={productData?.name || ""}
          onChange={(e) => handleProductChange("name", e.target.value)}
          disabled={!isEditMode}
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
                value={productData?.weight || ""}
                onChange={(e) => handleProductChange("unit", e.target.value)}
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
                value={productData?.weight || ""}
                onChange={(e) =>
                  handleProductChange("weight", parseFloat(e.target.value))
                }
                disabled={!isEditMode}
              />
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
          rows={4} 
        />
      </Box>
        </Box>
        <Box sx={{ width: "40%", margin: "auto" }}>
          <ImageUploader
            imageUrl={productData?.image || ""}
            onImageChange={(imageUrl) => handleProductChange("image", imageUrl)}
            disabled={!isEditMode}
          />
        </Box>
      </Box>
   
    </Box>
  );
};

export default GeneralProduct;
