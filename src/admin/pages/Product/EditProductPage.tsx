// src/admin/pages/EditProductPage.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HeaderActions from "../../components/Product/HeaderActions";
import GeneralProductEdit from "../../components/Product/GeneralProductEdit";
import ProductClassificationEdit from "../../components/Product/ProductClassificationEdit";
import EditVariant from "../../components/Product/EditVariant";
import EditAttribute from "../../components/Product/EditAttribute";
import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductContext";
import { VariantRequest } from "../../../types/variant";
import { VariantAttributeRequest } from "../../../types/variant_attribute";
import LoadingSnackbar from "../../components/Util/LoadingSnackbar";
import {
  checkDuplicateProductName,
  deleteProduct,
  getProductWithVariantsAndAttribute,
  searchProductByName,
  updateProduct,
  updateProductStatus,
} from "../../../api/productApi";
import { CategoryProvider } from "../../../context/CategoryContext";
import { BrandProvider } from "../../../context/BrandContex";
import { WarrantyProvider } from "../../../context/WarrantyContext";
import { ProductRequest, ProductWithVariants } from "../../../types/product";
import {
  addVariant,
  deleteVariant,
  deleteVariantByProduct,
  updateVariant,
} from "../../../api/variantApi";
import {
  addVariantAttribute,
  deleteVariantAttributes,
} from "../../../api/variant_attributeApi";

