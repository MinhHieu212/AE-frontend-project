import React from "react";
import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import {
  IconTruckDelivery,
  IconRefresh,
  IconShieldCheck,
  IconHeadset,
} from "@tabler/icons-react";

const Showcase = () => {
  const product = {
    name: "Product Name Will Be Here",
    price: 56.78,
    salePrice: 56.78,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    primaryImageURL: "https://via.placeholder.com/300x300.png",
    secondaryProducts: [
      {
        name: "Product Name Will Be Here",
        price: 56.78,
        imageURL: "https://via.placeholder.com/150x150.png",
      },
      {
        name: "Product Name Will Be Here",
        price: 56.78,
        imageURL: "https://via.placeholder.com/150x150.png",
      },
    ],
  };

  return (
    <Box className="w-full h-[450px]">
      <Grid2 container spacing={2} className="h-full">
        <Grid2 size={8} className="h-full">
          <Box className="flex h-full items-stretch justify-center">
            <img
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-z-flip-xanh-2_1_1.jpg"
              alt="Samsung galaxy zlip"
              className="w-1/2 rounded-lg h-full object-cover"
            />
            <Box className="w-1/2 p-5 flex-col flex items-start justify-center bg-gray-100">
              <Typography
                variant="h6"
                color="textSecondary"
                className="text=[25px]"
              >
                Top Selling
              </Typography>
              <Typography variant="h3" className="font-bold mt-2 text-[33px]">
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                className="mt-2 text-black text-[14px]"
              >
                {product.description}
              </Typography>
              <div className="flex items-center justify-center gap-3 text-[25px] mt-2 my-1 font-medium text-[gray] mr-auto">
                <p className="text-gray-500 my-0 line-through">$ 48.99</p>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  className="my-1"
                />
                <p className="text-black my-0">$ 39.99</p>
              </div>
              <Button
                variant="contained"
                color="primary"
                className="mt-4 text-black bg-white"
              >
                Start Shopping
              </Button>
            </Box>
          </Box>
        </Grid2>
        <Grid2 size={4} className="h-full">
          <Box className="flex w-full flex-col items-center justify-center h-full">
            <Box className="h-1/2 shadow-lg px-3 pb-3 w-full overflow-hidden relative">
              <Typography variant="h5" className="font-bold text-[18px]">
                Samsung Galaxy Watch6
              </Typography>
              <div className="flex items-center justify-between">
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className="mt-3 text-black text-[18px] relative z-100"
                >
                  $ 20.99
                </Typography>
                <img
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-l705_001_front_titanium_silve.png"
                  alt="Samsung galaxy zlip"
                  className="w-[80%] h-[80%] rounded-lg object-contain absolute bottom-0 right-0"
                />
              </div>
            </Box>
            <Box className="h-1/2 shadow-lg px-3 pt-3 w-full overflow-hidden relative z-0">
              <Typography variant="h5" className="font-bold text-[18px]">
                Hyperwork gen 2
              </Typography>
              <div className="flex items-center justify-between">
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className="mt-3 text-black text-[18px] relative z-100"
                >
                  $ 10.99
                </Typography>
                <img
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/b/a/ban-phim-khong-day-hyperwork-hyperone-gen-2_6_.png"
                  alt="Samsung galaxy zlip"
                  className="w-[80%] h-[80%] rounded-lg object-contain absolute bottom-0 right-0"
                />
              </div>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Showcase;
