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
import { getProductsWithVariants } from "../../../api/productApi";
import TableImport from "../../components/Import/AddImport/TableImport";

export default function AddImportPage() {
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate("/import");
  };

  const onSave = () => {
    console.log("Lưu");
  };

  const onCancel = () => {
    console.log("Hủy");
  };

  const [loading, setLoading] = React.useState(true);
  // Tạo các tùy chọn cho dropdown từ categories và brands
  const [categories, setCategories] = useState<Category[]>([]);
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
  const CategoryOptions = categories.map((category: any) => ({
    value: category.id,
    label: category.name,
  }));
  const [brands, setBrands] = useState<Brand[]>([]);
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
  const BrandOptions = brands.map((brand: any) => ({
    value: brand.id,
    label: brand.name,
  }));
  // Hàm lọc theo danh mục
  const handleFilterCategory = (value: string) => {};

  // Hàm lọc theo thương hiệu
  const handleFilterBrand = (value: string) => {};

  const searchProductsWithVariantsByName = (name: string) => {};
  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProductsWithVariants();
  }, []);

  const [resetFilter, setResetFilter] = React.useState(false);

  const handleReset = () => {
    setResetFilter(true);
    setTimeout(() => setResetFilter(false), 0);
  };
  const [productWithVariants, setProductWithVariants] =
    useState<ProductWithVariants[]>();
  const [transformedProducts, setTransformedProducts] = useState<any[]>([]);
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
    const transformed = productWithVariants.map((product) => {
      // Tính tổng tồn kho bằng cách cộng dồn `quantity` của các `variants`
      const stock = product.variants.reduce(
        (total, variant) => total + variant.quantity,
        0
      );
      const variantCount = product.variants.length;

      return {
        id: product.id,
        image: `${product.image}`,
        name: product.name,
        stock: stock,
        brandName: product.brand.name,
        categoryName: product.category.name,
      };
    });

    setTransformedProducts(transformed);
  }, [productWithVariants]);
  const productColumns = [
    { label: "Ảnh", key: "image", isImageColumn: true },
    { label: "Phiên bản", key: "nameVariant" },
    { label: "Tồn kho", key: "stock" },
    { label: "Sản phẩm", key: "nameProduct" },
    { label: "Thể loại", key: "categoryName" },
    { label: "Thương hiệu", key: "brandName" },
  ];
  const handleRowClick = (product: any) => {};
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
        <Box sx={{  padding: "20px"}}>
        <Typography variant="h6" gutterBottom >
          Sản phẩm đã chọn
        </Typography>
        </Box>
       
        <Box sx={{ display: "flex", gap: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Giá nhập</TableCell>
                  <TableCell>Thành tiền</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Placeholder row for selected products */}
                <TableRow>
                  <TableCell>Điện thoại A</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      defaultValue={1}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      defaultValue={1000}
                    />
                  </TableCell>
                  <TableCell>1000</TableCell>
                  <TableCell>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
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
