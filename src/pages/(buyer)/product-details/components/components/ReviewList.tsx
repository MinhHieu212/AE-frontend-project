import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import {
  Box,
  FormControl,
  Grid2,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { IconStarFilled } from "@tabler/icons-react";

const ratingOptions = [0, 1, 2, 3, 4, 5];
const sortOptions = ["Most relevant", "Most recent", "By rating"];

const ReviewList = () => {
  const [ratingOption, setRatingOption] = useState(ratingOptions[0]);
  const [sort, setSort] = useState(sortOptions[0]);

  return (
    <Box className="h-[85vh] w-[100%] scrollBar">
      <Box className="flex items-center justify-between font-medium rounded-md border-2 border-solid p-3 border-stone-200">
        <span>Overall rating</span>
        <Box className="flex items-center gap-2">
          4.5 <IconStarFilled size={23} color="orange" />
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
              className="h-[42px] w-full cursor-pointer rounded-lg"
              renderValue={() => (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                  }}
                >
                  <Box className="flex items-center justify-start gap-2 text-sm font-medium mt-1">
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
              className="h-[42px] w-full cursor-pointer rounded-lg"
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
        {[1, 2, 3, 4, 5].map((_, i) => (
          <ReviewCard key={i} />
        ))}
      </Box>
    </Box>
  );
};

export default ReviewList;
