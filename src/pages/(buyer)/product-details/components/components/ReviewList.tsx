import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import {
  Box,
  FormControl,
  Grid2,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { IconStarFilled } from "@tabler/icons-react";
import { getProductReviews } from "../../../../../api/ReviewsApi";
import { useParams } from "react-router-dom";
import { toast } from "../../../../../utils/Toastify";

const ratingOptions = [0, 1, 2, 3, 4, 5];
const sortOptions = ["Most relevant", "Most recent", "By rating"];

const ReviewList = ({}) => {
  const [ratingOption, setRatingOption] = useState(ratingOptions[0]);
  const [sort, setSort] = useState(sortOptions[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const { slug: product_id } = useParams();
  const [reviewList, setReviewList] = useState<any>([]);

  useEffect(() => {
    const callApi = async () => {
      setLoading(true);
      try {
        const response_data = await getProductReviews(String(product_id));
        const reviewListData = response_data;
        console.log("Reviews", reviewListData);
        setReviewList(reviewListData);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    callApi();
  }, []);

  return (
    <Box className="h-[85vh] w-[100%] scrollBar">
      <Box className="flex items-center justify-between font-medium h-[40px] text-gray-700 rounded-md border-[1px] border-solid p-3 border-stone-200 text-[14px]">
        <span>Overall rating</span>
        <Box className="flex items-center gap-2">
          4.5 <IconStarFilled size={20} color="orange" />
        </Box>
      </Box>
      <Grid2 className="w-full mt-4" container spacing={1}>
        <Grid2 size={6}>
          <FormControl className="w-full">
            <Select
              id="select-rating-options"
              inputProps={{ "aria-label": "Without label" }}
              value={ratingOption}
              onChange={(e) => setRatingOption(e.target.value as number)}
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[40px] w-full cursor-pointer rounded-lg"
              renderValue={() => (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                  }}
                >
                  <Box className="flex items-center justify-start gap-2 text-sm font-medium">
                    {ratingOption !== 0
                      ? Array.from({ length: ratingOption }).map((_, index) => (
                          <IconStarFilled key={index} size={15} color="gray" />
                        ))
                      : "Read all"}
                  </Box>
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
              displayEmpty
            >
              {ratingOptions.map((item, index) => (
                <MenuItem key={index} value={item}>
                  <Box className="flex items-center justify-start gap-2 text-sm font-medium">
                    {item !== 0
                      ? Array.from({ length: item }).map((_, index) => (
                          <IconStarFilled key={index} size={15} color="gray" />
                        ))
                      : "Read all"}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 size={6}>
          <FormControl className="w-full">
            <Select
              id="select-sort-option"
              inputProps={{ "aria-label": "Without label" }}
              value={sort}
              onChange={(e) => setSort(e.target.value as string)}
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[40px] w-full cursor-pointer rounded-lg"
              renderValue={() => (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                  }}
                >
                  <span className="text-sm font-medium">{sort}</span>
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
              displayEmpty
            >
              {sortOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
      <Box>
        {loading ? (
          <LinearProgress className="mt-6" />
        ) : reviewList.length > 0 ? (
          reviewList.map((item: any, i: number) => {
            const review = {
              rating: item.rating,
              date: item.createdAt,
              title: item.title,
              description: item.description,
              shipping: true,
              recommended: true,
            };

            return <ReviewCard key={i} review={review} />;
          })
        ) : (
          <Box className="w-full h-[300px] flex items-center justify-center">
            No reviews
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ReviewList;
