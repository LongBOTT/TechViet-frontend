// src/components/ImageUploader.tsx
import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

interface ImageUploaderProps {
  imageUrl?: string; // Thêm imageUrl cho ảnh mặc định
  onImageChange: (imageName: string) => void;
  disabled?: boolean; // Thêm disabled để tùy chọn vô hiệu hóa
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUrl, onImageChange, disabled = false }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(imageUrl || null);

  useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl); // Cập nhật khi nhận được imageUrl mới
    }
  }, [imageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      onImageChange("/src/assets/products/"+file.name); // Truyền tên file ảnh lên component cha
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2, width: "100%", height: "100%" }}>
      <Box
        sx={{
          width: "90%",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed #ccc",
          borderRadius: "4px",
          overflow: "hidden",
          mb: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <CameraAltOutlinedIcon sx={{ color: "gray", fontSize: "40px" }} />
        )}
      </Box>

      <Button
        variant="outlined"
        component="label"
        size="small"
        sx={{ color: "gray", borderColor: "gray", textTransform: "none", padding: "4px 16px", fontSize: "0.875rem", minWidth: "auto" }}
        disabled={disabled} // Áp dụng trạng thái disabled
      >
        Chọn ảnh
        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
      </Button>
    </Box>
  );
};

export default ImageUploader;
