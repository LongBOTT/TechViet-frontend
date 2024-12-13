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
  Chip,
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
import { getSuppliers, searchSupplierByName } from "../../../api/supplierApi";
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
import { stockReceiveDetailRequest } from "../../../types/import";
import { stockReceiveRequest } from "../../../types/import";
import { currencyFormatter } from "../../components/Util/Formatter";
import { createStockReceive } from "../../../api/stock_receiveApi";
import { createStockReceiveDetail } from "../../../api/stock_receive_detailApi";
import { checkImeiExists, createImei } from "../../../api/imeiApi";
import LoadingSnackbar from "../../components/Util/LoadingSnackbar";

export default function AddImportPage() {
  const navigate = useNavigate();
  const [resetFilter, setResetFilter] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  // State cho danh sách sản phẩm đã chọn
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  // State cho phiếu nhập (importRequest)
  const [stockReceiveRequest, setStockReceiveRequest] =
    useState<stockReceiveRequest>({
      id: 0,
      receive_date: new Date().toISOString().slice(0, 19),
      total: 0,
      note: "",
      supplierId: 0,
    });

  // State cho danh sách chi tiết phiếu nhập
  const [stockReceiveDetails, setStockReceiveDetails] = useState<
    stockReceiveDetailRequest[]
  >([]);
  const [productWithVariants, setProductWithVariants] =
    useState<ProductWithVariants[]>();
  const [transformedProducts, setTransformedProducts] = useState<any[]>([]);
  const onGoBack = () => {
    navigate("/Admin/import");
  };
  const totalAmount = selectedProducts.reduce(
    (acc, product) => acc + product.total,
    0
  );

  const totalQuantity = selectedProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const totalItems = selectedProducts.length;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const onSave = async () => {
    if (selectedProducts.length === 0) {
      showSnackbar("Vui lòng chọn ít nhất một sản phẩm trước khi lưu.");
      return;
    }
    if (stockReceiveRequest.supplierId === 0) {
      showSnackbar("Vui lòng chọn nhà cung cấp trước khi lưu.");
      return;
    }
    for (const product of selectedProducts) {
      if (
        product.warrantyId !== 0 &&
        product.imeis.length !== product.quantity
      ) {
        showSnackbar(
          `Phiên bản ${product.variantName} có số lượng IMEI không khớp với số lượng phiên bản`
        );
        return;
      }
      // Kiểm tra sự tồn tại của từng IMEI
      for (const imei of product.imeis) {
        const exists = await checkImeiExists(imei);
        if (exists) {
          showSnackbar(`IMEI ${imei} đã tồn tại trong hệ thống.`);
          return; // Dừng quá trình lưu nếu IMEI đã tồn tại
        }
      }
    }

    const newStockReceiveRequest = {
      ...stockReceiveRequest,
      total: totalAmount,
    };
    try {
      // Gửi `StockReceiveRequest` lên server và nhận lại `id`
      const response = await createStockReceive(newStockReceiveRequest);
      const importId = response.id; // Đảm bảo rằng `id` tồn tại trong phản hồi

      // Tạo `stockReceiveDetails` dựa trên `selectedProducts` và `importId`
      const newStockReceiveDetails = selectedProducts.map((product) => ({
        id: 0, // ID sẽ do server tự động tạo
        stockReceiveId: importId,
        variantId: product.variantId,
        quantity: product.quantity,
        price: product.price,
      }));

      // Gọi API để lưu chi tiết phiếu nhập và nhận lại `id` thực tế
      const savedDetails = await Promise.all(
        newStockReceiveDetails.map((detail) => createStockReceiveDetail(detail))
      );

      // Lưu IMEI nếu sản phẩm có `imeis` và `warrantyId` khác 0
      const imeiRequests = savedDetails.flatMap((detail, index) => {
        const product = selectedProducts[index];
        if (product.imeis && product.imeis.length > 0) {
          return product.imeis.map((imei: string) => ({
            id: 0,
            imei_code: imei,
            receiveDetailId: detail.id,
            status: "available",
          }));
        }
        return [];
      });

      // Gọi API để lưu từng IMEI vào database
      if (imeiRequests.length > 0) {
        await Promise.all(imeiRequests.map((imei) => createImei(imei)));
      }
      showSnackbar("Lưu thành công");
      navigate("/Admin/import");
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
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

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = await getSuppliers();
      setSuppliers(data || []);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
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

  const SupplierOptions = suppliers.map((supplier: any) => ({
    value: supplier.id,
    label: supplier.name,
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
    fetchSuppliers();
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
        price: currencyFormatter.format(variant.price),
        costPrice: currencyFormatter.format(variant.costPrice),
        name: product.name,
        brandName: product.brand.name,
        categoryName: product.category.name,
        warrantyId: product.warranty.id,
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
    setSelectedProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (item) => item.variantId === product.id
      );
      if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, hiển thị thông báo
        showSnackbar("Phiên bản đã được chọn!");
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
          imeis: [] as string[], // Khởi tạo mảng imeis rỗng
        },
      ];
    });
  };
  // / Hàm xử lý thay đổi ngày nhập
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value; // Định dạng là yyyy-MM-dd từ TextField
    const formattedDate = `${selectedDate}T00:00:00`; // Thêm thời gian để tạo định dạng yyyy-MM-ddTHH:mm:ss

    setStockReceiveRequest((prevRequest) => ({
      ...prevRequest,
      receive_date: formattedDate, // Cập nhật đúng định dạng cho backend
    }));
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
                onSearch={searchProductsWithVariantsByName}
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
                  <React.Fragment key={product.variantId}>
                    <TableRow>
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
                              parseFloat(e.target.value.replace(/\D/g, "")) ||
                              0;
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
                    {product.warrantyId !== 0 && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                              alignItems: "center",
                              gap: 1,
                              mt: 1,
                            }}
                          >
                            {product.imeis?.map(
                              (imei: string, index: number) => (
                                <Chip
                                  key={index}
                                  label={imei}
                                  onDelete={() => {
                                    setSelectedProducts((prevProducts) =>
                                      prevProducts.map((item) =>
                                        item.variantId === product.variantId
                                          ? {
                                              ...item,
                                              imeis: item.imeis
                                                ? item.imeis.filter(
                                                    (_: unknown, i: number) =>
                                                      i !== index
                                                  )
                                                : [],
                                              quantity:
                                                item.imeis.length - 1 > 0
                                                  ? item.imeis.length - 1
                                                  : 0, // Cập nhật lại số lượng
                                            }
                                          : item
                                      )
                                    );
                                  }}
                                  color="primary"
                                />
                              )
                            )}
                            <TextField
                              variant="outlined"
                              size="small"
                              placeholder="Nhập số IMEI"
                              onKeyDown={(
                                e: React.KeyboardEvent<HTMLInputElement>
                              ) => {
                                if (e.key === "Enter") {
                                  const input = e.target as HTMLInputElement;
                                  const newImei = input.value.trim();
                                  if (newImei) {
                                    const imeiExists = selectedProducts.some(
                                      (item) => item.imeis.includes(newImei)
                                    );

                                    if (imeiExists) {
                                      showSnackbar(
                                        "IMEI này đã tồn tại trong hệ thống. Vui lòng nhập IMEI khác."
                                      );
                                    } else {
                                      setSelectedProducts((prevProducts) =>
                                        prevProducts.map((item) =>
                                          item.variantId === product.variantId
                                            ? {
                                                ...item,
                                                imeis: [...item.imeis, newImei],
                                                quantity: [
                                                  ...item.imeis,
                                                  newImei,
                                                ].length, // Cập nhật số lượng bằng số IMEI
                                              }
                                            : item
                                        )
                                      );
                                      input.value = ""; // Xóa trường nhập sau khi thêm
                                    }
                                  }
                                }
                              }}
                              sx={{
                                flex: 1, // Để text field tự giãn rộng khi có nhiều IMEI
                                minWidth: 200, // Đặt chiều rộng tối thiểu
                              }}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
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
                label="Ngày nhập"
                type="date"
                variant="outlined"
                fullWidth
                value={stockReceiveRequest.receive_date.slice(0, 10)} // Hiển thị phần yyyy-MM-dd cho người dùng
                onChange={handleDateChange}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <Box sx={{ width: "100%", marginBottom: "20px" }}>
                <FilterDropdown
                  label="Nhà cung cấp"
                  options={SupplierOptions}
                  onFilterChange={(value) =>
                    setStockReceiveRequest((prevRequest) => ({
                      ...prevRequest,
                      supplierId: Number(value),
                    }))
                  }
                  resetFilter={resetFilter}
                  sx={{ width: "100%", height: "50px" }}
                />
              </Box>
              <TextField
                label="Ghi chú"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
              />
              <Box sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">Tổng số lượng:</Typography>
                  <Typography variant="body1">
                    <strong>{totalQuantity}</strong>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">Tổng số mặt hàng:</Typography>
                  <Typography variant="body1">
                    <strong>{totalItems}</strong>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">Tổng tiền hàng:</Typography>
                  <Typography variant="body1">
                    <strong>{totalAmount.toLocaleString("vi-VN")}</strong>
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={onSave}
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{
                    textTransform: "none",
                    marginRight: "0px",
                    height: 40,
                    width: 100,
                    bgcolor: "rgb(25, 118, 210)",
                  }}
                >
                  Lưu
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
      <LoadingSnackbar
        loading={loading}
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}
