import React, { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Rating,
  Typography,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { addProductReviews } from "../../../../../api/ReviewsApi";

interface ReviewFormProps {
  productName: string;
  productPrice: number;
  setWriteReview: any;
}

interface FormData {
  name: string;
  email: string;
  score: number | null;
  title: string;
  review: string;
  recommended: string;
  fitting: number;
  orderOnTime: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productName,
  productPrice,
  setWriteReview,
}) => {
  const { slug: product_id } = useParams();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    score: null,
    title: "",
    review: "",
    recommended: "",
    fitting: 1,
    orderOnTime: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Box className="w-full h-[85vh] mx-auto bg-white px-3 rounded-lg shadow-md text-sm">
      <Box className="flex items-center mb-4 w-full">
        <Box className="w-[60px] h-[60px] bg-gray-200 rounded-md mr-3 overflow-hidden">
          <img
            src="https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-z-fold-6-hong_2_.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" className="font-semibold text-base">
            {productName}
          </Typography>
          <Typography variant="body2" className="text-gray-600 text-xs">
            ${productPrice}
          </Typography>
        </Box>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box>
          <Typography
            component="legend"
            className="font-medium text-gray-700 mt-5 text-sm"
          >
            Score
          </Typography>
          <Rating
            name="score"
            size="medium"
            value={formData.score}
            onChange={(event, newValue) => {
              setFormData((prevState) => ({
                ...prevState,
                score: newValue,
              }));
            }}
          />
        </Box>
        <p className="font-medium text-gray-700 mt-4 mb-2 text-sm">Title</p>
        <TextField
          fullWidth
          size="small"
          name="title"
          label="Choose a title"
          variant="outlined"
          value={formData.title}
          onChange={handleInputChange}
          InputProps={{
            style: { fontSize: "0.875rem" },
          }}
          InputLabelProps={{
            style: { fontSize: "0.875rem" },
          }}
        />
        <p className="font-medium text-gray-700 mt-5 mb-3 text-sm">Review</p>
        <TextField
          fullWidth
          size="small"
          name="review"
          label="Write a review"
          variant="outlined"
          multiline
          rows={8}
          value={formData.review}
          onChange={handleInputChange}
          InputProps={{
            style: { fontSize: "0.875rem" },
          }}
          InputLabelProps={{
            style: { fontSize: "0.875rem" },
          }}
        />
        <FormControl component="fieldset" className="mb-3 mt-5 w-full">
          <FormLabel
            component="legend"
            className="font-medium text-gray-700 text-sm"
          >
            Recommended
          </FormLabel>
          <RadioGroup
            row
            name="recommended"
            value={formData.recommended}
            onChange={handleInputChange}
          >
            <FormControlLabel
              value="yes"
              control={<Radio size="small" />}
              label={<span className="text-sm">Yes</span>}
            />
            <FormControlLabel
              value="no"
              control={<Radio size="small" />}
              label={<span className="text-sm">No</span>}
            />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className="mb-5 w-full">
          <FormLabel
            component="legend"
            className="font-medium text-gray-700 text-sm"
          >
            Did your order arrive within the time mentioned?
          </FormLabel>
          <RadioGroup
            row
            name="orderOnTime"
            value={formData.orderOnTime}
            onChange={handleInputChange}
          >
            <FormControlLabel
              value="yes"
              control={<Radio size="small" />}
              label={<span className="text-sm">Yes</span>}
            />
            <FormControlLabel
              value="no"
              control={<Radio size="small" />}
              label={<span className="text-sm">No</span>}
            />
          </RadioGroup>
        </FormControl>
        <Box className="flex justify-between mt-auto gap-3">
          <Button
            variant="outlined"
            className="w-1/2 h-[40px] border-darkGreen text-sm"
            color="inherit"
            onClick={() => setWriteReview(false)}
          >
            Discard
          </Button>
          <Button
            type="submit"
            className="bg-darkGreen h-[40px] text-white w-1/2 text-sm"
            color="primary"
            onClick={async () => {
              try {
                const payload = {
                  rating: formData.score,
                  title: formData.score,
                  description: formData.review,
                  customer: {
                    id: "66f2f6341db3961bdb8e2865",
                  },
                  product: {
                    id: product_id,
                  },
                  recommended: true,
                  orderOnTime: true,
                };

                console.log(JSON.stringify(payload, null, 2));

                const response = await addProductReviews(
                  String(product_id),
                  payload
                );

                console.log(response);
              } catch (error) {
                console.error("Failed to submit review:", error);
              } finally {
                setWriteReview(false);
              }
            }}
          >
            Post
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;
