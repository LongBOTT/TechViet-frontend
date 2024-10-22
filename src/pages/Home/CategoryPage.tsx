import React, { FC, ReactElement, useEffect, useState } from "react";
import { Box, Grid, Typography, Button, CircularProgress } from '@mui/material';
import MenuCheckboxSection from "./MenuCheckboxSection";
import MenuRadioSection from "./MenuRadioSection";
import { useProductContext } from "../../context/ProductContex";
import ProductCard from "../../components/Cards/ProductCard";
import { useParams } from "react-router-dom";

// Định nghĩa kiểu Props cho CategoryPage
interface CategoryPageProps {
    categoryName: string;
}

const CategoryPage: FC<CategoryPageProps> = (): ReactElement => {
    const [itemsToShow, setItemsToShow] = useState(12);  // Số sản phẩm hiển thị ban đầu
    const [loadingMore, setLoadingMore] = useState(false);  // State để quản lý trạng thái loading khi nhấn "Xem thêm"
    const { categoryName } = useParams<{ categoryName: string }>();  // Lấy categoryName từ URL
    const safeCategoryName = categoryName || '';
    const { products, searchProductByCategoryName, loading } = useProductContext();  // Lấy sản phẩm và hàm fetch từ context
    const [isSticky, setIsSticky] = useState(false);  // State để quản lý trạng thái cuộn

    // Gọi hàm fetchProducts khi component được mount
    useEffect(() => {
        const loadProducts = async () => 
          {
            console.log(categoryName)
            await searchProductByCategoryName(safeCategoryName);  // Truyền categoryName vào hàm fetchProducts
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
                sx={{ background: 'brown' }}
            >
                <CircularProgress/>
            </Box>
        );
    };

    // Hàm loadProductCards để hiển thị danh sách sản phẩm
    const loadProductCards = () => {
        if (products.length === 0) {
            return (
                <Typography variant="h6" gutterBottom>
                    Không có sản phẩm nào trong danh mục.
                </Typography>
            );
        }

        return products.slice(0, itemsToShow).map((product) => (  // Hiển thị theo itemsToShow
            <Grid item  key={product.id}>
                <ProductCard
                  name={product.name}
                  price={20000000}
                  originalPrice={25000000}
                  image="src/assets/products/iphone_16_pro_max_desert_titan_3552a28ae0.png"
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

    return (
        <Box sx={{ display: 'flex', marginTop: '20px', marginBottom: '20px'}}>
            <Grid container >
                {/* Bộ lọc bên trái */}
                 <Grid item xs={3} >       
                  <Box sx={{ 
                    marginLeft:'20px',
                    background: "white", 
                    borderRadius:'10px', 
                    position:'sticky',   // Thay đổi thành 'sticky' để dính vào khi cuộn
                    top: '20px',         // Dính cách đầu trang 20px
                    height: isSticky ? 'fit-content' : '100%',  // Khi cuộn, chuyển chiều cao thành 'fit-content'
                    transition: 'height 0.3s ease',  // Chuyển đổi mượt mà khi thay đổi chiều cao
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                        Bộ lọc tìm kiếm
                    </Typography>
                      {/* Hiển thị bộ lọc theo từng categoryName */}
                    {safeCategoryName === "Laptop" && (
                        <MenuCheckboxSection
                            title="Thương hiệu"
                            onChange={(checkedValues) => { console.log("Selected brands:", checkedValues); }}
                            data={[
                                { id: 'apple', label: 'Apple' },
                                { id: 'samsung', label: 'Samsung' },
                                { id: 'sony', label: 'Sony' }
                            ]}
                            selectedValues={[]} // Truyền giá trị đã chọn nếu có
                        />
                    )}

                    {safeCategoryName === "Laptop" && (
                        <MenuCheckboxSection
                            title="Giới tính"
                            onChange={(checkedValues) => { console.log("Selected genders:", checkedValues); }}
                            data={[
                                { id: 'male', label: 'Nam' },
                                { id: 'female', label: 'Nữ' }
                            ]}
                            selectedValues={[]} // Truyền giá trị đã chọn nếu có
                        />
                    )}

                    {/* Bộ lọc giá cho mọi danh mục */}
                    <MenuRadioSection
                      title="Giá"
                      onChange={()=>{}}
                      data={[
                        { id: 'under5', label: 'Dưới 5 triệu', value: [0, 5000000] },
                        { id: '5to10', label: '5 - 10 triệu', value: [5000000, 10000000] },
                        { id: 'above10', label: 'Trên 10 triệu', value: [10000000, Infinity] }
                      ]}
                    />      
                  </Box>     
                </Grid>

                {/* Danh sách sản phẩm bên phải */}
                <Grid item xs={9}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100px" width="100%">
                        <Typography variant="h3">
                            {categoryName}
                        </Typography>
                    </Box>

                    <Grid container justifyContent="center" alignItems="center">
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
