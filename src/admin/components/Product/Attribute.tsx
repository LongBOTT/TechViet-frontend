import { useState, useEffect } from "react";
import { Box, Typography, Switch, TextField, Divider } from "@mui/material";
import { getCategoryAttributesByCategoryId } from "../../../api/category_attributeApi";
import { category_attribute } from "../../../types/category_attribute";
import { VariantAttributeRequest } from "../../../types/variant_attribute";

interface AttributeProps {
  categoryId: number | null;
  onAttributesChange: (attributes: VariantAttributeRequest[]) => void;
  
}

const Attribute: React.FC<AttributeProps> = ({ categoryId, onAttributesChange }) => {
  const [showAttributes, setShowAttributes] = useState(false);
  const [attributesData, setAttributesData] = useState<category_attribute[]>([]);
  const [attributeValues, setAttributeValues] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchAttributes = async () => {
      if (categoryId) {
        const data = await getCategoryAttributesByCategoryId(categoryId);
        if (data) {
          const filteredData = data.filter((attr) => {
            if (categoryId === 1) {
              // Nếu là Điện thoại (categoryId = 1), loại bỏ cả màu sắc (id=3) và dung lượng (id=24)
              return attr.attribute.id !== 3 && attr.attribute.id !== 24;
            } else {
              // Nếu là danh mục khác, chỉ loại bỏ màu sắc (id=3)
              return attr.attribute.id !== 3;
            }
          });
          setAttributesData(filteredData);
        }
      }
    };

    fetchAttributes();
  }, [categoryId]);

  const handleAttributeChange = (attributeId: number, value: string) => {
    const updatedValues = { ...attributeValues, [attributeId]: value };
    setAttributeValues(updatedValues);

    // Chuẩn bị danh sách VariantAttributeRequest cho các thông số kỹ thuật chung
    const attributesList: VariantAttributeRequest[] = Object.keys(updatedValues).map((key) => ({
      variantId: -1, // Tạm thời đặt variantId là -1, sẽ được cập nhật sau
      attributeId: parseInt(key, 10),
      value: updatedValues[parseInt(key, 10)],
    }));
    onAttributesChange(attributesList); // Gửi lên AddProductPage
  };

  const parentAttributes = [...new Set(attributesData.map((attr) => attr.attribute.parent))];
  const handleToggleChange = () => setShowAttributes(!showAttributes);

  return (
    <Box sx={{ bgcolor: "rgb(255, 255, 255)", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)", borderRadius: "5px", padding: "20px", width: "100%", margin: "20px auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <Typography sx={{ fontFamily: "Roboto", fontWeight: "bold", marginRight: "8px" }}>
          Thông số kỹ thuật
        </Typography>
        <Switch checked={showAttributes} onChange={handleToggleChange} color="primary" />
      </Box>
      {showAttributes && (
        <Box sx={{ padding: 2 }}>
          {parentAttributes.map((parent) => (
            <Box key={parent} sx={{ marginBottom: 3, padding: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "Roboto", marginBottom: 1 }}>
                {parent}
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              {attributesData.filter((attr) => attr.attribute.parent === parent).map((attr) => (
                <Box key={attr.id} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                  <Typography sx={{ width: "30%", fontFamily: "Roboto" }}>{attr.attribute.name}</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={attributeValues[attr.attribute.id] || ""}
                    onChange={(e) => handleAttributeChange(attr.attribute.id, e.target.value)}
                    sx={{ width: "70%" }}
                  />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Attribute;
