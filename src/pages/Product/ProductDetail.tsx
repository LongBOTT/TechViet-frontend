import { Box, Breadcrumbs, Link, Typography, Grid, Chip, Button, Avatar, Divider, Grid2, Paper, Table, TableBody, TableCell, TableRow, Tab, Tabs } from '@mui/material';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CATEGORY } from '../../constants/routeConstants';
import PreviousButton from '../../assets/utils/PreviousButton';
import ForwardButton from '../../assets/utils/ForwardButton';
import ProductReviews from './ProductReview';

interface ProductDetailProps {}

interface Product {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  installmentPrice: number;
  storageOptions: string[];
  colorOptions: { name: string, imageUrl: string }[]; // Array of objects to store color and image mapping
  promotions: string[];
  reviewContent: string;
  specifications: {
    general: {
      origin: string;
      launchDate: string;
      warranty: string;
    };
    design: {
      dimensions: string;
      weight: string;
      waterResistance: string;
      material: string;
    };
    processor: {
      cpu: string;
      coreCount: string;
      ram: string;
    };
    display: {
      size: string;
      type: string;
      resolution: string;
      brightness: string;
      contrast: string;
      glass: string;
    };
    storage: {
      rom: string;
      expandable: string;
    };
    camera: {
      rear: string;
      front: string;
      rearVideo: string;
      selfieVideo: string;
      features: string[];
    };
    sensors: string[];
    connectivity: {
      sim: string;
      network: string;
      usb: string;
      wifi: string;
      bluetooth: string;
      gps: string[];
    };
    battery: {
      type: string;
      capacity: string;
      fastCharging: string;
      wirelessCharging: string;
      reverseCharging: string;
    };
    os: string;
    accessories: string[];
  };
}

