import { Box, Typography, Button, Grid, TextField, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, IconButton, Chip } from '@mui/material';
import React, { FC, ReactElement, useState } from 'react';
import { Star, StarBorder, Send } from '@mui/icons-material';

interface CustomerReview {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductReviews: FC = (): ReactElement => {
  const [reviews, setReviews] = useState<CustomerReview[]>([
    {
      id: 1,
      name: 'Quý Khách',
      rating: 5,
      comment: 'Sản phẩm rất tốt',
      date: '24 ngày trước'
    }
  ]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const filteredReviews = selectedRating ? reviews.filter(review => review.rating === selectedRating) : reviews;

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newReview: CustomerReview = {
        id: reviews.length + 1,
        name: 'Khách hàng',
        rating: newRating,
        comment: newComment,
        date: 'Vừa xong'
      };
      setReviews([newReview, ...reviews]);
      setNewComment('');
      setNewRating(5);
    }
  };

  return (
    <Box p={3} margin={"50px"}>
      <Typography variant="h5" fontWeight="bold">
        Khách hàng nói về sản phẩm
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
        <Grid item xs={12} md={3}>
          <Typography variant="h2" fontWeight="bold">
            {(
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)}
          </Typography>
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
              <Avatar>{review.name.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography fontWeight="bold">{review.name}</Typography>
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
                    {review.date}
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
