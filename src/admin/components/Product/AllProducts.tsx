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

import { ProductWithVariants } from "../../../types/product";
import { searchVariantByProduct } from "../../../api/variantApi";

const AllProducts: React.FC = () => {
  const {
    loading,
    productWithVariants,
    searchProductsWithVariantsByName,
    searchProductsWithVariantsByCategoryId,
    searchProductsWithVariantsByBrandId,
    fetchProductsWithVariants,
  } = useProductContext(); // Lấy dữ liệu và hàm từ ProductContext

  const navigate = useNavigate();
  const { categories } = useCategoryContext();
  const { brands } = useBrandContext();
  const [transformedProducts, setTransformedProducts] = useState<any[]>([]);
  useEffect(() => {
    // Kiểm tra nếu `productWithVariants` tồn tại
    if (!productWithVariants) return;
    // Biến đổi dữ liệu `productWithVariants` thành `transformedProducts`
    const transformed = productWithVariants.map((product) => {
      // Tính tổng tồn kho bằng cách cộng dồn `quantity` của các `variants`
      const stock = product.variants.reduce((total, variant) => total + variant.quantity, 0);
      const variantCount = product.variants.length;

      return {
        id: product.id,
        image:`${product.image}`,
        name: product.name,    
        variantCount: variantCount,        
        stock: stock,                  
        available: 0,               
        brandName: product.brand.name,  
        categoryName: product.category.name,  
      };
    });

    setTransformedProducts(transformed);
  }, [productWithVariants]);


  // Tạo các tùy chọn cho dropdown từ categories và brands
  const CategoryOptions = categories.map((category: any) => ({
    value: category.id,
    label: category.name,
  }));

  const BrandOptions = brands.map((brand: any) => ({
    value: brand.id,
    label: brand.name,
  }));


  const productColumns = [
    { label: "Ảnh", key: "image" }, 
    { label: "Sản phẩm", key: "name" },
    { label: "Số phiên bản", key: "variantCount" },
    { label: "Tồn kho", key: "stock" },
    { label: "Thể loại", key: "categoryName" },
    { label: "Thương hiệu", key: "brandName" },
  ];

  // Xử lý khi người dùng bấm vào hàng sản phẩm
  const handleRowClick = (product: any) => {
    navigate(`/EditProduct/${product.id}`); // Chuyển hướng đến trang chỉnh sửa sản phẩm
  };

  // Trạng thái đặt lại bộ lọc
  const [resetFilter, setResetFilter] = useState(false);

  // Xử lý đặt lại bộ lọc
  const handleReset = () => {
    setResetFilter(true);
    setTimeout(() => setResetFilter(false), 0);
    fetchProductsWithVariants(); // Lấy lại dữ liệu sản phẩm
  };

  // Hàm lọc theo danh mục
  const handleFilterCategory = (value: string) => {
    searchProductsWithVariantsByCategoryId(parseInt(value));

  };

  // Hàm lọc theo thương hiệu
  const handleFilterBrand = (value: string) => {
    searchProductsWithVariantsByBrandId(parseInt(value));
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
