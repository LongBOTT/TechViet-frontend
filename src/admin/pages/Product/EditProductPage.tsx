// src/admin/pages/EditProductPage.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HeaderActions from "../../components/Product/HeaderActions";
import GeneralProduct from "../../components/Product/GeneralProduct";
import ProductClassification from "../../components/Product/ProductClassification";
import Attribute from "../../components/Product/Attribute";
import Variant from "../../components/Product/EditVariant";
import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductContext";
import { VariantRequest } from "../../../types/variant";
import { VariantAttributeRequest } from "../../../types/variant_attribute";
import LoadingSnackbar from "../../components/Util/LoadingSnackbar";
import {
  deleteProduct,
  getProductWithVariantsAndAttribute,
  updateProduct,
} from "../../../api/productApi";
import { CategoryProvider } from "../../../context/CategoryContext";
import { BrandProvider } from "../../../context/BrandContex";
import { WarrantyProvider } from "../../../context/WarrantyContext";
import {
  Product,
  ProductRequest,
  ProductWithVariants,
} from "../../../types/product";
import GeneralProductEdit from "../../components/Product/GeneralProductEdit";
import EditVariant from "../../components/Product/EditVariant";
import EditAttribute from "../../components/Product/EditAttribute";
import { addVariant, deleteVariantByProduct } from "../../../api/variantApi";
import ProductClassificationEdit from "../../components/Product/ProductClassificationEdit";
import { addVariantAttribute } from "../../../api/variant_attributeApi";

export default function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
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
  const [commonAttributesData, setCommonAttributesData] = React.useState<VariantAttributeRequest[]>([]);

  const [productData, setProductData] =
    React.useState<ProductWithVariants | null>(null);

  // Hàm chuyển đổi từ API response sang ProductRequest
function transformProductDataToRequests(productData: ProductWithVariants) {
  // Chuyển đổi ProductData thành ProductRequest
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

  // Chuyển đổi các variants thành VariantRequest[]
  const variantRequests: VariantRequest[] = productData.variants.map(
    (variant) => ({
      id: variant.id,
      name: variant.name,
      image: variant.image,
      quantity: variant.quantity,
      costPrice: variant.costPrice,
      price: variant.price,
      productId: productData.id,
    })
  );

  // Tách các attributes thành hai mảng: VariantAttributeData và CommonAttributesData
  const variantAttributeData: VariantAttributeRequest[][] = [];
  let commonAttributesData: VariantAttributeRequest[] = [];

  // Lặp qua từng phiên bản để phân loại thuộc tính
  productData.variants.forEach((variant, index) => {
    const variantAttributes: VariantAttributeRequest[] = [];
    const commonAttributes: VariantAttributeRequest[] = [];

    variant.attributes.forEach((attribute) => {
      if (attribute.attribute.id === 3 || (productData.category.id === 1 && attribute.attribute.id === 24)) {
        // Thuộc tính phân biệt phiên bản (màu sắc hoặc dung lượng nếu là điện thoại)
        variantAttributes.push({
          variantId: variant.id,
          attributeId: attribute.attribute.id,
          value: attribute.value,
        });
      } else {
        // Thuộc tính thông số kỹ thuật chung
        commonAttributes.push({
          variantId: variant.id,
          attributeId: attribute.attribute.id,
          value: attribute.value,
        });
      }
    });

    // Chỉ cần lấy thông số kỹ thuật chung của một phiên bản duy nhất
    if (index === 0) {
      commonAttributesData = commonAttributes;
    }

    variantAttributeData.push(variantAttributes);
  });

  return { productRequest, variantRequests, variantAttributeData, commonAttributesData };
}
  // Load product data when the page loads
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
          
          setProduct(productRequest); // Cập nhật dữ liệu sản phẩm
          setVariantsData(variantRequests); // Cập nhật dữ liệu biến thể
          setVariantAttributeData(variantAttributeData); // Cập nhật thuộc tính phân biệt phiên bản
          setCommonAttributesData(commonAttributesData); // Cập nhật thông số kỹ thuật chung
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          showSnackbar("Failed to load product!");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

   // Hàm xử lý khi lưu các thay đổi của thông số kỹ thuật
   const handleAttributesChange = (updatedAttributes: VariantAttributeRequest[][]) => {
    setVariantAttributeData(updatedAttributes);
  };
  // Hàm cập nhật danh sách các phiên bản
  const handleUpdateVariantList = (
    updatedVariants: VariantRequest[],
    updatedAttributes: VariantAttributeRequest[][]
  ) => {
    setVariantsData(updatedVariants);
    setVariantAttributeData(updatedAttributes); // Cập nhật thuộc tính của biến thể
  };
  // Handle save updates
  const handleSave = async () => {
    setLoading(true);
    try {
      if (!product) throw new Error("Product data is undefined");
      await updateProduct(product.id, product);

      // Xóa tất cả phiên bản và thuộc tính hiện có
      await deleteVariantByProduct(product.id);

      // Thêm lại các phiên bản mới và lưu lại id của phiên bản mới
      const savedVariants = await Promise.all(
        variantsData.map((variant) => addVariant({ ...variant, productId: product.id }))
      );

      const variantIdMap = variantsData.reduce((map, variant, index) => {
        map[variant.id] = savedVariants[index].id;
        return map;
      }, {} as { [tempId: number]: number });

      // Thêm thuộc tính của phiên bản và thông số kỹ thuật chung
      const updatedVariantAttributesData = [
        ...variantAttributeData.flat().map((attribute) => ({
          ...attribute,
          variantId: variantIdMap[attribute.variantId],
        })),
        ...savedVariants.flatMap((variant) =>
          commonAttributesData.map((commonAttr) => ({
            variantId: variant.id,
            attributeId: commonAttr.attributeId,
            value: commonAttr.value,
          }))
        ),
      ];

      await Promise.all(updatedVariantAttributesData.map((attribute) => addVariantAttribute(attribute)));
      showSnackbar("Sửa sản phẩm thành công!");
    } catch (error) {
      console.error("Error updating product:", error);
      showSnackbar("Failed to update product!");
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProduct(Number(id));
      showSnackbar("Sản phẩm đã được xóa!");
      navigate("/products");
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
        onGoBack={() => navigate("/products")}
        onSave={handleSave}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onExit={() => navigate("/products")}
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

      {/* Main Form Sections */}
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
        {/* Gọi component EditVariant */}
        <EditVariant
          productName={product?.name ?? ""}
          productCategoryId={product?.categoryId ?? 0}
          initialVariants={variantsData}
          initialAttributes={variantAttributeData}
          onUpdateVariantList={handleUpdateVariantList}
        />
      </Box>

      {<Box sx={{ display: "flex", margin: "20px 100px 20px 100px", borderRadius: "8px" }}>
      <EditAttribute
        categoryId={product?.categoryId ?? null}
        initialAttributes={variantAttributeData}
        onAttributesChange={handleAttributesChange}
      /> 
      </Box>  }

      <LoadingSnackbar
        loading={loading}
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}
