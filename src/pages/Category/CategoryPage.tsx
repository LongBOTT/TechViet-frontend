import React, { FC, ReactElement, useEffect, useState } from "react";
import { Box, Grid, Typography, Button, CircularProgress, MenuItem, List, Container } from '@mui/material';
import MenuCheckboxSection from "../Home/MenuCheckboxSection";
import MenuRadioSection from "../Home/MenuRadioSection";
import { useProductContext } from "../../context/ProductContex";
import ProductCard from "../../components/Cards/ProductCard";
import { useParams } from "react-router-dom";
import { ListSharp, Menu, MenuOpen } from "@mui/icons-material";
import { Brand } from "../../types/brand";
import { Category } from "../../types/category";
import BrandSlider from "../Home/BrandSlider";
import { searchBrandByCategory_Id } from "../../api/brandApi";
import { searchCategoryBy_Id } from "../../api/categoryApi";

interface CategoryPageProps {
}

const CategoryPage: FC<CategoryPageProps> = (): ReactElement => {
    const [category, setCategory] = useState<Category>();  // Số sản phẩm hiển thị ban đầu
    const [itemsToShow, setItemsToShow] = useState(12);  // Số sản phẩm hiển thị ban đầu
    const [loadingMore, setLoadingMore] = useState(false);  // State để quản lý trạng thái loading khi nhấn "Xem thêm"
    const params = useParams<{ id: string }>();  // `{ id: string }` đảm bảo `id` là chuỗi
    const safeCategoryId = parseInt(params.id?.replace(':', '') || "0", 10);
    const { products, searchProductByCategoryId, loading } = useProductContext();  // Lấy sản phẩm và hàm fetch từ context
    const [isSticky, setIsSticky] = useState(false);  // State để quản lý trạng thái cuộn
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, Infinity]);  // Lưu trữ giá trị giá đã chọn
    
    // Gọi hàm fetchProducts khi component được mount
    useEffect(() => {
        console.log(safeCategoryId)
        const loadProducts = async () => 
          {
            const category = await searchCategoryBy_Id(safeCategoryId);
            setCategory(category);
            const brands = await searchBrandByCategory_Id(safeCategoryId); 
            setBrands(brands ?? []);
            console.log(brands)
            await searchProductByCategoryId(safeCategoryId);  // Truyền categoryId vào hàm fetchProducts
          };
        loadProducts();
    }, []);

    // Component để hiển thị CircularProgress khi loading
    const LoadingIndicator = () => {
        return (
            <Box
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
                  name={product.name}
                  price={20000000}
                  originalPrice={25000000}
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
        loadProductCards();
    }, [products]);

    // Hàm xử lý sự thay đổi của MenuRadioSection
    const handlePriceRangeChange = (newRange: number[]) => {
        setSelectedPriceRange(newRange);  // Cập nhật giá trị giá đã chọn
        console.log("Giá trị mới:", newRange);  // In ra để kiểm tra
        // Thực hiện các hành động khác như lọc sản phẩm theo khoảng giá
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
                    {/* {safeCategoryName === "Laptop" && (
                        
                    )} */}

                    {/* Bộ lọc thương hiệu cho mọi danh mục */}
                    {/* <MenuCheckboxSection
                            title="Thương hiệu"
                            onChange={(checkedValues) => { console.log("Selected brands:", checkedValues); }}
                            data={[
                                { id: 'apple', label: 'Apple' },
                                { id: 'samsung', label: 'Samsung' },
                                { id: 'sony', label: 'Sony' }
                            ]}
                            selectedValues={[]} // Truyền giá trị đã chọn nếu có
                    /> */}

                    {/* Bộ lọc giá cho mọi danh mục */}
                    <MenuRadioSection
                      title="Mức giá"
                      onChange={handlePriceRangeChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: [5000000, 10000000] },
                        { id: 'under5', label: 'Dưới 5 triệu', value: [0, 5000000] },
                        { id: '5to10', label: '5 - 10 triệu', value: [5000000, 10000000] },
                        { id: 'above10', label: 'Trên 10 triệu', value: [10000000, Infinity] }
                      ]}
                    />      

                    {/* Bộ lọc giá cho mọi danh mục */}
                    <MenuRadioSection
                      title="Hệ điều hành"
                      onChange={handlePriceRangeChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: [5000000, 10000000] },
                        { id: 'ios', label: 'iOS', value: [0, 5000000] },
                        { id: 'andoir', label: 'Android', value: [10000000, Infinity] }
                      ]}
                    />      

                    {/* Bộ lọc giá cho mọi danh mục */}
                    <MenuRadioSection
                      title="Hỗ trợ mạng"
                      onChange={handlePriceRangeChange}
                      data={[
                        { id: 'Tất cả', label: 'Tất cả', value: [5000000, 10000000] },
                        { id: '4g', label: '4G', value: [0, 5000000] },
                        { id: '5', label: '5G', value: [10000000, Infinity] }
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
                    <Typography fontSize={"15px"}>
                            Tìm thấy <b>{products.length}</b> sản phẩm
                    </Typography>
                    </Box>

                    <Grid container justifyContent="left" alignItems="center">
                        {loading ? (
                        <Grid item xs={12}>
                          <LoadingIndicator /> {/* Hiển thị CircularProgress khi đang load trang ban đầu */}
                        </Grid>
                      ) : (
                        loadProductCards() // Hiển thị sản phẩm sau khi tải xong
                      )}
                    </Grid>

                    {/* Nút Xem thêm */}
                    {!loading && products.length > itemsToShow && (
                        <Box mt={4} display="flex" justifyContent="center">
                            {loadingMore ? (
                                <LoadingIndicator />  // Hiển thị loading khi đang tải thêm
                            ) : (
                                <Button variant="contained" onClick={handleShowMore}>
                                    Xem thêm {products.length - itemsToShow} kết quả
                                </Button>
                            )}
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default CategoryPage;
