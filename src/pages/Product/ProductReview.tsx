import { Box, Typography, Button, Grid, TextField, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, IconButton, Chip, Modal, Alert, AlertColor } from '@mui/material';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Star, StarBorder, Send } from '@mui/icons-material';
import { Review } from '../../types/review';
import { useParams } from 'react-router-dom';
import { createReview, getReviewsByProductId } from '../../api/reviewApi';
import { Product } from '../../types/product';
import { searchProductBy_Id } from '../../api/productApi';
import { Customer } from '../../types/customer';

const ProductReviews: FC = (): ReactElement => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const params = useParams<{ id: string }>();
  const safeProductId = parseInt(params.id?.replace(":", "") || "0", 10);
  const filteredReviews = selectedRating ? reviews.filter(review => review.rating === selectedRating) : reviews;
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [product, setProduct] = useState<Product>();

  const loadReviewsByProduct = async () => {
    const reiewList = await getReviewsByProductId(safeProductId)
    const prod = await searchProductBy_Id(safeProductId)

    setReviews(reiewList);
    setProduct(prod);
  }

  useEffect(() => {
    loadReviewsByProduct();
  }, [safeProductId]);

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("phone");
    if (!token) {
      setSeverity("warning")
      setAlertMessage("Vui lòng đăng nhập và điền thông tin để sử dụng chức năng")
      return
    };
    if (newComment.trim()) {
      if (product) {
        // Tạo đối tượng khách hàng
        let customer: Customer = {
          name: "",
          phone: token,
          email: "",
          address: "",
          distinct: "",
          city: "",
        };
        console.log(product)
        const newReview: Review = {
          product: product,
          customer: customer,
          rating: newRating,
          comment: newComment,
          created_at: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1),
        };
        const newRe = await createReview(newReview)  
        setReviews([newRe, ...reviews]);
      }
      
    }
  };
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <Box p={3} margin={"50px"}>
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
        <Alert severity={severity} sx={{ mb: 2 }}>
          <Typography id="alert-message">{alertMessage}</Typography>
        </Alert>
      </Modal>
      <Typography variant="h5" fontWeight="bold">
        Khách hàng nói về sản phẩm
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
        <Grid item xs={12} md={3}>
          {/* <Typography variant="h2" fontWeight="bold">
            {(
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)}
          </Typography> */}
          <Typography>{reviews.length} lượt đánh giá</Typography>
          <Button variant="contained" color="error" sx={{ mt: 2 }}>
            Đánh giá sản phẩm
          </Button>
        </Grid>
        <Grid item xs={12} md={9}>
          {[5, 4, 3, 2, 1].map((star) => (
            <Box key={star} display="flex" alignItems="center">
              <Typography>
                {star} <Star sx={{ color: "yellow" }} fontSize="small" />
              </Typography>
              <Box
                flex={1}
                mx={2}
                height="10px"
                bgcolor="grey.300"
                position="relative"
              >
                <Box
                  width={`${
                    (reviews.filter((r) => r.rating === star).length /
                      reviews.length) *
                    100
                  }%`}
                  height="100%"
                  bgcolor="red"
                />
              </Box>
              <Typography>
                {reviews.filter((r) => r.rating === star).length}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>

      {/* Filter by rating */}
      <Box display="flex" justifyContent="center" mt={3} gap={1}>
        <Chip
          label="Tất cả"
          variant={!selectedRating ? "filled" : "outlined"}
          onClick={() => setSelectedRating(null)}
        />
        {[5, 4, 3, 2, 1].map((star) => (
          <Chip
            key={star}
            label={
              <>
                <Star sx={{ color: "yellow" }} fontSize="small" /> {star}
              </>
            }
            variant={selectedRating === star ? "filled" : "outlined"}
            onClick={() => setSelectedRating(star)}
          />
        ))}
      </Box>

      {/* Comment Input */}
      <Box mt={3}>
        <Typography variant="h6">Bình luận</Typography>
        <Box display="flex" gap={2} mt={1} alignItems="center">
          <TextField
            placeholder="Nhập nội dung bình luận"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <IconButton color="primary" onClick={handleCommentSubmit}>
            <Send />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography>Đánh giá:</Typography>
          {[1, 2, 3, 4, 5].map((star) => (
            <IconButton
              key={star}
              color={star <= newRating ? "primary" : "default"}
              onClick={() => setNewRating(star)}
            >
              {star <= newRating ? (
                <Star sx={{ color: "yellow" }} />
              ) : (
                <StarBorder />
              )}
            </IconButton>
          ))}
        </Box>
      </Box>

      {/* Comment List */}
      <Divider sx={{ my: 3 }} />
      <List>
        {filteredReviews.map((review) => (
          <ListItem key={review.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{review.customer.name.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography fontWeight="bold">
                    {review.customer.name}
                  </Typography>
                  <Box ml={1} display="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        fontSize="small"
                        color={i < review.rating ? "primary" : "disabled"}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ ml: 2 }}
                  >
                    {formatDateTime(review.created_at)}
                  </Typography>
                </Box>
              }
              secondary={review.comment}
            />
            <Button variant="text" size="small">
              Trả lời
            </Button>
          </ListItem>
        ))}
      </List>
      {filteredReviews.length === 0 && (
        <Typography>Không có đánh giá nào.</Typography>
      )}
    </Box>
  );
};

export default ProductReviews;
