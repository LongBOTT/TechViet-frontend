import React, { FC, ReactElement, useEffect, useState } from "react";
import { Box, Grid, Typography, Button, CircularProgress, MenuItem, List, Container } from '@mui/material';
import MenuRadioSection from "../Home/MenuRadioSection";
import ProductCard from "../../components/Cards/ProductCard";
import { useParams } from "react-router-dom";
import { ListSharp, Menu, MenuOpen } from "@mui/icons-material";
import { Brand } from "../../types/brand";
import { Category } from "../../types/category";
import BrandSlider from "../Home/BrandSlider";
import { searchBrandByCategory_Id } from "../../api/brandApi";
import { searchCategoryBy_Id } from "../../api/categoryApi";
import MenuRadioPriceSection from "../Home/MenuRadioPriceSection copy";
import { searchVariantByCategory, searchVariantByPrice, searchVariantByProductsAndPrice } from "../../api/variantApi";
import { Variant } from "../../types/variant";

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
const CategoryPage: FC<CategoryPageProps> = (): ReactElement => {
    const [category, setCategory] = useState<Category>();
    const [products, setProducts] = useState<Variant[]>([]);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [itemsToShow, setItemsToShow] = useState(12);  // Số sản phẩm hiển thị ban đầu
    const [loadingMore, setLoadingMore] = useState(false);  // State để quản lý trạng thái loading khi nhấn "Xem thêm"
    const [loading, setLoading] = useState(true);  // State để theo dõi trạng thái tải dữ liệu ban đầu
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const params = useParams<{ id: string }>();  // `{ id: string }` đảm bảo `id` là chuỗi
    const safeCategoryId = parseInt(params.id?.replace(':', '') || "0", 10);
    const [isSticky, setIsSticky] = useState(false);  // State để quản lý trạng thái cuộn
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, Infinity]);  // Lưu trữ giá trị giá đã chọn
    const [selectedSystem, setSelectedSystem] = useState<string>();  // Lưu trữ giá trị giá đã chọn
    const [selectedEthernet, setSelectedEthernet] = useState<string>();  // Lưu trữ giá trị giá đã chọn
    const [selectedPerformance, setSelectedPerformance] = useState<string>();  // Lưu trữ giá trị giá đã chọn
    const [selectedCamera, setSelectedCamera] = useState<string>();  // Lưu trữ giá trị giá đã chọn
    const [selectedScreen, setSelectedScreen] = useState<string>();  // Lưu trữ giá trị giá đã chọn
    const [selectedConnectivity, setSelectedConnectivity] = useState<string>();  // Lưu trữ giá trị giá đã chọn
    const [ filters, setFilters] = useState();  // Số sản phẩm hiển thị ban đầu
    const [filterParams, setFilterParams] = useState<FilterParamsType>({
      price: [],
      system: "",
      ethernet: "",
      performance: "",
      camera: "",
      screen: "",
      connectivity: ""   
    });
    
    // Gọi hàm fetchProducts khi component được mount
    useEffect(() => {
      console.log(safeCategoryId);
      setLoading(true);  // Bắt đầu tải

      const loadProducts = async () => {
        try {
          const category = await searchCategoryBy_Id(safeCategoryId);
          setCategory(category);
          console.log(category);
        
          const brands = await searchBrandByCategory_Id(safeCategoryId); 
          setBrands(brands ?? []);
          console.log(brands);
        
          // Gọi API lấy variants
          const variantList = await searchVariantByCategory(safeCategoryId);  
          setVariants(variantList ?? []);  // Cập nhật variants vào state
          console.log(variantList);  // In ra variantList sau khi API trả về
        
          // Gọi API lấy products dựa trên danh sách variants
          // const productList = await searchProductByVariants(variantList ?? []);
          setProducts(variantList ?? []);  // Cập nhật products vào state
          // console.log(productList);
        
          // Cập nhật filterParams với danh sách products
          // setFilterParams(prev => ({ ...prev, product: productList ?? [] }));
        } catch (error) {
          console.error("Error loading products:", error);
        }
      };
      
      loadProducts();
      setLoading(false);  // Kết thúc tải
    }, []);

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

    // Hàm loadProductCards để hiển thị danh sách sản phẩm
    const loadProductCards = () => {
      if (loading) {  // Kiểm tra trạng thái loading
        return <LoadingIndicator />;  // Hiển thị LoadingIndicator khi đang tải sản phẩm
      }

      delay(1000);  // Thêm thời gian chờ 1 giây (1000 milliseconds)

        if (products.length === 0) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100px" width="100%">
                    <Typography variant="h6" gutterBottom >
                        Không có sản phẩm nào trong danh mục.
                    </Typography>
                </Box>
            );
        }

        return products.slice(0, itemsToShow).map((product) => (  // Hiển thị theo itemsToShow
            <Grid item  key={product.id}>
                <ProductCard
                  name={product.products.name}
                  price={product.price}
                  originalPrice={product.price}
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
          setLoading(true);  // Bắt đầu loading
          setTimeout(async () => {
              console.log("tim kiem")
              
              const variantList = await searchVariantByPrice(filterParams.price[0], filterParams.price[1], variants);
              
              // const productList = await searchProductByVariants(variantList ?? []);
              setProducts(variantList ?? []);  // Cập nhật products vào state
          
              setItemsToShow(12);
              setLoading(false);  // Kết thúc loading
          }, 500);  // Giả lập thời gian chờ khi tải dữ liệu
        };
        searchProducts();
      }
    }, [filterParams]);

    

    const handlePriceRangeChange = async (newRange: number[]) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        // Cập nhật giá trị price trong filterParams
        setFilterParams(prev => ({
          ...prev,
          price: (newRange[1] === Infinity) ? [newRange[0], 100000000] : newRange
        }));
      }
    };

    const handleSystemChange = (value: string) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        setSelectedSystem(value);  // Cập nhật giá trị giá đã chọn
        console.log("Giá trị mới:", value);  // In ra để kiểm tra
        
      }
    };

    const handleEthernetChange = (value: string) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        setSelectedEthernet(value);  // Cập nhật giá trị giá đã chọn
        console.log("Giá trị mới:", value);  // In ra để kiểm tra
        
      }
    };

    const handlePerformanceChange = (value: string) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        setSelectedPerformance(value);  // Cập nhật giá trị giá đã chọn
        console.log("Giá trị mới:", value);  // In ra để kiểm tra
        
      }
    };

    const handleCameraChange = (value: string) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        setSelectedCamera(value);  // Cập nhật giá trị giá đã chọn
        console.log("Giá trị mới:", value);  // In ra để kiểm tra
        
      }
    };


    const handleScreenChange = (value: string) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        setSelectedScreen(value);  // Cập nhật giá trị giá đã chọn
        console.log("Giá trị mới:", value);  // In ra để kiểm tra
        
      }
    };
    
    const handleConnectivityChange = (value: string) => {
      if (!loading) {  // Kiểm tra trạng thái loading
        setSelectedConnectivity(value);  // Cập nhật giá trị giá đã chọn
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
                    <Box sx={{display:'flex', justifyItems:'center', textAlign: 'center', gap:'5px', 
                        borderBottom:'1px solid #000000', marginBottom:'10px'}}>
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
                    />
                          
                    {/* Bộ lọc "Hiệu năng và Pin" */}
                    <MenuRadioSection
                      title="Hiệu năng và Pin"
                      onChange={handlePerformanceChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: 'all' },
                        { id: 'Dưới 3000', label: 'Dưới 3000 mah', value: 'under_3000' },
                        { id: '3000-4000', label: 'Pin từ 3000 - 4000 mah', value: '3000_4000' },
                        { id: '4000-5000', label: 'Pin từ 4000 - 5000 mah', value: '4000_5000' },
                        { id: 'trên 5000', label: 'Siêu trâu: trên 5000 mah', value: 'above_5000' }
                      ]}
                    />
                
                    {/* Bộ lọc "Camera" */}
                    <MenuRadioSection
                      title="Camera"
                      onChange={handleCameraChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: 'all' },
                        { id: 'Slow Motion', label: 'Quay phim Slow Motion', value: 'slow_motion' },
                        { id: 'AI Camera', label: 'AI Camera', value: 'ai_camera' },
                        { id: 'Hiệu ứng', label: 'Hiệu ứng làm đẹp', value: 'beauty' },
                        { id: 'Zoom quang học', label: 'Zoom quang học', value: 'optical_zoom' },
                        { id: 'Chống rung OIS', label: 'Chống rung OIS', value: 'ois' }
                      ]}
                    />
                
                    {/* Bộ lọc "Màn hình" */}
                    <MenuRadioSection
                      title="Màn hình"
                      onChange={handleScreenChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: 'all' },
                        { id: 'Màn nhỏ', label: 'Màn hình nhỏ', value: 'small_screen' },
                        { id: 'Dưới 5 inch', label: 'Dưới 5.0 inch', value: 'under_5' },
                        { id: 'Trên 6 inch', label: 'Trên 6.0 inch', value: 'above_6' }
                      ]}
                    />

                    {/* Bộ lọc "Kết nối" */}
                    <MenuRadioSection
                      title="Kết nối"
                      onChange={handleConnectivityChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: 'all' },
                        { id: 'NFC', label: 'NFC', value: 'nfc' },
                        { id: 'Bluetooth', label: 'Bluetooth', value: 'bluetooth' },
                        { id: 'Hồng ngoại', label: 'Hồng ngoại', value: 'infrared' }
                      ]}
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

                    <Box display="flex" justifyContent="left" alignItems="center" height="fit-content" marginLeft={"10px"}>
                    
                      { !loading ? 
                        (
                          <Typography fontSize={"15px"}>
                            Tìm thấy <b>{products.length}</b> sản phẩm 
                          </Typography>
                        ) : null
                      }
                    </Box>

                    <Grid container justifyContent="left" alignItems="center">
                        {/* Gọi hàm loadProductCards với delay */}
                        {loading ? (
                          <LoadingIndicator />  // Hiển thị loading khi đang tải thêm
                          ) : (loadProductCards())}  
                    </Grid>

                    {/* Nút Xem thêm */}
                    {products.length > itemsToShow && (
                        <Box mt={4} display="flex" justifyContent="center">
                            {!loading && loadingMore ? (
                                <LoadingIndicator />  // Hiển thị loading khi đang tải thêm
                            ) : !loading ?(
                                <Button variant="contained" onClick={handleShowMore} sx={{borderRadius:'99px', background:'white', color:'black'}}>
                                    Xem thêm {products.length - itemsToShow} kết quả
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
