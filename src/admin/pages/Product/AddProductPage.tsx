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
import Variant from "../../components/Product/EditVariant";
import { WarrantyProvider } from "../../../context/WarrantyContext";
import { useProductContext } from "../../../context/ProductContext";
import { Product } from "../../../types/product";
import { VariantRequest } from "../../../types/variant";
import { addProduct, checkDuplicateProductName } from "../../../api/productApi";
import { addVariant } from "../../../api/variantApi";
import { addVariantAttribute } from "../../../api/variant_attributeApi";
import { VariantAttributeRequest } from "../../../types/variant_attribute";
import LoadingSnackbar from "../../components/Util/LoadingSnackbar";
import { Add } from "@mui/icons-material";
import AddVariant from "../../components/Product/AddVariant";
export default function AddProductPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleGoBack = () => navigate("/products");

  const handleExit = () => navigate("/products");
  const { createProduct, product, fetchProductsWithVariants } =
    useProductContext();

  const [variantsData, setVariantsData] = React.useState<VariantRequest[]>([]);
  const [variantAttributesData, setVariantAttributesData] = React.useState<
    VariantAttributeRequest[]
  >([]);

  const [commonAttributesData, setCommonAttributesData] = useState<
    VariantAttributeRequest[]
  >([]); // Thông số kỹ thuật chung

  // Hàm callback để nhận thông số kỹ thuật từ Attribute component
  const handleAttributesChange = (attributes: VariantAttributeRequest[]) => {
    setCommonAttributesData(attributes);
  };

  const handleAddVariant = (
    variant: VariantRequest,
    attributes: VariantAttributeRequest[]
  ) => {
    setVariantsData((prev) => [...prev, variant]);
    setVariantAttributesData((prev) => [...prev, ...attributes]);
  };

  const handleUpdateVariantList = (
    updatedVariants: VariantRequest[],
    updatedAttributes: VariantAttributeRequest[][]
  ) => {
    setVariantsData(updatedVariants);
    setVariantAttributesData(updatedAttributes.flat()); // Flatten attributes array to a single level array
  };
  const handleSave = async () => {
    setLoading(true);
    try {
      if (!product) throw new Error("Product data is undefined");
  // Kiểm tra xem tên sản phẩm có trống không
  if (!product || !product.name.trim()) {
    alert("Tên sản phẩm không được để trống!");
    setLoading(false);
    return;
  }

  // Kiểm tra xem thể loại có trống không
  if (!product || product.categoryId === 0) {
    alert("Chưa chọn thể loại!");
    setLoading(false);
    return;
  }

  // kiểm tra thương hiệu có trống không
  if (!product || product.brandId === 0) {
    alert("Chưa chọn thương hiệu!");
    setLoading(false);
    return;
  }

  // kiểm tra chính sách bảo hành 
  if (!product || product.warrantyId === 0) {
    alert("Chưa chọn chính sách bảo hành!");
    setLoading(false);
    return;
  }
  // Kiểm tra xem có ít nhất một phiên bản không
  if (variantsData.length === 0) {
    alert("Phải có ít nhất một phiên bản sản phẩm!");
    setLoading(false);
    return;
  }

  // Kiểm tra xem tên sản phẩm đã tồn tại chưa
  const isNameExists = await checkDuplicateProductName(product.name, product.id);
  if (isNameExists) {
    alert("Tên sản phẩm đã tồn tại!");
    setLoading(false);
    return;
  }
      const savedProduct = await createProduct(product);
      const productId = savedProduct.id;

      // Lưu từng phiên bản và nhận danh sách các id thật của chúng
      const savedVariants = await Promise.all(
        variantsData.map((variant) => addVariant({ ...variant, productId }))
      );

      // Ánh xạ id tạm của các phiên bản thành id thật từ `savedVariants`
      const variantIdMap = variantsData.reduce((map, variant, index) => {
        map[variant.id] = savedVariants[index].id;
        return map;
      }, {} as { [tempId: number]: number });

      // Cập nhật variantAttributesData với variantId chính xác và thêm thông số kỹ thuật chung
      const updatedVariantAttributesData = [
        ...variantAttributesData.map((attribute) => ({
          ...attribute,
          variantId: variantIdMap[attribute.variantId], // Thay variantId tạm bằng variantId thật
        })),
        ...savedVariants.flatMap((variant) =>
          commonAttributesData.map((commonAttr) => ({
            variantId: variant.id,
            attributeId: commonAttr.attributeId,
            value: commonAttr.value,
          }))
        ),
      ];

      // Lưu các thuộc tính phiên bản vào cơ sở dữ liệu
      await Promise.all(
        updatedVariantAttributesData.map((attribute) =>
          addVariantAttribute(attribute)
        )
      );
      await fetchProductsWithVariants(); 
      showSnackbar("Thêm sản phẩm thành công!");
      
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu sản phẩm:", error);
      showSnackbar("Thêm sản phẩm thất bại!");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };
  const showSnackbar = (message: string) => {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);
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
          height: "60%",
        }}
      >
        <GeneralProduct isEditMode={true} />
        <CategoryProvider>
          <BrandProvider>
            <WarrantyProvider>
              <ProductClassification />
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
        <AddVariant
          productName={product?.name ?? ""}
          productCategoryId={product?.categoryId ?? 0}
          onAddVariant={handleAddVariant}
          onUpdateVariantList={handleUpdateVariantList}
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
          categoryId={product?.categoryId ?? null}
          onAttributesChange={handleAttributesChange}
        />
      </Box>
      <LoadingSnackbar
        loading={loading}
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}
