import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  MenuItem,
  List,
  Container,
  Chip,
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Alert,
  Modal,
  Avatar,
} from "@mui/material";
import MenuCheckboxSection from "../Home/MenuCheckboxSection";
import MenuRadioSection from "../Home/MenuRadioSection";
import { useProductContext } from "../../context/ProductContext";
import ItemCard from "../../components/Cards/ItemCard";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ListSharp, Menu, MenuOpen } from "@mui/icons-material";
import { Brand } from "../../types/brand";
import { Category } from "../../types/category";
import BrandSlider from "../Home/BrandSlider";
import {
  searchBrandBy_Id,
  searchBrandByCategory_Id,
  searchBrandByName,
} from "../../api/brandApi";
import { searchCategoryBy_Id } from "../../api/categoryApi";
import MenuRadioPriceSection from "../Home/MenuRadioPriceSection";
import {
  searchVariantByCategory,
  searchVariantByPrice,
  searchVariantByProduct,
  searchVariantByProductsAndPrice,
} from "../../api/variantApi";
import { forEach, set } from "lodash";
import { Product } from "../../types/product";
import { getProducts, searchProductByContainingName, searchProductByName, searchProductByVariants } from "../../api/productApi";
import { Variant } from "../../types/variant";
import { Variant_Attribute } from "../../types/variant_attribute";
import { searchVariant_AttributeByVariant } from "../../api/variant_attributeApi";
import ComparePage from "../Comparison/ComparePage";
import { CATEGORY, COMPARISON } from "../../constants/routeConstants";

interface SearchPageProps {}
interface FilterParamsType {
  price: number[];
}
interface Product_Variant {
  product: Product;
  variants: Variant[];
  variants_attributes: Variant_Attribute[];
}

