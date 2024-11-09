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
import { addVariant, deleteVariantByProduct } from "../../../api/variantApi";
import { addVariantAttribute } from "../../../api/variant_attributeApi";

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
          console.log("commonAttributes Data :", commonAttributesData);
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
    updatedVariants: VariantRequest[],
    updatedAttributes: VariantAttributeRequest[][]
  ) => {
    setVariantsData(updatedVariants);
    setVariantAttributeData(updatedAttributes);
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

      // Bước 2: Xóa tất cả các phiên bản của sản phẩm trước khi thêm lại
      await deleteVariantByProduct(product.id);

      // Bước 3: Thêm lại các phiên bản trong `variantsData`
      const savedVariants = await Promise.all(
        variantsData.map((variant) =>
          addVariant({ ...variant, productId: product.id })
        )
      );

      // Tạo bản đồ ID tạm -> ID thực sau khi thêm
      const variantIdMap = variantsData.reduce((map, variant, index) => {
        map[variant.id] = savedVariants[index].id;
        return map;
      }, {} as { [tempId: number]: number });

      // Bước 4: Cập nhật `variantAttributeData` với ID chính xác cho các thuộc tính của từng phiên bản
      const updatedVariantAttributesData = [
        // Cập nhật thuộc tính riêng của từng phiên bản
        ...variantAttributeData.flatMap((attributeGroup) =>
          attributeGroup.map((attribute) => ({
            ...attribute,
            variantId: variantIdMap[attribute.variantId], // Đổi từ ID tạm sang ID thực
          }))
        ),
        // Thêm các thông số kỹ thuật chung cho tất cả các phiên bản
        ...savedVariants.flatMap((variant) =>
          commonAttributesData.map((commonAttr) => ({
            variantId: variant.id,
            attributeId: commonAttr.attributeId,
            value: commonAttr.value,
          }))
        ),
      ];

      // Bước 5: Lưu lại tất cả thuộc tính và thông số kỹ thuật của phiên bản vào cơ sở dữ liệu
      await Promise.all(
        updatedVariantAttributesData.map((attribute) =>
          addVariantAttribute(attribute)
        )
      );

      // Cập nhật trạng thái
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
