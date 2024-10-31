import * as React from "react";
import Box from "@mui/material/Box";
import SearchBox from "../Util/Search";
import { Paper, TableContainer } from "@mui/material";
import EntityTable from "../Util/EntityTable";
import { useProductContext } from "../../../context/ProductContext";
import FilterDropdown from "../Util/FilterDropdown";
import { useCategoryContext } from "../../../context/CategoryContext";
import { useBrandContext } from "../../../context/BrandContex";
import { useState, useEffect } from "react";
import CustomButton from "../Util/CustomButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import { ProductDTO } from "../../../types/product";
import { searchVariantByProduct } from "../../../api/variantApi";

const AllProducts: React.FC = () => {
  const {
    products,
    loading,
    searchProductsByName,
    searchProductByCategoryId,
  } = useProductContext(); // Lấy dữ liệu và hàm từ ProductContext

  const navigate = useNavigate();
  const { categories } = useCategoryContext();
  const { brands } = useBrandContext();
  
  const [transformedProducts, setTransformedProducts] = useState<any[]>([]);
 
  useEffect(() => {
    const fetchTransformedProducts = async () => {
      const transformed = await Promise.all(
        products.map(async (product) => {
          // Fetch variants and calculate total stock
          const variants = (await searchVariantByProduct(product.id+"")) || []; // Default to empty array if undefined
          const stock = variants.reduce((total, variant) => total + (variant.quantity || 0), 0); // Sum quantity with default to 0
  
          return {
            ...product,
            stock, // Total quantity
            categoryName: product.category.name, // Add category name
            brandName: product.brand.name,       // Add brand name
            warrantyName: product.warranty.name, // Add warranty name
          };
        })
      );
      
      setTransformedProducts(transformed);
    };
  
    fetchTransformedProducts();
  }, [products]);
  
  

  // Tạo các tùy chọn cho dropdown từ categories và brands
  const CategoryOptions = categories.map((category: any) => ({
    value: category.id,
    label: category.name,
  }));

  const BrandOptions = brands.map((brand: any) => ({
    value: brand.id,
    label: brand.name,
  }));

  const StatusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Đang giao dịch" },
    { value: "inactive", label: "Ngưng giao dịch" },
  ];
 
  // Cấu trúc cột cho bảng sản phẩm
  const productColumns = [
    { label: "Ảnh", key: "image" },
    { label: "Sản phẩm", key: "name" },
    { label: "Tồn kho", key: "stock" },
    { label: "Có thể bán", key: "available" },
    { label: "Thể loại", key: "categoryName" }, // Sử dụng `categoryName`
    { label: "Thương hiệu", key: "brandName" },  // Sử dụng `brandName`
    { label: "Trạng thái", key: "status" },
  ];

  // Xử lý khi người dùng bấm vào hàng sản phẩm
  const handleRowClick = (product: any) => {
    console.log("Row clicked:", product);
    navigate(`/EditProduct/${product.id}` ); // Chuyển hướng đến trang chỉnh sửa sản phẩm
  };

  // Trạng thái đặt lại bộ lọc
  const [resetFilter, setResetFilter] = useState(false);

  // Xử lý đặt lại bộ lọc
  const handleReset = () => {
    setResetFilter(true);
    setTimeout(() => setResetFilter(false), 0);
  };

  // Hàm lọc theo danh mục
  const handleFilterCategory = (value: string) => {
    searchProductByCategoryId(parseInt(value)); // Sử dụng hàm từ ProductContext
  };

  // Hàm lọc theo thương hiệu
  const handleFilterBrand = (value: string) => {
    console.log("Filtering by brand:", value);
  };

  // Hàm lọc theo trạng thái
  const handleFilterStatus = (value: string) => {
    console.log("Filtering by status:", value);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "auto",
      }}
    >
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
            placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm"
            onSearch={searchProductsByName} // Sử dụng hàm từ ProductContext
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

        {/* Trạng thái Dropdown */}
        <Box sx={{ minWidth: 200 }}>
          <FilterDropdown
            label="Trạng thái"
            options={StatusOptions}
            onFilterChange={handleFilterStatus}
            resetFilter={resetFilter}
          />
        </Box>
      </Box>

      {/* Table */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          marginTop: "20px",
          boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
          height: "100%",
        }}
      >
        <TableContainer component={Paper}>
          <EntityTable
            entities={transformedProducts} // Sử dụng mảng ProductDTOs đã chuyển đổi
            loading={loading} // Sử dụng loading từ context
            columns={productColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AllProducts;
