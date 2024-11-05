import * as React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "../../components/Util/FilterDropdown";
import CustomButton from "../../components/Util/CustomButton";
import SearchBox from "../../components/Util/Search";
import { Supplier } from "../../../types/supplier";
import { searchSupplierByName } from "../../../api/supplierApi";
import { useEffect, useState } from "react";
import { Brand } from "../../../types/brand";
import { Category } from "../../../types/category";
import { getCategories } from "../../../api/categoryApi";
import { getBrands } from "../../../api/brandApi";
import { ProductWithVariants } from "../../../types/product";
import {
  getProductsWithVariants,
  getProductsWithVariantsByBrandId,
  getProductsWithVariantsByCategoryId,
  getProductsWithVariantsByName,
} from "../../../api/productApi";
import TableImport from "../../components/Import/AddImport/TableImport";
import { importDetailRequest } from "../../../types/import";
import { currencyFormatter } from "../../components/Util/Formatter";

export default function AddImportPage() {
  const navigate = useNavigate();
  const [resetFilter, setResetFilter] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  // State cho danh sách sản phẩm đã chọn
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  // State cho phiếu nhập (importRequest)
  const [importRequest, setImportRequest] = useState({
    id: 0,
    date: new Date().toISOString().slice(0, 10),
    total: 0,
    importNote: "",
    supplierId: 0,
  });

  // State cho danh sách chi tiết phiếu nhập
  const [importDetails, setImportDetails] = useState<importDetailRequest[]>([]);
  const [productWithVariants, setProductWithVariants] =
    useState<ProductWithVariants[]>();
  const [transformedProducts, setTransformedProducts] = useState<any[]>([]);
  const onGoBack = () => {
    navigate("/import");
  };

  const onSave = () => {
    console.log("Lưu");
  };

  const onCancel = () => {
    console.log("Hủy");
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const data = await getBrands();
      setBrands(data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  const CategoryOptions = categories.map((category: any) => ({
    value: category.id,
    label: category.name,
  }));

  const BrandOptions = brands.map((brand: any) => ({
    value: brand.id,
    label: brand.name,
  }));

  // Hàm lọc theo danh mục
  const handleFilterCategory = async (value: string) => {
    setLoading(true);
    try {
      const data = await getProductsWithVariantsByCategoryId(parseInt(value));
      setProductWithVariants(data || []);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm lọc theo thương hiệu
  const handleFilterBrand = async (value: string) => {
    setLoading(true);
    try {
      const data = await getProductsWithVariantsByBrandId(parseInt(value));
      setProductWithVariants(data || []);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchProductsWithVariantsByName = async (name: string) => {
    setLoading(true);
    try {
      const data = await getProductsWithVariantsByName(name);
      setProductWithVariants(data || []);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProductsWithVariants();
  }, []);

  const handleReset = () => {
    setResetFilter(true);
    setTimeout(() => setResetFilter(false), 0);
    fetchProductsWithVariants();
  };

  const fetchProductsWithVariants = async () => {
    setLoading(true);
    try {
      const data = await getProductsWithVariants();
      setProductWithVariants(data || []);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Kiểm tra nếu `productWithVariants` tồn tại
    if (!productWithVariants) return;

    // Biến đổi dữ liệu `productWithVariants` thành `transformedProducts`
    const transformed = productWithVariants.flatMap((product) =>
      product.variants.map((variant) => ({
        id: variant.id,
        image: product.image,
        variantName: variant.name,
        stock: variant.quantity,
        price:currencyFormatter.format(variant.price),
        costPrice: currencyFormatter.format(variant.costPrice),
        name: product.name,
        brandName: product.brand.name,
        categoryName: product.category.name,
      }))
    );

    setTransformedProducts(transformed);
  }, [productWithVariants]);

  const productColumns = [
    { label: "Ảnh", key: "image", isImageColumn: true },
    { label: "Phiên bản", key: "variantName" },
    { label: "Tồn kho", key: "stock" },
    { label: "Giá bán", key: "price" },
    { label: "Giá nhập", key: "costPrice" },
    { label: "Sản phẩm", key: "name" },
    { label: "Thể loại", key: "categoryName" },
    { label: "Thương hiệu", key: "brandName" },
  ];
  const handleRowClick = (product: any) => {
    console.log("Row clicked:", product);
    setSelectedProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (item) => item.variantId === product.id
      );
      if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, hiển thị thông báo
        alert("Phiên bản đã được chọn!");
        return prevProducts;
      }
      // Nếu sản phẩm chưa tồn tại, thêm vào danh sách với quantity mặc định là 1
      return [
        ...prevProducts,
        {
          variantId: product.id,
          name: product.name,
          variantName: product.variantName,
          quantity: 1,
          price: product.costPrice,
          total: product.costPrice,
        },
      ];
    });
  };

  return (
    <Box sx={{ width: "100%", p: 3, bgcolor: "rgb(249, 249, 249)" }}>
      {/* Header */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgb(255, 255, 255)",
          overflowY: "auto",
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onGoBack}
          sx={{ color: "black", textTransform: "none" }}
        >
          <Typography sx={{ fontFamily: "Roboto", fontWeight: "bold", px: 2 }}>
            Quay lại Danh Sách Phiếu Nhập
          </Typography>
        </Button>

        <Box sx={{ ml: "auto", display: "flex" }}>
          <Button
            onClick={onSave}
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              textTransform: "none",
              mr: 1,
              height: 40,
              width: 100,
              bgcolor: "rgb(25, 118, 210)",
            }}
          >
            Lưu
          </Button>
          <Button
            onClick={onCancel}
            variant="outlined"
            startIcon={<CloseIcon />}
            sx={{
              textTransform: "none",
              mr: 1,
              height: 40,
              width: 100,
              color: "rgb(255, 0, 0)",
              borderColor: "rgb(255, 0, 0)",
            }}
          >
            Hủy
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          marginTop: "20px",
          gap: 3,
          width: "100%",
          bgcolor: "white",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Left - Product List with Filters */}
        <Box sx={{ flex: 1 }}>
          {/* Search Bar */}
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Search Box */}
            <Box sx={{ flexGrow: 1 }}>
              <SearchBox
                placeholder="Nhập tên sản phẩm"
                onSearch={searchProductsWithVariantsByName} // Sử dụng hàm từ ProductContext
                resetSearch={resetFilter}
              />
            </Box>
            {/* Nút reset */}
            <Box>
              <CustomButton
                icon={<RefreshIcon />}
                text="Reset"
                onClick={handleReset}
              />
            </Box>

            {/* Loại sản phẩm Dropdown */}
            <Box sx={{ minWidth: 200 }}>
              <FilterDropdown
                label="Loại sản phẩm"
                options={CategoryOptions}
                onFilterChange={handleFilterCategory}
                resetFilter={resetFilter}
              />
            </Box>

            {/* Thương hiệu Dropdown */}
            <Box sx={{ minWidth: 200 }}>
              <FilterDropdown
                label="Thương hiệu"
                options={BrandOptions}
                onFilterChange={handleFilterBrand}
                resetFilter={resetFilter}
              />
            </Box>
          </Box>
          {/* Table */}
          <Box
            sx={{
              flex: 1,
              marginTop: "20px",
              boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
              // height: "100%",
              overflowY: "auto",
            }}
          >
            <TableContainer component={Paper}>
              <TableImport
                entities={transformedProducts} // Sử dụng mảng ProductDTOs đã chuyển đổi
                loading={loading}
                columns={productColumns}
                onRowClick={handleRowClick}
              />
            </TableContainer>
          </Box>
        </Box>
      </Box>

      {/* Bottom - Selected Products Table */}
      <Box
        sx={{
          marginTop: "20px",
          borderRadius: "10px",
          bgcolor: "white",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Sản phẩm đã chọn
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            width: "100%",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ tableLayout: "fixed", width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "30%" }}>Tên phiên bản</TableCell>
                  <TableCell sx={{ width: "15%", textAlign: "center" }}>
                    Số lượng
                  </TableCell>
                  <TableCell sx={{ width: "20%", textAlign: "center" }}>
                    Giá nhập
                  </TableCell>
                  <TableCell sx={{ width: "20%", textAlign: "center" }}>
                    Thành tiền
                  </TableCell>
                  <TableCell sx={{ width: "15%", textAlign: "center" }}>
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProducts.map((product) => (
                  <TableRow key={product.variantId}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        value={product.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 0;
                          setSelectedProducts((prevProducts) =>
                            prevProducts.map((item) =>
                              item.variantId === product.variantId
                                ? {
                                    ...item,
                                    quantity: newQuantity,
                                    total: newQuantity * item.price,
                                  }
                                : item
                            )
                          );
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: 36,
                            fontSize: 14,
                            padding: "0 8px",
                          },
                          "& .MuiInputBase-input": {
                            textAlign: "center",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#b0bec5",
                          },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#1976d2",
                            },
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ textAlign: "center" }}>
                      <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        value={currencyFormatter.format(product.price || 0)}
                        onChange={(e) => {
                          const newPrice =
                            parseFloat(e.target.value.replace(/\D/g, "")) || 0;
                          setSelectedProducts((prevProducts) =>
                            prevProducts.map((item) =>
                              item.variantId === product.variantId
                                ? {
                                    ...item,
                                    price: newPrice,
                                    total: newPrice * item.quantity,
                                  }
                                : item
                            )
                          );
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: 36,
                            fontSize: 14,
                            padding: "0 8px",
                          },
                          "& .MuiInputBase-input": {
                            textAlign: "center",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#b0bec5",
                          },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: "#1976d2",
                            },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {currencyFormatter.format(product.total || 0)}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton
                        color="error"
                        onClick={() =>
                          setSelectedProducts((prevProducts) =>
                            prevProducts.filter(
                              (item) => item.variantId !== product.variantId
                            )
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Right - Form Information */}
          <Box sx={{ width: "40%" }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Thông tin phiếu nhập
              </Typography>
              <TextField
                label="Mã phiếu nhập"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Ngày nhập"
                type="date"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Nhà cung cấp"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Ghi chú"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
              />
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
