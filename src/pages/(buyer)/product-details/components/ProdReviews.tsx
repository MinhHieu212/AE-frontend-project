import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { IconStarFilled, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";

const ProdReviews = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [writeReview, setWriteReview] = useState<boolean>(false);

  return (
    <Box className="w-full rounded-lg p-4 flex flex-col gap-5 border-2 border-solid border-gray-200 shadow-lg mt-5">
      <Box className="flex items-center justify-between font-medium text-[15px]">
        <span>Review ({20})</span>
        <span>Write a review</span>
      </Box>
      <Box className="flex items-center justify-between font-medium text-[15px]">
        <span>Overall rating</span>
        <Box className="flex items-center gap-2">
          4.5 <IconStarFilled size={20} color="orange" />
        </Box>
      </Box>
      <Button
        variant="outlined"
        className="p-2 w-full bg-white mt-3 border-gray-400 h-[40px]"
        onClick={() => setOpen(true)}
      >
        <span className="text-gray-700 capitalize font-medium">Show all</span>
      </Button>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="responsive-dialog-title"
          fullWidth={true}
          maxWidth="sm"
          PaperProps={{
            style: {
              position: "absolute",
              top: 0,
              right: -10,
            },
          }}
        >
          <DialogTitle id="responsive-dialog-title" className="text-[18px]">
            Review (92)
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={(theme) => ({
              position: "absolute",
              right: 10,
              top: 10,
              color: theme.palette.grey[500],
            })}
          >
            <IconX size={22} />
          </IconButton>
          <DialogContent>
            <DialogContentText>
              {writeReview ? (
                <ReviewForm
                  productName="Samsung galaxy S24 Ultra"
                  productPrice={1991}
                  setWriteReview={setWriteReview}
                />
              ) : (
                <ReviewList />
              )}
            </DialogContentText>
          </DialogContent>
          {!writeReview && (
            <DialogActions>
              <Button
                className="p-2 w-full bg-darkGreen mt-3 h-[40px]"
                onClick={() => setWriteReview((prev) => !prev)}
              >
                <span className="text-white capitalize">Write a reviews</span>
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </React.Fragment>
    </Box>
  );
};

export default ProdReviews;
