// src/components/Variant.tsx

import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Switch,
  IconButton,
  TextField,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import FilterDropdown from "../Util/FilterDropdown";
import { category_attribute } from "../../../types/category_attribute";
import { getCategoryAttributesByCategoryId } from "../../../api/category_attributeApi";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { VariantRequest } from "../../../types/variant";
import { VariantAttributeRequest } from "../../../types/variant_attribute";
import { useProductContext } from "../../../context/ProductContext";

// Định nghĩa kiểu dữ liệu cho các giá trị của thuộc tính
interface AttributeValues {
  [key: string]: string[];
}

interface VariantProps {
  categoryId: number | null;
  productName: string;
  onVariantsChange: (variants: VariantRequest[]) => void; // Callback để truyền danh sách phiên bản lên AddProductPage
  onVariantAttributesChange: (attributes: VariantAttributeRequest[]) => void; // Callback để truyền danh sách thuộc tính phiên bản lên AddProductPage
}

// Component Variant với các props cần thiết và dùng `React.memo` để tối ưu render
const Variant = React.memo(({ categoryId, productName, onVariantsChange, onVariantAttributesChange }: VariantProps) => {
  const [isVariantsVisible, setIsVariantsVisible] = useState<boolean>(true); // Trạng thái hiển thị danh sách phiên bản
  const [attributesData, setAttributesData] = useState<category_attribute[]>([]); // Danh sách thuộc tính theo thể loại
  const [selectedAttributes, setSelectedAttributes] = useState<category_attribute[]>([]); // Thuộc tính đã chọn
  const [selectedAttributeId, setSelectedAttributeId] = useState<string | null>(null); // ID thuộc tính đang chọn
  const [resetFilter, setResetFilter] = useState<boolean>(false); // Trạng thái reset bộ lọc
  const [attributeValues, setAttributeValues] = useState<AttributeValues>({}); // Giá trị của các thuộc tính
  const [variants, setVariants] = useState<VariantRequest[]>([]); // Danh sách các phiên bản sản phẩm

  // Lấy danh sách thuộc tính dựa trên categoryId khi thay đổi
  useEffect(() => {
    if (categoryId !== null) {
      const fetchAttributes = async () => {
        const data = await getCategoryAttributesByCategoryId(categoryId);
        console.log("data", data);
        // Lọc thuộc tính dựa trên categoryId
        const relevantAttributes = data?.filter(attr => 
          categoryId === 1 ? [3, 24].includes(attr.attribute.id) : attr.attribute.id === 3
        ) || [];
        setAttributesData(relevantAttributes);
      };
      fetchAttributes();
    }
  }, [categoryId]);

  // Hàm tạo và cập nhật danh sách phiên bản dựa trên giá trị các thuộc tính
  const updateVariants = useCallback(() => {
    const attributeKeys = Object.keys(attributeValues);
    if (attributeKeys.length === 0) {
      setVariants([]);
      return;
    }

    // Tạo tổ hợp các giá trị của thuộc tính
    const combinations = attributeKeys.reduce<string[][]>((acc, key) => {
      const values = attributeValues[key];
      return acc.length === 0 ? values.map((v) => [v]) : acc.flatMap((combination) => values.map((v) => [...combination, v]));
    }, []);

 
    // Tạo danh sách các phiên bản mới dựa trên tổ hợp các thuộc tính
    const newVariants: VariantRequest[] = combinations.map((combination, index) => ({
      id: index,
      name: `${productName}-${combination.join("-")}`,
      image: "",
      quantity: 0,
      available: 0,
      price: 0,
      minStock: 0,
      costPrice: 0,
      productId: 0,
      status:"Đang giao dịch"
    }));

    // Tạo danh sách thuộc tính phiên bản
    const newVariantAttributes: VariantAttributeRequest[] = combinations.flatMap((combination, variantIndex) =>
      combination.map((value, attrIndex) => ({
        variantId: variantIndex,
        attributeId: Number(attributeKeys[attrIndex]),
        value: value,
      }))
    );

    setVariants(newVariants); // Cập nhật trạng thái các phiên bản
    onVariantsChange(newVariants); // Gửi dữ liệu phiên bản lên AddProductPage
    onVariantAttributesChange(newVariantAttributes); // Gửi thuộc tính phiên bản lên AddProductPage
  }, [attributeValues, productName, onVariantsChange, onVariantAttributesChange]);

  // Gọi hàm updateVariants khi giá trị các thuộc tính thay đổi
  useEffect(() => {
    updateVariants();
  }, [attributeValues, updateVariants]);

  // Danh sách các tùy chọn thuộc tính (filter các thuộc tính chưa được chọn)
  const AttributeOptions = useMemo(() => {
    return attributesData
      .filter((attr) => !selectedAttributes.some((selected) => selected.attribute.id === attr.attribute.id))
      .map((attr) => ({
        value: attr.attribute.id.toString(),
        label: attr.attribute.name,
      }));
  }, [attributesData, selectedAttributes]);
 
  // Hàm xử lý khi chọn thuộc tính
  const handleAttributeSelect = useCallback((attributeId: string) => {
    const selected = attributesData.find((attr) => attr.attribute.id.toString() === attributeId);
    if (selected && !selectedAttributes.includes(selected)) {
      setSelectedAttributes([...selectedAttributes, selected]);
      setAttributeValues((prevValues) => ({
        ...prevValues,
        [attributeId]: [],
      }));
    }
    setSelectedAttributeId(attributeId);
    setResetFilter(true); // Reset lại bộ lọc sau khi chọn
  }, [attributesData, selectedAttributes]);

  // Reset bộ lọc khi resetFilter thay đổi
  useEffect(() => {
    if (resetFilter) {
      setSelectedAttributeId(null);
      setResetFilter(false);
    }
  }, [resetFilter]);

  // Hàm thêm giá trị mới vào thuộc tính
  const handleAddValue = useCallback((attributeId: string, value: string) => {
    if (value.trim()) {
      setAttributeValues((prevValues) => ({
        ...prevValues,
        [attributeId]: [...(prevValues[attributeId] || []), value.trim()],
      }));
    }
  }, []);

  // Hàm xóa giá trị khỏi thuộc tính
  const handleDeleteValue = useCallback((attributeId: string, valueToDelete: string) => {
    setAttributeValues((prevValues) => ({
      ...prevValues,
      [attributeId]: prevValues[attributeId].filter((val) => val !== valueToDelete),
    }));
  }, []);

  // Hàm xử lý khi nhấn phím Enter để thêm giá trị
  const handleKeyDown = useCallback((event: React.KeyboardEvent, attributeId: string) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      console.log("attributeId", attributeId , "target.value", target.value);
      handleAddValue(attributeId, target.value);
      target.value = "";
    }
  }, [handleAddValue]);

  // Hàm xóa thuộc tính khỏi danh sách thuộc tính đã chọn
  const handleRemoveAttribute = useCallback((attributeId: number) => {
    setSelectedAttributes((prev) => prev.filter((attr) => attr.attribute.id !== attributeId));
    setAttributeValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues[attributeId.toString()];
      return updatedValues;
    });
  }, []);

  // Hàm xóa phiên bản khỏi danh sách
  const handleRemoveVariant = (index: number) => {
    setVariants((prevVariants) => prevVariants.filter((_, i) => i !== index));
  };

  // Hàm xử lý khi thay đổi ảnh cho phiên bản
  const handleImageChange = (index: number, file: File | null) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setVariants((prev) => prev.map((v, i) => (i === index ? { ...v, image: imageUrl } : v)));
    }
  };

  
  const handleUpdateVariant = (index: number, field: string, value: number) => {
    setVariants((prevVariants) => {
      const updatedVariants = prevVariants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      );
  
      // Gọi lại hàm onVariantsChange để truyền các phiên bản đã cập nhật lên component cha
      onVariantsChange(updatedVariants);
  
      return updatedVariants;
    });
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
      {/* Tiêu đề và nút chuyển đổi hiển thị phiên bản */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <Typography sx={{ fontFamily: "Roboto", fontWeight: "bold", marginRight: "8px" }}>Phiên bản</Typography>
        <Switch checked={isVariantsVisible} onChange={() => setIsVariantsVisible((prev) => !prev)} color="primary" />
      </Box>

      {isVariantsVisible && (
        <Box sx={{ padding: "20px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%", marginBottom: 2 }}>
            <FilterDropdown
               key={AttributeOptions.length}
              label="Chọn thuộc tính"
              options={AttributeOptions}
              onFilterChange={handleAttributeSelect}
              resetFilter={resetFilter}
              sx={{ width: "100%" }}
            />
            <IconButton color="primary" aria-label="add attribute">
              <AddIcon />
            </IconButton>
          </Box>

          {selectedAttributes.map((attr) => (
            <Box key={attr.attribute.id} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
              <Typography sx={{ width: "30%", fontFamily: "Roboto" }}>{attr.attribute.name}</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", width: "60%", gap: 1 }}>
                {attributeValues[attr.attribute.id.toString()]?.map((value, index) => (
                  <Chip
                    key={index}
                    label={value}
                    onDelete={() => handleDeleteValue(attr.attribute.id.toString(), value)}
                    color="primary"
                  />
                ))}
                <TextField
                  placeholder="Nhập ký tự và nhấn enter"
                  variant="outlined"
                  size="small"
                  sx={{ flexGrow: 1 }}
                  onKeyDown={(e) => handleKeyDown(e, attr.attribute.id.toString())}
                />
              </Box>
              <IconButton color="secondary" onClick={() => handleRemoveAttribute(attr.attribute.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Divider sx={{ marginY: 2 }} />

          {/* Bảng hiển thị các phiên bản */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên phiên bản</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Giá nhập</TableCell>
                <TableCell>Định mức tồn kho</TableCell>
                <TableCell>Giá bán</TableCell>
                <TableCell>Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {variants.map((variant, index) => (
                <TableRow key={index}>
                  <TableCell>{variant.name}</TableCell>
                  <TableCell>
                    {variant.image ? (
                      <Box
                        component="img"
                        src={variant.image}
                        alt="Ảnh đã chọn"
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "5px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <IconButton color="primary" component="label">
                        <UploadFileIcon />
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) =>
                            handleImageChange(index, e.target.files ? e.target.files[0] : null)
                          }
                        />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={variant.quantity}
                      onChange={(e) =>
                        handleUpdateVariant(index, "quantity", +e.target.value)
                      }
                      
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={variant.costPrice}
                      onChange={(e) =>
                        handleUpdateVariant(index, "costPrice", +e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={variant.minStock}
                      onChange={(e) =>
                        handleUpdateVariant(index, "minStock", +e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        handleUpdateVariant(index, "price", +e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="secondary" onClick={() => handleRemoveVariant(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
});

export default Variant;