const SearchPage: FC<SearchPageProps> = (): ReactElement => {
  //   #region Khai báo biến
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>();
  // const [products, setProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [loadingMore, setLoadingMore] = useState(false); // State để quản lý trạng thái loading khi nhấn "Xem thêm"
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu ban đầu
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [isSticky, setIsSticky] = useState(false); // State để quản lý trạng thái cuộn
  const [items, setItems] = useState<Product_Variant[]>([]);
  const [itemsToShow, setItemsToShow] = useState(12); // Số sản phẩm hiển thị ban đầu
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("s"); // Lấy giá trị của tham số 's
  // Refs to trigger reset in each filter component
  const priceResetRef = useRef<{ resetSelection: () => void }>(null);

  const [sort, setSort] = React.useState("Nổi bật");
  const [comparisonList, setComparisonList] = useState<
    [Product_Variant, Variant_Attribute | null][]
  >([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  //#endregion

  const compareProducts = () => {
    // Navigate to the product's detail page
    let params = comparisonList
      .map((item) => `${item[1]?.variant.id}`)
      .join("&&");
    console.log(params);
    navigate(`${COMPARISON}/:${params}`);
  };

  // Handler to add or remove items from comparison list
  const handleCompareToggle = (
    productVariant: Product_Variant,
    selectedVariant: Variant_Attribute | null,
    isAdding: boolean
  ) => {
    setComparisonList((prevList) => {
      if (isAdding) {
        if (prevList.length < 3) {
          // Add the tuple [productVariant, selectedVariant] if list has less than 3 items
          return [...prevList, [productVariant, selectedVariant]];
        } else {
          // Set the alert message if the comparison list exceeds 3 items
          setAlertMessage("Không được chọn quá 3 sản phẩm để so sánh");
          return prevList;
        }
      }
      // Remove the item if it's already in the list
      return prevList.filter(
        ([item]) => item.product.id !== productVariant.product.id
      );
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    sortItems(event.target.value);
  };

  const sortItems = (value: string) => {
    if (value === "Giá thấp nhất") {
      let itemList = [...items];
      itemList.sort(
        (a, b) => (a.variants[0].price ?? 0) - (b.variants[0].price ?? 0)
      );
      setItems(itemList);
    } else if (value === "Giá cao nhất") {
      let itemList = [...items];
      itemList.sort(
        (a, b) => (b.variants[0].price ?? 0) - (a.variants[0].price ?? 0)
      );
      setItems(itemList);
    } else {
      let itemList = [...items];
      itemList.sort(
        (a, b) => (a.variants[0].id ?? 0) - (b.variants[0].id ?? 0)
      );
      setItems(itemList);
    }
  };

  const [filterParams, setFilterParams] = useState<FilterParamsType>({
    price: [0, 200000000],
  });

  // Gọi hàm fetchProducts khi component được mount
  useEffect(() => {
    setLoading(true); // Start loading
    const loadProducts = async () => {
      try {
        setComparisonList([]);

        if (searchValue) {
            const productList = await searchProductByContainingName(
              searchValue
            );
            if (productList) {
                let itemList = await convertToProduct_Variant(productList)   
                setItems(itemList);
            }
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false); // Kết thúc tải
      }
    };
    loadProducts();
  }, [searchValue]);

//   useEffect(() => {
//     priceResetRef.current?.resetSelection();
//     setFilterParams({
//       price: [0, 200000000],
//     });
//     console.log(brandParam);
//   }, [brandParam]);

  const convertToProduct_Variant = async (
    productList: Product[]
  ) => {
    const itemList: Product_Variant[] = [];
    for (const product of productList) {
      const item: Product_Variant = {
        product,
        variants: [],
        variants_attributes: [],
      };
      // Filter variants by product ID
      let variantList = await searchVariantByProduct(product.id);
      if (variantList) {
          item.variants.push(... variantList)
          for (const variant of variantList) {
            const attributes = await searchVariant_AttributeByVariant(
              variant.id
            );
            item.variants_attributes.push(...(attributes ?? [])); // Add attributes to variants_attributes
          }
          itemList.push(item);
      }
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
        <CircularProgress />
      </Box>
    );
  };

  // Hàm loadItemCards để hiển thị danh sách sản phẩm
  const loadItemCards = () => {
    if (loading) {
      // Kiểm tra trạng thái loading
      return <LoadingIndicator />; // Hiển thị LoadingIndicator khi đang tải sản phẩm
    }
    if (items.length === 0) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100px"
          width="100%"
        >
          <Typography variant="h6" gutterBottom>
            Không có sản phẩm nào trong danh mục.
          </Typography>
        </Box>
      );
    }
    if (items.length <= 12) {
      return items.map(
        (
          item // Hiển thị theo itemsToShow
        ) => (
          <Grid item justifyContent="left" key={item.product.id}>
            <ItemCard
              productVariant={item}
              onCompareToggle={handleCompareToggle}
              isInComparison={comparisonList.some(
                (compItem) => compItem[0].product.id === item.product.id
              )}
            />
          </Grid>
        )
      );
    }
    return items.slice(0, itemsToShow).map(
      (
        item // Hiển thị theo itemsToShow
      ) => (
        <Grid item justifyContent="left" key={item.product.id}>
          <ItemCard
            productVariant={item}
            onCompareToggle={handleCompareToggle}
            isInComparison={comparisonList.some(
              (compItem) => compItem[0].product.id === item.product.id
            )}
          />
        </Grid>
      )
    );
  };

  // Hàm xử lý khi nhấn vào nút "Xem thêm"
  const handleShowMore = () => {
    setLoadingMore(true); // Bắt đầu loading
    setTimeout(() => {
      setItemsToShow((prevItemsToShow) => {
        const newItemsToShow = prevItemsToShow + 4;
        return newItemsToShow > items.length ? items.length : newItemsToShow;
      });
      setLoadingMore(false); // Kết thúc loading
    }, 1000); // Giả lập thời gian chờ khi tải dữ liệu
  };

  // Hàm theo dõi sự kiện cuộn
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        // Ví dụ, khi cuộn xuống quá 200px
        setIsSticky(true); // Chuyển trạng thái sang sticky
      } else {
        setIsSticky(false); // Đưa về trạng thái bình thường
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      // Kiểm tra trạng thái loading
      const searchProducts = async () => {
        window.scrollTo(0, 0);
        setLoading(true); // Bắt đầu loading

        setSort("Nổi bật");
        setTimeout(async () => {
          console.log("tim kiem");

          console.log(filterParams);
          if (searchValue) {
            const productList = await searchProductByContainingName(searchValue);
            if (productList) {
              let itemList = await convertToProduct_Variant(productList);
              setItems(itemList);
              //   const variantList = await searchVariantByPrice(
              //       filterParams.price[0],
              //       filterParams.price[1],
              //       itemList
              // );
            }
          }


          // const productList = await searchProductByVariants(variantList ?? []);
          // let itemList = await convertToProduct_Variant(
          //   variantList ?? [],
          //   productList ?? []
          // );

          
          // setItems(itemList); // Update items with filtered list
          // console.log(itemList);
          setLoading(false); // Kết thúc loading
        }, 500); // Giả lập thời gian chờ khi tải dữ liệu
      };

      searchProducts();
    }
  }, [filterParams]);

  // Hàm loadItemCards để hiển thị danh sách sản phẩm
  const loadItemFilters = () => {
    const hasActiveFilters = Object.keys(filterParams).some((key) => {
      const value = filterParams[key as keyof FilterParamsType];
      return (
        (Array.isArray(value) && !(value[0] === 0 && value[1] === 200000000))
      );
    });

    return (
      <Box display="flex" gap={1} alignItems="center" margin="20px">
        {Object.keys(filterParams).map((key) => {
          const value = filterParams[key as keyof FilterParamsType];
            if (
              (typeof value === "string" && value !== "") ||
              (Array.isArray(value) &&
                !(value[0] === 0 && value[1] === 200000000))
            ) {
              if (
                Array.isArray(value) &&
                value[0] === 0 &&
                value[1] === 5000000
              ) {
                return (
                  <Chip
                    key={key}
                    label="Dưới 5 triệu"
                    onDelete={() =>
                      handleRemoveFilter(key as keyof FilterParamsType)
                    }
                    color="default"
                    sx={{ bgcolor: "#d1d5db", fontWeight: "bold" }}
                  />
                );
              }

              if (
                Array.isArray(value) &&
                value[0] === 10000000 &&
                value[1] === 200000000
              ) {
                return (
                  <Chip
                    key={key}
                    label="Trên 10 triệu"
                    onDelete={() =>
                      handleRemoveFilter(key as keyof FilterParamsType)
                    }
                    color="default"
                    sx={{ bgcolor: "#d1d5db", fontWeight: "bold" }}
                  />
                );
              }

              if (
                Array.isArray(value) &&
                value[0] === 5000000 &&
                value[1] === 10000000
              ) {
                return (
                  <Chip
                    key={key}
                    label="5 - 10 triệu"
                    onDelete={() =>
                      handleRemoveFilter(key as keyof FilterParamsType)
                    }
                    color="default"
                    sx={{ bgcolor: "#d1d5db", fontWeight: "bold" }}
                  />
                );
              }

              return (
                <Chip
                  key={key}
                  label={
                    key === "price" && Array.isArray(value)
                      ? `${value[0].toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })} - ${value[1].toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}`
                      : value
                  }
                  onDelete={() =>
                    handleRemoveFilter(key as keyof FilterParamsType)
                  }
                  color="default"
                  sx={{ bgcolor: "#d1d5db", fontWeight: "bold" }}
                />
              );
            }
          return null;
        })}

        {/* Render "Xóa tất cả" button only if there are active filters */}
        {hasActiveFilters && (
          <Chip
            label="Xóa tất cả"
            onClick={handleClearAllFilters}
            sx={{
              color: "red",
              fontWeight: "bold",
              backgroundColor: "transparent",
            }}
          />
        )}
      </Box>
    );
  };

  const handleRemoveFilter = (key: keyof FilterParamsType) => {
    if (key === "price") priceResetRef.current?.resetSelection();
  };

  const handleClearAllFilters = () => {
    priceResetRef.current?.resetSelection();
  };

  const handlePriceRangeChange = async (newRange: number[]) => {
    if (!loading) {
      // Kiểm tra trạng thái loading
      // Cập nhật giá trị price trong filterParams
      setFilterParams((prev) => ({
        ...prev,
        price: newRange[1] === Infinity ? [newRange[0], 200000000] : newRange,
      }));
      console.log("Giá trị mới:", newRange); // In ra để kiểm tra
    }
  };

  // Clear the alert after 3 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <Box sx={{ display: "block", marginTop: "20px" }}>
      {/* Centered Modal Alert */}
      <Modal
        open={Boolean(alertMessage)}
        onClose={() => setAlertMessage(null)}
        aria-labelledby="alert-message"
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(3px)", // Optional: blur background
        }}
      >
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography id="alert-message">{alertMessage}</Typography>
        </Alert>
      </Modal>

      <Grid container sx={{ marginBottom: "20px" }}>
        {/* Bộ lọc bên trái */}
        <Grid item xs={3}>
          <Box
            sx={{
              marginLeft: "20px",
              padding: "10px",
              background: "white",
              borderRadius: "10px",
              position: "sticky", // Thay đổi thành 'sticky' để dính vào khi cuộn
              top: "20px", // Dính cách đầu trang 20px
              height: isSticky ? "fit-content" : "100%", // Khi cuộn, chuyển chiều cao thành 'fit-content'
              transition: "height 0.3s ease", // Chuyển đổi mượt mà khi thay đổi chiều cao
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyItems: "center",
                textAlign: "center",
                gap: "5px",
              }}
            >
              <ListSharp sx={{ fontSize: "30px" }} />
              <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                Bộ lọc tìm kiếm
              </Typography>
            </Box>

            {/* Hiển thị bộ lọc theo từng categoryName */}

            {/* Bộ lọc giá cho mọi danh mục */}
            <MenuRadioPriceSection
              title="Mức giá"
              onChange={handlePriceRangeChange}
              data={[
                { id: "Tất cả", label: "Tất cả", value: [0, 200000000] },
                { id: "under5", label: "Dưới 5 triệu", value: [0, 5000000] },
                {
                  id: "5to10",
                  label: "5 - 10 triệu",
                  value: [5000000, 10000000],
                },
                {
                  id: "above10",
                  label: "Trên 10 triệu",
                  value: [10000000, Infinity],
                },
              ]}
              resetRef={priceResetRef}
            />
          </Box>
        </Grid>

        {/* Danh sách sản phẩm bên phải */}
        <Grid item xs={9}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="fit-content"
            width="100%"
          >
            <Typography fontSize={"32px"} fontWeight={"bold"}>
              Kết quả tìm kiếm: {searchValue}
            </Typography>
          </Box>
          {loadItemFilters()}
          <Box
            display="flex"
            justifyContent="left"
            alignItems="center"
            height="fit-content"
            marginLeft={"10px"}
          >
            {!loading ? (
              <>
                <Box justifyContent="left" width={"80%"}>
                  <Typography fontSize={"15px"}>
                    Tìm thấy <b>{items.length}</b> sản phẩm
                  </Typography>
                </Box>

                <Typography
                  fontSize={"15px"}
                  justifyContent="right"
                  width={"5%"}
                >
                  Sắp xếp
                </Typography>

                <Box sx={{ width: "15%", justifyContent: "right" }}>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                      value={sort}
                      onChange={handleChange}
                      sx={{ height: "30px" }} // Adjust the height as needed
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="Nổi bật">Nổi bật</MenuItem>
                      <MenuItem value="Giá thấp nhất">Giá thấp nhất</MenuItem>
                      <MenuItem value="Giá cao nhất">Giá cao nhất</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </>
            ) : null}
          </Box>
          <Grid container justifyContent="left" alignItems="center">
            {/* Gọi hàm loadItemCards với delay */}
            {loading ? (
              <LoadingIndicator /> // Hiển thị loading khi đang tải thêm
            ) : (
              loadItemCards()
            )}
          </Grid>

          {/* Nút Xem thêm */}
          {items.length > itemsToShow && (
            <Box mt={4} display="flex" justifyContent="center">
              {!loading && loadingMore ? (
                <LoadingIndicator /> // Hiển thị loading khi đang tải thêm
              ) : !loading ? (
                <Button
                  variant="text"
                  onClick={handleShowMore}
                  sx={{
                    borderRadius: "99px",
                    color: "inherit",
                    fontSize: "14px",
                  }}
                >
                  Xem thêm {items.length - itemsToShow} kết quả
                </Button>
              ) : null}
            </Box>
          )}
        </Grid>
      </Grid>
      {comparisonList.length > 0 && (
        <Grid
          sx={{
            display: "flex",
            padding: "10px",
            gap: "10px",
            backgroundColor: "#21252b",
            justifyContent: "center",
            position: "sticky",
            bottom: "0px",
            marginTop: "20px",
            borderRadius: "20px 20px 0 0",
          }}
        >
          {comparisonList.map((item) => (
            <Chip
              sx={{
                backgroundColor: "white",
                height: "50px",
                width: "290px",
                fontSize: "16px",
                borderRadius: "8px",
                justifyContent: "left",
                ".MuiChip-avatar": {
                  width: 40, // Customize the avatar size if needed
                  height: 40,
                  borderRadius: 0,
                },
              }}
              key={item[0].product.id}
              label={item[0].product.name + " " + item[1]?.value}
              onDelete={() => handleCompareToggle(item[0], item[1], false)}
              avatar={<Avatar src={item[0].product.image} />}
            />
          ))}
          <Chip
            sx={{
              backgroundColor: "white",
              height: "50px",
              width: "fit-content",
              fontSize: "16px",
              borderRadius: "8px",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#e4e8ed", // Background color on hover
              },
            }}
            label={"Xoá tất cả"}
            onClick={() => {
              setComparisonList([]);
            }}
          />
          {comparisonList.length > 1 && (
            <Chip
              sx={{
                backgroundColor: "#e01516",
                color: "white",
                height: "50px",
                width: "fit-content",
                fontSize: "16px",
                borderRadius: "8px",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#e01516", // Background color on hover
                },
              }}
              label={"So sánh ngay"}
              onClick={compareProducts}
            />
          )}
        </Grid>
      )}
    </Box>
  );
};

export default SearchPage;
