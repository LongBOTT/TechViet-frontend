import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, Divider } from "@mui/material";
import { VariantAttributeRequest } from "../../../types/variant_attribute";
import { getCategoryAttributesByCategoryId } from "../../../api/category_attributeApi";
import { category_attribute } from "../../../types/category_attribute";

interface EditAttributeProps {
  categoryId: number | null; // Nhận ID thể loại
  initialAttributes: VariantAttributeRequest[][]; // Nhận dữ liệu của các thuộc tính dưới dạng mảng hai chiều
  onAttributesChange: (updatedAttributes: VariantAttributeRequest[][]) => void; // Callback khi có thay đổi
}

const EditAttribute: React.FC<EditAttributeProps> = ({
  categoryId,
  initialAttributes,
  onAttributesChange,
}) => {
  const [attributes, setAttributes] = useState<VariantAttributeRequest[][]>([]);
  const [categoryAttributes, setCategoryAttributes] = useState<category_attribute[]>([]);

  // Load dữ liệu ban đầu từ initialAttributes khi component được mount
  useEffect(() => {
    setAttributes([...initialAttributes]);
  }, [initialAttributes]);

  // Fetch category attributes khi categoryId thay đổi
  useEffect(() => {
    const fetchCategoryAttributes = async () => {
      if (categoryId) {
        const data = await getCategoryAttributesByCategoryId(categoryId);
        const filteredData = data?.filter((attr) => {
          // Nếu là Điện thoại, bỏ màu sắc (id=3) và dung lượng (id=24)
          if (categoryId === 1) {
            return attr.attribute.id !== 3 && attr.attribute.id !== 24;
          } else {
            // Nếu là danh mục khác, chỉ loại bỏ màu sắc (id=3)
            return attr.attribute.id !== 3;
          }
        });
        if (filteredData) {
          setCategoryAttributes(filteredData);
        }
      }
    };

    fetchCategoryAttributes();
  }, [categoryId]);

  // Tạo mảng `parentAttributes` để lưu tên của các thuộc tính cha
  const parentAttributes = [...new Set(categoryAttributes.map(attr => attr.attribute.parent))];

  // Hàm xử lý khi thay đổi giá trị của một thuộc tính
  const handleAttributeChange = (
    outerIndex: number,
    innerIndex: number,
    value: string
  ) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[outerIndex][innerIndex].value = value;
    setAttributes(updatedAttributes);
    onAttributesChange(updatedAttributes); // Gửi dữ liệu đã thay đổi về component cha ngay lập tức
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography variant="h6">Thông số kỹ thuật</Typography>
      <Divider sx={{ my: 2 }} />

      {parentAttributes.map((parent) => (
        <Box key={parent} sx={{ mb: 4, padding: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "Roboto", mb: 1 }}>
            {parent}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Hiển thị các thuộc tính trong từng nhóm `parent` */}
          {categoryAttributes
            .filter((attr) => attr.attribute.parent === parent)
            .map((attr) => {
              const attributeIndex = attributes.findIndex((group) =>
                group.some((a) => a.attributeId === attr.attribute.id)
              );
              const attribute = attributeIndex !== -1
                ? attributes[attributeIndex].find((a) => a.attributeId === attr.attribute.id)
                : { value: "", attributeId: attr.attribute.id };

              return (
                <Box key={attr.id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ width: "30%", fontFamily: "Roboto" }}>
                    {attr.attribute.name}
                  </Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={attribute?.value || ""}
                    onChange={(e) =>
                      handleAttributeChange(attributeIndex, 0, e.target.value)
                    }
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
