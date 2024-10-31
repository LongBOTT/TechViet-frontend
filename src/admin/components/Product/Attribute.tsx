import { useState, useEffect } from "react";
import { Box, Typography, Switch, TextField, Divider } from "@mui/material";
import { getCategoryAttributesByCategoryId } from "../../../api/category_attributeApi";
import { category_attribute } from "../../../types/category_attribute";
interface AttributeProps {
  categoryId: number | null; // nhận categoryId từ AddProductPage
  onAttributesChange: (
    attributes: { attributeId: number; value: string }[]
  ) => void; // truyền danh sách thuộc tính lên AddProductPage
}
const Attribute: React.FC<AttributeProps> = ({
  categoryId,
  onAttributesChange,
}) => {
  const [showAttributes, setShowAttributes] = useState(false);
  const [attributesData, setAttributesData] = useState<category_attribute[]>(
    []
  );
  const [attributeValues, setAttributeValues] = useState<{
    [key: number]: string;
  }>({});

  // Lấy dữ liệu thuộc tính từ API dựa vào categoryId
  useEffect(() => {
    const fetchAttributes = async () => {
      if (categoryId) {
        const data = await getCategoryAttributesByCategoryId(categoryId);
        if (data) {
          setAttributesData(data);
        }
      }
    };

    fetchAttributes();
  }, [categoryId]);
  // Cập nhật giá trị cho từng thuộc tính
  const handleAttributeChange = (attributeId: number, value: string) => {
    const updatedValues = { ...attributeValues, [attributeId]: value };
    setAttributeValues(updatedValues);

    // Chuẩn bị danh sách thuộc tính để truyền lên AddProductPage
    const attributesList = Object.keys(updatedValues).map((key) => ({
      attributeId: parseInt(key, 10),
      value: updatedValues[parseInt(key, 10)],
    }));
    onAttributesChange(attributesList);
  };

  // Get unique parent attributes from attributesData
  const parentAttributes = [
    ...new Set(attributesData.map((attr) => attr.attribute.parent)),
  ];

  const handleToggleChange = () => {
    setShowAttributes(!showAttributes);
  };

  return (
    <Box
      sx={{
        bgcolor: "rgb(255, 255, 255)",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        padding: "20px",
        width: "100%",
        margin: "20px auto",
      }}
    >
      {/* Header section with toggle */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            marginRight: "8px",
          }}
        >
          Thông số
        </Typography>
        <Switch
          checked={showAttributes}
          onChange={handleToggleChange}
          color="primary"
        />
      </Box>

      {/* Conditional content box */}
      {showAttributes && (
        <Box sx={{ padding: 2 }}>
          {parentAttributes.map((parent) => (
            <Box
              key={parent}
              sx={{
                marginBottom: 3,
                padding: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              {/* Tiêu đề thuộc tính cha */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                  marginBottom: 1,
                }}
              >
                {parent}
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />

              {/* Các thuộc tính con trong từng box thuộc tính cha */}
              {attributesData
                .filter((attr) => attr.attribute.parent === parent)
                .map((attr) => (
                  <Box
                    key={attr.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    {/* Tên thuộc tính con */}
                    <Typography sx={{ width: "30%", fontFamily: "Roboto" }}>
                      {attr.attribute.name}
                    </Typography>

                    {/* Ô input nhập giá trị */}
                    <TextField
                      variant="outlined"
                      size="small"
                      value={attributeValues[attr.attribute.id] || ""}
                      onChange={(e) =>
                        handleAttributeChange(attr.attribute.id, e.target.value)
                      }
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
