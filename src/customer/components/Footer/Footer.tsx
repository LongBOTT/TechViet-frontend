import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

export const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#202020', color: '#fff', padding: '40px' }}>
            <Grid container spacing={3}>

                {/* Social Media and Contact */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom>KẾT NỐI VỚI TECHVIET</Typography>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <img
                            src={"src/assets/icons/facebook_icon.svg"}
                            alt={"Facebook"}/>
                        <img
                            src={"src/assets/icons/zalo_icon.svg"}
                            alt={"Zalo"}/>
                        <img
                            src={"src/assets/icons/youtube_icon.svg"}
                            alt={"Youtube"}/>
                        <img
                            src={"src/assets/icons/tiktok_icon.svg"}
                            alt={"TikTok"}/>
                    </Box>

                    <Box sx={{ marginTop: '20px' }}>
                        <Typography variant="body1">TỔNG ĐÀI MIỄN PHÍ</Typography>
                        <Typography variant="body2">Tư vấn mua hàng (Miễn phí)</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>1800.6601 (Nhánh 1)</Typography>
                        <Typography variant="body2">Hỗ trợ kỹ thuật</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>1800.6601 (Nhánh 2)</Typography>
                        <Typography variant="body2">Góp ý, khiếu nại</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>1800.6616 (8h00 - 22h00)</Typography>
                    </Box>
                </Grid>

                {/* About Us */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom>VỀ CHÚNG TÔI</Typography>
                    <Typography variant="body2">Giới thiệu về công ty</Typography>
                    <Typography variant="body2">Quy chế hoạt động</Typography>
                    <Typography variant="body2">T.Friends - Bạn đồng hành</Typography>
                    <Typography variant="body2">Tin tức khuyến mại</Typography>
                    <Typography variant="body2">Giới thiệu máy đổi trả</Typography>
                    <Typography variant="body2">Hướng dẫn mua hàng & thanh toán online</Typography>
                    <Typography variant="body2">Đại lý ủy quyền và TTBH uỷ quyền của Apple</Typography>
                    <Typography variant="body2">Tra cứu hoá đơn điện tử</Typography>
                    <Typography variant="body2">Tra cứu bảo hành</Typography>
                    <Typography variant="body2">Câu hỏi thường gặp</Typography>
                </Grid>

                {/* Policies */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom>CHÍNH SÁCH</Typography>
                    <Typography variant="body2">Chính sách bảo hành</Typography>
                    <Typography variant="body2">Chính sách đổi trả</Typography>
                    <Typography variant="body2">Chính sách bảo mật</Typography>
                    <Typography variant="body2">Chính sách khui hộp sản phẩm</Typography>
                    <Typography variant="body2">Chính sách giao hàng & lắp đặt</Typography>
                    <Typography variant="body2">Chính sách thu thập & xử lý dữ liệu cá nhân</Typography>
                    <Typography variant="body2">Quy định về hỗ trợ kỹ thuật & sao lưu dữ liệu</Typography>
                </Grid>

                {/* Payment Methods and Certifications */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" gutterBottom>HỖ TRỢ THANH TOÁN</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <img src="src/assets/icons/vnpay_icon.svg" alt="Visa" style={{ width: '40px' }} />
                    </Box>

                    <Box sx={{ marginTop: '20px' }}>
                        <Typography variant="h6" gutterBottom>CHỨNG NHẬN</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            <img src="src/assets/icons/da_thong_bao_bo_cong_thuong_icon.svg" alt="Bộ Công Thương" style={{ width: '50px' }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ marginTop: '30px', textAlign: 'center', fontSize: '12px', borderTop: '1px solid #444', paddingTop: '10px' }}>
                © 2007 - 2024 Công Ty TNHH TECHVIET • Địa chỉ: 273 An Dương Vương, P3, Q5, TP. Hồ Chí Minh.
            </Box>
        </Box>
  );
}

export default Footer