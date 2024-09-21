import { Box, Divider, Grid2, Typography } from "@mui/material";
import { IconStarFilled, IconX } from "@tabler/icons-react";
import React from "react";

const ReviewCard = () => {
  const review = {
    rating: 5,
    date: "Sep 16, 2024",
    title: "Beautiful!",
    content:
      "I got the hoop medium and I really love them. Thinking about ordering the small ones too.",
    shipping: "Yes",
    recommended: "10 - I'll recommend to everyone",
  };

  return (
    <Box className="border-2 border-solid border-[#e0e0e0] rounded-md p-4 bg-gray-100 w-full shadow-lg mt-4">
      <Grid2 container justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          {Array(review.rating)
            .fill("")
            .map((_, index) => (
              <IconStarFilled size={15} color="orange" />
            ))}
        </Box>
        <Typography variant="body2" color="textSecondary" className="text-sm">
          {review.date}
        </Typography>
      </Grid2>
      <Typography variant="h6" className="mt-[8px] font-medium text-[15px]">
        {review.title}
      </Typography>
      <Typography variant="body2" className="mt-[8px]">
        {review.content}
      </Typography>
      <Divider sx={{ marginY: "16px" }} />
      <Grid2 container spacing={1}>
        <Grid2 size={6}>
          <Typography variant="body2" fontWeight="bold">
            Shipping
          </Typography>
        </Grid2>
        <Grid2 size={6} textAlign="right">
          <Typography variant="body2">{review.shipping}</Typography>
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="body2" fontWeight="bold">
            Recommended
          </Typography>
        </Grid2>
        <Grid2 size={6} textAlign="right">
          <Typography variant="body2">{review.recommended}</Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ReviewCard;
