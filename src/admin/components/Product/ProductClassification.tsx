import React, { useEffect } from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterDropdown from "../Util/FilterDropdown";
import { useBrandContext } from "../../../context/BrandContex";
import { useCategoryContext } from "../../../context/CategoryContext";
import { useWarrantyContext } from "../../../context/WarrantyContext";
import { useProductContext } from "../../../context/ProductContext";

interface ProductClassificationProps {
  initialCategory?: string;
  initialBrand?: string;
  initialWarranty?: string;
}

export default function ProductClassification({
  initialCategory,
  initialBrand,
  initialWarranty,
}: ProductClassificationProps) {
  const { categories } = useCategoryContext();
  const { brands } = useBrandContext();
  const { warranties } = useWarrantyContext();
  const { handleProductChange } = useProductContext();

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
      <Box sx={{ margin: "10px" }}>
        <Typography variant="h6" sx={{ fontFamily: "roboto", fontWeight: "bold" }}>
          Phân loại
        </Typography>
        <Divider />
      </Box>

      <Box sx={{ margin: "20px" }}>
        <Typography sx={{ fontFamily: "Roboto", fontWeight: "bold", marginBottom: "10px" }}>
          Loại sản phẩm
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <FilterDropdown
              label="Chọn loại sản phẩm"
              options={CategoryOptions}
              selectedValue={initialCategory}
              onFilterChange={(value) => handleProductChange("categoryId", value)}
              sx={{ width: "100%" }}
            />
          </Box>
          <IconButton color="primary" aria-label="add category">
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ margin: "20px" }}>
        <Typography sx={{ fontFamily: "Roboto", fontWeight: "bold", marginBottom: "10px" }}>
          Thương hiệu
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <FilterDropdown
              label="Chọn thương hiệu"
              options={BrandOptions}
              selectedValue={initialBrand}
              onFilterChange={(value) => handleProductChange("brandId", value)}
              sx={{ width: "100%" }}
            />
          </Box>
          <IconButton color="primary" aria-label="add brand">
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ margin: "20px" }}>
        <Typography sx={{ fontFamily: "Roboto", fontWeight: "bold", marginBottom: "10px" }}>
          Chính sách bảo hành
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <FilterDropdown
              label="Chọn chính sách bảo hành"
              options={WarrantyOptions}
              selectedValue={initialWarranty}
              onFilterChange={(value) => handleProductChange("warrantyId", value)}
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
