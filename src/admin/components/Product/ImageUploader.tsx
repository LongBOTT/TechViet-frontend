// src/components/ImageUploader.tsx
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

interface ImageUploaderProps {
  onImageChange: (imageName: string) => void; 
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      onImageChange(file.name); // Truyền tên file ảnh lên AddProductPage
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2, width: "100%", height: "100%" }}>
      <Box sx={{ width: "90%", height: "200px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #ccc", borderRadius: "4px", overflow: "hidden", mb: 1, backgroundColor: "#f9f9f9" }}>
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <CameraAltOutlinedIcon sx={{ color: "gray", fontSize: "40px" }} />
        )}
      </Box>

      <Button variant="outlined" component="label" size="small" sx={{ color: "gray", borderColor: "gray", textTransform: "none", padding: "4px 16px", fontSize: "0.875rem", minWidth: "auto" }}>
        Chọn ảnh
        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
      </Button>
    </Box>
  );
};

export default ImageUploader;