export default function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = React.useState(false);
  const { productWithVariants } = useProductContext();
  const [loading, setLoading] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [product, setProduct] = React.useState<ProductRequest>();
  const [variantsData, setVariantsData] = React.useState<VariantRequest[]>([]);
  const [variantAttributeData, setVariantAttributeData] = React.useState<
    VariantAttributeRequest[][]
  >([]);
  const [commonAttributesData, setCommonAttributesData] = React.useState<
    VariantAttributeRequest[]
  >([]);

  const [updatedVariants, setUpdatedVariants] = React.useState<
    VariantRequest[]
  >([]);
  const [updatedVariantAttributes, setUpdatedVariantAttributes] =
    React.useState<VariantAttributeRequest[][]>([]);

  // Hàm chuyển đổi từ API response sang ProductRequest
  function transformProductDataToRequests(productData: ProductWithVariants) {
    const productRequest: ProductRequest = {
      id: productData.id,
      name: productData.name,
      description: productData.description,
      weight: productData.weight,
      unit: productData.unit,
      categoryId: productData.category.id,
      brandId: productData.brand.id,
      warrantyId: productData.warranty.id,
      image: productData.image,
      status: productData.status,
    };

    const variantRequests: VariantRequest[] = productData.variants.map(
      (variant) => ({
        id: variant.id,
        name: variant.name,
        image: variant.image,
        quantity: variant.quantity,
        costPrice: variant.costPrice,
        price: variant.price,
        productId: productData.id,
        status: variant.status,
      })
    );

    const variantAttributeData: VariantAttributeRequest[][] = [];
    let commonAttributesData: VariantAttributeRequest[] = [];

    productData.variants.forEach((variant, index) => {
      const variantAttributes: VariantAttributeRequest[] = [];
      const commonAttributes: VariantAttributeRequest[] = [];

      variant.attributes.forEach((attribute) => {
        if (
          attribute.attribute.id === 3 ||
          (productData.category.id === 1 && attribute.attribute.id === 24)
        ) {
          variantAttributes.push({
            variantId: variant.id,
            attributeId: attribute.attribute.id,
            value: attribute.value,
          });
        } else {
          commonAttributes.push({
            variantId: variant.id,
            attributeId: attribute.attribute.id,
            value: attribute.value,
          });
        }
      });

      if (index === 0) {
        commonAttributesData = commonAttributes;
      }

      variantAttributeData.push(variantAttributes);
    });

    return {
      productRequest,
      variantRequests,
      variantAttributeData,
      commonAttributesData,
    };
  }

  React.useEffect(() => {
    if (id) {
      setLoading(true);
      getProductWithVariantsAndAttribute(Number(id))
        .then((data) => {
          const {
            productRequest,
            variantRequests,
            variantAttributeData,
            commonAttributesData,
          } = transformProductDataToRequests(data);
          setProduct(productRequest);
          setVariantsData(variantRequests);
          setVariantAttributeData(variantAttributeData);
          setCommonAttributesData(commonAttributesData);
          setUpdatedVariants(variantRequests);
          setUpdatedVariantAttributes(variantAttributeData);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          showSnackbar("Failed to load product!");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleAttributesChange = (
    updatedAttributes: VariantAttributeRequest[]
  ) => {
    setCommonAttributesData(updatedAttributes);
  };

  const handleUpdateVariantList = (
    variants: VariantRequest[],
    attributes: VariantAttributeRequest[][]
  ) => {
    setUpdatedVariants(variants);
    setUpdatedVariantAttributes(attributes);
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

      // Kiểm tra xem tên sản phẩm đã tồn tại chưa
      const isNameExists = await checkDuplicateProductName(
        product.name,
        product.id
      );
      if (isNameExists) {
        alert("Tên sản phẩm đã tồn tại!");
        setLoading(false);
        return;
      }
      // Bước 1: Cập nhật thông tin sản phẩm
      await updateProduct(product.id, product);

      // Cập nhật, thêm, hoặc xóa các biến thể
      const newVariants = updatedVariants.filter(
        (variant) => !variantsData.some((v) => v.id === variant.id)
      );
      console.log("New variants to add:", newVariants);

      const variantsToUpdate = updatedVariants.filter((variant) =>
        variantsData.some((v) => v.id === variant.id)
      );
      console.log("Variants to update:", variantsToUpdate);

      const variantIdsToDelete = variantsData
        .filter((v) => !updatedVariants.some((updated) => updated.id === v.id))
        .map((v) => v.id);
      console.log("Variant IDs to delete:", variantIdsToDelete);

      // // Cập nhật, thêm mới, xóa biến thể
      // Thêm mới và cập nhật `id` thực
      for (const variant of newVariants) {
        const response = await addVariant(variant); 
        const realId = response.id;

        // Cập nhật lại `id` thực trong `updatedVariants` và `updatedVariantAttributes`
        variant.id = realId;
        const attributeIndex = updatedVariants.findIndex(
          (v) => v.id === variant.id
        );
        if (attributeIndex !== -1) {
          updatedVariants[attributeIndex].id = realId;
          updatedVariantAttributes[attributeIndex].forEach((attr) => {
            attr.variantId = realId;
          });
        }
      }
      for (const variant of variantsToUpdate) {
        await updateVariant(variant.id, variant);
      }
      for (const id of variantIdsToDelete) {
        await deleteVariant(id);
      }

      // Cập nhật các thuộc tính kỹ thuật cho từng phiên bản
      for (let i = 0; i < updatedVariantAttributes.length; i++) {
        const variantId = updatedVariants[i].id;
        await deleteVariantAttributes(Number(variantId));

        // Thêm các thuộc tính đặc thù của phiên bản
        for (const attr of updatedVariantAttributes[i]) {
          await addVariantAttribute(attr);
        }

        // Thêm các thông số kỹ thuật chung
        for (const commonAttr of commonAttributesData) {
          const attributeToAdd = {
            ...commonAttr,
            variantId, // Gắn variantId hiện tại
          };
          await addVariantAttribute(attributeToAdd);
        }
      }

      showSnackbar("Cập nhật sản phẩm thành công!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
      showSnackbar("Failed to update product!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await updateProductStatus(Number(id));
      alert("Xóa sản phẩm thành công!");
      navigate("/Admin/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      showSnackbar("Xóa sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
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
      <HeaderActions
        mode="edit"
        isEditing={isEditing}
        onGoBack={() => navigate("/Admin/products")}
        onSave={handleSave}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onExit={() => navigate("/Admin/products")}
      />

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
          {product ? product.name : "Loading..."}
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
        <GeneralProductEdit
          isEditMode={isEditing}
          product={product ?? ({} as ProductRequest)}
          onProductChange={setProduct}
        />
        <CategoryProvider>
          <BrandProvider>
            <WarrantyProvider>
              {product && (
                <ProductClassificationEdit
                  initialCategory={product?.categoryId.toString()}
                  initialBrand={product?.brandId.toString()}
                  initialWarranty={product?.warrantyId.toString()}
                  product={product}
                  onProductChange={setProduct}
                />
              )}
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
        <EditVariant
          productId={Number(id)}
          productName={product?.name ?? ""}
          productCategoryId={product?.categoryId ?? 0}
          initialVariants={variantsData}
          initialAttributes={variantAttributeData}
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
        <EditAttribute
          categoryId={product?.categoryId ?? null}
          initialAttributes={commonAttributesData}
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
