import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { Box, Grid, Typography, Button, CircularProgress, MenuItem, List, Container, Chip, Autocomplete, AutocompleteRenderInputParams, TextField, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import MenuCheckboxSection from "../Home/MenuCheckboxSection";
import MenuRadioSection from "../Home/MenuRadioSection";
import { useProductContext } from "../../context/ProductContex";
import ItemCard from "../../components/Cards/ItemCard";
import { useParams } from "react-router-dom";
import { ListSharp, Menu, MenuOpen } from "@mui/icons-material";
import { Brand } from "../../types/brand";
import { Category } from "../../types/category";
import BrandSlider from "../Home/BrandSlider";
import { searchBrandByCategory_Id } from "../../api/brandApi";
import { searchCategoryBy_Id } from "../../api/categoryApi";
import MenuRadioPriceSection from "../Home/MenuRadioPriceSection";
import { searchVariantByCategory, searchVariantByPrice, searchVariantByProductsAndPrice } from "../../api/variantApi";
import { forEach } from "lodash";
import { Product } from "../../types/product";
import { getProducts, searchProductByVariants } from "../../api/productApi";
import { Variant } from "../../types/variant";
import { Variant_Attribute } from "../../types/variant_attribute";
import { searchVariant_AttributeByVariant } from "../../api/variant_attributeApi";

interface CategoryPageProps {
}
interface FilterParamsType {
  price: number[],
  system: string,
  ethernet: string,
  performance: string,
  camera: string,
  screen: string,
  connectivity: string  
}
interface Product_Variant {
  product: Product,
  variants: Variant[],
  variants_attributes: Variant_Attribute[]
}

const CategoryPage: FC<CategoryPageProps> = (): ReactElement => {

  //#endregion Khai báo biến
    const [category, setCategory] = useState<Category>();
    // const [products, setProducts] = useState<Product[]>([]);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [itemsToShow, setItemsToShow] = useState(12);  // Số sản phẩm hiển thị ban đầu
    const [loadingMore, setLoadingMore] = useState(false);  // State để quản lý trạng thái loading khi nhấn "Xem thêm"
    const [loading, setLoading] = useState(true);  // State để theo dõi trạng thái tải dữ liệu ban đầu
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const params = useParams<{ id: string }>();  // `{ id: string }` đảm bảo `id` là chuỗi
    const safeCategoryId = parseInt(params.id?.replace(':', '') || "0", 10);
    const [isSticky, setIsSticky] = useState(false);  // State để quản lý trạng thái cuộn
    const [brands, setBrands] = useState<Brand[]>([]);
    const [filterParams, setFilterParams] = useState<FilterParamsType>({
      price: [0, 100000000],
      system: "",
      ethernet: "",
      performance: "",
      camera: "",
      screen: "",
      connectivity: ""   
    });
    const [items, setItems] = useState<Product_Variant[]>([]);

    // Refs to trigger reset in each filter component
    const priceResetRef = useRef<{ resetSelection: () => void }>(null);
    const systemResetRef = useRef<{ resetSelection: () => void }>(null);
    const ethernetResetRef = useRef<{ resetSelection: () => void }>(null);
    const performanceResetRef = useRef<{ resetSelection: () => void }>(null);
    const cameraResetRef = useRef<{ resetSelection: () => void }>(null);
    const screenResetRef = useRef<{ resetSelection: () => void }>(null);
    const connectivityResetRef = useRef<{ resetSelection: () => void }>(null);
    const [sort, setSort] = React.useState('Nổi bật');
    
    //#endregion
    
    const handleChange = (event: SelectChangeEvent) => {
      setSort(event.target.value);
      sortItems(event.target.value);
    };
    
    const sortItems = (value: string) => {
      if (value === "Giá thấp nhất") {
        let itemList = items;
        itemList.sort((a, b) => (a.variants[0].price ?? 0) - (b.variants[0].price ?? 0));
        setItems(itemList);
      } 
      else
      if (value === "Giá cao nhất") {
        let itemList = items;
        itemList.sort((a, b) => (b.variants[0].price ?? 0) - (a.variants[0].price ?? 0));
        setItems(itemList);
      }
      else {
        let itemList = items;
        itemList.sort((a, b) => (a.variants[0].id ?? 0) - (b.variants[0].id ?? 0));
        setItems(itemList);
      }
    };

    // Gọi hàm fetchProducts khi component được mount
    useEffect(() => {
      setLoading(true);  // Start loading
      const loadProducts = async () => {
        try {
          const category = await searchCategoryBy_Id(safeCategoryId);
          setCategory(category);
          const brands = await searchBrandByCategory_Id(safeCategoryId); 
          setBrands(brands ?? []);
          
          const variantList = await searchVariantByCategory(safeCategoryId);  
          setVariants(variantList ?? []);  // Update state with variants
          const productList = await searchProductByVariants(variantList ?? []);

          const itemList = await convertToProduct_Variant(variantList ?? [], productList ?? []);
          setItems(itemList);

        } catch (error) {
          console.error("Error loading products:", error);
        } finally {
          setLoading(false);  // Kết thúc tải
        }
      };
      loadProducts();
    }, []);

    const convertToProduct_Variant = async (variantList: Variant[], productList: Product[]) => {
      const itemList: Product_Variant[] = [];
      for (const product of productList) {
        const item: Product_Variant = {
          product,
          variants: [],
          variants_attributes: []
        };
        // Filter variants by product ID
        item.variants.push(...variantList.filter(variant => variant.products.id === product.id));
        for (const variant of item.variants) {
          const attributes = await searchVariant_AttributeByVariant(variant.id);
          item.variants_attributes.push(...attributes ?? []);  // Add attributes to variants_attributes
        }
        itemList.push(item);
      }
      return itemList;
    };
      
      // Component để hiển thị CircularProgress khi loading
    const LoadingIndicator = () => {
        return (
            <Box
                marginTop={"20px"}
                width={"100%"}
                height={"100%"}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress/>
            </Box>
        );
    };

    // Hàm loadItemCards để hiển thị danh sách sản phẩm
    const loadItemCards = () => {
      if (loading) {  // Kiểm tra trạng thái loading
        return <LoadingIndicator />;  // Hiển thị LoadingIndicator khi đang tải sản phẩm
      }
      if (items.length === 0) {
          return (
              <Box display="flex" justifyContent="center" alignItems="center" height="100px" width="100%">
                  <Typography variant="h6" gutterBottom >
                      Không có sản phẩm nào trong danh mục.
                  </Typography>
              </Box>
          );
      }
      return items.slice(0, itemsToShow).map((item) => (  // Hiển thị theo itemsToShow
          <Grid item justifyContent="left"  key={item.product.id}>
              <ItemCard
                name={item.product.name}
                price={item.variants[0].price}
                originalPrice={item.variants[0].price}
                image="/src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png"
                details=""
              />
          </Grid>
      ));
    };

    // Hàm xử lý khi nhấn vào nút "Xem thêm"
    const handleShowMore = () => {
        setLoadingMore(true);  // Bắt đầu loading
        setTimeout(() => {
            setItemsToShow(prevItemsToShow => prevItemsToShow + 4);  // Tăng thêm 4 sản phẩm mỗi lần
            setLoadingMore(false);  // Kết thúc loading
        }, 1000);  // Giả lập thời gian chờ khi tải dữ liệu
    };

    // Hàm theo dõi sự kiện cuộn
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 200) {  // Ví dụ, khi cuộn xuống quá 200px
                setIsSticky(true);  // Chuyển trạng thái sang sticky
            } else {
                setIsSticky(false);  // Đưa về trạng thái bình thường
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
      if (!loading) {  // Kiểm tra trạng thái loading
        const searchProducts = async () => {
          window.scrollTo(0, 0);
          setLoading(true);  // Bắt đầu loading

          setSort("Nổi bật");
          setTimeout(async () => {
              console.log("tim kiem");

              console.log(filterParams);
          
              const variantList = await searchVariantByPrice(filterParams.price[0], filterParams.price[1], variants);
              const productList = await searchProductByVariants(variantList ?? []);
              let itemList = await convertToProduct_Variant(variantList ?? [], productList ?? []);

              //#region Lọc hệ điều hành  
              if (filterParams.system !== "") {
                // Filter out items that don't match the specified system
                itemList = itemList.filter(item => {
                  return item.variants_attributes.some(var_att => 
                    var_att.attribute.name === "OS" &&
                    var_att.value === filterParams.system
                  );
                });
              }
              //#endregion 

              //#region Lọc Hỗ trợ mạng  
              if (filterParams.ethernet !== "") {
                // Filter out items that don't match the specified system
                itemList = itemList.filter(item => {
                  return item.variants_attributes.some(var_att => 
                    var_att.attribute.name === "Hỗ trợ mạng" &&
                    var_att.value === filterParams.ethernet
                  );
                });
              
              }
              //#endregion 
              
              //#region Lọc Hiệu năng và pin 
              if (filterParams.performance !== "") {

                if (filterParams.performance === "Dưới 3000 mAh") {
                  itemList = itemList.filter(item => {
                  return item.variants_attributes.some(var_att => 
                    var_att.attribute.name === "Dung lượng pin" &&
                     Number(var_att.value.replace(" mAh", "")) < 3000
                  );
                  });    
                }

                if (filterParams.performance === "Pin từ 3000 - 4000 mAh") {
                  itemList = itemList.filter(item => {
                  return item.variants_attributes.some(var_att => 
                    var_att.attribute.name === "Dung lượng pin" &&
                     Number(var_att.value.replace(" mAh", "")) >= 3000 && Number(var_att.value.replace(" mAh", "")) <= 4000
                  );
                  });    
                }

                if (filterParams.performance === "Pin từ 4000 - 5000 mAh") {
                  itemList = itemList.filter(item => {
                  return item.variants_attributes.some(var_att => 
                    var_att.attribute.name === "Dung lượng pin" &&
                     Number(var_att.value.replace(" mAh", "")) >= 4000 && Number(var_att.value.replace(" mAh", "")) <= 5000
                  );
                  });    
                }

                if (filterParams.performance === "Siêu trâu: trên 5000 mAh") {
                  itemList = itemList.filter(item => {
                  return item.variants_attributes.some(var_att => 
                    var_att.attribute.name === "Dung lượng pin" &&
                     Number(var_att.value.replace(" mAh", "")) >= 5000
                  );
                  });    
                }
              }
              //#endregion 

              //#region Lọc camera  
              if (filterParams.camera !== "") {
                // Filter out items that don't match the specified system
                itemList = itemList.filter(item => {
                  return item.variants_attributes.some(var_att => 
                    var_att.attribute.name === "Tính năng" &&
                    var_att.value.includes(filterParams.camera)
                  );
                });
              }
              //#endregion

              //#region Lọc màn hình  
              if (filterParams.screen !== "") {
                // Filter out items that don't match the specified system
                if (filterParams.screen === "Màn hình nhỏ") {
                  itemList = itemList.filter(item => {
                  return item.variants_attributes.some(var_att => 
                    var_att.attribute.name === "Kích thước màn hình" &&
                     Number(var_att.value.replace(" inch", "")) < 1.5
                  );
                  });    
                }
              
                if (filterParams.screen === "Dưới 5.0 inch") {
                  itemList = itemList.filter(item => {
                  return item.variants_attributes.some(var_att => 
                    var_att.attribute.name === "Kích thước màn hình" &&
                     Number(var_att.value.replace(" inch", "")) < 5
                  );
                  });    
                }

                if (filterParams.screen === "Dưới 6.0 inch") {
                  itemList = itemList.filter(item => {
                  return item.variants_attributes.some(var_att => 
                    var_att.attribute.name === "Kích thước màn hình" &&
                     Number(var_att.value.replace(" inch", "")) < 6
                  );
                  });    
                }
              }
              //#endregion

              //#region Lọc kết nối
              if (filterParams.connectivity !== "") {
                // Filter out items that don't match the specified system
               if (filterParams.connectivity === "Bluetooth") {
                  itemList = itemList.filter(item => {
                  return item.variants_attributes.some(var_att => 
                    var_att.attribute.name === "Bluetooth"
                  );
                  });    
                }
                else
                {
                  itemList = itemList.filter(item => {
                  return item.variants_attributes.some(var_att => 
                    var_att.attribute.name === "Kết nối khác" &&
                    var_att.value.includes(filterParams.connectivity)
                  );
                  });  
                }
              }
              //#endregion

              setItems(itemList);  // Update items with filtered list
              console.log(itemList)

              setItemsToShow(12);
              setLoading(false);  // Kết thúc loading
          }, 500);  // Giả lập thời gian chờ khi tải dữ liệu
        };
      
        searchProducts(); 

      }
    }, [filterParams]);

    // Hàm loadItemCards để hiển thị danh sách sản phẩm
    const loadItemFilters = () => {
      const hasActiveFilters = Object.keys(filterParams).some((key) => {
        const value = filterParams[key as keyof FilterParamsType];
        return (
          (typeof value === 'string' && value.trim() !== "") ||
          (Array.isArray(value) && !(value[0] === 0 && value[1] === 100000000))
        );
      });
    
      return (
        <Box display="flex" gap={1} alignItems="center" margin="20px">
          {Object.keys(filterParams).map((key) => {
            const value = filterParams[key as keyof FilterParamsType];
          
            if (value && (typeof value === 'string' ? value.trim() : value.length > 0)) {
              if ((typeof value === 'string' && value !== "") || (Array.isArray(value) && !(value[0] === 0 && value[1] === 100000000))) {
                
                if (Array.isArray(value) && value[0] === 0 && value[1] === 5000000) {
                  return (
                    <Chip
                      key={key}
                      label="Dưới 5 triệu"
                      onDelete={() => handleRemoveFilter(key as keyof FilterParamsType)}
                      color="default"
                      sx={{ bgcolor: '#d1d5db', fontWeight: 'bold' }}
                    />
                  );
                }
              
                if (Array.isArray(value) && value[0] === 10000000 && value[1] === 100000000) {
                  return (
                    <Chip
                      key={key}
                      label="Trên 10 triệu"
                      onDelete={() => handleRemoveFilter(key as keyof FilterParamsType)}
                      color="default"
                      sx={{ bgcolor: '#d1d5db', fontWeight: 'bold' }}
                    />
                  );
                }
              
                if (Array.isArray(value) && value[0] === 5000000 && value[1] === 10000000) {
                  return (
                    <Chip
                      key={key}
                      label="5 - 10 triệu"
                      onDelete={() => handleRemoveFilter(key as keyof FilterParamsType)}
                      color="default"
                      sx={{ bgcolor: '#d1d5db', fontWeight: 'bold' }}
                    />
                  );
                }
              
                return (
                  <Chip
                    key={key}
                    label={
                      key === 'price' && Array.isArray(value)
                        ? `${value[0].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} - ${value[1].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`
                        : value
                    }
                    onDelete={() => handleRemoveFilter(key as keyof FilterParamsType)}
                    color="default"
                    sx={{ bgcolor: '#d1d5db', fontWeight: 'bold' }}
                  />
                );
              }
            }
            return null;
          })}
    
          {/* Render "Xóa tất cả" button only if there are active filters */}
          {hasActiveFilters && (
            <Chip
              label="Xóa tất cả"
              onClick={handleClearAllFilters}
              sx={{ color: 'red', fontWeight: 'bold', backgroundColor: 'transparent'}}
            />
          )}
        </Box>
      );
    };

    
    const handleRemoveFilter = (key: keyof FilterParamsType) => {
      if (key === 'price') priceResetRef.current?.resetSelection();
      if (key === 'system') systemResetRef.current?.resetSelection();
      if (key === 'ethernet') ethernetResetRef.current?.resetSelection();
      if (key === 'performance') performanceResetRef.current?.resetSelection();
      if (key === 'camera') cameraResetRef.current?.resetSelection();
      if (key === 'screen') screenResetRef.current?.resetSelection();
      if (key === 'connectivity') connectivityResetRef.current?.resetSelection();

    };

    const handleClearAllFilters = () => {
      priceResetRef.current?.resetSelection();
      systemResetRef.current?.resetSelection();
      ethernetResetRef.current?.resetSelection();
      performanceResetRef.current?.resetSelection();
      cameraResetRef.current?.resetSelection();
      screenResetRef.current?.resetSelection();
      connectivityResetRef.current?.resetSelection();
    };

    const handlePriceRangeChange = async (newRange: number[]) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        // Cập nhật giá trị price trong filterParams
        setFilterParams(prev => ({
          ...prev,
          price: (newRange[1] === Infinity) ? [newRange[0], 100000000] : newRange
        }));
        console.log("Giá trị mới:", newRange);  // In ra để kiểm tra
      }
    };

    const handleSystemChange = (value: string) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        setFilterParams(prev => ({
          ...prev,
          system: (value === "Tất cả") ? "" : value
        }));
        console.log("Giá trị mới:", value);  // In ra để kiểm tra
      }
    };

    const handleEthernetChange = (value: string) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        setFilterParams(prev => ({
          ...prev,
          ethernet: (value === "Tất cả") ? "" : value
        }));
        console.log("Giá trị mới:", value);  // In ra để kiểm tra
      }
    };

    const handlePerformanceChange = (value: string) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        setFilterParams(prev => ({
          ...prev,
          performance: (value === "Tất cả") ? "" : value
        }));
        console.log("Giá trị mới:", value);  // In ra để kiểm tra
      }
    };

    const handleCameraChange = (value: string) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        setFilterParams(prev => ({
          ...prev,
          camera: (value === "Tất cả") ? "" : value
        }));
        console.log("Giá trị mới:", value);  // In ra để kiểm tra
      }
    };

    const handleScreenChange = (value: string) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        setFilterParams(prev => ({
          ...prev,
          screen: (value === "Tất cả") ? "" : value
        }));
        console.log("Giá trị mới:", value);  // In ra để kiểm tra
      }
    };
    
    const handleConnectivityChange = (value: string) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        setFilterParams(prev => ({
          ...prev,
          connectivity: (value === "Tất cả") ? "" : value
        }));
        console.log("Giá trị mới:", value);  // In ra để kiểm tra
      }
    };
    
    return (
        <Box sx={{ display: 'flex', marginTop: '20px', marginBottom: '20px'}}>
            <Grid container >
                {/* Bộ lọc bên trái */}
                 <Grid item xs={3} >       
                  <Box sx={{ 
                    marginLeft:'20px',
                    padding:'10px',
                    background: "white", 
                    borderRadius:'10px', 
                    position:'sticky',   // Thay đổi thành 'sticky' để dính vào khi cuộn
                    top: '20px',         // Dính cách đầu trang 20px
                    height: isSticky ? 'fit-content' : '100%',  // Khi cuộn, chuyển chiều cao thành 'fit-content'
                    transition: 'height 0.3s ease',  // Chuyển đổi mượt mà khi thay đổi chiều cao
                    }}
                  >
                    <Box sx={{display:'flex', justifyItems:'center', textAlign: 'center', gap:'5px'}}>
                        <ListSharp sx={{fontSize:'30px'}}/> 
                    <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                        Bộ lọc tìm kiếm
                    </Typography>
                    </Box>

                    {/* Hiển thị bộ lọc theo từng categoryName */}
                    {/* {safeCategoryName === "Laptop" && ()} */}

                    {/* Bộ lọc giá cho mọi danh mục */}
                    <MenuRadioPriceSection
                      title="Mức giá"
                      onChange={handlePriceRangeChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: [0, 100000000] },
                        { id: 'under5', label: 'Dưới 5 triệu', value: [0, 5000000] },
                        { id: '5to10', label: '5 - 10 triệu', value: [5000000, 10000000] },
                        { id: 'above10', label: 'Trên 10 triệu', value: [10000000, Infinity] }
                      ]}
                      resetRef={priceResetRef}
                    />      

                    {/* Bộ lọc giá cho mọi danh mục */}
                    <MenuRadioSection
                      title="Hệ điều hành"
                      onChange={handleSystemChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: "Tất cả" },
                        { id: 'iOS', label: 'iOS', value: "iOS" },
                        { id: 'Android', label: 'Android', value: "Android" }
                      ]}
                      resetRef={systemResetRef}
                    />      

                    {/* Bộ lọc giá cho mọi danh mục */}
                    <MenuRadioSection
                      title="Hỗ trợ mạng"
                      onChange={handleEthernetChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: "Tất cả" },
                        { id: '4g', label: '4G', value: "4G" },
                        { id: '5', label: '5G', value: "5G" }
                      ]}
                      resetRef={ethernetResetRef}
                    />
                          
                    {/* Bộ lọc "Hiệu năng và Pin" */}
                    <MenuRadioSection
                      title="Hiệu năng và Pin"
                      onChange={handlePerformanceChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: 'Tất cả' },
                        { id: 'Dưới 3000', label: 'Dưới 3000 mAh', value: 'Dưới 3000 mAh' },
                        { id: '3000-4000', label: 'Pin từ 3000 - 4000 mAh', value: 'Pin từ 3000 - 4000 mAh' },
                        { id: '4000-5000', label: 'Pin từ 4000 - 5000 mAh', value: 'Pin từ 4000 - 5000 mAh' },
                        { id: 'trên 5000', label: 'Siêu trâu: trên 5000 mAh', value: 'Siêu trâu: trên 5000 mAh' }
                      ]}
                      resetRef={performanceResetRef}
                    />
                
                    {/* Bộ lọc "Camera" */}
                    <MenuRadioSection
                      title="Camera"
                      onChange={handleCameraChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: 'Tất cả' },
                        { id: 'Slow Motion', label: 'Quay phim Slow Motion', value: 'Slow Motion' },
                        { id: 'AI Camera', label: 'AI Camera', value: 'A.I Camera' },
                        { id: 'Hiệu ứng', label: 'Hiệu ứng làm đẹp', value: 'Beautify' },
                        { id: 'Zoom quang học', label: 'Zoom quang học', value: 'Zoom quang học' },
                        { id: 'Chống rung OIS', label: 'Chống rung OIS', value: 'OIS' }
                      ]}
                      resetRef={cameraResetRef}

                    />
                
                    {/* Bộ lọc "Màn hình" */}
                    <MenuRadioSection
                      title="Màn hình"
                      onChange={handleScreenChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: 'Tất cả' },
                        { id: 'Màn nhỏ', label: 'Màn hình nhỏ', value: 'Màn hình nhỏ' },
                        { id: 'Dưới 5 inch', label: 'Dưới 5.0 inch', value: 'Dưới 5.0 inch' },
                        { id: 'Trên 6 inch', label: 'Trên 6.0 inch', value: 'Trên 6.0 inch' }
                      ]}
                      resetRef={screenResetRef}

                    />

                    {/* Bộ lọc "Kết nối" */}
                    <MenuRadioSection
                      title="Kết nối"
                      onChange={handleConnectivityChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: 'Tất cả' },
                        { id: 'NFC', label: 'NFC', value: 'NFC' },
                        { id: 'Bluetooth', label: 'Bluetooth', value: 'Bluetooth' },
                        { id: 'Hồng ngoại', label: 'Hồng ngoại', value: 'Hồng ngoại' }
                      ]}
                      resetRef={connectivityResetRef}

                    />

                  </Box>     
                </Grid>

                {/* Danh sách sản phẩm bên phải */}
                <Grid item xs={9}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="fit-content" width="100%">
                        <Typography fontSize={"32px"} fontWeight={"bold"}>
                            {category?.name}
                        </Typography>

                    </Box>
                    <Box sx={{ display: 'flex', margin: '20px'}}>
                        <Container sx={{ height: 'fit-content'}}>
                            <BrandSlider brands={brands}/>
                        </Container>
                    </Box>

                      {loadItemFilters()}

                    <Box display="flex" justifyContent="left" alignItems="center" height="fit-content" marginLeft={"10px"}>
                    
                      { !loading ? 
                        (
                          <>
                          <Box justifyContent="left" width={"80%"}>
                            <Typography fontSize={"15px"} >
                            Tìm thấy <b>{items.length}</b> sản phẩm
                            </Typography>
                          </Box>
                          
                          <Typography fontSize={"15px"} justifyContent="right" width={"5%"}>
                            Sắp xếp
                          </Typography>

                          <Box  sx={{width: '15%', justifyContent:"right" } }>
                            
                              <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                                <Select
                                  value={sort}
                                  onChange = {handleChange}
                                  sx={{ height: "30px" }}  // Adjust the height as needed
                                >
                                  <MenuItem value="">
                                  </MenuItem>
                                  <MenuItem value="Nổi bật">Nổi bật</MenuItem>
                                  <MenuItem value="Giá thấp nhất">Giá thấp nhất</MenuItem>
                                  <MenuItem value="Giá cao nhất">Giá cao nhất</MenuItem>
                                </Select> 
                              </FormControl>
                          </Box>
                          
                          </>
                        ) : null
                      }
                    </Box>
                    <Grid container justifyContent="left" alignItems="center">
                        {/* Gọi hàm loadItemCards với delay */}
                        {loading ? (
                          <LoadingIndicator />  // Hiển thị loading khi đang tải thêm
                          ) : (loadItemCards())}  
                    </Grid>

                    {/* Nút Xem thêm */}
                    {items.length > itemsToShow && (
                        <Box mt={4} display="flex" justifyContent="center">
                            {!loading && loadingMore ? (
                                <LoadingIndicator />  // Hiển thị loading khi đang tải thêm
                            ) : !loading ?(
                                <Button variant="text" onClick={handleShowMore} sx={{borderRadius:'99px'}}>
                                    Xem thêm {items.length - itemsToShow} kết quả
                                </Button>
                            ) : null}
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default CategoryPage;
