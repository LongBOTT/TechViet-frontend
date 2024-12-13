import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { VariantRequest } from "../../../types/variant";
import { VariantAttributeRequest } from "../../../types/variant_attribute";

interface AddVariantProps {
  productName: string;
  productCategoryId: number; // ID loại sản phẩm
  onAddVariant: (
    variant: VariantRequest,
    attributes: VariantAttributeRequest[]
  ) => void;
  onUpdateVariantList: (
    variants: VariantRequest[],
    attributes: VariantAttributeRequest[][]
  ) => void;
}

const AddVariant: React.FC<AddVariantProps> = ({
  productName,
  productCategoryId,
  onAddVariant,
  onUpdateVariantList,
}) => {
  const [formVariant, setFormVariant] = useState<Omit<VariantRequest, "id">>({
    name: "",
    image: "",
    quantity: 0,
    price: 0,
    costPrice: 0,
    productId: 0,
    status: "active",
  });

  const [color, setColor] = useState<string>("");
  const [storage, setStorage] = useState<string>("");
  const [variants, setVariants] = useState<VariantRequest[]>([]);
  const [variantAttributes, setVariantAttributes] = useState<
    VariantAttributeRequest[][]
  >([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const handleInputChange = (
    field: keyof VariantRequest,
    value: string | number
  ) => {
    setFormVariant((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormVariant((prev) => ({
        ...prev,
        image: "/src/assets/products/" + file.name,
      }));
    }
  };

  const handleAddVariant = () => {
    if (!productName) {
      alert("Vui lòng nhập tên sản phẩm trước khi thêm phiên bản.");
      return;
    }
    // Kiểm tra nếu các trường màu sắc hoặc dung lượng bị bỏ trống
    if (!color) {
      alert("Vui lòng nhập màu sắc cho phiên bản.");
      return;
    }
    if (productCategoryId === 1 && !storage) {
      alert("Vui lòng nhập dung lượng cho phiên bản.");
      return;
    }
    const variantName = `${productName} ${color}${
      productCategoryId === 1 ? ` ${storage}` : ""
    }`;

    const newVariant: VariantRequest = {
      ...formVariant,
      id: Date.now(),
      name: variantName,
    };

    // Kiểm tra trùng lặp phiên bản dựa trên giá trị của màu sắc và dung lượng
    const isDuplicate = variants.some((variant, index) => {
      const attributes = variantAttributes[index];
      const existingColor = attributes.find(
        (attr) => attr.attributeId === 3
      )?.value;
      const existingStorage = attributes.find(
        (attr) => attr.attributeId === 24
      )?.value;

      // Kiểm tra xem màu sắc và dung lượng có trùng không
      return (
        existingColor === color &&
        (productCategoryId === 1 ? existingStorage === storage : true)
      );
    });

    if (isDuplicate) {
      alert("Phiên bản với màu sắc và dung lượng này đã tồn tại!");
      return;
    }

    const attributes: VariantAttributeRequest[] = [
      { variantId: newVariant.id, attributeId: 3, value: color },
    ];

    if (productCategoryId === 1 && storage) {
      attributes.push({
        variantId: newVariant.id,
        attributeId: 24,
        value: storage,
      });
    }

    setVariants((prevVariants) => [...prevVariants, newVariant]);
    setVariantAttributes((prevAttributes) => [...prevAttributes, attributes]);
    onAddVariant(newVariant, attributes); // Gửi dữ liệu variant và attributes lên AddProductPage
    resetForm();
  };

  const handleEditVariant = (index: number) => {
    const variantToEdit = variants[index];
    const attributesToEdit = variantAttributes[index];
    setFormVariant({ ...variantToEdit });
    setColor(
      attributesToEdit.find((attr) => attr.attributeId === 3)?.value || ""
    );
    setStorage(
      attributesToEdit.find((attr) => attr.attributeId === 24)?.value || ""
    );
    setIsEditing(index);
  };

  const handleUpdateVariant = () => {
    if (isEditing === null) return;

    const updatedVariant = { ...formVariant, id: variants[isEditing].id };

    // Kiểm tra trùng lặp khi sửa phiên bản
    const isDuplicate = variants.some((variant, index) => {
      if (index === isEditing) return false; // Bỏ qua chính phiên bản đang chỉnh sửa
      const attributes = variantAttributes[index];
      const existingColor = attributes.find(
        (attr) => attr.attributeId === 3
      )?.value;
      const existingStorage = attributes.find(
        (attr) => attr.attributeId === 24
      )?.value;

      return (
        existingColor === color &&
        (productCategoryId === 1 ? existingStorage === storage : true)
      );
    });

    if (isDuplicate) {
      alert("Phiên bản với màu sắc và dung lượng này đã tồn tại!");
      return; // Không lưu nếu phiên bản đã tồn tại
    }

    const updatedAttributes = [
      { variantId: updatedVariant.id, attributeId: 3, value: color },
      ...(productCategoryId === 1
        ? [{ variantId: updatedVariant.id, attributeId: 24, value: storage }]
        : []),
    ];

    const updatedVariants = [...variants];
    updatedVariants[isEditing] = updatedVariant;

    const updatedVariantAttributes = [...variantAttributes];
    updatedVariantAttributes[isEditing] = updatedAttributes;

    setVariants(updatedVariants);
    setVariantAttributes(updatedVariantAttributes);
    onUpdateVariantList(updatedVariants, updatedVariantAttributes);
    resetForm();
  };

  const handleDeleteVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    const updatedVariantAttributes = variantAttributes.filter(
      (_, i) => i !== index
    );

    setVariants(updatedVariants);
    setVariantAttributes(updatedVariantAttributes);
    onUpdateVariantList(updatedVariants, updatedVariantAttributes);
  };

  const resetForm = () => {
    setFormVariant({
      name: "",
      image: "",
      quantity: 0,
      price: 0,
      costPrice: 0,
      productId: 0,
      status: "active",
    });
    setColor("");
    setStorage("");
    setIsEditing(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6">Phiên Bản </Typography>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{ width: "100%" }}
        display="flex"
        gap={2}
        alignItems="center"
        flexWrap="wrap"
      >
        <TextField
          label="Màu sắc"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          size="small"
          sx={{ width: "130px" }}
        />

        {productCategoryId === 1 && (
          <TextField
            label="Dung lượng"
            value={storage}
            onChange={(e) => setStorage(e.target.value)}
            size="small"
            sx={{ width: "130px" }}
          />
        )}

        <TextField
          label="Số lượng"
          type="number"
          value={formVariant.quantity}
          onChange={(e) =>
            handleInputChange("quantity", Number(e.target.value))
          }
          size="small"
          sx={{ width: "130px" }}
        />
        <TextField
          label="Giá bán"
          type="number"
          value={formVariant.price}
          onChange={(e) => handleInputChange("price", Number(e.target.value))}
          size="small"
          sx={{ width: "200px" }}
        />
        <TextField
          label="Giá nhập"
          type="number"
          value={formVariant.costPrice}
          onChange={(e) =>
            handleInputChange("costPrice", Number(e.target.value))
          }
          size="small"
          sx={{ width: "200px" }}
        />
        <Box>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
            id="upload-image"
          />
          <label htmlFor="upload-image">
            <IconButton component="span">
              {formVariant.image ? (
                <img
                  src={formVariant.image}
                  alt="Selected"
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                />
              ) : (
                <UploadIcon sx={{ fontSize: 30 }} />
              )}
            </IconButton>
          </label>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <IconButton
            color="primary"
            onClick={
              isEditing !== null ? handleUpdateVariant : handleAddVariant
            }
            sx={{ fontSize: 40, marginRight: "30px" }}
          >
            {isEditing !== null ? (
              <EditIcon fontSize="inherit" />
            ) : (
              <AddIcon fontSize="inherit" />
            )}
          </IconButton>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Danh sách Phiên Bản{" "}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên Phiên Bản</TableCell>
            <TableCell>Màu Sắc</TableCell>
            {productCategoryId === 1 && <TableCell>Dung Lượng</TableCell>}
            <TableCell>Giá Bán</TableCell>
            <TableCell>Giá Nhập</TableCell>
            <TableCell>Số Lượng</TableCell>
            <TableCell>Hình Ảnh</TableCell>
            <TableCell>Hành Động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants.map((variant, index) => (
            <TableRow key={variant.id}>
              <TableCell>{variant.name}</TableCell>
              <TableCell>
                {
                  variantAttributes[index]?.find(
                    (attr) => attr.attributeId === 3
                  )?.value
                }
              </TableCell>
              {productCategoryId === 1 && (
                <TableCell>
                  {
                    variantAttributes[index]?.find(
                      (attr) => attr.attributeId === 24
                    )?.value
                  }
                </TableCell>
              )}
              <TableCell>{variant.price}</TableCell>
              <TableCell>{variant.costPrice}</TableCell>
              <TableCell>{variant.quantity}</TableCell>
              <TableCell>
                {variant.image && (
                  <img
                    src={variant.image}
                    alt="Variant"
                    style={{ width: 60, height: 60, borderRadius: 5 }}
                  />
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleEditVariant(index)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteVariant(index)}
                >
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

export default AddVariant;
