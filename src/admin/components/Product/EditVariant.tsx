// src/components/EditVariant.tsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { VariantRequest } from "../../../types/variant";
import { VariantAttributeRequest } from "../../../types/variant_attribute";


interface EditVariantProps {
  existingVariants: VariantRequest[];
  onVariantsChange: (variants: VariantRequest[]) => void;
}

const EditVariant: React.FC<EditVariantProps> = ({ existingVariants, onVariantsChange }) => {
  const [variants, setVariants] = useState<VariantRequest[]>(existingVariants);

  const handleAddValueToAttribute = (attributeId: number, value: string) => {
    // Lặp qua từng variant hiện có và thêm thuộc tính mới cho mỗi variant với giá trị mới
    // const newVariants = variants.map((variant) => {
    //   const attributeExists = variant.some(
    //     (attr) => attr.attributeId === attributeId && attr.value === value
    //   );

    //   // Nếu thuộc tính chưa tồn tại trong variant, tạo bản sao với thuộc tính mới
    //   if (!attributeExists) {
    //     return {
    //       ...variant,
    //       variantAttributes: [
    //         ...variant.variantAttributes,
    //         { attributeId, value },
    //       ],
    //     };
    //   }

    //   return variant;
    // });

    // setVariants(newVariants);
    // onVariantsChange(newVariants);
  };

  const handleRemoveAttribute = (variantId: number, attributeId: number) => {
    // setVariants((prev) => {
    //   return prev.map((variant) => {
    //     if (variant.id === variantId) {
    //       return {
    //         ...variant,
    //         variantAttributes: variant.variantAttributes.filter(
    //           (attr) => attr.attributeId !== attributeId
    //         ),
    //       };
    //     }
    //     return variant;
    //   });
    // });
    // onVariantsChange(variants);
  };

  const handleRemoveVariant = (variantId: number) => {
    const updatedVariants = variants.filter((variant) => variant.id !== variantId);
    setVariants(updatedVariants);
    onVariantsChange(updatedVariants);
  };

  useEffect(() => {
    setVariants(existingVariants);
  }, [existingVariants]);

  return (
    <Box>
      <Typography>Sửa các phiên bản sản phẩm</Typography>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên phiên bản</TableCell>
            <TableCell>Thuộc tính</TableCell>
            <TableCell>Xóa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant.id}>
              <TableCell>{variant.name}</TableCell>
              {/* <TableCell>
                {variant.variantAttributes.map((attr) => (
                  <Chip
                    key={attr.attributeId}
                    label={`${attr.attributeId}: ${attr.value}`}
                    onDelete={() => handleRemoveAttribute(variant.id, attr.attributeId)}
                  />
                ))}
              </TableCell> */}
              <TableCell>
                <IconButton onClick={() => handleRemoveVariant(variant.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider sx={{ marginY: 2 }} />

      {/* Phần thêm giá trị mới vào thuộc tính */}
      <Box display="flex" alignItems="center">
        <TextField
          label="Thêm giá trị mới cho thuộc tính"
          placeholder="Nhập giá trị"
          variant="outlined"
          size="small"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const target = e.target as HTMLInputElement;
              const value = target.value.trim();
              if (value) {
                handleAddValueToAttribute(3, value); // 3 là mã thuộc tính ví dụ
                target.value = ""; // Xóa nội dung ô nhập sau khi thêm
              }
            }
          }}
        />
        <IconButton>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default EditVariant;
