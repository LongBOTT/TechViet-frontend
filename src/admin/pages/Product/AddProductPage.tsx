// src/admin/pages/AddProductPage.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HeaderActions from "../../components/Product/HeaderActions";
import { useNavigate } from "react-router-dom";
import { Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import FilterDropdown from "../../components/Util/FilterDropdown";
import { BrandProvider, useBrandContext } from "../../../context/BrandContex";
import {
  CategoryProvider,
  useCategoryContext,
} from "../../../context/CategoryContext";

import { useState, useCallback } from "react";
import ProductClassification from "../../components/Product/ProductClassification";
import GeneralProduct from "../../components/Product/GeneralProduct";
import AttributeToggle from "../../components/Product/Attribute";
import Attribute from "../../components/Product/Attribute";
import Variant from "../../components/Product/Variant";
import { WarrantyProvider } from "../../../context/WarrantyContext";
import { useProductContext } from "../../../context/ProductContext";
import { Product, ProductDTO } from "../../../types/product";
import { VariantDTO } from "../../../types/variant";
import { addProduct } from "../../../api/productApi";
import { addVariant } from "../../../api/variantApi";
import { addVariantAttribute } from "../../../api/variant_attributeApi";
import { VariantAttributeDTO } from "../../../types/variant_attribute";
export default function AddProductPage() {
  const navigate = useNavigate();

  const handleGoBack = () => navigate("/products");

  const handleExit = () => navigate("/products");
  const { createProduct } = useProductContext();

  const [productData, setProductData] = useState<ProductDTO>({
    id: 0,
    name: "",
    description: "",
    weight: 0,
    categoryId: 0,
    brandId: 0,
    warrantyId: 0,
    image: "",
  });
  const [variantsData, setVariantsData] = useState<VariantDTO[]>([]);
  const [attributesData, setAttributesData] = React.useState<
    { attributeId: number; value: string }[]
  >([]);
  const [variantAttributeData, setVariantAttributeData] = useState<
    VariantAttributeDTO[]
  >([]);
  const updateProductData = (key: string, value: any) => {
    setProductData((prev) => ({ ...prev, [key]: value }));
  };

  // Tạo các callback để chỉ được gọi khi cần thiết
  const handleVariantsChange = useCallback((variants: VariantDTO[]) => {
    setVariantsData(variants);
  }, []);
  const handleVariantAttributesChange = useCallback(
    (attributes: VariantAttributeDTO[]) => {
      setVariantAttributeData(attributes);
    },
    []
  );
  // thông số kĩ thuật
  const handleAttributesChange = (
    attributes: { attributeId: number; value: string }[]
  ) => {
    setAttributesData(attributes);
  };

  const handleSave = async () => {
    try {
     
      // Step 1: Lưu sản phẩm vào cơ sở dữ liệu và lấy productId
      const savedProduct = await addProduct(productData); // Gọi API để lưu productData vào bảng 'product'
      const productId = savedProduct.id; // Lấy productId trả về từ server

      // Step 2: Lưu từng phiên bản của sản phẩm
      const savedVariants = await Promise.all(
        variantsData.map(
          (variant) => addVariant({ ...variant, productId }) // Gọi API để lưu mỗi phiên bản vào bảng 'variant'
        )
      );

      // Step 3: Lưu các thông số kỹ thuật vào variant_attribute chỉ cho phiên bản đầu tiên
      if (savedVariants.length > 0) {
        const firstVariantId = savedVariants[savedVariants.length - 1].id; // Lấy variantId của phiên bản đầu tiên
        console.log("id phien ban dau tien: ", firstVariantId);
        // Chuẩn bị dữ liệu cho variant_attribute từ attributesData
        const variantAttributes = attributesData.map((attribute) => ({
          variantID: firstVariantId,
          attributeID: attribute.attributeId,
          value: attribute.value,
        }));

        // Gọi API để lưu các variant_attributes vào cơ sở dữ liệu
        const list = await Promise.all(
          variantAttributes.map((attributeData) =>
            addVariantAttribute(attributeData)
          )
        );
        console.log("danh sach thuoc tinh da luu vao database", list);
      }

      // Step 4: Lưu các thuộc tính tạo nên phiên bản cho từng phiên bản trong savedVariants
      // Tạo ánh xạ giữa id tạm và id thật
      const variantIdMap: { [key: number]: number } = {};
      variantsData.forEach((variant, index) => {
        variantIdMap[variant.id] = savedVariants[index].id;
      });


      // Cập nhật variantID trong variantAttributeData từ ánh xạ
      variantAttributeData.forEach((attributeData) => {
        if (variantIdMap[attributeData.variantID] !== undefined) {
          attributeData.variantID = variantIdMap[attributeData.variantID];
        }
      });

      // Lưu các thuộc tính của từng phiên bản với id thực
      await Promise.all(
        variantAttributeData.map((attributeData) =>
          addVariantAttribute(attributeData)
        )
      );
      console.log("Dữ liệu đã được lưu thành công.");
      // navigate("/products"); // Quay lại danh sách sản phẩm
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu sản phẩm:", error);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        borderRadius: 1,
        bgcolor: "rgb(249, 249, 249)",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {/* Thanh header */}
      <HeaderActions
        mode="add"
        isEditing={false}
        onGoBack={handleGoBack}
        onSave={handleSave}
        onExit={handleExit}
      />

      {/* Box chứa tiêu đề "Thêm mới sản phẩm" */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          margin: "5px 0 20px 60px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "rgb(50, 50, 50)" }}
        >
          Thêm mới sản phẩm
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          margin: "20px 100px 20px 100px",
          borderRadius: "8px",
          height: "85%",
        }}
      >
        <GeneralProduct onDataChange={updateProductData} />
        <CategoryProvider>
          <BrandProvider>
            <WarrantyProvider>
              <ProductClassification onDataChange={updateProductData} />
            </WarrantyProvider>
          </BrandProvider>
        </CategoryProvider>
      </Box>
      <Box
        sx={{
          display: "flex",
          margin: "20px 100px 20px 100px",
          borderRadius: "8px",
        }}
      >
        <Variant
          categoryId={productData.categoryId}
          productName={productData.name}
          onVariantsChange={handleVariantsChange}
          onVariantAttributesChange={handleVariantAttributesChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          margin: "20px 100px 20px 100px",
          borderRadius: "8px",
        }}
      >
        <Attribute
          categoryId={productData.categoryId}
          onAttributesChange={handleAttributesChange}
        />
      </Box>
    </Box>
  );
}
