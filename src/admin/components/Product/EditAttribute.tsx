import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, Divider } from "@mui/material";
import { VariantAttributeRequest } from "../../../types/variant_attribute";
import { getCategoryAttributesByCategoryId } from "../../../api/category_attributeApi";
import { category_attribute } from "../../../types/category_attribute";

interface EditAttributeProps {
  categoryId: number | null;
  initialAttributes: VariantAttributeRequest[];
  onAttributesChange: (updatedAttributes: VariantAttributeRequest[]) => void;
}

const EditAttribute: React.FC<EditAttributeProps> = ({
  categoryId,
  initialAttributes,
  onAttributesChange,
}) => {
  const [attributes, setAttributes] = useState<VariantAttributeRequest[]>([]);
  const [categoryAttributes, setCategoryAttributes] = useState<category_attribute[]>([]);

  // Khi categoryAttributes thay đổi, khởi tạo lại attributes để đảm bảo đủ thuộc tính
  useEffect(() => {
    if (categoryId) {
      getCategoryAttributesByCategoryId(categoryId).then((data) => {
        if (data) {
          // Áp dụng điều kiện lọc dựa trên categoryId
          const filteredAttributes = data.filter((attr) => {
            if (categoryId === 1) {
              // Loại bỏ màu sắc và dung lượng cho categoryId = 1
              return attr.attribute.id !== 3 && attr.attribute.id !== 24;
            } else {
              // Loại bỏ chỉ màu sắc cho categoryId khác 1
              return attr.attribute.id !== 3;
            }
          });

          setCategoryAttributes(filteredAttributes);

          // Đồng bộ `attributes` để đảm bảo có tất cả các thuộc tính
          const fullAttributes = data.map((attr) => {
            const existingAttribute = initialAttributes.find(
              (a) => a.attributeId === attr.attribute.id
            );
            return existingAttribute || { attributeId: attr.attribute.id, variantId: -1, value: "" };
          });
          setAttributes(fullAttributes);
        }
      });
    }
  }, [categoryId, initialAttributes]);

  // Hàm xử lý khi thay đổi giá trị của một thuộc tính
  const handleAttributeChange = (attributeId: number, value: string) => {
    const updatedAttributes = attributes.map((attr) =>
      attr.attributeId === attributeId ? { ...attr, value } : attr
    );
    setAttributes(updatedAttributes);
    onAttributesChange(updatedAttributes);
  };

  // Nhóm thuộc tính theo parent để hiển thị theo nhóm
  const parentAttributes = [...new Set(categoryAttributes.map((attr) => attr.attribute.parent))];

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography variant="h6">Thông số kỹ thuật</Typography>
      <Divider sx={{ my: 2 }} />

      {parentAttributes.map((parent) => (
        <Box
          key={parent}
          sx={{
            mb: 4,
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: "Roboto", mb: 1 }}
          >
            {parent}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Hiển thị các thuộc tính theo từng nhóm `parent` */}
          {categoryAttributes
            .filter((attr) => attr.attribute.parent === parent)
            .map((attr) => {
              const attributeValue = attributes.find((a) => a.attributeId === attr.attribute.id)?.value || "";
              
              return (
                <Box
                  key={attr.attribute.id}
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <Typography sx={{ width: "30%", fontFamily: "Roboto" }}>
                    {attr.attribute.name}
                  </Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={attributeValue}
                    onChange={(e) => handleAttributeChange(attr.attribute.id, e.target.value)}
                    sx={{ width: "70%" }}
                  />
                </Box>
              );
            })}
        </Box>
      ))}
    </Box>
  );
};

export default EditAttribute;
