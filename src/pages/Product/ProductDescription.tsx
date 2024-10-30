import React, { useState } from "react";
import { Box, Typography, Grid, Divider, Button } from "@mui/material";

interface ProductDescriptionProps {
  images: { src: string; alt: string }[];
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ images }) => {
  const [expandedSections, setExpandedSections] = useState<boolean[]>(
    Array(7).fill(false)
  );

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const newExpandedSections = [...prev];
      newExpandedSections[index] = !newExpandedSections[index];
      return newExpandedSections;
    });
  };

  // Descriptions for each section with truncated previews and full text
  const descriptions = [
    {
      title: "Thiết kế đầy màu sắc và bền bỉ",
      preview:
        "iPhone 16 Plus mang đến thiết kế thanh lịch, với các tùy chọn màu sắc pastel đẹp mắt...",
      fullText:
        "iPhone 16 Plus mang đến thiết kế thanh lịch, với các tùy chọn màu sắc pastel đẹp mắt: Đen, Trắng, Hồng, Xanh Mòng Két và Xanh Lưu Ly. Khung nhôm chuẩn hàng không vũ trụ và mặt kính Ceramic Shield giúp tăng độ bền và sự sang trọng.",
    },
    {
      title: "Nhiếp ảnh đột phá với nút Điều Khiển Camera",
      preview:
        "Nút Điều Khiển Camera mới giúp người dùng truy cập nhanh camera...",
      fullText:
        "Nút Điều Khiển Camera mới giúp người dùng truy cập nhanh camera, căn chỉnh dễ dàng các chế độ quay chụp, và thay đổi độ sâu trường ảnh. Thao tác linh hoạt chỉ với một nút bấm cho trải nghiệm nhiếp ảnh thuận tiện hơn bao giờ hết.",
    },
    {
      title: "Chụp ảnh sắc nét với hệ thống camera mới",
      preview:
        "Camera Fusion 48MP giúp chụp ảnh sắc nét, với khả năng zoom quang học 2x...",
      fullText:
        "Camera Fusion 48MP giúp chụp ảnh sắc nét, với khả năng zoom quang học 2x. Camera Ultra Wide hỗ trợ chụp ảnh macro chi tiết, bắt nét nhanh chóng và cải thiện khả năng thu sáng cho bức ảnh hoàn hảo trong mọi điều kiện.",
    },
    {
      title: "Biến tấu ảnh chụp với Phong Cách Nhiếp Ảnh",
      preview:
        "Tính năng Phong Cách Nhiếp Ảnh cho phép người dùng thay đổi diện mạo bức ảnh...",
      fullText:
        "Tính năng Phong Cách Nhiếp Ảnh cho phép người dùng thay đổi diện mạo bức ảnh theo phong cách riêng. Với chip A18, bạn có thể xem trước hiệu ứng chỉnh sửa với độ chính xác cao, tạo nên những bức ảnh độc đáo và cá nhân.",
    },
    {
      title: "Tốc độ vượt trội của chip A18",
      preview: "iPhone 16 Plus trang bị chip A18 với CPU 6 lõi và GPU 5 lõi...",
      fullText:
        "iPhone 16 Plus trang bị chip A18 với CPU 6 lõi và GPU 5 lõi, nhanh hơn 30% và 40% so với các thế hệ trước. Chip này không chỉ nâng cao trải nghiệm chơi game mà còn tối ưu hoá các tác vụ đa nhiệm và nhiếp ảnh.",
    },
    {
      title: "Cuộc bứt phá mạnh mẽ về trải nghiệm pin",
      preview:
        "Với thời gian xem video lên đến 27 giờ, iPhone 16 Plus mang đến thời lượng pin vượt trội...",
      fullText:
        "Với thời gian xem video lên đến 27 giờ, iPhone 16 Plus mang đến thời lượng pin vượt trội. Nhờ tái thiết kế bên trong và chip A18 tiết kiệm điện, bạn có thể thoải mái sử dụng suốt ngày dài mà không lo hết pin.",
    },
    {
      title: "Trải nghiệm tiện dụng hơn nhờ nút Tác Vụ",
      preview:
        "Nút Tác Vụ đa năng trên cạnh trái của iPhone 16 Plus cho phép người dùng kích hoạt nhanh...",
      fullText:
        "Nút Tác Vụ đa năng trên cạnh trái của iPhone 16 Plus cho phép người dùng kích hoạt nhanh các chức năng như đèn pin, thu âm, dịch thuật, và nhiều hơn nữa, tùy biến theo nhu cầu sử dụng.",
    },
  ];

  return (
    <Box p={4} sx={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h6" fontWeight="bold" height={'45px'}>
        Thông tin sản phẩm
      </Typography>

      {descriptions.map((desc, index) => (
        <Box key={index}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            direction={index % 2 === 1 ? "row-reverse" : "row"}
          >
            <Grid item xs={12} md={5} sx={{ backgroundColor: "white" }}>
              <img
                src={images[index].src}
                alt={images[index].alt}
                style={{
                  width: "80%",
                  borderRadius: "8px",
                  backgroundColor: "white",
                }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h5" fontWeight="bold">
                {desc.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {expandedSections[index] ? desc.fullText : desc.preview}
              </Typography>
              <Button
                onClick={() => toggleSection(index)}
                variant="text"
                color="primary"
                sx={{ mt: 1 }}
              >
                {expandedSections[index] ? "Rút gọn" : "Xem thêm"}
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
        </Box>
      ))}
    </Box>
  );
};

export default ProductDescription;
