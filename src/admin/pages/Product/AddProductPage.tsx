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
import { addProduct } from "../../../api/productApi";
import { addVariant } from "../../../api/variantApi";
import { addVariantAttribute } from "../../../api/variant_attributeApi";
import { VariantAttributeRequest } from "../../../types/variant_attribute";
import LoadingSnackbar from "../../components/Util/LoadingSnackbar";
import { Add } from "@mui/icons-material";
import AddVariant from "../../components/Product/AddVariant";
export default function AddProductPage() {

  // Dữ liệu giả để kiểm tra
const productName = "iPhone15";
const productCategory = "Điện thoại";

// Dữ liệu giả cho các phiên bản
// const variantsData = [
//   {
//     id: 1,
//     name: "iPhone15-xanh-64GB",
//     image: "https://via.placeholder.com/50",
//     quantity: 100,
//     available: 80,
//     price: 1200,
//     costPrice: 1000,
//     productId: 1,
//     status: "active",
//   },
//   {
//     id: 2,
//     name: "iPhone15-lục-128GB",
//     image: "https://via.placeholder.com/50",
//     quantity: 50,
//     available: 40,
//     price: 1300,
//     costPrice: 1100,
//     productId: 1,
//     status: "active",
//   },
// ];

// // Dữ liệu giả cho thuộc tính của các phiên bản
// const variantAttributesData = [
//   {
//     variantId: 1,
//     attributeId: 1, // Giả sử 1 là ID cho thuộc tính màu sắc
//     value: "xanh",
//   },
//   {
//     variantId: 1,
//     attributeId: 2, // Giả sử 2 là ID cho thuộc tính dung lượng
//     value: "64GB",
//   },
//   {
//     variantId: 2,
//     attributeId: 1,
//     value: "lục",
//   },
//   {
//     variantId: 2,
//     attributeId: 2,
//     value: "128GB",
//   },
// ];
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleGoBack = () => navigate("/products");

  const handleExit = () => navigate("/products");
  const { createProduct, product } = useProductContext();

  const [variantsData, setVariantsData] = React.useState<VariantRequest[]>([]);
  const [variantAttributesData, setVariantAttributesData] = React.useState<VariantAttributeRequest[]>([]);
  // const [variantAttributeData, setVariantAttributeData] = useState<
  //   VariantAttributeRequest[]
  // >([]);

  // Tạo các callback để chỉ được gọi khi cần thiết
  // const handleVariantsChange = useCallback((variants: VariantRequest[]) => {
  //   setVariantsData(variants);
  // }, []);
  // const handleVariantAttributesChange = useCallback(
  //   (attributes: VariantAttributeRequest[]) => {
  //     setVariantAttributeData(attributes);
  //   },
  //   []
  // );
  // thông số kĩ thuật
  // const handleAttributesChange = (
  //   attributes: { attributeId: number; value: string }[]
  // ) => {
  //   setAttributesData(attributes);
  // };
  const handleAddVariant = (variant: VariantRequest, attributes: VariantAttributeRequest[]) => {
    setVariantsData((prev) => [...prev, variant]);
    setVariantAttributesData((prev) => [...prev, ...attributes]);
  };

  const handleUpdateVariantList = (updatedVariants: VariantRequest[], updatedAttributes: VariantAttributeRequest[][]) => {
    setVariantsData(updatedVariants);
    setVariantAttributesData(updatedAttributes.flat()); // Flatten attributes array to a single level array
  };
  const handleSave = async () => {
    // setLoading(true);
    // try {
    //   // Step 1: Lưu sản phẩm vào cơ sở dữ liệu và lấy productId
    //   if (!product) {
    //     throw new Error("Product data is undefined");
    //   }
    //   const savedProduct = await createProduct(product); // Gọi API để lưu productData vào bảng 'product'
    //   const productId = savedProduct.id; // Lấy productId trả về từ server
    //   // console.log("id san pham: ", productId);
    //   console.log("Danh sách variant: ", variantsData);
    //   // Step 2: Lưu từng phiên bản của sản phẩm

    //   const savedVariants = await Promise.all(
    //     variantsData.map(
    //       (variant) => addVariant({ ...variant, productId }) // Gán productId đúng trước khi lưu
    //     )
    //   );
    //   // console.log("Danh sách phiên bản đã lưu: ", savedVariants);

    //   // Step 3: Lưu các thông số kỹ thuật vào variant_attribute chỉ cho phiên bản đầu tiên
    //   if (savedVariants.length > 0) {
    //     const minVariantId = Math.min(
    //       ...savedVariants.map((variant) => variant.id)
    //     );
    //     // Lấy variantId của phiên bản đầu tiên
    //     console.log("id phien ban dau tien: ", minVariantId);

    //     const variantAttributes = attributesData.map((attribute) => ({
    //       variantId: minVariantId,
    //       attributeId: attribute.attributeId,
    //       value: attribute.value,
    //     }));
    //     console.log("Danh sách thuộc tính của phiên bản : ", variantAttributes);
    //     // Gọi API để lưu các variant_attributes vào cơ sở dữ liệu
    //     const list = await Promise.all(
    //       variantAttributes.map((attributeData) =>
    //         addVariantAttribute(attributeData)
    //       )
    //     );
    //     // console.log("danh sach thuoc tinh da luu vao database", list);
    //   }

    //   // Step 4: Lưu các thuộc tính tạo nên phiên bản cho từng phiên bản trong savedVariants
    //   // Tạo ánh xạ giữa id tạm và id thật
    //   const variantIdMap: { [key: number]: number } = {};
    //   variantsData.forEach((variant, index) => {
    //     variantIdMap[variant.id] = savedVariants[index].id;
    //   });

    //   // Cập nhật variantID trong variantAttributeData từ ánh xạ
    //   variantAttributeData.forEach((attributeData) => {
    //     if (variantIdMap[attributeData.variantId] !== undefined) {
    //       attributeData.variantId = variantIdMap[attributeData.variantId];
    //     }
    //   });
    //   // console.log(
    //   //   "Danh sách thuộc tính của từng phiên bản : ",
    //   //   variantAttributeData
    //   // );
    //   // Lưu các thuộc tính của từng phiên bản với id thực
    //   await Promise.all(
    //     variantAttributeData.map((attributeData) =>
    //       addVariantAttribute(attributeData)
    //     )
    //   );
    //   showSnackbar("Thêm sản phẩm thành công!");

    // } catch (error) {
    //   console.error("Lỗi khi lưu dữ liệu sản phẩm:", error);
    //   showSnackbar("Thêm sản phẩm thất bại!");
    // } finally {
    //   setTimeout(() => setLoading(false), 1000);
    // }
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
        <GeneralProduct isEditMode />
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
          productName="iPhone"
          productCategoryId={1}
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
        {/* <Attribute
          categoryId={product?.categoryId ?? null}
          onAttributesChange={handleAttributesChange}
        /> */}
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
