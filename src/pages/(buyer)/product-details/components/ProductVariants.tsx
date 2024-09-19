import React, { useState } from "react";
import {
  IconHeart,
  IconHeartFilled,
  IconInfoHexagon,
} from "@tabler/icons-react";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../../store/store";

const ProductVariants = () => {
  const product_details = useAppSelector((state) => state.details);
  const selected_variant = useAppSelector((state) => state.selected_variants);
  const [like, setLike] = useState<boolean>(false);

  console.log(JSON.stringify(product_details, null, 2));

  return (
    <div>
      <div className="flex items-start justify-between w-full">
        <div className="w-[70%]">
          <Typography variant="h4" component="h2">
            {product_details?.name || "no name"}
          </Typography>
          <p className="font-semibold text-gray-400 my-0">
            {product_details.categories[0]?.name || "no categories"}
          </p>
        </div>
        <Stack className="w-[30%]">
          <p className="font-semibold my-0 text-[25px] text-right text-gray-600 line-through">
            ${selected_variant.sale_price}
          </p>
          <p className="font-semibold text-lime my-0 text-[35px] text-right">
            ${selected_variant.price}
          </p>
        </Stack>
      </div>

      {/* <div className="flex flex-col items-start justify-center my-4">
        <p className="mb-2 font-semibold">Colors</p>
        <Grid2 container spacing={2}>
          {["lightgray", "lightgreen", "white", "lightblue"].map(
            (item, index) => (
              <Grid2 size={3} key={index}>
                <Box
                  className={`min-w-[70px] min-h-[70px] shadow-lg rounded-md flex items-center justify-center`}
                  style={{ backgroundColor: item }}
                >
                  <span
                    className={`text-sm font-medium ${
                      item === "white" ? "text-black" : "text-white"
                    }`}
                  >
                    {item}
                  </span>
                </Box>
              </Grid2>
            )
          )}
        </Grid2>
      </div>

      <div className="flex flex-col items-start justify-center my-4">
        <p className="mb-2 font-semibold">RAM</p>
        <div className="flex space-x-2">
          {["8GB", "16GB", "32GB"].map((ramOption, index) => (
            <Box
              key={index}
              className="border-2 border-solid border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer hover:border-black"
            >
              {ramOption}
            </Box>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-center my-4">
        <p className="mb-2 font-semibold">Storage</p>
        <div className="flex space-x-2">
          {["256GB SSD", "512GB SSD", "1TB SSD"].map((storageOption, index) => (
            <Box
              key={index}
              className="border-2 border-solid border-gray-300 rounded-lg px-4 py-2 text-sm cursor-pointer hover:border-black"
            >
              {storageOption}
            </Box>
          ))}
        </div>
      </div> */}

      <div className="w-full flex items-center justify-start gap-1">
        <IconInfoHexagon size={22} color={"gray"} />
        <span className="font-medium text-gray-500">20 item left!</span>
      </div>

      <p className="mt-10 mb-1 text-sm text-gray-500">
        Delivery on Match 5th-11th
      </p>
      <div className="w-full flex items-center justify-center gap-2 ">
        <Button
          className="bg-black text-white w-full capitalize"
          variant="contained"
          size="large"
        >
          Add to cart
        </Button>
        <div
          onClick={() => setLike((prev) => !prev)}
          className="flex items-center justify-center p-2 bg-slate-100 z-100 border-[0.5px] rounded-md border-solid border-black bg-opacity-80 cursor-pointer"
        >
          {like ? <IconHeart /> : <IconHeartFilled />}
        </div>
      </div>
    </div>
  );
};

export default ProductVariants;