const ProductDetail: FC<ProductDetailProps> = (): ReactElement => {
  const params = useParams<{ id: string }>();
  const safeProductId = parseInt(params.id?.replace(':', '') || "0", 10);
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);
  const [isSpecificationsExpanded, setIsSpecificationsExpanded] = useState(false);
  // State to hold product data
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0); // Tracks the current color index for image
  const [tabIndex, setTabIndex] = useState(0);
  // Fetch product data (simulate with hardcoded data)
  useEffect(() => {
    const fetchProductData = async () => {
      const mockProductData: Product = {
        id: safeProductId,
        name: 'iPhone 16 Pro Max 256GB',
        rating: 5.0,
        reviews: 138,
        price: 34990000,
        installmentPrice: 1448342,
        storageOptions: ['256 GB', '512 GB', '1 TB'],
        colorOptions: [
          { name: 'Titan Sa Mạc', imageUrl: '/src/assets/products/2023_9_15_638303947975273507_iphone-15-den-1.jpg' },
          { name: 'Titan Tự Nhiên', imageUrl: '/src/assets/products/2023_9_15_638303947975273507_iphone-15-den-1.jpg' },
          { name: 'Titan Trắng', imageUrl: '/src/assets/products/2023_9_15_638303947975273507_iphone-15-den-1.jpg' },
          { name: 'Titan Đen', imageUrl: '/src/assets/products/2023_9_15_638303947975273507_iphone-15-den-1.jpg' },
        ],
        promotions: [
          'Chủ thẻ NCB: Giảm thêm 10% tối đa 500,000đ cho đơn hàng khi thanh toán qua thẻ NCB.',
          'Giảm ngay 1,000,000đ khi mua trả góp qua thẻ tín dụng.',
        ],
        reviewContent: `Mô tả Sản phẩm

iPhone 15 – Trải nghiệm đỉnh cao với thiết kế sang trọng và công nghệ tiên tiến

1. Thiết kế thanh lịch và độ bền vượt trội
iPhone 15 tiếp tục gây ấn tượng mạnh với thiết kế thanh lịch, được hoàn thiện từ chất liệu nhôm tiêu chuẩn hàng không kết hợp mặt kính Ceramic Shield bền bỉ. Với 5 tùy chọn màu sắc pastel tinh tế gồm Hồng, Xanh lá, Vàng, Xanh lam, và Đen, sản phẩm đem lại cảm giác sang trọng và hiện đại. Thiết kế bo cong nhẹ nhàng ở cạnh viền tạo cảm giác cầm nắm dễ chịu và thuận tiện khi sử dụng.

2. Màn hình Dynamic Island độc đáo
Màn hình Super Retina XDR 6.1 inch trên iPhone 15 được cải tiến với công nghệ Dynamic Island, cho phép người dùng dễ dàng theo dõi thông báo, cuộc gọi đến, phần trăm pin, và các thông tin quan trọng một cách trực quan. Độ sáng tối đa đạt đến 2000 nits, giúp hiển thị ngoài trời rõ nét hơn bao giờ hết.

3. Camera 48MP vượt trội
Camera chính 48MP của iPhone 15 cho phép chụp ảnh siêu nét và sắc sảo. Với các tùy chọn zoom linh hoạt 0.5x, 1x, và 2x, người dùng có thể chụp ảnh phong cảnh rộng và cả các chi tiết gần mà vẫn giữ được chất lượng cao. Tính năng Photonic Engine giúp cải thiện chất lượng ảnh trong điều kiện ánh sáng yếu, mang đến trải nghiệm chụp ảnh chân dung và phong cảnh tuyệt vời.

4. Hiệu năng mạnh mẽ với chip A16 Bionic
iPhone 15 được trang bị chip A16 Bionic, hỗ trợ khả năng xử lý nhanh chóng các tác vụ nặng và mang lại trải nghiệm chơi game mượt mà. GPU được cải tiến mạnh hơn 40% so với các thế hệ trước, giúp tối ưu đồ họa khi chỉnh sửa ảnh, video, và chơi game.

5. Sạc nhanh và kết nối USB-C đa năng
Lần đầu tiên, iPhone 15 sử dụng cổng kết nối USB-C thay cho Lightning, đem lại khả năng sạc và truyền dữ liệu nhanh chóng. Cổng USB-C cũng cho phép sạc ngược cho các thiết bị khác như AirPods và Apple Watch.

Các phiên bản iPhone 15 series

iPhone 15: Màn hình 6.1 inch, bộ nhớ trong 128GB, 256GB, và 512GB.
iPhone 15 Plus: Màn hình 6.7 inch, pin dung lượng lớn.
iPhone 15 Pro: Khung titanium, chip A17 Pro, màn hình 6.1 inch.
iPhone 15 Pro Max: Màn hình lớn nhất 6.7 inch, camera tele 5x, chip mạnh nhất hiện nay.`,
      specifications: {
        general: {
          origin: 'China',
          launchDate: '09/2023',
          warranty: '12 months'
        },
        design: {
          dimensions: '147.6 x 71.6 x 7.8 mm',
          weight: '171 g',
          waterResistance: 'IP68',
          material: 'Aluminum frame, Glass back'
        },
        processor: {
          cpu: 'Apple A16 Bionic',
          coreCount: '6 cores',
          ram: '6 GB'
        },
        display: {
          size: '6.1 inch',
          type: 'OLED',
          resolution: '2556 x 1179 Pixels',
          brightness: '2000 nits',
          contrast: '2,000,000:1',
          glass: 'Ceramic Shield'
        },
        storage: {
          rom: '256 GB',
          expandable: 'No'
        },
        camera: {
          rear: '48 MP (standard) + 12 MP (ultra wide)',
          front: '12 MP',
          rearVideo: '4K, 1080p at 60fps',
          selfieVideo: '4K, 1080p, Slow Motion',
          features: ['Slow Motion', 'Portrait Mode', 'Wide Angle', 'HDR', 'OIS', 'Auto Focus']
        },
        sensors: ['Barometer', 'Gyroscope', 'Light Sensor', 'Accelerometer', 'Proximity Sensor'],
        connectivity: {
          sim: '1 eSIM, 1 Nano SIM',
          network: '5G',
          usb: 'USB-C',
          wifi: 'Wi-Fi 6',
          bluetooth: 'Bluetooth 5.3',
          gps: ['GLONASS', 'GALILEO', 'QZSS', 'BEIDOU']
        },
        battery: {
          type: 'Lithium-ion',
          capacity: '20 hours video playback',
          fastCharging: 'Yes',
          wirelessCharging: 'Yes',
          reverseCharging: 'Yes'
        },
        os: 'iOS 17',
        accessories: ['USB-C to USB-C Cable', 'SIM eject tool', 'User Manual']
      }
      };
      setProduct(mockProductData);
      setSelectedStorage(mockProductData.storageOptions[0]);
    };

    fetchProductData();
  }, [safeProductId]);

  // Carousel navigation functions
  const handlePreviousImage = () => {
    setSelectedColorIndex((prevIndex) => 
      prevIndex === 0 ? product!.colorOptions.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedColorIndex((prevIndex) => 
      prevIndex === product!.colorOptions.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box p={4} sx={{ backgroundColor: "#FFFFFF" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href={`${CATEGORY}/:1`}>
          Điện thoại
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Left Section: Image and Thumbnails */}
        <Grid item xs={12} md={7}>
          <Box display="flex">
            {/* Previous Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PreviousButton onClick={handlePreviousImage} />
            </Box>

            <Box>
              <Box textAlign="center" mt={2}>
                <img
                  src={product.colorOptions[selectedColorIndex].imageUrl}
                  alt={product.colorOptions[selectedColorIndex].name}
                  style={{ width: "60%", height: "60%" }}
                />
              </Box>

              {/* Color Thumbnails */}
              <Box display="flex" justifyContent="center" gap={1} mt={2}>
                {product.colorOptions.map((color, index) => (
                  <Avatar
                    key={color.name}
                    src={color.imageUrl}
                    alt={color.name}
                    variant="square"
                    sx={{
                      borderRadius: "8px",
                      padding: "5px",
                      width: 60,
                      height: 60,
                      border:
                        selectedColorIndex === index
                          ? "2px solid #f50057"
                          : "none",
                    }}
                    onClick={() => setSelectedColorIndex(index)}
                  />
                ))}
              </Box>
            </Box>

            {/* Next Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ForwardButton onClick={handleNextImage} />
            </Box>
          </Box>
        </Grid>

        {/* Right Section: Product Details */}
        <Grid item xs={12} md={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Mã sản phẩm: {product.id} • Đánh giá: {product.rating}⭐ (
            {product.reviews} đánh giá)
          </Typography>

          {/* Storage Options */}
          <Typography variant="h6" mt={3} mb={1}>
            Dung lượng
          </Typography>
          <Box display="flex" gap={1}>
            {product.storageOptions.map((option) => (
              <Chip
                sx={{
                  borderRadius: "8px",
                  borderColor: selectedStorage === option ? "red" : "default",
                  "&::before":
                    selectedStorage === option
                      ? {
                          content: '""',
                          position: "absolute",
                          top: -1,
                          right: -1,
                          width: "15px",
                          height: "15px",
                          backgroundColor: "red",
                          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                        }
                      : {},
                  "&::after":
                    selectedStorage === option
                      ? {
                          content: '"✓"',
                          position: "absolute",
                          top: 0,
                          right: 1,
                          fontSize: "7px",
                          color: "white",
                        }
                      : {},
                }}
                key={option}
                label={option}
                variant={"outlined"}
                onClick={() => setSelectedStorage(option)}
              />
            ))}
          </Box>

          {/* Color Options */}
          <Typography variant="h6" mt={3} mb={1}>
            Màu sắc
          </Typography>
          <Box display="flex" gap={1}>
            {product.colorOptions.map((color, index) => (
              <Chip
                sx={{
                  borderRadius: "8px",
                  borderColor: selectedColorIndex === index ? "red" : "default",
                  "&::before":
                    selectedColorIndex === index
                      ? {
                          content: '""',
                          position: "absolute",
                          top: -1,
                          right: -1,
                          width: "15px",
                          height: "15px",
                          backgroundColor: "red",
                          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                        }
                      : {},
                  "&::after":
                    selectedColorIndex === index
                      ? {
                          content: '"✓"',
                          position: "absolute",
                          top: 0,
                          right: 1,
                          fontSize: "7px",
                          color: "white",
                        }
                      : {},
                }}
                key={color.name}
                label={color.name}
                // color={selectedColorIndex === index ? '#000000' : 'default'}
                variant={"outlined"}
                onClick={() => setSelectedColorIndex(index)}
              />
            ))}
          </Box>

          {/* Price and Installment */}
          <Box mt={3} mb={2}>
            <Typography variant="h4" fontWeight="bold">
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Hoặc trả góp {product.installmentPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/tháng
            </Typography> */}
          </Box>

          {/* Purchase and Installment Buttons */}
          <Box mt={2} mb={2}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#e01516",
                color: "white",
                borderRadius: "20px",
                mr: 2,
              }}
            >
              Mua ngay
            </Button>
            {/* <Button variant="outlined" color="primary" size="large" sx={{ borderRadius: '20px' }}>
              Trả góp
            </Button> */}
          </Box>

          {/* Promotions */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Khuyến mãi thanh toán
          </Typography>
          {product.promotions.map((promo, index) => (
            <Typography
              key={index}
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              - {promo}
            </Typography>
          ))}
        </Grid>
      </Grid>

      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Mô tả sản phẩm" />
        <Tab label="Thông số kỹ thuật" />
      </Tabs>

      <Box mt={3}>
        {tabIndex === 0 && (
          <Paper elevation={3} sx={{ p: 3, margin: "50px" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Mô tả sản phẩm
            </Typography>
            <Typography variant="body1" gutterBottom>
              {isReviewExpanded
                ? product.reviewContent
                : `${product.reviewContent.slice(0, 150)}...`}
            </Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => setIsReviewExpanded(!isReviewExpanded)}
            >
              {isReviewExpanded ? "Rút gọn" : "Đọc thêm"}
            </Button>
          </Paper>
        )}

        {tabIndex === 1 && (
          <Paper elevation={3} sx={{ p: 3, margin: "50px" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Thông số kỹ thuật
            </Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Xuất xứ</TableCell>
                  <TableCell>{product.specifications.general.origin}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Thời điểm ra mắt</TableCell>
                  <TableCell>
                    {product.specifications.general.launchDate}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bảo hành</TableCell>
                  <TableCell>
                    {product.specifications.general.warranty}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Kích thước</TableCell>
                  <TableCell>
                    {product.specifications.design.dimensions}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Trọng lượng</TableCell>
                  <TableCell>{product.specifications.design.weight}</TableCell>
                </TableRow>
                {isSpecificationsExpanded && (
                  <>
                    <TableRow>
                      <TableCell>Chống nước / Bụi</TableCell>
                      <TableCell>
                        {product.specifications.design.waterResistance}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CPU</TableCell>
                      <TableCell>
                        {product.specifications.processor.cpu}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Màn hình</TableCell>
                      <TableCell>
                        {product.specifications.display.size},{" "}
                        {product.specifications.display.type}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Độ phân giải</TableCell>
                      <TableCell>
                        {product.specifications.display.resolution}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pin</TableCell>
                      <TableCell>
                        {product.specifications.battery.capacity}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Hệ điều hành</TableCell>
                      <TableCell>{product.specifications.os}</TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
            <Button
              variant="text"
              color="primary"
              onClick={() =>
                setIsSpecificationsExpanded(!isSpecificationsExpanded)
              }
              sx={{ mt: 1 }}
            >
              {isSpecificationsExpanded ? "Rút gọn" : "Xem thêm"}
            </Button>
          </Paper>
        )}
      </Box>

      <ProductReviews />
    </Box>
  );
};

export default ProductDetail;
