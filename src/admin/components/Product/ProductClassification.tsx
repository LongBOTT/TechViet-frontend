import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterDropdown from "../Util/FilterDropdown";
import { useBrandContext } from "../../../context/BrandContex";
import { useCategoryContext } from "../../../context/CategoryContext";
import { useWarrantyContext } from "../../../context/WarrantyContext";
import { useProductContext } from "../../../context/ProductContext";

export default function ProductClassification() {
  const { categories } = useCategoryContext();
  const { brands } = useBrandContext();
  const { warranties } = useWarrantyContext();
  const {handleProductChange} = useProductContext();
  const CategoryOptions = categories.map((category: any) => ({
    value: category.id,
    label: category.name,
  }));
  const BrandOptions = brands.map((brand: any) => ({
    value: brand.id,
    label: brand.name,
  }));
  const WarrantyOptions = warranties.map((warranty: any) => ({
    value: warranty.id,
    label: warranty.name,
  }));

  return (
    <Box
      sx={{
        bgcolor: "rgb(255, 255, 255)",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        height: "100%",
        width: "40%",
      }}
    >
      {/* Header */}
      <Box sx={{ margin: "10px" }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: "roboto", fontWeight: "bold" }}
        >
          Phân loại
        </Typography>
        <Divider />
      </Box>

      {/* Loại sản phẩm */}
      <Box sx={{ margin: "20px" }}>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Loại sản phẩm
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <FilterDropdown
              label="Chọn loại sản phẩm"
              options={CategoryOptions}
              onFilterChange={(value) => {
                const selectedCategory = categories.find(
                  (category) => category.id === Number(value)
              
                );
                handleProductChange("category", selectedCategory);
              }}
              sx={{ width: "100%" }}
            />
          </Box>
          <IconButton color="primary" aria-label="add category">
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Thương hiệu */}
      <Box sx={{ margin: "20px" }}>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Thương hiệu
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <FilterDropdown
              label="Chọn thương hiệu"
              options={BrandOptions}
              onFilterChange={(value) => {
                const selectedBrand = brands.find(
                  (brand) => brand.id === Number(value)
                );
                handleProductChange("brand", selectedBrand);
              }}
              sx={{ width: "100%" }}
            />
          </Box>
          <IconButton color="primary" aria-label="add brand">
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Chính sách bảo hành */}
      <Box sx={{ margin: "20px" }}>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Chính sách bảo hành
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <FilterDropdown
              label="Chọn chính sách bảo hành"
              options={WarrantyOptions}
              onFilterChange={(value) => {
                const selectedWarranty = warranties.find(
                  (warranty) => warranty.id === Number(value)
                );
                handleProductChange("warranty", selectedWarranty);
              }}
              sx={{ width: "100%" }}
            />
          </Box>
          <IconButton color="primary" aria-label="add warranty">
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
