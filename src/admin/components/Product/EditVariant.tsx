import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface VariantRequest {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  costPrice: number;
  color: string;
  storage: string;
}

interface EditVariantProps {
  variantsData: VariantRequest[];
  onSaveVariant: (variant: VariantRequest) => void;
  onDeleteVariant: (id: number) => void;
}

const EditVariant: React.FC<EditVariantProps> = ({ variantsData, onSaveVariant, onDeleteVariant }) => {
  const [variants, setVariants] = useState<VariantRequest[]>([]);
  const [editingVariantId, setEditingVariantId] = useState<number | null>(null);
  const [editingVariant, setEditingVariant] = useState<VariantRequest | null>(null);

  useEffect(() => {
    setVariants(variantsData);
  }, [variantsData]);

  const startEditing = (variant: VariantRequest) => {
    setEditingVariantId(variant.id);
    setEditingVariant(variant);
  };

  const saveChanges = () => {
    if (editingVariant) {
      onSaveVariant(editingVariant);
      setEditingVariantId(null);
      setEditingVariant(null);
    }
  };

  const handleEditChange = (field: keyof VariantRequest, value: string | number) => {
    if (editingVariant) {
      setEditingVariant({ ...editingVariant, [field]: value });
    }
  };

  return (
    <Box>
      <Typography variant="h6">Chỉnh Sửa Phiên Bản Sản Phẩm</Typography>
      <Divider sx={{ my: 2 }} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên phiên bản</TableCell>
            <TableCell>Màu sắc</TableCell>
            <TableCell>Dung lượng</TableCell>
            <TableCell>Giá bán</TableCell>
            <TableCell>Giá nhập</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Hình ảnh</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant.id}>
              <TableCell>{variant.name}</TableCell>
              <TableCell>
                {editingVariantId === variant.id ? (
                  <TextField
                    value={editingVariant?.color}
                    onChange={(e) => handleEditChange("color", e.target.value)}
                    size="small"
                  />
                ) : (
                  variant.color
                )}
              </TableCell>
              <TableCell>
                {editingVariantId === variant.id ? (
                  <TextField
                    value={editingVariant?.storage}
                    onChange={(e) => handleEditChange("storage", e.target.value)}
                    size="small"
                  />
                ) : (
                  variant.storage
                )}
              </TableCell>
              <TableCell>
                {editingVariantId === variant.id ? (
                  <TextField
                    type="number"
                    value={editingVariant?.price}
                    onChange={(e) => handleEditChange("price", Number(e.target.value))}
                    size="small"
                  />
                ) : (
                  variant.price
                )}
              </TableCell>
              <TableCell>
                {editingVariantId === variant.id ? (
                  <TextField
                    type="number"
                    value={editingVariant?.costPrice}
                    onChange={(e) => handleEditChange("costPrice", Number(e.target.value))}
                    size="small"
                  />
                ) : (
                  variant.costPrice
                )}
              </TableCell>
              <TableCell>
                {editingVariantId === variant.id ? (
                  <TextField
                    type="number"
                    value={editingVariant?.quantity}
                    onChange={(e) => handleEditChange("quantity", Number(e.target.value))}
                    size="small"
                  />
                ) : (
                  variant.quantity
                )}
              </TableCell>
              <TableCell>
                {variant.image && (
                  <img src={variant.image} alt="Product Variant" style={{ width: 60, height: 60, borderRadius: 5 }} />
                )}
              </TableCell>
              <TableCell>
                {editingVariantId === variant.id ? (
                  <IconButton color="primary" onClick={saveChanges}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  <IconButton color="primary" onClick={() => startEditing(variant)}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton color="secondary" onClick={() => onDeleteVariant(variant.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default EditVariant;
