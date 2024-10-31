// src/admin/pages/EditProductPage.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import HeaderActions from "../../components/Product/HeaderActions";
import { useNavigate } from "react-router-dom";

export default function EditProductPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = React.useState(false);

  const handleGoBack = () => navigate("/products");
  const handleSave = () => {
    console.log("Lưu sản phẩm");
    setIsEditing(false);
  };
  const handleExit = () => navigate("/products");
  const handleDelete = () => console.log("Xóa sản phẩm");
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  return (
    <Box sx={{ flexGrow: 1, borderRadius: 1, bgcolor: "rgb(249, 249, 249)", height: "100vh", overflowY: "auto" }}>
      <HeaderActions
        mode="edit" // Chế độ sửa
        isEditing={isEditing}
        onGoBack={handleGoBack}
        onSave={handleSave}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onExit={handleExit}
      />
      {/* Nội dung trang chỉnh sửa sản phẩm */}
    </Box>
  );
}
