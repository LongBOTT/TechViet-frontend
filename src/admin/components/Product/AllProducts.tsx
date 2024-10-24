import * as React from "react";
import Box from "@mui/material/Box";
import SearchBox from "../Util/Search";
import { Paper, TableContainer } from "@mui/material";
import EntityTable from "../Util/EntityTable";
import { useProductContext } from "../../../context/ProductContex";
import FilterDropdown from "../Util/FilterDropdown";
import { useCategoryContext } from "../../../context/CategoryContext";
import { useBrandContext } from "../../../context/BrandContex";

const AllProducts: React.FC = () => {
  const searchProductsByName = (query: string) => {
    console.log("Searching for:", query);
  };

  // const { products } = useProductContext();
  const { categories } = useCategoryContext();
  const { brands } = useBrandContext();

 
  const products = [
    {
      id: 1,
      image: "",
      name: "Iphone 15 Pro Max",
      stock: 50,
      available: 50,
      created_at: "28/03/2024",
      category: "Điện thoại",
      brand: "Apple",
      status: "Đang giao dịch",
    },
    {
      id: 2,
      image: "",
      name: "Xiaomi Redmi Note 10",
      stock: 30,
      available: 30,
      created_at: "27/03/2024",
      category: "Điện thoại",
      brand: "Xiaomi",
      status: "Đang giao dịch",
    },
   
   
    
  ];
  const CategoryOptions = categories.map((category: any) => ({
    value: category.id,  
    label: category.name, 
  }));

  // Convert brands to options for the filter
  const BrandOptions = brands.map((brand: any) => ({
    value: brand.id, 
    label: brand.name, 
  }));

  const StatusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Đang giao dịch" },
    { value: "inactive", label: "Ngưng giao dịch" },
  ];

  const productColumns = [
    { label: "Ảnh", key: "image" },
    { label: "Sản phẩm", key: "name" },
    { label: "Tồn kho", key: "stock" },
    { label: "Có thể bán", key: "available" },
    { label: "Ngày khởi tạo", key: "created_at" },
    { label: "Thể loại", key: "category" },
    { label: "Thương hiệu", key: "brand" },
    { label: "Trạng thái", key: "status" },
  ];

  const handleRowClick = (product: any) => {
    console.log("Clicked product:", product);
  };

  const handleFilterCategory = (selectedValue: string) => {
    console.log("Selected category:", selectedValue);
  };

  const handleFilterBrand = (selectedValue: string) => {
    console.log("Selected brand:", selectedValue);
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
            onSearch={searchProductsByName}
          />
        </Box>

        {/* Loại sản phẩm Dropdown */}
        <Box sx={{ minWidth: 200 }}>
          <FilterDropdown
            label={`Loại sản phẩm`}
            options={CategoryOptions}
            onFilterChange={handleFilterCategory}
          />
        </Box>

        {/* Thương hiệu Dropdown */}
        <Box sx={{ minWidth: 200 }}>
          <FilterDropdown
            label={`Thương hiệu`}
            options={BrandOptions}
            onFilterChange={handleFilterBrand}
          />
        </Box>

        {/* Trạng thái Dropdown */}
        <Box sx={{ minWidth: 200 }}>
          <FilterDropdown
            label={`Trạng thái`}
            options={StatusOptions}
            onFilterChange={handleFilterCategory}
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
            entities={products}
            loading={false}
            columns={productColumns}
            onRowClick={handleRowClick}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AllProducts;
