// src/admin/pages/EditProductPage.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HeaderActions from "../../components/Product/HeaderActions";
import GeneralProduct from "../../components/Product/GeneralProduct";
import ProductClassification from "../../components/Product/ProductClassification";
import Attribute from "../../components/Product/Attribute";
import Variant from "../../components/Product/Variant";
import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../../../context/ProductContext";
import { VariantRequest } from "../../../types/variant";
import { VariantAttributeRequest } from "../../../types/variant_attribute";
import LoadingSnackbar from "../../components/Util/LoadingSnackbar";
import { deleteProduct, getProductById, updateProduct } from "../../../api/productApi";
import { CategoryProvider } from "../../../context/CategoryContext";
import { BrandProvider } from "../../../context/BrandContex";
import { WarrantyProvider } from "../../../context/WarrantyContext";

export default function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
  const [isEditing, setIsEditing] = React.useState(false);
  const { product, setProductData } = useProductContext();
  const [loading, setLoading] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [variantsData, setVariantsData] = React.useState<VariantRequest[]>([]);
  const [attributesData, setAttributesData] = React.useState<
    { attributeId: number; value: string }[]
  >([]);
  const [variantAttributeData, setVariantAttributeData] = React.useState<
    VariantAttributeRequest[]
  >([]);

  // Load product data when the page loads
  React.useEffect(() => {
    if (id) {
      setLoading(true);
      getProductById(Number(id))
        .then((data) => {
          setProductData(data); // Load product into context
          setVariantsData(data.variants || []);
          setAttributesData(data.attributes || []);
          setVariantAttributeData(data.variantAttributes || []);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          showSnackbar("Failed to load product!");
        })
        .finally(() => setLoading(false));
    }
  }, [id, setProductData]);

  // Handle save updates
  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProduct(Number(id), { ...product, variants: variantsData, attributes: attributesData });
      showSnackbar("Product updated successfully!");
      setIsEditing(false);
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
      showSnackbar("Product deleted successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      showSnackbar("Failed to delete product!");
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
          {isEditing ? "Edit Product" : "Product Details"}
        </Typography>
      </Box>

      {/* Main Form Sections */}
      <Box sx={{ display: "flex", margin: "20px 100px 20px 100px", borderRadius: "8px", height: "85%" }}>
        <GeneralProduct isEditing={isEditing} /> {/* Pass isEditing prop */}
        <CategoryProvider>
          <BrandProvider>
            <WarrantyProvider>
              <ProductClassification isEditing={isEditing} />
            </WarrantyProvider>
          </BrandProvider>
        </CategoryProvider>
      </Box>

      <Box sx={{ display: "flex", margin: "20px 100px 20px 100px", borderRadius: "8px" }}>
        <Variant
          isEditing={isEditing}
          categoryId={product?.categoryId ?? null}
          productName={product?.name ?? ""}
          variants={variantsData}
          onVariantsChange={setVariantsData}
          onVariantAttributesChange={setVariantAttributeData}
        />
      </Box>

      <Box sx={{ display: "flex", margin: "20px 100px 20px 100px", borderRadius: "8px" }}>
        <Attribute
          isEditing={isEditing}
          categoryId={product?.categoryId ?? null}
          attributes={attributesData}
          onAttributesChange={setAttributesData}
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
